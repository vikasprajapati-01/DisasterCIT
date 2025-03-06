"use client";
import { useState } from "react";
import styles from "./Chatbot.module.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://127.0.0.1:8000/chatbot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const aiMessage = {
        role: "ai",
        content: data.response || "Sorry, I couldn't process that.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Something went wrong. Try again!" },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className={styles.chatbotContainer}>
      <h1 className={styles.chatbotTitle}>AI Chatbot</h1>
      <div className={styles.messageBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${msg.role === "user" ? styles.user : styles.ai}`}
            dangerouslySetInnerHTML={{ __html: msg.content }}
          />
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputField}
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button
          className={styles.sendButton}
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
}
