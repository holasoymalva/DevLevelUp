
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Activity } from '../types';

interface ProgressChartProps {
  history: Activity[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ history }) => {
  const chartData = history
    .slice() // Create a copy to avoid mutating props
    .reverse() // Reverse to show oldest first
    .map(activity => ({
      date: new Date(activity.timestamp).toLocaleDateString(),
      xp: activity.xp,
      type: activity.type,
    }));
    
  // Aggregate XP per day for a cleaner chart
  const aggregatedData = chartData.reduce((acc, curr) => {
    const existingDay = acc.find(d => d.date === curr.date);
    if (existingDay) {
        existingDay.XP += curr.xp;
    } else {
        acc.push({ date: curr.date, XP: curr.xp });
    }
    return acc;
  }, [] as {date: string; XP: number}[]);


  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={aggregatedData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #4f46e5' }} 
            labelStyle={{ color: '#c7d2fe' }}
          />
          <Legend />
          <Line type="monotone" dataKey="XP" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
