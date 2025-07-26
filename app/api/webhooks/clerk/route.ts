// app/api/webhooks/clerk/route.ts
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

interface ClerkWebhookEvent {
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      verification?: {
        status: string;
      };
    }>;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    username?: string;
    created_at: number;
    updated_at: number;
    last_sign_in_at?: number;
  };
  object: "event";
  type: "user.created" | "user.updated" | "user.deleted";
};

export async function POST(req: NextRequest) {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);

  let evt: ClerkWebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as ClerkWebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Error occured", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  const { data } = evt;

  console.log(`Received webhook: ${eventType}`);

  try {
    switch (eventType) {
      case "user.created":
        await handleUserCreated(data);
        break;
      case "user.updated":
        await handleUserUpdated(data);
        break;
      case "user.deleted":
        await handleUserDeleted(data);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return new NextResponse("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse("Error processing webhook", { status: 500 });
  }
}

function generateUsernameFromEmail(email: string, id: string): string {
  // Remove email domain and special characters
  let username = email.split('@')[0].toLowerCase();
  // Replace special characters with underscores
  username = username.replace(/[^a-z0-9]/g, '_');
  // Add part of user ID to ensure uniqueness
  username += '_' + id.slice(-6);
  return username;
}

async function handleUserCreated(data: ClerkWebhookEvent["data"]) {
  const primaryEmail =
    data.email_addresses.find(email => email.verification?.status === "verified") ||
    data.email_addresses[0];

  if (!primaryEmail) {
    throw new Error("No email address found for user");
  }

  // Generate a unique username
  const username = data.username || generateUsernameFromEmail(primaryEmail.email_address, data.id);
  
  // Create display name from first/last name or fallback to email
  const displayName = data.first_name && data.last_name 
    ? `${data.first_name} ${data.last_name}`
    : data.first_name || data.last_name || primaryEmail.email_address;

  const userData = {
    id: data.id,
    email: primaryEmail.email_address,
    first_name: data.first_name || null,
    last_name: data.last_name || null,
    image_url: data.image_url || null,
    created_at: new Date(data.created_at).toISOString(),
    updated_at: new Date(data.updated_at).toISOString(),
    last_sign_in_at: data.last_sign_in_at ? new Date(data.last_sign_in_at).toISOString() : null,
    email_verified: primaryEmail.verification?.status === "verified",
    // New chat-specific fields
    username: username,
    display_name: displayName,
    bio: null,
    phone: null,
    is_online: false,
    last_seen: new Date().toISOString(),
  };

  const { error } = await supabase.from("users").insert(userData);

  if (error) {
    console.error("Error creating user in Supabase:", error);
    throw error;
  }

  console.log(`User created in Supabase: ${data.id}`);
}

async function handleUserUpdated(data: ClerkWebhookEvent["data"]) {
  const primaryEmail =
    data.email_addresses.find(email => email.verification?.status === "verified") ||
    data.email_addresses[0];

  if (!primaryEmail) {
    throw new Error("No email address found for user");
  }

  // Create display name from first/last name or fallback to email
  const displayName = data.first_name && data.last_name 
    ? `${data.first_name} ${data.last_name}`
    : data.first_name || data.last_name || primaryEmail.email_address;

  const userData = {
    email: primaryEmail.email_address,
    first_name: data.first_name || null,
    last_name: data.last_name || null,
    image_url: data.image_url || null,
    updated_at: new Date(data.updated_at).toISOString(),
    last_sign_in_at: data.last_sign_in_at ? new Date(data.last_sign_in_at).toISOString() : null,
    email_verified: primaryEmail.verification?.status === "verified",
    display_name: displayName,
    // Update username if provided by Clerk
    ...(data.username && { username: data.username }),
  };

  const { error } = await supabase.from("users").update(userData).eq("id", data.id);

  if (error) {
    console.error("Error updating user in Supabase:", error);
    throw error;
  }

  console.log(`User updated in Supabase: ${data.id}`);
}

async function handleUserDeleted(data: ClerkWebhookEvent["data"]) {
  const { error } = await supabase.from("users").delete().eq("id", data.id);

  if (error) {
    console.error("Error deleting user from Supabase:", error);
    throw error;
  }

  console.log(`User deleted from Supabase: ${data.id}`);
}
