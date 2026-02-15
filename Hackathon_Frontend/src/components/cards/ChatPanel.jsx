import { useState } from 'react';
import { API_BASE } from '../../api/config';

export function ChatPanel({ sensorData, outdoor }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      const context = sensorData
        ? {
            indoor: { temperature: sensorData.temperature, humidity: sensorData.humidity },
            outdoor: outdoor || null,
          }
        : undefined;
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ message: text, context }),
      });
      if (!res.ok) throw new Error('Failed to get response');
      const data = await res.json();
      const reply = data.reply;
      setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="card-animate bg-parchment rounded-xl border-l-4 border-l-fern shadow-sm shadow-charcoal/5 overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-sage/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-fern"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s1 3 1 6.5a7 7 0 0 1-7 10Z" />
            <path d="M12 20v-8" />
          </svg>
          <span className="font-serif font-semibold text-charcoal text-sm tracking-tight">
            Ask GreenSense
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-warm-gray transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Collapsible body */}
      {open && (
        <div className="border-t border-sage/20">
          {/* Messages */}
          <div className="px-6 py-4 space-y-3 max-h-72 overflow-y-auto">
            {messages.length === 0 && (
              <p className="text-xs text-warm-gray text-center py-4">
                Ask about improving your environmental footprint.
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-fern/10 text-charcoal'
                      : 'bg-sage/15 text-charcoal'
                  }`}
                >
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-warm-gray mb-0.5">
                    {msg.role === 'user' ? 'You' : 'GreenSense'}
                  </span>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-sage/15 rounded-lg px-3 py-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-fern animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-fern animate-pulse [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-fern animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-6 pb-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              disabled={loading}
              className="flex-1 rounded-lg border border-sage/40 bg-cream px-3 py-2 text-sm text-charcoal placeholder:text-warm-gray/60 outline-none focus:border-fern focus:ring-1 focus:ring-fern/30 disabled:opacity-50 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="rounded-lg bg-fern px-4 py-2 text-sm font-medium text-parchment hover:bg-fern/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
