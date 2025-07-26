"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";
import { mockMessages } from "../lib/mock-messages";
import { TypingDots } from "@/features/typing-indicator/components/typing-dots";
import { mockChats } from "@/features/chat-list/lib/mock-data";

interface MessageAreaProps {
  chatId: string;
}

export function MessageArea({ chatId }: MessageAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = mockMessages[chatId] || [];
  const chat = mockChats.find(c => c.id === chatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="scrollbar-thin relative flex-1 space-y-1 overflow-y-auto p-4"
      style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(0, 168, 132, 0.02) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(0, 168, 132, 0.02) 0%, transparent 50%)
        `,
        backgroundColor: "#0b141a",
      }}
    >
      {/* Chat background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        // style={{
        //   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        // }}
      />

      <div className="relative z-10">
        {messages.map((message, index) => (
          <div key={message.id} className={index > 0 ? "mt-1" : ""}>
            <MessageBubble message={message} />
          </div>
        ))}

        {/* Typing indicator */}
        {chat?.isTyping && (
          <div className="mt-2 flex justify-start">
            <div className="bg-message-bubble text-wa-primary relative max-w-[65%] rounded-lg px-3 py-2">
              <div className="border-r-message-bubble absolute top-0 left-0 h-0 w-0 -translate-x-1 border-t-8 border-r-8 border-t-transparent" />
              <div className="flex items-center gap-2">
                <TypingDots />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
