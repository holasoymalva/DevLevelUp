
import React from 'react';
import type { PlayerState, Quest } from '../types';
import { ActivityType } from '../types';
import Header from './Header';
import StatsGrid from './StatsGrid';
import ActivityLogger from './ActivityLogger';
import DailyQuests from './DailyQuests';
import AchievementsList from './AchievementsList';
import GeminiTipCard from './GeminiTipCard';
import ProgressChart from './ProgressChart';

interface DashboardProps {
  playerState: PlayerState;
  quests: Quest[];
  codeTip: string;
  onLogActivity: (type: ActivityType, description: string) => void;
  newlyUnlockedAchievements: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ playerState, quests, codeTip, onLogActivity, newlyUnlockedAchievements }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <Header playerState={playerState} />
      
      {newlyUnlockedAchievements.length > 0 && (
        <div className="fixed top-5 right-5 z-50">
          {newlyUnlockedAchievements.map(name => (
             <div key={name} className="bg-green-500 text-white p-4 rounded-lg shadow-lg mb-2 animate-bounce">
                <strong className="font-bold">Achievement Unlocked!</strong>
                <span className="block sm:inline ml-2">{name}</span>
             </div>
          ))}
        </div>
      )}

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          <StatsGrid stats={playerState.stats} />
          <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 backdrop-blur-sm">
             <h2 className="text-xl font-bold text-violet-400 mb-4">XP History</h2>
             <ProgressChart history={playerState.history} />
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <ActivityLogger onLogActivity={onLogActivity} />
          <DailyQuests quests={quests} />
          <AchievementsList unlockedAchievementIds={playerState.achievements} />
          <GeminiTipCard tip={codeTip} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
