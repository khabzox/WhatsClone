import { ChatWindow } from "@/features/chat-window/components/chat-window"
import { EmptyChat } from "@/features/chat-window/components/empty-chat"

interface ChatPanelProps {
  selectedChatId: string | null
  onMobileMenuOpen: () => void
}

export function ChatPanel({ selectedChatId, onMobileMenuOpen }: ChatPanelProps) {
  if (!selectedChatId) {
    return <EmptyChat />
  }

  return <ChatWindow chatId={selectedChatId} onMobileMenuOpen={onMobileMenuOpen} />
}
