
import React from 'react';
import type { Quest } from '../types';

interface DailyQuestsProps {
  quests: Quest[];
}

const DailyQuests: React.FC<DailyQuestsProps> = ({ quests }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-violet-400 mb-4">Daily Quests</h2>
      <ul className="space-y-3">
        {quests.map((quest) => (
          <li key={quest.id} className="flex items-center">
            <input
              type="checkbox"
              checked={quest.completed}
              readOnly
              className="h-5 w-5 rounded text-violet-600 bg-slate-700 border-slate-500 focus:ring-violet-500 cursor-not-allowed"
            />
            <span className={`ml-3 text-slate-300 ${quest.completed ? 'line-through text-slate-500' : ''}`}>
              {quest.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyQuests;
