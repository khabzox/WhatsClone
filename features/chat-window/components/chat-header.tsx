"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Phone, Video, MoreVertical, Users } from "lucide-react";
import type { Contact } from "@/types/global";

interface ChatHeaderProps {
  contact: Contact;
  onMobileMenuOpen: () => void;
}

export function ChatHeader({ contact, onMobileMenuOpen }: ChatHeaderProps) {
  return (
    <div className="bg-wa-panel border-wa-border flex items-center gap-3 border-b p-4">
      <Button
        variant="ghost"
        size="icon"
        className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover md:hidden"
        onClick={onMobileMenuOpen}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Avatar className="h-10 w-10">
        <AvatarImage src={contact.avatar || "/placeholder.svg"} />
        <AvatarFallback>
          {contact.isGroup ? (
            <Users className="text-wa-muted h-5 w-5" />
          ) : (
            contact.name.slice(0, 2).toUpperCase()
          )}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <h2 className="text-wa-primary truncate font-medium">{contact.name}</h2>
        <p className="text-wa-secondary text-sm">
          {contact.isOnline
            ? "online"
            : contact.lastSeen
              ? `last seen ${contact.lastSeen}`
              : "offline"}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover"
        >
          <Search className="h-5 w-5" />
        </Button>
        {/* <Button variant="ghost" size="icon" className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover">
          <Video className="w-5 h-5" />
        </Button> */}
        <Button
          variant="ghost"
          size="icon"
          className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
