import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para o banco de dados
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      activities: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          duration: string;
          completed: boolean;
          type: 'afirmacao' | 'desafio' | 'meditacao';
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          duration: string;
          completed?: boolean;
          type: 'afirmacao' | 'desafio' | 'meditacao';
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          duration?: string;
          completed?: boolean;
          type?: 'afirmacao' | 'desafio' | 'meditacao';
          completed_at?: string | null;
          created_at?: string;
        };
      };
      mood_logs: {
        Row: {
          id: string;
          user_id: string;
          mood: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mood: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          mood?: string;
          created_at?: string;
        };
      };
      progress: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          completed_activities: number;
          total_activities: number;
          points: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          completed_activities?: number;
          total_activities?: number;
          points?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          completed_activities?: number;
          total_activities?: number;
          points?: number;
          created_at?: string;
        };
      };
    };
  };
};
