export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          author: string;
          content: string;
          created_at: string;
          id: number;
          owner_id: string | null;
          snip_id: number | null;
          updated_at: string | null;
        };
        Insert: {
          author: string;
          content: string;
          created_at?: string;
          id?: number;
          owner_id?: string | null;
          snip_id?: number | null;
          updated_at?: string | null;
        };
        Update: {
          author?: string;
          content?: string;
          created_at?: string;
          id?: number;
          owner_id?: string | null;
          snip_id?: number | null;
          updated_at?: string | null;
        };
      };
      likes: {
        Row: {
          created_at: string;
          id: number;
          owner_id: string | null;
          snip_id: number | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          owner_id?: string | null;
          snip_id?: number | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          owner_id?: string | null;
          snip_id?: number | null;
          updated_at?: string | null;
        };
      };
      profiles: {
        Row: {
          first_name: string | null;
          id: string;
          last_name: string | null;
        };
        Insert: {
          first_name?: string | null;
          id: string;
          last_name?: string | null;
        };
        Update: {
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
        };
      };
      snips: {
        Row: {
          author: string | null;
          created_at: string | null;
          description: string;
          id: number;
          language: string;
          owner_id: string;
          snip: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          author?: string | null;
          created_at?: string | null;
          description: string;
          id?: number;
          language: string;
          owner_id: string;
          snip: string;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          author?: string | null;
          created_at?: string | null;
          description?: string;
          id?: number;
          language?: string;
          owner_id?: string;
          snip?: string;
          title?: string;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
export type Snip = Database["public"]["Tables"]["snips"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];

type SnipsResponse = Awaited<ReturnType<typeof getSnips>>;
type SnipsResponseSuccess = SnipsResponse["data"] & {
  comments: Comments[];
};

export type SnipWithComments = SnipsResponseSuccess;
