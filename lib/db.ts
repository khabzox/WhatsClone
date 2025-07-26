import { createClerkSupabaseClient } from './supabase'
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { 
  User, 
  NewUser, 
  UpdateUser, 
  Conversation, 
  NewConversation,
  Message, 
  NewMessage,
  ConversationWithDetails,
  MessageWithSender,
  NewMessageStatus
} from '@/types/database'

// Create supabase client helper
const createSupabaseClient = (getToken: () => Promise<string | null>) => {
  return createClerkSupabaseClient(getToken)
}

// ====== USER OPERATIONS ======

export const getUserById = async (
  getToken: () => Promise<string | null>,
  userId: string
): Promise<User | null> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching user:', error)
    return null
  }
  
  return data
}

export const updateUser = async (
  getToken: () => Promise<string | null>,
  userId: string, 
  updates: UpdateUser
): Promise<User | null> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating user:', error)
    return null
  }
  
  return data
}

export const updateUserOnlineStatus = async (
  getToken: () => Promise<string | null>,
  userId: string, 
  isOnline: boolean
): Promise<void> => {
  const supabase = createSupabaseClient(getToken)
  await supabase
    .from('users')
    .update({ 
      is_online: isOnline,
      last_seen: new Date().toISOString()
    })
    .eq('id', userId)
}

export const searchUsers = async (
  getToken: () => Promise<string | null>,
  query: string, 
  currentUserId: string
): Promise<User[]> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .or(`username.ilike.%${query}%,display_name.ilike.%${query}%,email.ilike.%${query}%,first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
    .neq('id', currentUserId)
    .limit(10)
  
  if (error) {
    console.error('Error searching users:', error)
    return []
  }
  
  return data || []
}

// ====== CONVERSATION OPERATIONS ======

export const getUserConversations = async (
  getToken: () => Promise<string | null>
): Promise<ConversationWithDetails[]> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .rpc('get_user_conversations')
  
  if (error) {
    console.error('Error fetching conversations:', error)
    return []
  }
  
  return data || []
}

export const getConversationById = async (
  getToken: () => Promise<string | null>,
  conversationId: string
): Promise<Conversation | null> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      *,
      participants (
        *,
        user:users (*)
      )
    `)
    .eq('id', conversationId)
    .single()
  
  if (error) {
    console.error('Error fetching conversation:', error)
    return null
  }
  
  return data
}

export const createDirectConversation = async (
  getToken: () => Promise<string | null>,
  otherUserId: string
): Promise<string | null> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .rpc('create_direct_conversation', { other_user_id: otherUserId })
  
  if (error) {
    console.error('Error creating direct conversation:', error)
    return null
  }
  
  return data
}

export const createGroupConversation = async (
  getToken: () => Promise<string | null>,
  name: string, 
  participantIds: string[], 
  createdBy: string
): Promise<string | null> => {
  const supabase = createSupabaseClient(getToken)
  
  // Create conversation
  const { data: conversation, error: convError } = await supabase
    .from('conversations')
    .insert({
      name,
      is_group: true,
      created_by: createdBy
    })
    .select()
    .single()
  
  if (convError) {
    console.error('Error creating group conversation:', convError)
    return null
  }

  // Add participants
  const participants = participantIds.map(userId => ({
    conversation_id: conversation.id,
    user_id: userId,
    role: userId === createdBy ? 'admin' : 'member'
  }))

  const { error: participantsError } = await supabase
    .from('participants')
    .insert(participants)
  
  if (participantsError) {
    console.error('Error adding participants:', participantsError)
    return null
  }
  
  return conversation.id
}

// ====== MESSAGE OPERATIONS ======

export const getConversationMessages = async (
  getToken: () => Promise<string | null>,
  conversationId: string, 
  limit: number = 50,
  offset: number = 0
): Promise<MessageWithSender[]> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:users (*),
      reply_to_message:messages (
        *,
        sender:users (*)
      )
    `)
    .eq('conversation_id', conversationId)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  
  if (error) {
    console.error('Error fetching messages:', error)
    return []
  }
  
  return (data || []).reverse() // Reverse to show oldest first
}

export const sendMessage = async (
  getToken: () => Promise<string | null>,
  messageData: NewMessage
): Promise<Message | null> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .from('messages')
    .insert(messageData)
    .select()
    .single()
  
  if (error) {
    console.error('Error sending message:', error)
    return null
  }
  
  return data
}

export const updateMessage = async (
  getToken: () => Promise<string | null>,
  messageId: string, 
  content: string
): Promise<Message | null> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .from('messages')
    .update({ 
      content,
      is_edited: true,
      updated_at: new Date().toISOString()
    })
    .eq('id', messageId)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating message:', error)
    return null
  }
  
  return data
}

export const deleteMessage = async (
  getToken: () => Promise<string | null>,
  messageId: string
): Promise<boolean> => {
  const supabase = createSupabaseClient(getToken)
  const { error } = await supabase
    .from('messages')
    .update({ 
      is_deleted: true,
      content: null,
      updated_at: new Date().toISOString()
    })
    .eq('id', messageId)
  
  if (error) {
    console.error('Error deleting message:', error)
    return false
  }
  
  return true
}

// ====== MESSAGE STATUS OPERATIONS ======

export const markMessageAsRead = async (
  getToken: () => Promise<string | null>,
  messageId: string, 
  userId: string
): Promise<void> => {
  const supabase = createSupabaseClient(getToken)
  const statusData: NewMessageStatus = {
    message_id: messageId,
    user_id: userId,
    status: 'read'
  }

  await supabase
    .from('message_status')
    .upsert(statusData, { 
      onConflict: 'message_id,user_id' 
    })
}

export const markConversationAsRead = async (
  getToken: () => Promise<string | null>,
  conversationId: string, 
  userId: string
): Promise<void> => {
  const supabase = createSupabaseClient(getToken)
  
  // Get all unread messages in the conversation
  const { data: messages } = await supabase
    .from('messages')
    .select('id')
    .eq('conversation_id', conversationId)
    .neq('sender_id', userId)
    .eq('is_deleted', false)

  if (!messages?.length) return

  // Mark all as read
  const statusUpdates = messages.map(msg => ({
    message_id: msg.id,
    user_id: userId,
    status: 'read' as const
  }))

  await supabase
    .from('message_status')
    .upsert(statusUpdates, { 
      onConflict: 'message_id,user_id' 
    })
}

// ====== REAL-TIME SUBSCRIPTIONS ======

export const subscribeToConversationMessages = (
  getToken: () => Promise<string | null>,
  conversationId: string,
  callback: (payload: RealtimePostgresChangesPayload<Message>) => void
): RealtimeChannel => {
  const supabase = createSupabaseClient(getToken)
  return supabase
    .channel(`messages:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      },
      callback
    )
    .subscribe()
}

