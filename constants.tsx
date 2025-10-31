
import React from 'react';
import type { PlayerState, Achievement, Quest } from './types';
import { ActivityType } from './types';

export const XP_VALUES: Record<ActivityType, number> = {
  [ActivityType.COMMIT]: 10,
  [ActivityType.MERGE_PR]: 50,
  [ActivityType.FIX_BUG]: 75,
  [ActivityType.LEARN_SKILL]: 100,
  [ActivityType.REVIEW_PR]: 20,
  [ActivityType.WRITE_TESTS]: 40,
  [ActivityType.REFACTOR]: 60,
};

export const LEVEL_BASE_XP = 100;

export const INITIAL_PLAYER_STATE: PlayerState = {
  level: 1,
  xp: 0,
  xpToNextLevel: LEVEL_BASE_XP,
  stats: {
    [ActivityType.COMMIT]: 0,
    [ActivityType.MERGE_PR]: 0,
    [ActivityType.FIX_BUG]: 0,
    [ActivityType.LEARN_SKILL]: 0,
    [ActivityType.REVIEW_PR]: 0,
    [ActivityType.WRITE_TESTS]: 0,
    [ActivityType.REFACTOR]: 0,
  },
  achievements: [],
  history: [],
};

const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const BugIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m-6 6l-4 4m6-10l-4 4m6 2l2-2m-7 7l-2 2m2-2l2 2m-2-2l-2-2m5 5l-2 2m2-2l2 2" /></svg>;
const MergeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h4l4 4z" /></svg>;
const BrainIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.871 14.85c-1.348-1.348-1.348-3.536 0-4.884l7.071-7.071a3.455 3.455 0 014.884 0l2.121 2.121a3.455 3.455 0 010 4.884l-7.071 7.071a3.455 3.455 0 01-4.884 0l-2.121-2.121z" /></svg>;

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'commit_1', name: 'First Commit', description: 'Make your first commit.', icon: <CodeIcon />, condition: (stats) => stats[ActivityType.COMMIT] >= 1 },
  { id: 'commit_10', name: 'Serial Committer', description: 'Make 10 commits.', icon: <CodeIcon />, condition: (stats) => stats[ActivityType.COMMIT] >= 10 },
  { id: 'bug_1', name: 'Bug Squasher', description: 'Fix your first bug.', icon: <BugIcon />, condition: (stats) => stats[ActivityType.FIX_BUG] >= 1 },
  { id: 'bug_10', name: 'Exterminator', description: 'Fix 10 bugs.', icon: <BugIcon />, condition: (stats) => stats[ActivityType.FIX_BUG] >= 10 },
  { id: 'merge_1', name: 'Merge Master', description: 'Merge your first PR.', icon: <MergeIcon />, condition: (stats) => stats[ActivityType.MERGE_PR] >= 1 },
  { id: 'learn_1', name: 'Knowledge Seeker', description: 'Learn a new skill.', icon: <BrainIcon />, condition: (stats) => stats[ActivityType.LEARN_SKILL] >= 1 },
];

export const DAILY_QUESTS: Omit<Quest, 'completed'>[] = [
    { id: 'daily_commit', description: 'Commit code today', activityType: ActivityType.COMMIT },
    { id: 'daily_review', description: 'Review a pull request', activityType: ActivityType.REVIEW_PR },
    { id: 'daily_test', description: 'Write some tests', activityType: ActivityType.WRITE_TESTS },
];
