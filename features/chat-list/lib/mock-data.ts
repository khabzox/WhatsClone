import type { Chat } from "../types";

export const mockChats: Chat[] = [
  {
    id: "1",
    contact: {
      id: "1",
      name: "User Alpha",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    lastMessage: {
      content: "📷 Sent an image",
      timestamp: new Date("2024-01-25T16:00:00"),
      isOwnMessage: true,
      status: "read",
    },
    unreadCount: 0,
    isPinned: true,
    isArchived: false,
  },
  {
    id: "chat2",
    contact: {
      id: "contact2",
      name: "+000 000 0000",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
    },
    lastMessage: {
      content: "✉️ Sent a message",
      timestamp: new Date("2025-07-25T09:25:00"),
      isOwnMessage: true,
      status: "delivered",
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
  },
  {
    id: "chat3",
    contact: {
      id: "contact3",
      name: "Anon Group A",
      avatar: "/placeholder.svg?height=40&width=40",
      isGroup: true,
      isOnline: false,
    },
    lastMessage: {
      content: "~ member123: 👍",
      timestamp: new Date("2025-07-24T18:30:00"),
      isOwnMessage: false,
    },
    unreadCount: 2,
    isPinned: true,
    isArchived: false,
  },
  {
    id: "chat4",
    contact: {
      id: "contact4",
      name: "Private User",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
    },
    lastMessage: {
      content: "📷 Sent an image",
      timestamp: new Date("2025-07-23T14:18:00"),
      isOwnMessage: false,
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
  },
  {
    id: "chat5",
    contact: {
      id: "contact5",
      name: "+111 222 3333",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
      lastSeen: "Yesterday",
    },
    lastMessage: {
      content: "👍 Got it",
      timestamp: new Date("2025-07-22T20:10:00"),
      isOwnMessage: true,
      status: "read",
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: true,
  },
];
