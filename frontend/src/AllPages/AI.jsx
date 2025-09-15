import React, { useState, useEffect, useMemo, useRef } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

const symptomShortlist = [
  "Headache",
  "Fever",
  "Chest Pain",
  "Cough",
  "Fatigue",
  "Nausea",
];
let _id = 0;
const uid = () => `${Date.now()}-${_id++}`;

const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "http://127.0.0.1:8000";

async function sendMessage({
  input,
  messages,
  setMessages,
  setInput,
  setPending,
}) {
  const content = input.trim();
  if (!content) return;

  setInput("");
  setPending(true);

  const userMsg = {
    id: uid(),
    role: "user",
    text: content,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
  const next = [...messages, userMsg];
  setMessages(next);

  try {
    const history = next.slice(-8).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      text: m.text,
    }));

    const res = await fetch(`${API_BASE}/api/chatbot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // JWT দরকার হলে আনকমেন্ট করো:
      // ...(localStorage.getItem("token") ? { Authorization:`Bearer ${localStorage.getItem("token")}` } : {}),
      body: JSON.stringify({ message: content, history }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || `HTTP ${res.status}`);
    }

    const data = await res.json();
    const botMsg = {
      id: uid(),
      role: "assistant",
      text: data.reply || "(Empty reply)",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, botMsg]);
  } catch (e) {
    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: "assistant",
        text: `⚠️ ${e.message}`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  } finally {
    setPending(false);
  }
}

export default function AI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const viewportRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        id: uid(),
        role: "assistant",
        text: "Hi! I’m your AI health assistant. Describe your symptoms and I’ll suggest next steps.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  }, []);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, pending]);

  const canSend = useMemo(
    () => input.trim().length > 0 && !pending,
    [input, pending]
  );

  return (
    <div className="container py-4 position-relative">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <div
            className="rounded-3 bg-success text-white d-inline-flex align-items-center justify-content-center"
            style={{ width: 36, height: 36 }}
          >
            <FaRobot />
          </div>
          <div>
            <div className="fw-semibold">AI Health Assistant</div>
            <div className="text-muted small">Secure & private</div>
          </div>
        </div>
        <div className="text-muted small">Educational guidance only</div>
      </div>

      <div className="row g-3">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
            <div
              ref={viewportRef}
              className="card-body p-3"
              style={{ height: 360, overflowY: "auto", background: "#fbfcff" }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`d-flex mb-2 ${
                    m.role === "user" ? "justify-content-end" : ""
                  }`}
                >
                  <div
                    className={`chat-bubble ${
                      m.role === "user" ? "chat-user" : "chat-bot"
                    }`}
                    style={{ maxWidth: "72%" }}
                  >
                    <div
                      className={`small ${
                        m.role === "user" ? "text-white-50" : "text-muted"
                      } mb-1`}
                    >
                      {m.time}
                    </div>
                    <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.55 }}>
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
              {pending && (
                <div className="text-muted small d-flex align-items-center gap-2">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />
                  <span>Thinking…</span>
                </div>
              )}
            </div>
            <div className="card-footer bg-white">
              <div className="d-flex gap-2">
                <input
                  className="form-control"
                  placeholder="Describe your symptoms (e.g., 2 days of fever and cough)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (canSend)
                        sendMessage({
                          input,
                          messages,
                          setMessages,
                          setInput,
                          setPending,
                        });
                    }
                  }}
                />
                <button
                  className="btn btn-primary d-flex align-items-center gap-2"
                  disabled={!canSend}
                  onClick={() =>
                    sendMessage({
                      input,
                      messages,
                      setMessages,
                      setInput,
                      setPending,
                    })
                  }
                >
                  <FaPaperPlane /> Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div
            className="card border-0 shadow-sm mb-3"
            style={{ borderRadius: 16 }}
          >
            <div className="card-body">
              <div className="fw-semibold mb-2">Quick Symptom Picks</div>
              <div className="d-flex flex-wrap gap-2">
                {symptomShortlist.map((s) => (
                  <button
                    key={s}
                    className="btn btn-light border btn-sm rounded-pill"
                    onClick={() =>
                      setInput((prev) => (prev ? `${prev}; ${s}` : s))
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
