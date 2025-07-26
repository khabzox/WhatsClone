import { MessageStatus } from "@/features/status-indicators/components/message-status";
import type { Message } from "@/types/global";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className={`flex ${message.isOwnMessage ? "justify-end" : "justify-start"} mb-[2px]`}>
      <div
        className={`relative max-w-[85%] px-[7px] py-[6px] my-1 ${
          message.isOwnMessage 
            ? "bg-[#005c4b] text-white rounded-[7.5px] rounded-br-[2px]" 
            : "bg-[#202c33] text-[#e9edef] rounded-[7.5px] rounded-bl-[2px]"
        }`}
      >
        <div className={`leading-[19px] break-words whitespace-pre-wrap text-[14.2px] ${
        message.isOwnMessage
        ? "pr-[67px]"
        : "pr-[50px]"
        }`}>
          {message.content}
        </div>

        <div
          className={`absolute right-[6px] bottom-[4px] flex items-center gap-[2px] text-[11px] leading-[11px] ${
            message.isOwnMessage ? "text-[#8696a0]" : "text-[#8696a0]"
          }`}
        >
          <span className="select-none">{formatTime(message.timestamp)}</span>
          {message.isOwnMessage && message.status && (
            <MessageStatus status={message.status} />
          )}
        </div>
      </div>
    </div>
  );
}
