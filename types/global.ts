export interface Contact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
  isGroup?: boolean;
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isOwnMessage: boolean;
  status?: "sent" | "delivered" | "read";
  type: "text" | "image" | "audio" | "document";
  replyTo?: string;
}

export interface Chat {
  id: string;
  contact: Contact;
  lastMessage: {
    content: string;
    timestamp: Date;
    isOwnMessage: boolean;
    status?: "sent" | "delivered" | "read";
  };
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  isTyping?: boolean;
}