export const subscribeToUserConversations = (
  getToken: () => Promise<string | null>,
  userId: string,
  callback: (payload: RealtimePostgresChangesPayload<Conversation>) => void
): RealtimeChannel => {
  const supabase = createSupabaseClient(getToken)
  return supabase
    .channel(`user_conversations:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'conversations',
      },
      callback
    )
    .subscribe()
}

export const subscribeToUserOnlineStatus = (
  getToken: () => Promise<string | null>,
  callback: (payload: RealtimePostgresChangesPayload<User>) => void
): RealtimeChannel => {
  const supabase = createSupabaseClient(getToken)
  return supabase
    .channel('user_online_status')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'users',
        filter: 'is_online=eq.true',
      },
      callback
    )
    .subscribe()
}

export const unsubscribeFromChannel = (
  getToken: () => Promise<string | null>,
  channel: RealtimeChannel
): Promise<'ok' | 'timed out' | 'error'> => {
  const supabase = createSupabaseClient(getToken)
  return supabase.removeChannel(channel)
}

// ====== UTILITY FUNCTIONS ======

export const getConversationParticipants = async (
  getToken: () => Promise<string | null>,
  conversationId: string
): Promise<User[]> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .from('participants')
    .select(`
      users (
        id,
        email,
        first_name,
        last_name,
        image_url,
        created_at,
        updated_at,
        last_sign_in_at,
        email_verified,
        username,
        display_name,
        bio,
        phone,
        is_online,
        last_seen
      )
    `)
    .eq('conversation_id', conversationId)
  
  if (error) {
    console.error('Error fetching participants:', error)
    return []
  }
  
  if (!data) return []
  
  // Extract users from the relationship
  return data
    .map((p: { users: User[] }) => Array.isArray(p.users) ? p.users[0] : p.users)
    .filter((user): user is User => Boolean(user))
}

export const addParticipantToConversation = async (
  getToken: () => Promise<string | null>,
  conversationId: string, 
  userId: string,
  role: 'admin' | 'member' = 'member'
): Promise<boolean> => {
  const supabase = createSupabaseClient(getToken)
  const { error } = await supabase
    .from('participants')
    .insert({
      conversation_id: conversationId,
      user_id: userId,
      role
    })
  
  if (error) {
    console.error('Error adding participant:', error)
    return false
  }
  
  return true
}

export const removeParticipantFromConversation = async (
  getToken: () => Promise<string | null>,
  conversationId: string, 
  userId: string
): Promise<boolean> => {
  const supabase = createSupabaseClient(getToken)
  const { error } = await supabase
    .from('participants')
    .delete()
    .eq('conversation_id', conversationId)
    .eq('user_id', userId)
  
  if (error) {
    console.error('Error removing participant:', error)
    return false
  }
  
  return true
}

export const updateConversation = async (
  getToken: () => Promise<string | null>,
  conversationId: string, 
  updates: Partial<Conversation>
): Promise<Conversation | null> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .from('conversations')
    .update(updates)
    .eq('id', conversationId)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating conversation:', error)
    return null
  }
  
  return data
}

export const deleteConversation = async (
  getToken: () => Promise<string | null>,
  conversationId: string
): Promise<boolean> => {
  const supabase = createSupabaseClient(getToken)
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('id', conversationId)
  
  if (error) {
    console.error('Error deleting conversation:', error)
    return false
  }
  
  return true
}

export const getMessageById = async (
  getToken: () => Promise<string | null>,
  messageId: string
): Promise<MessageWithSender | null> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:users (*),
      reply_to_message:messages (
        *,
        sender:users (*)
      )
    `)
    .eq('id', messageId)
    .single()
  
  if (error) {
    console.error('Error fetching message:', error)
    return null
  }
  
  return data
}

export const searchMessages = async (
  getToken: () => Promise<string | null>,
  conversationId: string, 
  query: string,
  limit: number = 20
): Promise<MessageWithSender[]> => {
  const supabase = createSupabaseClient(getToken)
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:users (*)
    `)
    .eq('conversation_id', conversationId)
    .eq('is_deleted', false)
    .ilike('content', `%${query}%`)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error searching messages:', error)
    return []
  }
  
  return data || []
}