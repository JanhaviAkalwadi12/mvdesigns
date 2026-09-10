'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'Welcome to MV Designers. How can we assist with your structural steel detailing or 3D modeling requirements?',
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    'Our Services',
    'Request a Quote',
    'Software & Standards',
    'Working Hours',
  ]);

  const bodyRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat body on new message
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, sending]);

  const handleSend = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || sending) return;

    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: trimmed }]);
    setSending(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: trimmed }),
      });
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: data.reply || data.message || 'Please email contact@mvdesigners.com for detailed project information.',
        },
      ]);

      if (data.suggestions && Array.isArray(data.suggestions) && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'I could not connect just now. Please email our engineering team directly at contact@mvdesigners.com.',
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="chat-wrap">
      <button
        className="chat"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close MV Assistant' : 'Open MV Assistant'}
        aria-expanded={open}
        type="button"
      >
        <span className="chat-pulse-ring" aria-hidden="true" />
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <section className="chatbox" aria-label="MV Assistant Window">
          <div className="chatbox-header">
            <b>
              <i /> MV ASSISTANT
            </b>
            <span>STRUCTURAL TECHNICAL SUPPORT</span>
          </div>

          <div ref={bodyRef} className="chatbox-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === 'user' ? 'chat-user' : 'chat-bot'}
              >
                {msg.text}
              </div>
            ))}

            {sending && (
              <div className="typing-indicator" aria-label="Assistant thinking">
                <span />
                <span />
                <span />
              </div>
            )}

            <div className="chat-options">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSend(suggestion)}
                  disabled={sending}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="chat-input-field">
              Ask MV Assistant
            </label>
            <input
              id="chat-input-field"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about detailing, files, quote…"
              disabled={sending}
              autoComplete="off"
            />
            <button type="submit" aria-label="Send query" disabled={sending || !input.trim()}>
              <Send size={15} />
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
