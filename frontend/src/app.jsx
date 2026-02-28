import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    setLoading(false);
  };

  return (
    <div
      style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h2>Chat with Llama (via Groq)</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 16,
          minHeight: 300,
          marginBottom: 12,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: 10,
              textAlign: m.role === "user" ? "right" : "left",
            }}
          >
            <span
              style={{
                background: m.role === "user" ? "#0070f3" : "#f0f0f0",
                color: m.role === "user" ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: 16,
                display: "inline-block",
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
        {loading && <div>Thinking...</div>}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
        />
        <button
          onClick={send}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            background: "#0070f3",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
