import { useAuth } from "@clerk/nextjs";
import { useMemo } from "react";
import * as db from "@/lib/db";

export function useDatabase() {
  const { getToken } = useAuth();

  // Create a wrapper object that binds getToken to all database functions
  const database = useMemo(() => {
    return {
      // User operations
      getUserById: (userId: string) => db.getUserById(getToken, userId),
      updateUser: (userId: string, updates: Parameters<typeof db.updateUser>[2]) =>  db.updateUser(getToken, userId, updates),
      updateUserOnlineStatus: (userId: string, isOnline: boolean) => db.updateUserOnlineStatus(getToken, userId, isOnline),
      searchUsers: (query: string, currentUserId: string) => db.searchUsers(getToken, query, currentUserId),

      // Conversation operations
      getUserConversations: () => db.getUserConversations(getToken),
      getConversationById: (conversationId: string) => db.getConversationById(getToken, conversationId),
      createDirectConversation: (otherUserId: string) => db.createDirectConversation(getToken, otherUserId),
      createGroupConversation: (name: string, participantIds: string[], createdBy: string) => db.createGroupConversation(getToken, name, participantIds, createdBy),

      // Message operations
      getConversationMessages: (conversationId: string, limit?: number, offset?: number) => db.getConversationMessages(getToken, conversationId, limit, offset),
      sendMessage: (messageData: Parameters<typeof db.sendMessage>[1]) => db.sendMessage(getToken, messageData),
      updateMessage: (messageId: string, content: string) => db.updateMessage(getToken, messageId, content),
      deleteMessage: (messageId: string) => db.deleteMessage(getToken, messageId),

      // Message status operations
      markMessageAsRead: (messageId: string, userId: string) => db.markMessageAsRead(getToken, messageId, userId),
      markConversationAsRead: (conversationId: string, userId: string) => db.markConversationAsRead(getToken, conversationId, userId),

      // Real-time subscriptions
      subscribeToConversationMessages: (conversationId: string, callback: Parameters<typeof db.subscribeToConversationMessages>[2]) => db.subscribeToConversationMessages(getToken, conversationId, callback),
      subscribeToUserConversations: (userId: string, callback: Parameters<typeof db.subscribeToUserConversations>[2]) => db.subscribeToUserConversations(getToken, userId, callback),
      subscribeToUserOnlineStatus: (callback: Parameters<typeof db.subscribeToUserOnlineStatus>[1]) => db.subscribeToUserOnlineStatus(getToken, callback),
      unsubscribeFromChannel: (channel: Parameters<typeof db.unsubscribeFromChannel>[1]) => db.unsubscribeFromChannel(getToken, channel),

      // Utility functions
      getConversationParticipants: (conversationId: string) => db.getConversationParticipants(getToken, conversationId),
      addParticipantToConversation: (conversationId: string, userId: string, role?: 'admin' | 'member') => db.addParticipantToConversation(getToken, conversationId, userId, role),
      removeParticipantFromConversation: (conversationId: string, userId: string) => db.removeParticipantFromConversation(getToken, conversationId, userId),
      updateConversation: (conversationId: string, updates: Parameters<typeof db.updateConversation>[2]) => db.updateConversation(getToken, conversationId, updates),
      deleteConversation: (conversationId: string) => db.deleteConversation(getToken, conversationId),
      getMessageById: (messageId: string) => db.getMessageById(getToken, messageId),
      searchMessages: (conversationId: string, query: string, limit?: number) => db.searchMessages(getToken, conversationId, query, limit),
    };
  }, [getToken]);

  return database;
}