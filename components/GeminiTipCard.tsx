
import React from 'react';

interface GeminiTipCardProps {
  tip: string;
}

const GeminiTipCard: React.FC<GeminiTipCardProps> = ({ tip }) => {
  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-violet-500/30">
      <h2 className="flex items-center text-xl font-bold text-violet-400 mb-3">
        <span className="text-2xl mr-2">💡</span>
        Gemini Tip of the Day
      </h2>
      <p className="text-slate-300 italic">"{tip}"</p>
    </div>
  );
};

export default GeminiTipCard;
