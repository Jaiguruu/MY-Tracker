import React from 'react';
import { UserData } from '../types';
import { LEVELS_XP_THRESHOLDS } from '../constants';

interface XpDisplayProps {
  userData: UserData;
  lastEarnedXp?: number | null;
}

const XpDisplay: React.FC<XpDisplayProps> = ({ userData, lastEarnedXp }) => {
  const { xp, level } = userData;
  const currentLevelXpThreshold = LEVELS_XP_THRESHOLDS[level - 1] || 0;
  const nextLevelXpThreshold = LEVELS_XP_THRESHOLDS[level] || (currentLevelXpThreshold + 500); // Fallback for max level
  
  const xpInCurrentLevel = xp - currentLevelXpThreshold;
  const xpForNextLevel = nextLevelXpThreshold - currentLevelXpThreshold;
  const progressPercentage = xpForNextLevel > 0 ? Math.min((xpInCurrentLevel / xpForNextLevel) * 100, 100) : 100;

  return (
    <div className="glassmorphism p-4 rounded-lg shadow-xl relative overflow-hidden border-2 neon-border-blue">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-orbitron neon-text-blue">Level: {level}</h3>
        <span className="text-sm text-sky-300 font-orbitron">XP: {xp.toLocaleString()} / {nextLevelXpThreshold.toLocaleString()}</span>
      </div>
      <div className="w-full bg-slate-800/50 rounded-full h-4 border border-sky-500/50">
        <div
          className="bg-gradient-to-r from-sky-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {lastEarnedXp && lastEarnedXp > 0 && (
        <div key={Date.now()} className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded animate-ping-once">
          +{lastEarnedXp} XP
        </div>
      )}
    </div>
  );
};

export default XpDisplay;