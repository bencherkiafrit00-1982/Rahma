/**
 * Data structures for Algerian Grade 1 Primary Curriculum
 */

export type SubjectId = 'arabic' | 'math' | 'science' | 'islamic' | 'civic';

export interface ExerciseItem {
  id: string;
  type: 'choice' | 'count' | 'match' | 'classify' | 'true-false';
  question: string;
  audioPrompt?: string;
  visualCue?: string;
  options?: string[];
  correctAnswer: string | number | string[];
  hint?: string;
  explanation?: string;
}

export interface Lesson {
  id: string;
  subjectId: SubjectId;
  unitNumber: number;
  unitTitle: string;
  title: string;
  subtitle?: string;
  badgeName?: string;
  // Official Algerian textbook stages: أكتشف (Discover), أنجز (Exercise), تعلمت (Summary)
  discover: {
    storyText: string;
    keyPoints: string[];
    charactersInvolved?: string[];
    keywords: string[];
  };
  exercise: {
    instruction: string;
    items: ExerciseItem[];
  };
  summary: {
    taalamtuText: string; // "تعلمتُ"
    memorizeVerseOrRule?: string;
  };
}

export interface StudentProgress {
  name: string;
  avatar: 'ahmad' | 'khadija' | 'amine' | 'celine';
  stars: number;
  completedLessons: string[]; // lesson ids
  exerciseScores: Record<string, number>; // exerciseId -> score
  unlockedBadges: string[];
  lastActiveDate: string;
  subjectMastery: Record<SubjectId, number>; // 0 to 100%
  weakPoints: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  subjectId: SubjectId;
  requiredStars: number;
}
