import { ChatHeader } from "./chat-header";
import { MessageArea } from "./message-area";
import { MessageInput } from "./message-input";
import { mockChats } from "@/features/chat-list/lib/mock-data";

interface ChatWindowProps {
  chatId: string;
  onMobileMenuOpen: () => void;
}

export function ChatWindow({ chatId, onMobileMenuOpen }: ChatWindowProps) {
  const chat = mockChats.find(c => c.id === chatId);

  if (!chat) return null;

  return (
    <div className="flex h-full flex-col">
      <ChatHeader contact={chat.contact} onMobileMenuOpen={onMobileMenuOpen} />
      <MessageArea chatId={chatId} />
      <MessageInput />
    </div>
  );
}
