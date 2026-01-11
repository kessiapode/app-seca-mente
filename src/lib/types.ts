// Tipos do aplicativo Seca Mente

export type Mood = 'feliz' | 'neutra' | 'ansiosa' | 'triste' | 'irritada' | 'confiante';

export interface MoodEntry {
  id: string;
  mood: Mood;
  thoughts: string;
  timestamp: Date;
  response?: string;
}

export interface DailyActivity {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'visualizacao' | 'afirmacao' | 'desafio';
  completed: boolean;
}

export interface DiaryEntry {
  id: string;
  content: string;
  prompt: string;
  timestamp: Date;
}

export interface UserProgress {
  dailyStreak: number;
  activitiesCompleted: number;
  totalPoints: number;
  badges: string[];
}
