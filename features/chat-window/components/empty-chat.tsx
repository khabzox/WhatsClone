import Image from "next/image";

import { VideoCall } from "@/lib/icons";

import { Lock } from "lucide-react";

export function EmptyChat() {
  return (
    <div className="bg-wa-panel flex flex-1 flex-col items-center justify-center px-8 text-center">
      <Image src={VideoCall} alt="Video call" width={240} height={220} className="mb-4" />

      <h1 className="text-wa-primary mb-2 text-2xl font-semibold tracking-tight md:text-3xl">
        Welcome to your chat
      </h1>
      <p className="text-wa-secondary mx-auto mb-6 max-w-md text-base leading-relaxed md:text-lg">
        Select a conversation or start a new chat to begin messaging. Your messages, calls, and
        media are always private and secure.
      </p>

      <div className="text-wa-muted absolute bottom-5 mt-16 flex items-center gap-2 text-sm">
        <Lock className="h-4 w-4" />
        <span>Your personal messages are end-to-end encrypted</span>
      </div>
    </div>
  );
}
