import React, { useState, useEffect, useCallback } from 'react';
import NeonButton from './NeonButton';
import { ZapIcon } from './icons/LucideIcons';
import { POMODORO_DURATION_MINUTES, POMODORO_BREAK_MINUTES, JOURNAL_SUBMISSION_SOUND_PATH } from '../constants'; 

interface PomodoroTimerProps {
  soundEffectsEnabled: boolean;
  onSessionComplete?: (type: 'work' | 'break') => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ soundEffectsEnabled, onSessionComplete }) => {
  const [minutes, setMinutes] = useState(POMODORO_DURATION_MINUTES);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true); 

  const playSound = useCallback(() => {
    if (soundEffectsEnabled) {
      new Audio(JOURNAL_SUBMISSION_SOUND_PATH).play().catch(e => console.warn("Audio play failed:", e));
    }
  }, [soundEffectsEnabled]);

  useEffect(() => {
    let interval: number | null = null;

    if (isActive) {
      interval = window.setInterval(() => {
        if (seconds > 0) {
          setSeconds(s => s - 1);
        } else if (minutes > 0) {
          setMinutes(m => m - 1);
          setSeconds(59);
        } else { 
          playSound();
          setIsActive(false);
          if (onSessionComplete) onSessionComplete(isWorkSession ? 'work' : 'break');
          if (isWorkSession) {
            setIsWorkSession(false);
            setMinutes(POMODORO_BREAK_MINUTES);
          } else {
            setIsWorkSession(true);
            setMinutes(POMODORO_DURATION_MINUTES);
          }
          setSeconds(0);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) window.clearInterval(interval);
    }
    return () => { if (interval) window.clearInterval(interval); };
  }, [isActive, seconds, minutes, playSound, onSessionComplete, isWorkSession]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsWorkSession(true);
    setMinutes(POMODORO_DURATION_MINUTES);
    setSeconds(0);
  };

  return (
    <div className="glassmorphism p-6 md:p-8 rounded-xl shadow-2xl text-center border-2 neon-border-green w-full max-w-md mx-auto">
      <ZapIcon className="w-16 h-16 text-green-400 neon-text-green mx-auto mb-4" />
      <h2 className="text-3xl font-orbitron neon-text-green mb-2">
        {isWorkSession ? "GRIND CYCLE" : "RECHARGE CYCLE"}
      </h2>
      <div className="text-7xl md:text-8xl font-orbitron my-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-sky-400">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <NeonButton onClick={toggleTimer} variant={isActive ? "red" : "green"} className="w-full sm:w-auto">
          {isActive ? 'PAUSE GRID' : 'ENGAGE GRID'}
        </NeonButton>
        <NeonButton onClick={resetTimer} variant="default" className="w-full sm:w-auto">
          RESET CYCLE
        </NeonButton>
      </div>
      <p className="mt-6 text-sky-300 text-sm">
        {isWorkSession ? 
          `Focus for ${POMODORO_DURATION_MINUTES} minutes. Maximize output.` :
          `Recharge for ${POMODORO_BREAK_MINUTES} minutes. System integrity restored soon.`
        }
      </p>
    </div>
  );
};

export default PomodoroTimer;