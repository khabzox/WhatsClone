"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Smile, Mic, Send, Plus } from "lucide-react"

export function MessageInput() {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      console.log("Sending message:", message)
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Handle voice recording logic here
  }

  return (
    <div className="flex items-end gap-2 p-4 bg-wa-panel border-t border-wa-border">
      {/* Emoji Picker Button */}
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 text-wa-muted hover:text-wa-primary hover:bg-wa-hover rounded-full flex-shrink-0 mb-1"
        title="Emoji"
      >
        <Smile className="w-5 h-5" />
      </Button>

      {/* Attachment Button */}
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 text-wa-muted hover:text-wa-primary hover:bg-wa-hover rounded-full flex-shrink-0 mb-1"
        title="Attach"
      >
        <Plus className="w-5 h-5 rotate-45" />
      </Button>

      {/* Message Input */}
      <div className="flex-1 relative">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
          className="min-h-[42px] max-h-[120px] py-3 px-4 bg-wa-input border-none text-wa-primary placeholder:text-wa-muted focus-visible:ring-1 focus-visible:ring-wa-green rounded-lg resize-none scrollbar-thin"
          rows={1}
        />
      </div>

      {/* Send/Mic Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`w-10 h-10 rounded-full flex-shrink-0 mb-1 transition-all duration-200 ${
          message.trim()
            ? "text-wa-green hover:text-wa-green hover:bg-wa-green/10"
            : isRecording
              ? "text-red-500 hover:text-red-600 hover:bg-red-500/10"
              : "text-wa-muted hover:text-wa-primary hover:bg-wa-hover"
        }`}
        onClick={message.trim() ? handleSend : toggleRecording}
        title={message.trim() ? "Send" : isRecording ? "Stop recording" : "Voice message"}
      >
        {message.trim() ? (
          <Send className="w-5 h-5" />
        ) : (
          <Mic className={`w-5 h-5 ${isRecording ? "animate-pulse" : ""}`} />
        )}
      </Button>
    </div>
  )
}
