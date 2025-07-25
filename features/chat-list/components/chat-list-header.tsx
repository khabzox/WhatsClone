"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Users, // will be uncommit in future
  MessageCircle, // will be uncommit in future
  MoreVertical,
} from "lucide-react";

export function ChatListHeader() {
  const { user } = useUser();

  const userName = user?.fullName || user?.firstName || user?.username || "User";

  return (
    <div className="bg-wa-sidebar border-wa-border flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-3">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "2rem",
                height: "2rem",
              },
            },
          }}
        />

        {/* Optional: Show user name on hover or always visible */}
        <div className="hidden md:block">
          <p className="text-wa-primary max-w-[200px] truncate overflow-hidden text-sm font-medium">
            {userName}
          </p>
          <p className="text-wa-muted max-w-[200px] truncate overflow-hidden text-xs">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {/* will be uncommit in future */}
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
          className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover h-10 w-10 cursor-pointer rounded-full transition-all duration-200"
          title="Menu"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
