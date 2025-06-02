import React, { useState } from 'react';
import { useUserData } from '../../hooks/useUserData';
import NeonButton from '../NeonButton';
import { Volume2Icon, VolumeXIcon, ZapIcon, PauseCircleIcon, PlayCircleIcon } from '../icons/LucideIcons'; 
import Modal from '../Modal';

const SettingsScreen: React.FC = () => {
  const { userData, toggleSoundEffects, resetUserData, updateUserName, togglePauseStreaks } = useUserData();
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [newUserName, setNewUserName] = useState(userData.userName);

  const handleResetData = () => {
    resetUserData();
    setShowResetConfirmModal(false);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(e.target.value);
  };

  const handleSaveUserName = () => {
    if (newUserName.trim()) {
      updateUserName(newUserName.trim());
      alert("Operative codename updated!");
    }
  };

  return (
    <div className="p-4 md:p-6 custom-scrollbar h-full overflow-y-auto pb-24 md:pb-6">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-orbitron neon-text-green">System Configuration</h1>
        <p className="text-sky-300 mt-1">Tune your interface. Calibrate your experience.</p>
      </header>

      <div className="space-y-8 max-w-2xl mx-auto">
        <div className="glassmorphism p-6 rounded-lg shadow-xl border-2 neon-border-green">
          <h2 className="text-xl font-orbitron neon-text-green mb-3">Operative ID</h2>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <input 
              type="text"
              value={newUserName}
              onChange={handleUserNameChange}
              placeholder="Enter your codename"
              className="flex-grow p-3 bg-slate-800/70 border-2 border-slate-700 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-slate-100 placeholder-slate-500 w-full sm:w-auto"
            />
            <NeonButton onClick={handleSaveUserName} variant="green" className="w-full sm:w-auto">
              Update Codename
            </NeonButton>
          </div>
        </div>
        
        <div className="glassmorphism p-6 rounded-lg shadow-xl border-2 neon-border-blue">
          <h2 className="text-xl font-orbitron neon-text-blue mb-3">Audio Output</h2>
          <div className="flex items-center justify-between">
            <span className="text-slate-200">Sound Effects Protocol:</span>
            <NeonButton onClick={toggleSoundEffects} variant={userData.settings.soundEffects ? "green" : "red"} className="w-40">
              {userData.settings.soundEffects ? <Volume2Icon className="mr-2"/> : <VolumeXIcon className="mr-2"/>}
              {userData.settings.soundEffects ? 'ACTIVE' : 'MUTED'}
            </NeonButton>
          </div>
        </div>

        <div className="glassmorphism p-6 rounded-lg shadow-xl border-2 neon-border-green">
          <h2 className="text-xl font-orbitron neon-text-green mb-3">Streak Calibration</h2>
          <div className="flex items-center justify-between">
            <span className="text-slate-200">Daily Grind Streak Pressure:</span>
            <NeonButton onClick={togglePauseStreaks} variant={!userData.settings.pauseStreaks ? "green" : "red"} className="w-48">
              {!userData.settings.pauseStreaks ? <PlayCircleIcon className="mr-2"/> : <PauseCircleIcon className="mr-2"/>}
              {userData.settings.pauseStreaks ? 'PRESSURE PAUSED' : 'PRESSURE ON'}
            </NeonButton>
          </div>
           <p className="text-xs text-sky-400 mt-2">
            {userData.settings.pauseStreaks 
              ? "Streak tracking is temporarily suspended. Your current streak is safe. Unpause to resume."
              : "Streak tracking is active. Maintain daily journal entries to boost your grind aura."}
           </p>
        </div>
        
        <div className="glassmorphism p-6 rounded-lg shadow-xl border-2 neon-border-blue">
          <h2 className="text-xl font-orbitron neon-text-blue mb-3">Visual Matrix Theme</h2>
          <p className="text-sky-300 mb-2">Current: {userData.settings.theme}</p>
          <NeonButton variant="default" disabled className="opacity-50">
            More Themes (Coming Soon)
          </NeonButton>
           <p className="text-xs text-sky-400 mt-2">Advanced visual calibration protocols are under development.</p>
        </div>

        <div className="glassmorphism p-6 rounded-lg shadow-xl border-2 neon-border-red">
          <h2 className="text-xl font-orbitron neon-text-red mb-3">System Purge</h2>
          <p className="text-sky-300 mb-3">
            Warning: This will reset all your progress, skills, journal entries, and badges. 
            This action is irreversible. Proceed with extreme caution, operative.
          </p>
          <NeonButton onClick={() => setShowResetConfirmModal(true)} variant="red" className="bg-red-600 hover:bg-red-700 border-red-500 hover:border-red-600 focus:ring-red-500 shadow-red-600/50">
            Initiate Data Purge
          </NeonButton>
        </div>
      </div>

      <Modal 
        isOpen={showResetConfirmModal} 
        onClose={() => setShowResetConfirmModal(false)}
        title="Confirm System Purge"
      >
        <p className="text-slate-200 mb-6">
          Are you absolutely certain you want to erase all data? This will reset your AI Mastery Tracker to its initial state. 
          There is no recovery from this protocol.
        </p>
        <div className="flex justify-end space-x-4">
          <NeonButton onClick={() => setShowResetConfirmModal(false)} variant="default">
            Abort Purge
          </NeonButton>
          <NeonButton onClick={handleResetData} variant="red" className="bg-red-600 hover:bg-red-700 border-red-500">
            Confirm Purge
          </NeonButton>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsScreen;