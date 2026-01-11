const btn = document.getElementById("prajwal-ai-btn");
const chatBox = document.getElementById("prajwal-ai-chat");
const closeBtn = document.getElementById("prajwal-ai-close");
const sendBtn = document.getElementById("prajwal-ai-send");
const input = document.getElementById("prajwal-ai-text");
const messages = document.getElementById("prajwal-ai-messages");

const AI_API_URL = "https://new-one-ecru.vercel.app/api/chat";

btn.onclick = () => (chatBox.style.display = "flex");
closeBtn.onclick = () => (chatBox.style.display = "none");

sendBtn.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const thinkingMsg = addMessage("Thinking...", "bot");

  try {
    const res = await fetch(AI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    thinkingMsg.textContent = data.reply || "⚠️ No reply from AI.";

  } catch (err) {
    console.error(err);
    thinkingMsg.textContent = "⚠️ AI unavailable right now.";
  }
};

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `pmsg ${sender}`;
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
  return msg;
}
