
import React, { useState, useEffect, useCallback } from 'react';
import type { PlayerState, Quest, Activity, Achievement } from './types';
import { ActivityType } from './types';
import { INITIAL_PLAYER_STATE, XP_VALUES, LEVEL_BASE_XP, ACHIEVEMENTS, DAILY_QUESTS } from './constants';
import { fetchCodeQualityTip } from './services/geminiService';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [playerState, setPlayerState] = useState<PlayerState>(() => {
    const savedState = localStorage.getItem('devLevelUpState');
    return savedState ? JSON.parse(savedState) : INITIAL_PLAYER_STATE;
  });
  const [quests, setQuests] = useState<Quest[]>([]);
  const [codeTip, setCodeTip] = useState<string>('Fetching your daily tip...');
  const [newlyUnlockedAchievements, setNewlyUnlockedAchievements] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem('devLevelUpState', JSON.stringify(playerState));
  }, [playerState]);

  const resetDailyQuests = useCallback(() => {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('devLevelUpLastReset');

    if (today !== lastReset) {
      const resetQuests = DAILY_QUESTS.map(q => ({ ...q, completed: false }));
      setQuests(resetQuests);
      localStorage.setItem('devLevelUpQuests', JSON.stringify(resetQuests));
      localStorage.setItem('devLevelUpLastReset', today);
    } else {
      const savedQuests = localStorage.getItem('devLevelUpQuests');
      setQuests(savedQuests ? JSON.parse(savedQuests) : DAILY_QUESTS.map(q => ({ ...q, completed: false })));
    }
  }, []);

  useEffect(() => {
    resetDailyQuests();
    fetchCodeQualityTip().then(setCodeTip);
  }, [resetDailyQuests]);

  const handleLogActivity = (type: ActivityType, description: string) => {
    const xpGained = XP_VALUES[type] || 0;

    const newActivity: Activity = {
      id: Date.now().toString(),
      type,
      description,
      xp: xpGained,
      timestamp: new Date().toISOString(),
    };

    setPlayerState(prevState => {
      const newState = { ...prevState };
      newState.xp += xpGained;
      newState.stats = { ...newState.stats, [type]: (newState.stats[type] || 0) + 1 };
      newState.history = [newActivity, ...newState.history].slice(0, 50); // Keep history to 50 items

      // Check for level up
      while (newState.xp >= newState.xpToNextLevel) {
        newState.xp -= newState.xpToNextLevel;
        newState.level += 1;
        newState.xpToNextLevel = Math.floor(LEVEL_BASE_XP * Math.pow(1.5, newState.level - 1));
      }
      
      // Check for achievements
      const unlockedNow: string[] = [];
      ACHIEVEMENTS.forEach((achievement: Achievement) => {
        if (!newState.achievements.includes(achievement.id) && achievement.condition(newState.stats)) {
          newState.achievements.push(achievement.id);
          unlockedNow.push(achievement.name);
        }
      });
      if(unlockedNow.length > 0) {
        setNewlyUnlockedAchievements(unlockedNow);
        setTimeout(() => setNewlyUnlockedAchievements([]), 5000); // Clear after 5 seconds
      }

      return newState;
    });

    // Check for quest completion
    setQuests(prevQuests => {
      const updatedQuests = prevQuests.map(quest =>
        quest.activityType === type && !quest.completed ? { ...quest, completed: true } : quest
      );
      localStorage.setItem('devLevelUpQuests', JSON.stringify(updatedQuests));
      return updatedQuests;
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <Dashboard
        playerState={playerState}
        quests={quests}
        codeTip={codeTip}
        onLogActivity={handleLogActivity}
        newlyUnlockedAchievements={newlyUnlockedAchievements}
      />
    </div>
  );
};

export default App;
