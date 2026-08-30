const sampleListings = [
    {
      title: "Cozy Beachfront Cottage",
      description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1500,
      location: "Malibu",
      country: "United States",
      category: "trending"
    },
    {
      title: "Modern Loft in Downtown",
      description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1200,
      location: "New York City",
      country: "United States",
      category: "iconic-cities"
    },
    {
      title: "Mountain Retreat",
      description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1000,
      location: "Aspen",
      country: "United States",
      category: "mountains"
    },
    {
      title: "Ski Chalet in Aspen",
      description: "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 4000,
      location: "Aspen",
      country: "United States",
      category: "mountains"
    },
    {
      title: "Ski-In/Ski-Out Chalet",
      description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 3000,
      location: "Verbier",
      country: "Switzerland",
      category: "mountains"
    },
    {
      title: "Mountain View Cabin in Banff",
      description: "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1500,
      location: "Banff",
      country: "Canada",
      category: "mountains"
    },
    {
      title: "Historic Villa in Tuscany",
      description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2500,
      location: "Florence",
      country: "Italy",
      category: "castles"
    },
    {
      title: "Historic Castle in Scotland",
      description: "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 4000,
      location: "Scottish Highlands",
      country: "United Kingdom",
      category: "castles"
    },
    {
      title: "Luxury Villa in the Maldives",
      description: "Indulge in luxury in this overwater villa in the Maldives with stunning private infinity pool views of the Indian Ocean.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 6000,
      location: "Maldives",
      country: "Maldives",
      category: "amazing-pools"
    },
    {
      title: "Beachfront Bungalow with Private Pool in Bali",
      description: "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1800,
      location: "Bali",
      country: "Indonesia",
      category: "amazing-pools"
    },
    {
      title: "Tropical Villa with Infinity Pool",
      description: "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 3000,
      location: "Phuket",
      country: "Thailand",
      category: "amazing-pools"
    },
    {
      title: "Desert Oasis with Pool in Dubai",
      description: "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private temperature-controlled pool.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 5000,
      location: "Dubai",
      country: "United Arab Emirates",
      category: "amazing-pools"
    },
    {
      title: "Secluded Treehouse Getaway",
      description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 800,
      location: "Portland",
      country: "United States",
      category: "camping"
    },
    {
      title: "Safari Wilderness Camp in Serengeti",
      description: "Experience the thrill of the wild in a luxury tented camp. Witness the Great Migration up close.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 4000,
      location: "Serengeti National Park",
      country: "Tanzania",
      category: "camping"
    },
    {
      title: "Eco-Friendly Forest Glamping",
      description: "Stay in an eco-friendly safari camp nestled deep in the tropical forest. Perfect for outdoor adventurers.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 750,
      location: "Costa Rica",
      country: "Costa Rica",
      category: "camping"
    },
    {
      title: "Charming Farm Cottage in Cotswolds",
      description: "Escape to the picturesque Cotswolds in this quaint organic farm cottage with grazing sheep and country trails.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1200,
      location: "Cotswolds",
      country: "United Kingdom",
      category: "farms"
    },
    {
      title: "Rustic Vineyard Ranch",
      description: "Wake up to fresh morning air surrounded by organic vineyards and rolling farmlands in Napa Valley.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1350,
      location: "Napa Valley",
      country: "United States",
      category: "farms"
    },
    {
      title: "Glass Aurora Igloo in Lapland",
      description: "Sleep under the magical Northern Lights inside this heated glass igloo in Finnish Lapland.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 3200,
      location: "Rovaniemi",
      country: "Finland",
      category: "arctic"
    },
    {
      title: "Arctic Ice Cabin & Sauna",
      description: "Experience the ultimate winter wonderland in this modern Scandinavian arctic cabin with private sauna.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2800,
      location: "Tromso",
      country: "Norway",
      category: "arctic"
    },
    {
      title: "Stargazing Geodesic Dome",
      description: "Marvel at the night sky in this luxurious geodesic dome situated in the serene desert landscape.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1100,
      location: "Joshua Tree",
      country: "United States",
      category: "domes"
    },
    {
      title: "Eco Mountain Dome Sanctuary",
      description: "Immerse yourself in panoramic mountain views from this sustainable luxury dome with wood-fired hot tub.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1450,
      location: "Patagonia",
      country: "Chile",
      category: "domes"
    },
    {
      title: "Luxury Houseboat on Backwaters",
      description: "Cruise gently along scenic palm-fringed canals in this handcrafted luxury wooden houseboat.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1900,
      location: "Alleppey",
      country: "India",
      category: "boats"
    },
    {
      title: "Historic Canal Houseboat",
      description: "Live on the historic Amsterdam canals in this charming, fully-equipped floating home.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 1800,
      location: "Amsterdam",
      country: "Netherlands",
      category: "boats"
    },
    {
      title: "Boutique Bohemian Room in Paris",
      description: "A cozy sunlit room with private balcony in the heart of Montmartre, steps from cafes and art galleries.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 950,
      location: "Paris",
      country: "France",
      category: "rooms"
    },
    {
      title: "Cozy Studio Room in Kyoto",
      description: "Traditional tatami elements blend with modern comfort in this serene private guest room.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 850,
      location: "Kyoto",
      country: "Japan",
      category: "rooms"
    },
    {
      title: "Private Island Retreat",
      description: "Have an entire private island to yourself for a truly exclusive and unforgettable vacation experience.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 10000,
      location: "Fiji",
      country: "Fiji",
      category: "trending"
    },
    {
      title: "Modern Apartment in Tokyo",
      description: "Explore the vibrant city of Tokyo from this ultra-modern, centrally located high-rise apartment.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2000,
      location: "Tokyo",
      country: "Japan",
      category: "iconic-cities"
    },
    {
      title: "Historic Brownstone in Boston",
      description: "Step back in time in this elegant historic brownstone located in the vibrant heart of Boston.",
      image: {
        filename: "listingimage",
        url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      },
      price: 2200,
      location: "Boston",
      country: "United States",
      category: "iconic-cities"
    }
];

module.exports = { data: sampleListings };
