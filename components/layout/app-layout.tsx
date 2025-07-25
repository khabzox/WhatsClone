"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { ChatPanel } from "./chat-panel"
import { MainContainer } from "./main-container"

export function AppLayout() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-wa-background">
      {/* Sidebar */}
      <div
        className={`
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-in-out
        fixed md:relative z-30 w-80 h-full
      `}
      >
        <Sidebar
          selectedChatId={selectedChatId}
          onChatSelect={setSelectedChatId}
          onMobileMenuClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <MainContainer>
          <ChatPanel selectedChatId={selectedChatId} onMobileMenuOpen={() => setIsMobileMenuOpen(true)} />
        </MainContainer>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
