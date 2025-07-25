"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { OnlineStatus } from "@/features/status-indicators/components/online-status";
import { MessageStatus } from "@/features/status-indicators/components/message-status";
import { UnreadBadge } from "@/features/status-indicators/components/unread-badge";
import { TypingDots } from "@/features/typing-indicator/components/typing-dots";
import type { Chat } from "../types";
import { Pin, Users, Volume2 } from "lucide-react";

interface ChatItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

export function ChatItem({ chat, isSelected, onClick }: ChatItemProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return date.toLocaleDateString("en-US", { weekday: "long" });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div
      className={`relative flex cursor-pointer items-center gap-3 px-4 py-3 transition-all duration-200 ${
        isSelected ? "bg-wa-panel border-wa-green border-r-4" : "hover:bg-wa-hover"
      } `}
      onClick={onClick}
    >
      <div className="relative flex-shrink-0">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={chat.contact.avatar || "/placeholder.svg?height=48&width=48"}
            alt={chat.contact.name}
            className="object-cover"
            onError={e => {
              // Hide broken image, let fallback show
              e.currentTarget.style.display = "none";
            }}
          />
          <AvatarFallback className="bg-wa-muted text-wa-sidebar text-sm font-medium">
            {chat.contact.isGroup ? (
              <Users className="text-wa-sidebar h-6 w-6" />
            ) : (
              chat.contact.name.slice(0, 2).toUpperCase()
            )}
          </AvatarFallback>
        </Avatar>
        {!chat.contact.isGroup && <OnlineStatus isOnline={chat.contact.isOnline} />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <h3 className="text-wa-primary truncate text-[15px] font-medium">
              {chat.contact.name}
            </h3>
            {chat.isPinned && <Pin className="text-wa-muted h-3 w-3 flex-shrink-0 rotate-45" />}
          </div>
          <div className="ml-2 flex flex-shrink-0 items-center gap-1">
            <span className="text-wa-muted text-xs">{formatTime(chat.lastMessage.timestamp)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-1">
            {chat.lastMessage.isOwnMessage && chat.lastMessage.status && (
              <MessageStatus status={chat.lastMessage.status} />
            )}
            <div className="text-wa-secondary min-w-0 flex-1 text-sm">
              {chat.isTyping ? (
                <div className="flex items-center gap-2">
                  <span className="text-wa-green text-sm">typing</span>
                  <TypingDots />
                </div>
              ) : (
                <div className="line-clamp-2 leading-5">{chat.lastMessage.content}</div>
              )}
            </div>
          </div>

          <div className="ml-2 flex flex-shrink-0 items-center gap-1">
            {chat.unreadCount > 0 && <UnreadBadge count={chat.unreadCount} />}
            {chat.contact.isGroup && <Volume2 className="text-wa-muted h-3 w-3" />}
          </div>
        </div>
      </div>
    </div>
  );
}
