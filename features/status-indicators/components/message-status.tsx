import { Check, CheckCheck } from "lucide-react"

interface MessageStatusProps {
  status: "sent" | "delivered" | "read"
}

export function MessageStatus({ status }: MessageStatusProps) {
  const iconClass = "w-4 h-4 flex-shrink-0"

  if (status === "sent") {
    return <Check className={`${iconClass} text-white/70`} />
  }

  if (status === "delivered") {
    return <CheckCheck className={`${iconClass} text-white/70`} />
  }

  if (status === "read") {
    return <CheckCheck className={`${iconClass} text-blue-400`} />
  }

  return null
}
