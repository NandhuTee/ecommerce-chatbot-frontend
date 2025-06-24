import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
  setInput("");
  try {
    const res = await axios.post('http://localhost:5000/api/chat/message', {
      message: input,
    });

    const botMsg = { sender: "bot", text: res.data.reply };
    setMessages((prev) => [...prev, botMsg]);
  } catch {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "⚠️ Server error. Try again." },
    ]);
  }
};

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>🛢️ Cylinder Booking Chatbot</h2>
      <div style={{ height: 300, overflowY: "scroll", border: "1px solid #ccc", padding: "1rem" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <b>{msg.sender === "user" ? "👤 You" : "🤖 Bot"}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type message..."
        style={{ width: "80%", padding: "0.5rem", marginTop: "1rem" }}
      />
      <button onClick={sendMessage} style={{ padding: "0.5rem" }}>Send</button>
    </div>
  );
};

export default Chatbot;
