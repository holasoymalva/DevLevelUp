import type { ReactElement } from 'react';

export enum ActivityType {
  COMMIT = 'Commit Code',
  MERGE_PR = 'Merge PR',
  FIX_BUG = 'Fix a Bug',
  LEARN_SKILL = 'Learn New Skill',
  REVIEW_PR = 'Review a PR',
  WRITE_TESTS = 'Write Tests',
  REFACTOR = 'Refactor Code',
}

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  xp: number;
  timestamp: string;
}

export interface Stats {
  [key: string]: number;
}

export interface PlayerState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  stats: Stats;
  achievements: string[];
  history: Activity[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  // Fix: Changed JSX.Element to ReactElement to avoid issues with the JSX namespace not being available in a .ts file.
  icon: ReactElement;
  condition: (stats: Stats) => boolean;
}

export interface Quest {
  id: string;
  description: string;
  activityType: ActivityType;
  completed: boolean;
}
