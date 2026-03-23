"use client";

import { useState } from "react";

export default function PremiumSearchChat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! Ask about programs, tuition, admissions, scholarships, or other information from Alberta post-secondary institutions."
    }
  ]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query.trim() || loading) return;

    const userText = query.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText }
    ]);

    setQuery("");
    setLoading(true);

    try {
      const response = await fetch("/api/premium-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: userText })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.details || data?.error || "Search failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer || "I found some official results.",
          results: data.results || []
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, something went wrong: ${error.message}`
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-3 flex items-center gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about a program, tuition, admissions, scholarships..."
          className="flex-1 px-4 py-3 text-base outline-none bg-transparent"
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-900 text-white px-6 py-3 rounded-2xl font-semibold disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-4 space-y-4 min-h-[300px]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-blue-900 text-white"
                  : "bg-gray-50 text-gray-900 border border-gray-200"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wide mb-2 opacity-70">
                {msg.role === "user" ? "You" : "Assistant"}
              </div>

              <p className="text-sm leading-6">{msg.content}</p>

              {msg.results && msg.results.length > 0 && (
                <div className="mt-4 space-y-3">
                  {msg.results.map((result, i) => (
                    <a
                      key={i}
                      href={result.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition"
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

                      {result.sourceType === "duckduckgo-official" && (
                        <div className="text-xs text-green-700 font-semibold mt-2">
                          Official institution website
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}