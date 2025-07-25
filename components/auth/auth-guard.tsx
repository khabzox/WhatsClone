'use client'

import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'
import { AuthModal } from './auth-modal'

interface AuthGuardProps {
  readonly children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isSignedIn, isLoaded } = useAuth()
  const [authMode, setAuthMode] = useState<'sign-in' | 'sign-up'>('sign-in')

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-wa-main flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-whatsapp-green border-t-transparent rounded-full animate-spin"></div>
          <div className="text-wa-primary">Loading WhatsApp...</div>
        </div>
      </div>
    )
  }

  // If not signed in, show the modal over a blurred app preview
  if (!isSignedIn) {
    return (
      <div className="relative">
        {/* Blurred app preview in background */}
        <div className="blur-sm pointer-events-none">
          {children}
        </div>
        
        {/* Auth modal overlay */}
        <AuthModal
          isOpen={true}
          mode={authMode}
          onModeChange={setAuthMode}
        />
      </div>
    )
  }

  // User is authenticated, show the full app
  return <>{children}</>
}