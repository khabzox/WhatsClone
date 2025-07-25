import { ChatListHeader } from "@/features/chat-list/components/chat-list-header"
// import { SearchBar } from "@/features/chat-list/components/search-bar" // Will be use in future
import { ChatList } from "@/features/chat-list/components/chat-list"
import { ArchivedBadge } from "@/features/chat-list/components/archived-badge"

interface SidebarProps {
  selectedChatId: string | null
  onChatSelect: (chatId: string) => void
  onMobileMenuClose: () => void
}

export function Sidebar({ selectedChatId, onChatSelect, onMobileMenuClose }: SidebarProps) {
  return (
    <div className="w-80 h-full bg-wa-sidebar flex flex-col border-r border-wa-border">
      <ChatListHeader />
      {/* <SearchBar /> */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* <ArchivedBadge count={4} /> */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <ChatList
            selectedChatId={selectedChatId}
            onChatSelect={(chatId) => {
              onChatSelect(chatId)
              onMobileMenuClose()
            }}
          />
        </div>
      </div>
    </div>
  )
}
