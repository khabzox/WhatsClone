export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string; // Clerk user ID
          email: string;
          first_name: string | null;
          last_name: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
          last_sign_in_at: string | null;
          email_verified: boolean;
          // New fields for chat functionality
          username: string;
          display_name: string | null;
          bio: string | null;
          phone: string | null;
          is_online: boolean;
          last_seen: string;
        };
        Insert: {
          id: string; // Clerk user ID
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
          last_sign_in_at?: string | null;
          email_verified?: boolean;
          // New fields for chat functionality
          username: string;
          display_name?: string | null;
          bio?: string | null;
          phone?: string | null;
          is_online?: boolean;
          last_seen?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
          last_sign_in_at?: string | null;
          email_verified?: boolean;
          // New fields for chat functionality
          username?: string;
          display_name?: string | null;
          bio?: string | null;
          phone?: string | null;
          is_online?: boolean;
          last_seen?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          name: string | null;
          description: string | null;
          avatar_url: string | null;
          is_group: boolean;
          created_by: string | null; // Clerk user ID
          created_at: string;
          updated_at: string;
          last_message_at: string;
        };
        Insert: {
          id?: string;
          name?: string | null;
          description?: string | null;
          avatar_url?: string | null;
          is_group?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
          last_message_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          description?: string | null;
          avatar_url?: string | null;
          is_group?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
          last_message_at?: string;
        };
      };
      participants: {
        Row: {
          id: string;
          conversation_id: string;
          user_id: string; // Clerk user ID
          role: string;
          joined_at: string;
          is_muted: boolean;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          user_id: string; // Clerk user ID
          role?: string;
          joined_at?: string;
          is_muted?: boolean;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          user_id?: string;
          role?: string;
          joined_at?: string;
          is_muted?: boolean;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string; // Clerk user ID
          content: string | null;
          message_type: string;
          media_url: string | null;
          media_type: string | null;
          file_name: string | null;
          file_size: number | null;
          reply_to: string | null;
          is_edited: boolean;
          is_deleted: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string; // Clerk user ID
          content?: string | null;
          message_type?: string;
          media_url?: string | null;
          media_type?: string | null;
          file_name?: string | null;
          file_size?: number | null;
          reply_to?: string | null;
          is_edited?: boolean;
          is_deleted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_id?: string;
          content?: string | null;
          message_type?: string;
          media_url?: string | null;
          media_type?: string | null;
          file_name?: string | null;
          file_size?: number | null;
          reply_to?: string | null;
          is_edited?: boolean;
          is_deleted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      message_status: {
        Row: {
          id: string;
          message_id: string;
          user_id: string; // Clerk user ID
          status: string;
          timestamp: string;
        };
        Insert: {
          id?: string;
          message_id: string;
          user_id: string; // Clerk user ID
          status?: string;
          timestamp?: string;
        };
        Update: {
          id?: string;
          message_id?: string;
          user_id?: string;
          status?: string;
          timestamp?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_direct_conversation: {
        Args: {
          other_user_id: string;
        };
        Returns: string;
      };
      get_user_conversations: {
        Args: Record<PropertyKey, never>;
        Returns: {
          conversation_id: string;
          conversation_name: string | null;
          conversation_avatar: string | null;
          is_group: boolean;
          last_message: string | null;
          last_message_time: string;
          unread_count: number;
          other_user_name: string | null;
          other_user_avatar: string | null;
          other_user_online: boolean | null;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Custom types for your app
export type User = Database["public"]["Tables"]["users"]["Row"];
export type NewUser = Database["public"]["Tables"]["users"]["Insert"];
export type UpdateUser = Database["public"]["Tables"]["users"]["Update"];

export type Conversation = Database["public"]["Tables"]["conversations"]["Row"];
export type NewConversation = Database["public"]["Tables"]["conversations"]["Insert"];
export type UpdateConversation = Database["public"]["Tables"]["conversations"]["Update"];

export type Participant = Database["public"]["Tables"]["participants"]["Row"];
export type NewParticipant = Database["public"]["Tables"]["participants"]["Insert"];

export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type NewMessage = Database["public"]["Tables"]["messages"]["Insert"];
export type UpdateMessage = Database["public"]["Tables"]["messages"]["Update"];

export type MessageStatus = Database["public"]["Tables"]["message_status"]["Row"];
export type NewMessageStatus = Database["public"]["Tables"]["message_status"]["Insert"];

export type ConversationWithDetails =
  Database["public"]["Functions"]["get_user_conversations"]["Returns"][0];

// Extended types with relations
export interface MessageWithSender extends Message {
  sender: User;
  reply_to_message?: Message | null;
  status?: MessageStatus[];
}

export interface ConversationWithParticipants extends Conversation {
  participants: (Participant & { user: User })[];
  messages?: MessageWithSender[];
  unread_count?: number;
}

export type MessageType = "text" | "image" | "video" | "audio" | "file" | "system";
export type MessageStatusType = "sent" | "delivered" | "read";
export type ParticipantRole = "admin" | "member";
