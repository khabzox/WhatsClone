import type { Message } from "@/types/global"

export const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      content: "Hey! How are you doing today?",
      timestamp: new Date("2024-01-25T10:00:00"),
      isOwnMessage: false,
      status: "read",
      type: "text",
    },
    {
      id: "2",
      content: "I'm doing great, thanks for asking! Just working on some new projects.",
      timestamp: new Date("2024-01-25T10:05:00"),
      isOwnMessage: true,
      status: "read",
      type: "text",
    },
    {
      id: "3",
      content: "That sounds exciting! What kind of projects are you working on?",
      timestamp: new Date("2024-01-25T10:10:00"),
      isOwnMessage: false,
      status: "read",
      type: "text",
    },
    {
      id: "4",
      content:
        "Mainly web development stuff. Building some cool React applications with Next.js. The new App Router is really powerful!",
      timestamp: new Date("2024-01-25T10:15:00"),
      isOwnMessage: true,
      status: "read",
      type: "text",
    },
    {
      id: "5",
      content: "Nice! I've been meaning to learn more about Next.js. Any good resources you'd recommend?",
      timestamp: new Date("2024-01-25T10:20:00"),
      isOwnMessage: false,
      status: "read",
      type: "text",
    },
    {
      id: "6",
      content:
        "Definitely! The official Next.js documentation is excellent. Also, Vercel has some great tutorials on their YouTube channel.",
      timestamp: new Date("2024-01-25T10:25:00"),
      isOwnMessage: true,
      status: "delivered",
      type: "text",
    },
    {
      id: "7",
      content: "Thanks! I'll check those out. By the way, are you free for a call later today?",
      timestamp: new Date("2024-01-25T10:30:00"),
      isOwnMessage: false,
      status: "delivered",
      type: "text",
    },
    {
      id: "8",
      content: "How about 3 PM? We can discuss the project details then.",
      timestamp: new Date("2024-01-25T10:35:00"),
      isOwnMessage: true,
      status: "sent",
      type: "text",
    },
  ],
  "10": [
    {
      id: "1",
      content: "Hey! How are you doing?",
      timestamp: new Date("2024-01-25T15:45:00"),
      isOwnMessage: false,
      status: "read",
      type: "text",
    },
    {
      id: "2",
      content: "I'm good! Just finished a big project. How about you?",
      timestamp: new Date("2024-01-25T15:50:00"),
      isOwnMessage: true,
      status: "read",
      type: "text",
    },
  ],
}
