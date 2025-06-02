import { useState, useEffect, useCallback } from 'react';
import { UserData, Skill, Project, JournalEntry, BadgeId, Mood, SocraticInteractionState, RoadmapItem } from '../types';
import { loadUserData, saveUserData, resetUserData as resetDataService, calculateLevel } from '../services/dataService';
import { XP_PER_HOUR_GRIND, XP_PER_JOURNAL_ENTRY, XP_PER_PROJECT_COMPLETED, XP_PER_SKILL_MASTERED, ALL_BADGES, XP_PER_SOCIAL_POST } from '../constants';
import { NEW_ROADMAP_DATA } from '../roadmapData'; 

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData>(loadUserData());
  const [lastEarnedXp, setLastEarnedXp] = useState<number | null>(null);
  const [newlyAwardedBadge, setNewlyAwardedBadge] = useState<BadgeId | null>(null);
  const [socraticInteraction, setSocraticInteraction] = useState<SocraticInteractionState>({
    isOpen: false,
    task: null,
    question: null,
    userReflection: "",
    isLoadingQuestion: false,
  });

  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  const addXp = useCallback((amount: number) => {
    if (amount === 0) return;
    setUserData(prev => {
      const newXp = prev.xp + amount;
      const newLevel = calculateLevel(newXp);
      const levelChanged = newLevel > prev.level;
      if (levelChanged) {
        console.log(`Level Up! Reached Level ${newLevel}`);
      }
      setLastEarnedXp(amount);
      setTimeout(() => setLastEarnedXp(null), 3000); 
      return { ...prev, xp: newXp, level: newLevel };
    });
  }, []);

  const awardBadge = useCallback((badgeId: BadgeId) => {
    setUserData(prev => {
      if (!prev.badges.includes(badgeId)) {
        console.log(`Badge awarded: ${badgeId}`);
        setNewlyAwardedBadge(badgeId);
        setTimeout(() => setNewlyAwardedBadge(null), 5000); 
        return { ...prev, badges: [...prev.badges, badgeId] };
      }
      return prev;
    });
  }, []);
  
  const checkAndAwardRoadmapBadges = useCallback(() => {
    const completedTasks = userData.completedRoadmapTasks;
   
    NEW_ROADMAP_DATA.forEach(phase => {
        if (phase.id === "deliverables") return; 

        const phaseTasks = phase.categories.flatMap(cat => cat.items.map(item => item.id));
        const allPhaseTasksCompleted = phaseTasks.every(taskId => completedTasks.includes(taskId));

        if (allPhaseTasksCompleted) {
            if (phase.id === "phase1" && !userData.badges.includes(BadgeId.Phase1Complete)) awardBadge(BadgeId.Phase1Complete);
            if (phase.id === "phase2" && !userData.badges.includes(BadgeId.Phase2Complete)) awardBadge(BadgeId.Phase2Complete);
            if (phase.id === "phase3" && !userData.badges.includes(BadgeId.Phase3Complete)) awardBadge(BadgeId.Phase3Complete);
            if (phase.id === "phase4" && !userData.badges.includes(BadgeId.Phase4Complete)) awardBadge(BadgeId.Phase4Complete);
        }
    });
    
    const allRoadmapTasks = NEW_ROADMAP_DATA.flatMap(p => p.categories.flatMap(c => c.items.map(i => i.id)));
    if (allRoadmapTasks.every(taskId => completedTasks.includes(taskId)) && !userData.badges.includes(BadgeId.RoadmapConqueror)) {
        awardBadge(BadgeId.RoadmapConqueror);
    }

  }, [userData.completedRoadmapTasks, userData.badges, awardBadge]);

  const checkAndAwardBadges = useCallback(() => {
    if(!userData.settings.pauseStreaks) {
        if (userData.currentStreak >= 10 && !userData.badges.includes(BadgeId.StreakDemon10)) awardBadge(BadgeId.StreakDemon10);
        else if (userData.currentStreak >= 5 && !userData.badges.includes(BadgeId.StreakDemon5)) awardBadge(BadgeId.StreakDemon5);
    }
    
    if (userData.journalEntries.length >= 10 && !userData.badges.includes(BadgeId.Journalist10)) awardBadge(BadgeId.Journalist10);
    else if (userData.journalEntries.length >= 5 && !userData.badges.includes(BadgeId.Journalist5)) awardBadge(BadgeId.Journalist5);
    
    const completedProjects = userData.projects.filter(p => p.status === 'Completed').length;
    if (completedProjects >= 3 && !userData.badges.includes(BadgeId.ProjectAdept)) awardBadge(BadgeId.ProjectAdept);
    else if (completedProjects >= 1 && !userData.badges.includes(BadgeId.ProjectNovice)) awardBadge(BadgeId.ProjectNovice);

    const masteredSkills = userData.skills.filter(s => s.currentHours >= s.targetHours).length;
    if (masteredSkills >= 3 && !userData.badges.includes(BadgeId.SkillProdigy)) awardBadge(BadgeId.SkillProdigy);
    else if (masteredSkills >= 1 && !userData.badges.includes(BadgeId.SkillLearner)) awardBadge(BadgeId.SkillLearner);
    
    const totalHours = userData.skills.reduce((sum, s) => sum + s.currentHours, 0);
    if (totalHours >= 100 && !userData.badges.includes(BadgeId.GrindMaster100)) awardBadge(BadgeId.GrindMaster100);
    else if (totalHours >= 50 && !userData.badges.includes(BadgeId.GrindMaster50)) awardBadge(BadgeId.GrindMaster50);

    const ragSkill = userData.skills.find(s => s.id === 'rag');
    if (ragSkill && ragSkill.currentHours >= ragSkill.targetHours && !userData.badges.includes(BadgeId.RAGTitan)) {
        awardBadge(BadgeId.RAGTitan);
    }
    checkAndAwardRoadmapBadges();

  }, [userData, awardBadge, checkAndAwardRoadmapBadges]);


  useEffect(() => {
    checkAndAwardBadges();
  }, [userData.currentStreak, userData.journalEntries.length, userData.projects, userData.skills, userData.completedRoadmapTasks, checkAndAwardBadges]);


  const addJournalEntry = useCallback((entry: Omit<JournalEntry, 'id' | 'date'>, aiFeedback?: string) => {
    setUserData(prev => {
      const today = new Date().toISOString().split('T')[0];
      let newStreak = prev.currentStreak;
      
      if (!prev.settings.pauseStreaks) { 
        if (prev.lastJournalDate) {
          const lastDate = new Date(prev.lastJournalDate);
          const todayDate = new Date(today);
          const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1; 
          }
        } else {
          newStreak = 1; 
        }
      }
      
      const newEntry: JournalEntry = {
        ...entry,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        aiFeedback: aiFeedback,
      };

      let xpGained = XP_PER_JOURNAL_ENTRY;
      
      const updatedSkills = [...prev.skills];
      entry.hoursGrinded.forEach(grind => {
        const skillIndex = updatedSkills.findIndex(s => s.id === grind.skillId);
        if (skillIndex !== -1) {
          const oldHours = updatedSkills[skillIndex].currentHours;
          updatedSkills[skillIndex].currentHours = Math.min(updatedSkills[skillIndex].targetHours, oldHours + grind.hours);
          xpGained += grind.hours * XP_PER_HOUR_GRIND;
          if (updatedSkills[skillIndex].currentHours >= updatedSkills[skillIndex].targetHours && oldHours < updatedSkills[skillIndex].targetHours) {
            xpGained += XP_PER_SKILL_MASTERED; 
          }
        }
      });

      xpGained += entry.socialPosts.length * XP_PER_SOCIAL_POST;
      
      addXp(xpGained);

      return {
        ...prev,
        journalEntries: [newEntry, ...prev.journalEntries],
        lastJournalDate: prev.settings.pauseStreaks ? prev.lastJournalDate : today, 
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        skills: updatedSkills,
        socialStats: {
            ...prev.socialStats,
            xPosts: prev.socialStats.xPosts + entry.socialPosts.filter(url => url.toLowerCase().includes('x.com') || url.toLowerCase().includes('twitter.com')).length
        }
      };
    });
  }, [addXp, userData.settings.pauseStreaks]); 

  const updateSkillProgress = useCallback((skillId: string, hoursToAdd: number) => {
    setUserData(prev => {
      const updatedSkills = prev.skills.map(skill => {
        if (skill.id === skillId) {
          const newHours = Math.min(skill.targetHours, skill.currentHours + hoursToAdd);
          if (newHours >= skill.targetHours && skill.currentHours < skill.targetHours) {
            addXp(XP_PER_SKILL_MASTERED); 
          }
          return { ...skill, currentHours: newHours };
        }
        return skill;
      });
      addXp(hoursToAdd * XP_PER_HOUR_GRIND);
      return { ...prev, skills: updatedSkills };
    });
  }, [addXp]);

  const updateProjectStatus = useCallback((projectId: string, status: Project['status']) => {
    setUserData(prev => {
      const updatedProjects = prev.projects.map(proj => {
        if (proj.id === projectId) {
          if (status === 'Completed' && proj.status !== 'Completed') {
             addXp(XP_PER_PROJECT_COMPLETED);
          }
          return { ...proj, status };
        }
        return proj;
      });
      return { ...prev, projects: updatedProjects };
    });
  }, [addXp]);
  
  const toggleSoundEffects = useCallback(() => {
    setUserData(prev => ({
      ...prev,
      settings: { ...prev.settings, soundEffects: !prev.settings.soundEffects }
    }));
  }, []);

  const togglePauseStreaks = useCallback(() => {
    setUserData(prev => {
        const newPauseState = !prev.settings.pauseStreaks;
        let updatedStreak = prev.currentStreak;
       
        if (newPauseState === false && prev.lastJournalDate) { 
            const lastDate = new Date(prev.lastJournalDate);
            const todayDate = new Date(new Date().toISOString().split('T')[0]);
            const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 1) {
                updatedStreak = 0; 
            }
        }
        return {
            ...prev,
            settings: { ...prev.settings, pauseStreaks: newPauseState },
            currentStreak: updatedStreak,
        };
    });
  }, []);

  const toggleSocraticAi = useCallback(() => {
    setUserData(prev => ({
      ...prev,
      settings: { ...prev.settings, socraticAiEnabled: !prev.settings.socraticAiEnabled }
    }));
  }, []);

  const openSocraticModal = useCallback((task: RoadmapItem) => {
    setSocraticInteraction({
      isOpen: true,
      task,
      question: null,
      userReflection: "",
      isLoadingQuestion: true,
    });
  }, []);

  const closeSocraticModal = useCallback(() => {
    setSocraticInteraction(prev => ({ ...prev, isOpen: false, task: null, isLoadingQuestion: false }));
  }, []);

  const setSocraticQuestion = useCallback((question: string) => {
    setSocraticInteraction(prev => ({ ...prev, question, isLoadingQuestion: false }));
  }, []);
  
  const setSocraticReflection = useCallback((reflection: string) => {
    setSocraticInteraction(prev => ({ ...prev, userReflection: reflection }));
  }, []);


  const resetUserDataHook = useCallback(() => {
    const newUserData = resetDataService();
    setUserData(newUserData);
    setLastEarnedXp(null);
    setNewlyAwardedBadge(null);
  }, []);

  const updateUserName = useCallback((newName: string) => {
    setUserData(prev => ({ ...prev, userName: newName }));
  }, []);

  const toggleRoadmapTask = useCallback((taskId: string, taskXp: number, taskItem?: RoadmapItem) => {
    let taskJustCompleted = false;
    setUserData(prev => {
      const completedTasks = prev.completedRoadmapTasks;
      let newCompletedTasks;
      let xpChange = 0;

      if (completedTasks.includes(taskId)) {
        newCompletedTasks = completedTasks.filter(id => id !== taskId);
        xpChange = -taskXp; 
      } else {
        newCompletedTasks = [...completedTasks, taskId];
        xpChange = taskXp; 
        taskJustCompleted = true;
      }
      addXp(xpChange);
      return { ...prev, completedRoadmapTasks: newCompletedTasks };
    });

    if (taskJustCompleted && userData.settings.socraticAiEnabled && taskItem) {
      openSocraticModal(taskItem);
    }
  }, [addXp, userData.settings.socraticAiEnabled, openSocraticModal]);

  return { 
    userData, 
    addJournalEntry, 
    updateSkillProgress, 
    updateProjectStatus, 
    addXp, 
    awardBadge,
    toggleSoundEffects,
    togglePauseStreaks, 
    toggleSocraticAi, // Exposed
    resetUserData: resetUserDataHook, 
    lastEarnedXp,
    newlyAwardedBadge,
    updateUserName,
    toggleRoadmapTask, 
    socraticInteraction, // Exposed
    openSocraticModal,    // Exposed
    closeSocraticModal,   // Exposed
    setSocraticQuestion,  // Exposed
    setSocraticReflection,// Exposed
  };
};