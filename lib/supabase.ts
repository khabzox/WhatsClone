import { createClient } from '@supabase/supabase-js';
import { env } from './env';

export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Create Supabase client with Clerk session token
export function createClerkSupabaseClient(getToken: () => Promise<string | null>) {
  return createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await getToken();
          
          // Insert the Clerk Supabase token into the headers
          const headers = new Headers(options?.headers);
          if (clerkToken) {
            headers.set('Authorization', `Bearer ${clerkToken}`);
          }
          
          // Now call the default fetch
          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    }
  );
}

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          last_name: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
          last_sign_in_at: string | null;
          email_verified: boolean;
        };
        Insert: {
          id: string;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
          last_sign_in_at?: string | null;
          email_verified?: boolean;
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
        };
      };
    };
  };
};