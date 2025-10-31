
import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, className = '' }) => {
  return (
    <div className={`bg-slate-800/50 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center text-center backdrop-blur-sm ${className}`}>
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-sm text-slate-400 font-semibold">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
};

export default StatsCard;
