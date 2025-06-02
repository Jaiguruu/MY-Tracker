import React from 'react';
import PomodoroTimer from '../PomodoroTimer';
import { useUserData } from '../../hooks/useUserData'; 

const FocusScreen: React.FC = () => {
  const { userData, addXp } = useUserData();

  const handleSessionComplete = (type: 'work' | 'break') => {
    console.log(`${type} session complete!`);
    if (type === 'work') {
      const xpForPomodoro = 25; 
      addXp(xpForPomodoro);
    }
  };

  return (
    <div className="p-4 md:p-6 h-full flex flex-col items-center justify-center text-center">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-orbitron neon-text-green">Engage Focus Protocol</h1>
        <p className="text-sky-300 mt-2 text-lg">Eliminate distractions. Maximize output. Become unstoppable.</p>
      </header>
      
      <PomodoroTimer 
        soundEffectsEnabled={userData.settings.soundEffects}
        onSessionComplete={handleSessionComplete}
      />

      <div className="mt-10 glassmorphism p-4 rounded-lg border-2 neon-border-blue w-full max-w-md">
        <h3 className="text-lg font-orbitron neon-text-blue mb-2">Protocol Directives:</h3>
        <ul className="text-sm text-slate-200 list-disc list-inside text-left space-y-1">
          <li>Initiate timer for focused work sprints.</li>
          <li>Utilize break periods for system recalibration.</li>
          <li>Maintain peak operational efficiency.</li>
          <li>Log all progress upon protocol completion.</li>
        </ul>
      </div>
    </div>
  );
};

export default FocusScreen;