
import React, { createContext, useContext } from 'react';
import { useUserData as useUserDataHook } from '../hooks/useUserData'; 
import { UserData, BadgeId, Project, JournalEntry, Mood, SocraticInteractionState, RoadmapItem } from '../types'; 

// This interface must match the return type of useUserDataHook from ../hooks/useUserData.ts
interface UserDataContextType {
  userData: UserData;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date' | 'aiFeedback'>, aiFeedback?: string) => void;
  updateSkillProgress: (skillId: string, hoursToAdd: number) => void;
  updateProjectStatus: (projectId: string, status: Project['status']) => void;
  addXp: (amount: number) => void;
  awardBadge: (badgeId: BadgeId) => void;
  toggleSoundEffects: () => void;
  togglePauseStreaks: () => void;
  toggleSocraticAi: () => void; 
  resetUserData: () => void;
  lastEarnedXp: number | null;
  newlyAwardedBadge: BadgeId | null;
  updateUserName: (newName: string) => void;
  toggleRoadmapTask: (taskId: string, taskXp: number, taskItem?: RoadmapItem) => void; 
  socraticInteraction: SocraticInteractionState; 
  openSocraticModal: (task: RoadmapItem) => void;   
  closeSocraticModal: () => void;  
  setSocraticQuestion: (question: string) => void; 
  setSocraticReflection: (reflection: string) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

interface UserDataProviderProps {
  children: React.ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const userDataHookValues = useUserDataHook(); 

  return (
    <UserDataContext.Provider value={userDataHookValues}>
      {children}
    </UserDataContext.Provider>
  );
};
