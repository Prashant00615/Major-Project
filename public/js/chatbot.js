document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("wanderbot-toggle");
    const chatWindow = document.getElementById("wanderbot-window");
    const closeBtn = document.getElementById("wanderbot-close");
    const clearBtn = document.getElementById("wanderbot-clear");
    const chatInput = document.getElementById("wanderbot-input");
    const sendBtn = document.getElementById("wanderbot-send");
    const chatBody = document.getElementById("wanderbot-body");

    if (!toggleBtn || !chatWindow) return;

    let chatHistory = [];

    // Detect if on a specific listing page (e.g. /listings/:id)
    function getCurrentListingId() {
        const path = window.location.pathname;
        const match = path.match(/\/listings\/([a-f0-9]{24})/i);
        return match ? match[1] : null;
    }

    // Toggle Chat Window
    toggleBtn.addEventListener("click", () => {
        chatWindow.classList.toggle("active");
        if (chatWindow.classList.contains("active")) {
            chatInput.focus();
            scrollToBottom();
        }
    });

    closeBtn.addEventListener("click", () => {
        chatWindow.classList.remove("active");
    });

    // Clear Chat
    clearBtn.addEventListener("click", () => {
        chatBody.innerHTML = `
            <div class="chat-msg bot">
                👋 Chat cleared! How can I help you find your dream vacation home today?
            </div>
            <div class="wanderbot-chips">
                <button class="chip-btn" onclick="sendChipMessage('🏔️ Best mountain retreats')">🏔️ Mountain Cabins</button>
                <button class="chip-btn" onclick="sendChipMessage('🏊 Stays with private pools')">🏊 Pool Villas</button>
                <button class="chip-btn" onclick="sendChipMessage('❄️ Glass arctic igloos')">❄️ Arctic Igloos</button>
                <button class="chip-btn" onclick="sendChipMessage('💰 Affordable budget stays under ₹1500')">💰 Under ₹1,500</button>
                <button class="chip-btn" onclick="sendChipMessage('🗺️ 3-day itinerary planner')">🗺️ Trip Itinerary</button>
            </div>
        `;
        chatHistory = [];
    });

    // Send Message
    async function sendMessage(text) {
        const message = text || chatInput.value.trim();
        if (!message) return;

        chatInput.value = "";

        // Append User Message
        appendMessage(message, "user");
        chatHistory.push({ role: "user", content: message });

        // Show Typing Indicator
        const typingEl = showTypingIndicator();
        scrollToBottom();

        try {
            const currentListingId = getCurrentListingId();
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message,
                    currentListingId: currentListingId,
                    history: chatHistory.slice(-6)
                })
            });

            const data = await res.json();
            removeTypingIndicator(typingEl);

            if (data.reply) {
                appendMessage(data.reply, "bot");
                chatHistory.push({ role: "assistant", content: data.reply });
            } else {
                appendMessage("Sorry, I had trouble answering that. Please try asking again!", "bot");
            }
        } catch (err) {
            console.error("Chat error:", err);
            removeTypingIndicator(typingEl);
            appendMessage("Unable to reach AI assistant right now. Please check your connection and try again.", "bot");
        }

        scrollToBottom();
    }

    // Helper: Append formatted message
    function appendMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-msg ${sender}`;
        msgDiv.innerHTML = formatMarkdown(text);
        chatBody.appendChild(msgDiv);
    }

    // Helper: Simple Markdown Formatter
    function formatMarkdown(text) {
        let escaped = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Format [Title](Url) markdown links
        escaped = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_self">$1</a>');

        // Bold **text**
        escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        // Italic *text*
        escaped = escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');

        // Line breaks
        escaped = escaped.replace(/\n/g, '<br>');

        return escaped;
    }

    // Helper: Typing Indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement("div");
        typingDiv.className = "typing-indicator";
        typingDiv.id = "wanderbot-typing";
        typingDiv.innerHTML = "<span></span><span></span><span></span>";
        chatBody.appendChild(typingDiv);
        return typingDiv;
    }

    function removeTypingIndicator(el) {
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Event Listeners for Input
    sendBtn.addEventListener("click", () => sendMessage());
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });

    // Expose chip handler globally
    window.sendChipMessage = function (msg) {
        sendMessage(msg);
    };
});
