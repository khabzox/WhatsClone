import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users, MessageCircle, MoreVertical } from "lucide-react"

export function ChatListHeader() {
  return (
    <div className="flex items-center justify-between p-4 bg-wa-sidebar">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback className="bg-wa-green text-white font-medium">ME</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex items-center gap-1">
        {/* <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 text-wa-muted hover:text-wa-primary hover:bg-wa-hover rounded-full transition-all duration-200"
          title="Communities"
        >
          <Users className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 text-wa-muted hover:text-wa-primary hover:bg-wa-hover rounded-full transition-all duration-200"
          title="New chat"
        >
          <MessageCircle className="w-5 h-5" />
        </Button> */}
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 text-wa-muted hover:text-wa-primary hover:bg-wa-hover rounded-full transition-all duration-200"
          title="Menu"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
