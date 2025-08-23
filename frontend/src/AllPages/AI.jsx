import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaRobot, FaPaperPlane, FaShieldAlt } from "react-icons/fa";

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

// Placeholder response — swap with your API later
async function fakeChatCompletion(prompt) {
  const lower = String(prompt || "").toLowerCase();
  await new Promise((r) => setTimeout(r, 450));
  if (lower.includes("headache"))
    return "Try rest and hydration. If fever/stiff neck/vision change, seek urgent care.";
  if (lower.includes("fever"))
    return "Hydrate and monitor. If >3 days or >103°F (39.4°C), see a clinician.";
  if (lower.includes("chest"))
    return "If crushing pain or shortness of breath/sweats, call emergency services.";
  return "Thanks for sharing. Rest, fluids, and monitor. Seek care if symptoms worsen or red‑flags appear.";
}

export default function AI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const viewportRef = useRef(null);

  // greet on load
  useEffect(() => {
    setMessages([
      {
        id: uid(),
        role: "assistant",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: "Hi! I’m your AI health assistant. Describe your symptoms and I’ll suggest next steps.",
      },
    ]);
  }, []);

  // autoscroll inside chat area (not the page)
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

  async function handleSend(text) {
    const content = (text ?? input).trim();
    if (!content) return;
    setInput("");

    const userMsg = {
      id: uid(),
      role: "user",
      text: content,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setPending(true);

    try {
      const reply = await fakeChatCompletion(content);
      const botMsg = {
        id: uid(),
        role: "assistant",
        text: reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="container py-4">
      {/* Title row – compact and professional */}
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
            <div className="text-muted small">
              Secure & private <FaShieldAlt className="ms-1" />
            </div>
          </div>
        </div>
        <div className="text-muted small">Educational guidance only</div>
      </div>

      <div className="row g-3">
        {/* Chat (not full page; medium height) */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
            {/* Messages area: modest height so it never feels “too big” */}
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
                    style={{ maxWidth: "72%" }} // <= bubbles won’t span wide
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

            {/* Composer – compact */}
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
                      if (canSend) handleSend();
                    }
                  }}
                />
                <button
                  className="btn btn-primary d-flex align-items-center gap-2"
                  disabled={!canSend}
                  onClick={() => handleSend()}
                >
                  <FaPaperPlane /> Send
                </button>
              </div>

              {/* helper chips – smaller + subtle */}
              <div className="mt-2 d-flex flex-wrap gap-1">
                {[
                  "When did it start?",
                  "How severe (1–10)?",
                  "Any medications?",
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="btn btn-outline-secondary btn-sm rounded-pill px-2 py-1"
                    onClick={() =>
                      setInput((prev) => (prev ? `${prev} ${s}` : s))
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar – tidy tools (narrower so chat doesn’t look huge) */}
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

          <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
            <div className="card-body">
              <div className="fw-semibold mb-1">How to get better answers</div>
              <ul className="small text-muted mb-0 ps-3">
                <li>Include onset & duration</li>
                <li>Rate severity (1–10)</li>
                <li>Meds, conditions, recent travel</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
