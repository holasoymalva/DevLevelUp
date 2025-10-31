
import React, { useState } from 'react';
import { ActivityType } from '../types';

interface ActivityLoggerProps {
  onLogActivity: (type: ActivityType, description: string) => void;
}

const ActivityLogger: React.FC<ActivityLoggerProps> = ({ onLogActivity }) => {
  const [activityType, setActivityType] = useState<ActivityType>(ActivityType.COMMIT);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onLogActivity(activityType, description);
      setDescription('');
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-violet-400 mb-4">Log New Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="activityType" className="block text-sm font-medium text-slate-300">
            Activity Type
          </label>
          <select
            id="activityType"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value as ActivityType)}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
          >
            {Object.values(ActivityType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Implemented user auth feature"
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
          disabled={!description.trim()}
        >
          Log Activity & Gain XP
        </button>
      </form>
    </div>
  );
};

export default ActivityLogger;
