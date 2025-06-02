import React from 'react';
import { BadgeId, UserData } from '../types';
import { ALL_BADGES } from '../constants';
import { AwardIcon } from './icons/LucideIcons';

interface BadgeDisplayProps {
  userData: UserData;
  newlyAwardedBadge?: BadgeId | null;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ userData, newlyAwardedBadge }) => {
  const earnedBadgesDetails = userData.badges
    .map(badgeId => ALL_BADGES.find(b => b.id === badgeId))
    .filter(b => b !== undefined);

  if (earnedBadgesDetails.length === 0) {
    return (
      <div className="glassmorphism p-4 rounded-lg shadow-xl text-center border-2 neon-border-green">
        <AwardIcon className="w-10 h-10 mx-auto mb-2 text-green-400/50" />
        <p className="text-sky-300 font-orbitron">No badges earned yet. Keep grinding, operative!</p>
      </div>
    );
  }

  return (
    <div className="glassmorphism p-4 rounded-lg shadow-xl border-2 neon-border-green">
      <h3 className="text-xl font-orbitron neon-text-green mb-3 text-center">Conquests</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-3">
        {earnedBadgesDetails.map(badge => badge && (
          <div 
            key={badge.id} 
            title={badge.description} 
            className={`p-3 rounded-md text-center transition-all duration-300 ease-in-out border
                        ${newlyAwardedBadge === badge.id ? 'animate-pulse-border-green bg-green-500/30 border-green-300' : 'bg-slate-700/30 border-slate-600/50 hover:bg-green-600/30 hover:border-green-500'}`}
          >
            <div className="text-3xl mb-1">{badge.icon}</div>
            <p className="text-xs font-orbitron text-green-200">{badge.name}</p>
          </div>
        ))}
      </div>
      {newlyAwardedBadge && (
         <p className="text-center mt-3 text-lg font-orbitron neon-text-green animate-pulse-text-green"> {/* Assuming animate-pulse-text-green for text */}
           New Conquest: {ALL_BADGES.find(b => b.id === newlyAwardedBadge)?.name}!
         </p>
      )}
    </div>
  );
};

export default BadgeDisplay;