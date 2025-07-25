"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { AuthModal } from "./auth-modal";

interface AuthGuardProps {
  readonly children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="bg-wa-main flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="border-whatsapp-green h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
          <div className="text-wa-primary">Loading...</div>
        </div>
      </div>
    );
  }

  // If not signed in, show the modal over a blurred app preview
  if (!isSignedIn) {
    return (
      <div className="relative">
        {/* Blurred app preview in background */}
        <div className="pointer-events-none blur-sm">{children}</div>

        {/* Auth modal overlay */}
        <AuthModal isOpen={true} mode={authMode} onModeChange={setAuthMode} />
      </div>
    );
  }

  // User is authenticated, show the full app
  return <>{children}</>;
}
