"use client";

import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";
import { mockMessages } from "../lib/mock-messages";
import { TypingDots } from "@/features/typing-indicator/components/typing-dots";
import { mockChats } from "@/features/chat-list/lib/mock-data";
import { ChatWindowBg1 } from "@/lib/icons";

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
      style={{ backgroundColor: "#111b21" }}
    >
      {/* Background pattern with very subtle visibility */}
      <div
        className="absolute inset-0 z-0 bg-auto bg-center bg-repeat opacity-20 mix-blend-screen"
        style={{
          backgroundImage: `url(${typeof ChatWindowBg1 === "string" ? ChatWindowBg1 : ChatWindowBg1.src})`,
          filter: "brightness(1.2) contrast(1.2)",
        }}
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
