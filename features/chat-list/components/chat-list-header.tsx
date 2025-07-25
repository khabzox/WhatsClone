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

  const userName =
    user?.fullName || user?.firstName || user?.username || "User";

  return (
    <div className="flex items-center justify-between p-4 bg-wa-sidebar border-b border-wa-border">
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
          <p className="text-wa-primary font-medium text-sm truncate max-w-[200px] overflow-hidden">
            {userName}
          </p>
          <p className="text-wa-muted text-xs truncate max-w-[200px] overflow-hidden">
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
          className="w-10 h-10 text-wa-muted hover:text-wa-primary hover:bg-wa-hover rounded-full transition-all duration-200 cursor-pointer"
          title="Menu"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
