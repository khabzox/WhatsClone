import { ChatListHeader } from "@/features/chat-list/components/chat-list-header";
// import { SearchBar } from "@/features/chat-list/components/search-bar" // Will be use in future
import { ChatList } from "@/features/chat-list/components/chat-list";
import { ArchivedBadge } from "@/features/chat-list/components/archived-badge";

interface SidebarProps {
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onMobileMenuClose: () => void;
}

export function Sidebar({ selectedChatId, onChatSelect, onMobileMenuClose }: SidebarProps) {
  return (
    <div className="bg-wa-sidebar border-wa-border flex h-full w-80 flex-col border-r">
      <ChatListHeader />
      {/* <SearchBar /> */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* <ArchivedBadge count={4} /> */}
        <div className="scrollbar-thin flex-1 overflow-y-auto">
          <ChatList
            selectedChatId={selectedChatId}
            onChatSelect={chatId => {
              onChatSelect(chatId);
              onMobileMenuClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
