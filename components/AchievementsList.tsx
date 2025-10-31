
import React from 'react';
import { ACHIEVEMENTS } from '../constants';

interface AchievementsListProps {
  unlockedAchievementIds: string[];
}

const AchievementsList: React.FC<AchievementsListProps> = ({ unlockedAchievementIds }) => {
  const unlockedAchievements = ACHIEVEMENTS.filter(ach => unlockedAchievementIds.includes(ach.id));

  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-violet-400 mb-4">Achievements</h2>
      {unlockedAchievements.length > 0 ? (
        <ul className="space-y-3">
          {unlockedAchievements.map((achievement) => (
            <li key={achievement.id} className="flex items-center p-2 bg-slate-700/50 rounded-lg" title={achievement.description}>
              <div className="text-yellow-400">{achievement.icon}</div>
              <span className="ml-3 text-slate-300 font-medium">{achievement.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-400">No achievements unlocked yet. Keep coding!</p>
      )}
    </div>
  );
};

export default AchievementsList;
