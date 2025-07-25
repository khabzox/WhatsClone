"use client";

import { mockChats } from "../lib/mock-data";
import { ChatItem } from "./chat-item";

interface ChatListProps {
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

export function ChatList({ selectedChatId, onChatSelect }: ChatListProps) {
  return (
    <div className="scrollbar-thin flex-1 overflow-y-auto">
      {mockChats.map(chat => (
        <ChatItem
          key={chat.id}
          chat={chat}
          isSelected={selectedChatId === chat.id}
          onClick={() => onChatSelect(chat.id)}
        />
      ))}
    </div>
  );
}
