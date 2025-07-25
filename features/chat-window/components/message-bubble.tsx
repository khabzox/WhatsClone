import { MessageStatus } from "@/features/status-indicators/components/message-status"
import type { Message } from "@/types/global"

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className={`flex py-2  ${message.isOwnMessage ? "justify-end" : "justify-start"} mb-1`}>
      <div
        className={`
          max-w-[65%] rounded-lg px-3 py-2 relative shadow-sm
          ${message.isOwnMessage ? "bg-message-bubble-own text-white" : "bg-message-bubble text-wa-primary"}
        `}
      >
        {/* Message tail */}
        <div
          className={`
            absolute top-0 w-0 h-0
            ${
              message.isOwnMessage
                ? "right-0 translate-x-1 border-l-8 border-l-message-bubble-own border-t-8 border-t-transparent"
                : "left-0 -translate-x-1 border-r-8 border-r-message-bubble border-t-8 border-t-transparent"
            }
          `}
        />

        <div className="break-words whitespace-pre-wrap leading-5 pr-12">{message.content}</div>

        <div
          className={`flex items-center justify-end gap-1 mt-1 text-xs absolute bottom-2 right-3 ${
            message.isOwnMessage ? "text-white/70" : "text-wa-muted"
          }`}
        >
          <span className="select-none">{formatTime(message.timestamp)}</span>
          {message.isOwnMessage && message.status && (
            <div className="ml-1">
              <MessageStatus status={message.status} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
