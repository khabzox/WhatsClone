'use client'

import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users, MessageCircle, MoreVertical } from "lucide-react"

export function ChatListHeader() {
  const { user } = useUser()

  // Get user's initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const userName = user?.fullName || user?.firstName || user?.username || 'User'
  const userInitials = getInitials(userName)

  return (
    <div className="flex items-center justify-between p-4 bg-wa-sidebar border-b border-wa-border">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarImage 
            src={user?.imageUrl} 
            alt={userName}
          />
          <AvatarFallback className="bg-whatsapp-green text-white font-medium text-sm">
            {userInitials}
          </AvatarFallback>
        </Avatar>
        
        {/* Optional: Show user name on hover or always visible */}
        <div className="hidden md:block">
          <p className="text-wa-primary font-medium text-sm truncate max-w-32">
            {userName}
          </p>
          <p className="text-wa-muted text-xs">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
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
        </Button>
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
