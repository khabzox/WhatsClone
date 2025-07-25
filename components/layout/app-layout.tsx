"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { ChatPanel } from "./chat-panel";
import { MainContainer } from "./main-container";

export function AppLayout() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-wa-background flex h-screen">
      {/* Sidebar */}
      <div
        className={` ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} fixed z-30 h-full w-80 transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <Sidebar
          selectedChatId={selectedChatId}
          onChatSelect={setSelectedChatId}
          onMobileMenuClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <MainContainer>
          <ChatPanel
            selectedChatId={selectedChatId}
            onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          />
        </MainContainer>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-20 bg-black md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
