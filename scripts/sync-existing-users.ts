// Run this script once to sync existing Clerk users to Supabase
// Usage: bun run scripts/sync-existing-users.ts

import { createClerkClient } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Manual env loading for Bun
function loadEnvFile() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const envFile = readFileSync(envPath, "utf8");

    envFile.split("\n").forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const [key, ...valueParts] = trimmedLine.split("=");
        if (key && valueParts.length > 0) {
          const value = valueParts.join("=").replace(/^["']|["']$/g, "");
          process.env[key] = value;
        }
      }
    });

    console.log("✅ Environment file loaded successfully");
  } catch (error) {
    console.error("❌ Error loading .env.local file:", error);
    console.error("Make sure .env.local exists in your project root");
    process.exit(1);
  }
}

// Load environment variables
loadEnvFile();

// Debug: Log environment variables (remove in production)
console.log("Environment check:");
console.log("SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "Found" : "Missing");
console.log("SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "Found" : "Missing");
console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY ? "Found" : "Missing");

// Temporary debug - show actual values (REMOVE AFTER FIXING)
console.log("\n🔍 DEBUG - Actual values:");
console.log("SUPABASE_URL value:", JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_URL));
console.log("SUPABASE_URL length:", process.env.NEXT_PUBLIC_SUPABASE_URL?.length);
console.log("First 50 chars:", process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 50));

// Validate environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
};

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

// Import environment variables directly since the script runs outside Next.js context
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// Create Clerk client
const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

async function syncExistingUsers() {
  try {
    console.log("Starting user sync...");

    // Get all users from Clerk (with pagination)
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      const users = await clerk.users.getUserList({
        offset,
        limit,
      });

      console.log(`Processing ${users.data.length} users (offset: ${offset})`);

      for (const user of users.data) {
        const primaryEmail = user.emailAddresses.find(
          email => email.id === user.primaryEmailAddressId,
        );

        if (!primaryEmail) {
          console.warn(`No primary email for user ${user.id}, skipping`);
          continue;
        }

        const userData = {
          id: user.id,
          email: primaryEmail.emailAddress,
          first_name: user.firstName || null,
          last_name: user.lastName || null,
          image_url: user.imageUrl || null,
          created_at: new Date(user.createdAt).toISOString(),
          updated_at: new Date(user.updatedAt).toISOString(),
          last_sign_in_at: user.lastSignInAt ? new Date(user.lastSignInAt).toISOString() : null,
          email_verified: primaryEmail.verification?.status === "verified",
        };

        // Use upsert to handle existing records
        const { error } = await supabase.from("users").upsert(userData, { onConflict: "id" });

        if (error) {
          console.error(`Error syncing user ${user.id}:`, error);
        } else {
          console.log(`Synced user: ${user.id}`);
        }
      }

      hasMore = users.data.length === limit;
      offset += limit;
    }

    console.log("User sync completed!");
  } catch (error) {
    console.error("Error during sync:", error);
  }
}

syncExistingUsers();
