const Listing = require('../models/listing.js');

let GoogleGenAI;
try {
    const genaiModule = require('@google/genai');
    GoogleGenAI = genaiModule.GoogleGenAI;
} catch (e) {
    GoogleGenAI = null;
}

module.exports.chat = async (req, res) => {
    try {
        const { message, currentListingId, history = [] } = req.body;
        if (!message || message.trim() === '') {
            return res.status(400).json({ error: "Message is required." });
        }

        const userMsg = message.trim().toLowerCase();
        
        // Fetch listings to provide context
        const allListings = await Listing.find({}).limit(30);
        
        let currentListing = null;
        if (currentListingId) {
            currentListing = await Listing.findById(currentListingId);
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (apiKey && GoogleGenAI) {
            try {
                const ai = new GoogleGenAI({ apiKey });
                
                // Summarize listings for LLM context
                const listingContext = allListings.map(l => 
                    `- [${l.title}](/listings/${l._id}): ${l.location}, ${l.country} | Category: ${l.category || 'general'} | Price: ₹${l.price}/night | Description: ${l.description}`
                ).join('\n');

                const systemInstruction = `You are WanderBot, the friendly and ultra-knowledgeable AI Travel Concierge for the Wanderlust vacation rental platform.
Your goals:
1. Help users discover the best vacation homes and experiences from our platform.
2. Recommend listings from our real database when relevant. Always provide clickable markdown links in the format [Listing Title](/listings/id).
3. If the user is currently viewing a specific listing, provide detailed context about that listing.
4. Give helpful travel itineraries, packing tips, budget calculations (with 18% GST), and local attraction recommendations.
5. Keep your tone enthusiastic, polite, warm, and concise with structured bullet points and emojis.

Here are the active listings available on Wanderlust:
${listingContext}

${currentListing ? `The user is currently viewing this listing:\nTitle: ${currentListing.title}\nLocation: ${currentListing.location}, ${currentListing.country}\nPrice: ₹${currentListing.price}/night\nCategory: ${currentListing.category}\nDescription: ${currentListing.description}` : ''}
`;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: [
                        { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Query: ${message}` }] }
                    ]
                });

                const reply = response.text || "I am here to help you explore amazing stays on Wanderlust!";
                return res.json({ reply, source: "gemini" });
            } catch (apiErr) {
                console.error("Gemini API call failed, falling back to local engine:", apiErr.message);
            }
        }

        // Built-in intelligent fallback travel engine
        let reply = "";
        
        if (currentListing && (userMsg.includes("this place") || userMsg.includes("here") || userMsg.includes("about") || userMsg.includes("price") || userMsg.includes("tax"))) {
            const taxPrice = Math.round(currentListing.price * 1.18);
            reply = `✨ **${currentListing.title}** in **${currentListing.location}, ${currentListing.country}**:\n\n` +
                    `• **Base Price:** ₹${currentListing.price.toLocaleString("en-IN")}/night\n` +
                    `• **With 18% GST:** ₹${taxPrice.toLocaleString("en-IN")}/night\n` +
                    `• **Category:** ${(currentListing.category || 'Trending').toUpperCase()}\n` +
                    `• **About:** ${currentListing.description}\n\n` +
                    `Would you like local food recommendations or things to do around ${currentListing.location}?`;
        } else if (userMsg.includes("mountain") || userMsg.includes("snow") || userMsg.includes("ski") || userMsg.includes("cabin") || userMsg.includes("aspen") || userMsg.includes("alps")) {
            const mountainListings = allListings.filter(l => l.category === 'mountains' || l.title.toLowerCase().includes("mountain") || l.description.toLowerCase().includes("mountain"));
            reply = `🏔️ **Here are our top Mountain & Alpine Retreats:**\n\n` +
                mountainListings.slice(0, 3).map(l => `• [${l.title}](/listings/${l._id}) - ₹${l.price.toLocaleString("en-IN")}/night in **${l.location}, ${l.country}**`).join('\n') +
                `\n\nAll mountain stays feature breathtaking views and cozy fireplaces! 🪵`;
        } else if (userMsg.includes("arctic") || userMsg.includes("igloo") || userMsg.includes("aurora") || userMsg.includes("finland") || userMsg.includes("norway")) {
            const arcticListings = allListings.filter(l => l.category === 'arctic');
            reply = `❄️ **Check out these magical Arctic & Aurora Getaways:**\n\n` +
                arcticListings.map(l => `• [${l.title}](/listings/${l._id}) - ₹${l.price.toLocaleString("en-IN")}/night in **${l.location}, ${l.country}**`).join('\n') +
                `\n\nIdeal for viewing the Northern Lights under heated glass roofs! 🌌`;
        } else if (userMsg.includes("camp") || userMsg.includes("treehouse") || userMsg.includes("glamping") || userMsg.includes("safari") || userMsg.includes("tent")) {
            const campingListings = allListings.filter(l => l.category === 'camping');
            reply = `⛺ **Exciting Camping, Treehouses & Glamping Stays:**\n\n` +
                campingListings.map(l => `• [${l.title}](/listings/${l._id}) - ₹${l.price.toLocaleString("en-IN")}/night in **${l.location}, ${l.country}**`).join('\n') +
                `\n\nImmerse yourself directly into nature and wildlife! 🌿`;
        } else if (userMsg.includes("pool") || userMsg.includes("beach") || userMsg.includes("island") || userMsg.includes("bali") || userMsg.includes("maldives")) {
            const poolListings = allListings.filter(l => l.category === 'amazing-pools');
            reply = `🏊 **Stunning Stays with Private Pools & Beaches:**\n\n` +
                poolListings.slice(0, 3).map(l => `• [${l.title}](/listings/${l._id}) - ₹${l.price.toLocaleString("en-IN")}/night in **${l.location}, ${l.country}**`).join('\n') +
                `\n\nReady for an unforgettable swim? 🌴`;
        } else if (userMsg.includes("dome") || userMsg.includes("yurt") || userMsg.includes("joshua") || userMsg.includes("patagonia")) {
            const domeListings = allListings.filter(l => l.category === 'domes');
            reply = `🛖 **Spectacular Geodesic & Stargazing Domes:**\n\n` +
                domeListings.map(l => `• [${l.title}](/listings/${l._id}) - ₹${l.price.toLocaleString("en-IN")}/night in **${l.location}, ${l.country}**`).join('\n') +
                `\n\nEnjoy panoramic views and star-filled desert skies! ✨`;
        } else if (userMsg.includes("boat") || userMsg.includes("houseboat") || userMsg.includes("canal") || userMsg.includes("yacht") || userMsg.includes("alleppey") || userMsg.includes("amsterdam")) {
            const boatListings = allListings.filter(l => l.category === 'boats');
            reply = `🚢 **Scenic Houseboats & Water Getaways:**\n\n` +
                boatListings.map(l => `• [${l.title}](/listings/${l._id}) - ₹${l.price.toLocaleString("en-IN")}/night in **${l.location}, ${l.country}**`).join('\n') +
                `\n\nUnwind right on the tranquil canals and backwaters! 🌊`;
        } else if (userMsg.includes("cheap") || userMsg.includes("budget") || userMsg.includes("under") || userMsg.includes("affordable") || userMsg.includes("1500") || userMsg.includes("1000")) {
            const budgetListings = [...allListings].sort((a, b) => a.price - b.price).slice(0, 4);
            reply = `💰 **Most Affordable & High-Value Stays:**\n\n` +
                budgetListings.map(l => `• [${l.title}](/listings/${l._id}) - **₹${l.price.toLocaleString("en-IN")}**/night (${l.location}, ${l.country})`).join('\n') +
                `\n\nAll properties include full guest amenities and verified hosts.`;
        } else if (userMsg.includes("itinerary") || userMsg.includes("plan") || userMsg.includes("3-day") || userMsg.includes("trip")) {
            reply = `🗺️ **Sample 3-Day Wanderlust Getaway Plan:**\n\n` +
                `• **Day 1 (Arrival & Relaxation):** Check into your stay, unpack, explore neighborhood cafes, and catch sunset.\n` +
                `• **Day 2 (Adventure & Sights):** Visit key local landmarks, explore native culinary spots, and try outdoor activities.\n` +
                `• **Day 3 (Leisure & Departure):** Morning walk/swim, souvenir shopping, and relaxing brunch before check-out.\n\n` +
                `Tell me your destination (e.g. *Bali*, *Aspen*, *Tokyo*) to tailor this specifically!`;
        } else if (userMsg.includes("host") || userMsg.includes("add listing") || userMsg.includes("create")) {
            reply = `🏠 **Want to become a Host?**\n\n` +
                `You can earn by sharing your home! Click [Airbnb your home](/listings/new) in the navigation bar to publish your property with photos, custom pricing, location, and category tags.`;
        } else if (userMsg.includes("tax") || userMsg.includes("gst")) {
            reply = `🏷️ **Taxes & Pricing on Wanderlust:**\n\n` +
                `• All listing prices are base night rates.\n` +
                `• Toggle the **Display total after taxes** switch on the top right to see full calculations including standard 18% GST!`;
        } else {
            const randomPicks = [...allListings].sort(() => 0.5 - Math.random()).slice(0, 3);
            reply = `👋 Hello! I am **WanderBot**, your AI Travel Concierge on Wanderlust.\n\n` +
                `Here are some popular trending getaways you might love:\n` +
                randomPicks.map(l => `• [${l.title}](/listings/${l._id}) (${l.location}, ${l.country}) - ₹${l.price.toLocaleString("en-IN")}/night`).join('\n') +
                `\n\nFeel free to ask me for recommendations by **category** (mountains, pools, camping, arctic, domes), **budget**, or **trip planning**!`;
        }

        return res.json({ reply, source: "local_engine" });
    } catch (err) {
        console.error("Chatbot controller error:", err);
        return res.status(500).json({ error: "Something went wrong processing your request." });
    }
};
