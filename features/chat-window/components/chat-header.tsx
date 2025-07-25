"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Phone, Video, MoreVertical, Users } from "lucide-react"
import type { Contact } from "@/types/global"

interface ChatHeaderProps {
  contact: Contact
  onMobileMenuOpen: () => void
}

export function ChatHeader({ contact, onMobileMenuOpen }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-wa-panel border-b border-wa-border">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-wa-muted hover:text-wa-primary hover:bg-wa-hover"
        onClick={onMobileMenuOpen}
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <Avatar className="w-10 h-10">
        <AvatarImage src={contact.avatar || "/placeholder.svg"} />
        <AvatarFallback>
          {contact.isGroup ? <Users className="w-5 h-5 text-wa-muted" /> : contact.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <h2 className="font-medium text-wa-primary truncate">{contact.name}</h2>
        <p className="text-sm text-wa-secondary">
          {contact.isOnline ? "online" : contact.lastSeen ? `last seen ${contact.lastSeen}` : "offline"}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover">
          <Search className="w-5 h-5" />
        </Button>
        {/* <Button variant="ghost" size="icon" className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover">
          <Video className="w-5 h-5" />
        </Button> */}
        <Button variant="ghost" size="icon" className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
