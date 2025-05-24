"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { aiSuggestion } from "@/services/medicine";

export default function AiSuggestion() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await aiSuggestion(input);


      if (res?.success) {
        setMessages((prev) => [...prev, { text: res.data, isUser: false }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "No response from AI.", isUser: false },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong.", isUser: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 border rounded-2xl shadow bg-white flex flex-col">
      <div className="flex-grow h-80 overflow-y-auto space-y-2 mb-4 p-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-xl max-w-[70%] ${
              msg.isUser ? "bg-blue-200 ml-auto text-right" : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about a medicine..."
          disabled={loading}
          autoFocus
        />
        <Button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
