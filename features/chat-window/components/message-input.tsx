"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Mic, Send, Plus } from "lucide-react";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      console.log("Sending message:", message);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Handle voice recording logic here
  };

  return (
    <div className="bg-wa-panel border-wa-border flex items-end gap-2 border-t p-4">
      {/* Emoji Picker Button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover mb-1 h-10 w-10 flex-shrink-0 rounded-full"
        title="Emoji"
      >
        <Smile className="h-5 w-5" />
      </Button>

      {/* Attachment Button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-wa-muted hover:text-wa-primary hover:bg-wa-hover mb-1 h-10 w-10 flex-shrink-0 rounded-full"
        title="Attach"
      >
        <Plus className="h-5 w-5 rotate-45" />
      </Button>

      {/* Message Input */}
      <div className="relative flex-1">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
          className="bg-wa-input text-wa-primary placeholder:text-wa-muted focus-visible:ring-wa-green scrollbar-thin max-h-[120px] min-h-[42px] resize-none rounded-lg border-none px-4 py-3 focus-visible:ring-1"
          rows={1}
        />
      </div>

      {/* Send/Mic Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`mb-1 h-10 w-10 flex-shrink-0 rounded-full transition-all duration-200 ${
          message.trim()
            ? "text-wa-green hover:text-wa-green hover:bg-wa-green/10"
            : isRecording
              ? "text-red-500 hover:bg-red-500/10 hover:text-red-600"
              : "text-wa-muted hover:text-wa-primary hover:bg-wa-hover"
        }`}
        onClick={message.trim() ? handleSend : toggleRecording}
        title={message.trim() ? "Send" : isRecording ? "Stop recording" : "Voice message"}
      >
        {message.trim() ? (
          <Send className="h-5 w-5" />
        ) : (
          <Mic className={`h-5 w-5 ${isRecording ? "animate-pulse" : ""}`} />
        )}
      </Button>
    </div>
  );
}
