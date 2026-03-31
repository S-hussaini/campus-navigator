"use client";

import { useEffect, useRef, useState } from "react";

export default function SearchPopupWidget({
  isOpen,
  onClose,
  initialQuery = "",
}) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! Ask about programs, tuition, admissions, scholarships, or other information from Alberta post-secondary institutions."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const lastAutoQueryRef = useRef("");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (!initialQuery.trim()) return;
    if (lastAutoQueryRef.current === initialQuery.trim()) return;

    lastAutoQueryRef.current = initialQuery.trim();
    handleSend(initialQuery.trim());
  }, [isOpen, initialQuery]);

  async function handleSend(customText) {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/premium-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: text })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.details || data?.error || "Search failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer || "I found some official results.",
          results: data.results || []
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Sorry, something went wrong: ${error.message}`
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSend();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end justify-end bg-black/30 p-6">
      <div className="w-[500px] h-[700px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
        {/* Header */}
        <div className="bg-[#15385E] p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#4BAE53] rounded-full animate-pulse" />
            <span className="font-bold tracking-tight text-sm uppercase">
              Search Results
            </span>
          </div>

          <button
            onClick={onClose}
            className="hover:rotate-90 transition-transform"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-[#4BAE53] text-white"
                    : "bg-[#15385E] text-white"
                }`}
              >
                {msg.role === "user" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A9 9 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                )}
              </div>

              <div
                className={`max-w-[85%] p-4 rounded-2xl shadow-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#15385E] text-white rounded-br-none"
                    : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-6 whitespace-pre-line">{msg.text}</p>

                {msg.results && msg.results.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {msg.results.map((result, idx) => (
                      <a
                        key={idx}
                        href={result.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:shadow-md transition"
                      >
                        <div className="text-sm font-semibold text-gray-900">
                          {result.title}
                        </div>

                        <div className="text-xs text-blue-700 font-medium mt-1">
                          {result.institution}
                        </div>

                        <div className="text-sm text-gray-600 mt-2">
                          {result.content}
                        </div>

                        <div className="text-xs text-gray-400 mt-2 break-all">
                          {result.url}
                        </div>

                        {result.sourceType === "direct-official" && (
                          <div className="text-xs text-green-700 font-semibold mt-2">
                            Official institution homepage
                          </div>
                        )}

                        {result.sourceType === "duckduckgo-official" && (
                          <div className="text-xs text-green-700 font-semibold mt-2">
                            Official institution website
                          </div>
                        )}

                        {result.sourceType === "fallback-official" && (
                          <div className="text-xs text-amber-700 font-semibold mt-2">
                            Official institution website fallback
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-[#15385E] text-white flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 text-sm text-gray-500">
                Searching official institution websites...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white border-t border-gray-100 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a follow-up question..."
            className="flex-grow bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#4BAE53] outline-none"
          />
          <button
            type="submit"
            className="bg-[#4BAE53] text-white p-2 rounded-full hover:scale-105 transition-transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}