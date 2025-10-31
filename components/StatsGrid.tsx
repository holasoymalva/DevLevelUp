import React from 'react';
import type { Stats } from '../types';
import { ActivityType } from '../types';
import StatsCard from './StatsCard';

interface StatsGridProps {
  stats: Stats;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  const statItems = [
    { type: ActivityType.COMMIT, icon: '💾' },
    { type: ActivityType.MERGE_PR, icon: '🔀' },
    { type: ActivityType.FIX_BUG, icon: '🐛' },
    { type: ActivityType.LEARN_SKILL, icon: '🧠' },
    { type: ActivityType.REVIEW_PR, icon: '👀' },
    { type: ActivityType.WRITE_TESTS, icon: '🧪' },
    { type: ActivityType.REFACTOR, icon: '✨' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map(item => (
        <StatsCard 
          key={item.type}
          title={item.type}
          value={stats[item.type] || 0}
          icon={item.icon}
        />
      ))}
      <StatsCard 
        title="Total Activities"
        // Fix: Explicitly type the accumulator and value in the reduce function to prevent type inference errors.
        value={Object.values(stats).reduce((acc: number, val: number) => acc + val, 0)}
        icon="📊"
        className="col-span-2 md:col-span-1"
      />
    </div>
  );
};

export default StatsGrid;
