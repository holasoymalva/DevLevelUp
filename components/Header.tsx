
import React from 'react';
import type { PlayerState } from '../types';

interface HeaderProps {
  playerState: PlayerState;
}

const Header: React.FC<HeaderProps> = ({ playerState }) => {
  const { level, xp, xpToNextLevel } = playerState;
  const xpPercentage = xpToNextLevel > 0 ? (xp / xpToNextLevel) * 100 : 0;

  return (
    <header className="bg-slate-800/50 rounded-xl shadow-lg p-6 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-white">
            Dev<span className="text-violet-400">LevelUp</span> 🚀
          </h1>
          <p className="text-slate-400">Gamify your journey to becoming a better developer.</p>
        </div>
        <div className="w-full sm:w-1/3 text-right">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-lg text-white">Level {level}</span>
            <span className="text-sm text-slate-400">{xp} / {xpToNextLevel} XP</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4">
            <div
              className="bg-violet-500 h-4 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${xpPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
