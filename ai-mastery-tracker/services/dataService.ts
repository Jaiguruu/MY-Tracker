import { UserData, Skill, Project, BadgeId, JournalEntry, Mood } from '../types';
import { INITIAL_SKILLS, INITIAL_PROJECTS, LEVELS_XP_THRESHOLDS } from '../constants';

const USER_DATA_KEY = 'aiMasteryTrackerUserData';

const getDefaultUserData = (userName: string = "Operative"): UserData => ({
  xp: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  skills: JSON.parse(JSON.stringify(INITIAL_SKILLS)), // Deep copy
  projects: JSON.parse(JSON.stringify(INITIAL_PROJECTS)), // Deep copy
  journalEntries: [],
  badges: [],
  socialStats: {
    xPosts: 0,
    mediumArticles: 0,
    linkedInConnections: 0,
  },
  settings: {
    soundEffects: true,
    theme: "cyberpunk-default",
    pauseStreaks: false, 
    socraticAiEnabled: false, // Added default for Socratic AI
  },
  userName: userName,
  completedRoadmapTasks: [], // Initialize completedRoadmapTasks
});

export const loadUserData = (): UserData => {
  try {
    const storedData = localStorage.getItem(USER_DATA_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData) as UserData;
      // Ensure all default fields are present if migrating from older versions
      const defaultData = getDefaultUserData(parsedData.userName || "Operative");
      return {
        ...defaultData,
        ...parsedData,
        settings: { 
          ...defaultData.settings, 
          ...(parsedData.settings || {}),
          socraticAiEnabled: typeof parsedData.settings?.socraticAiEnabled === 'boolean' ? parsedData.settings.socraticAiEnabled : defaultData.settings.socraticAiEnabled, // ensure socraticAiEnabled exists
        },
        skills: parsedData.skills && parsedData.skills.length > 0 ? parsedData.skills : defaultData.skills,
        projects: parsedData.projects && parsedData.projects.length > 0 ? parsedData.projects : defaultData.projects,
        completedRoadmapTasks: parsedData.completedRoadmapTasks || [],
      };
    }
    // Prompt for username on first load or if not set
    let userName = localStorage.getItem('aiMasteryUserName');
    if (!userName) {
        userName = prompt("Enter your operative codename:", "Operative") || "Operative";
        localStorage.setItem('aiMasteryUserName', userName);
    }
    return getDefaultUserData(userName);
  } catch (error) {
    console.error("Failed to load user data from localStorage:", error);
    return getDefaultUserData(localStorage.getItem('aiMasteryUserName') || "Operative");
  }
};

export const saveUserData = (userData: UserData): void => {
  try {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    if(userData.userName) {
        localStorage.setItem('aiMasteryUserName', userData.userName);
    }
  } catch (error) {
    console.error("Failed to save user data to localStorage:", error);
  }
};

export const resetUserData = (): UserData => {
    const userName = localStorage.getItem('aiMasteryUserName') || "Operative";
    const defaultData = getDefaultUserData(userName);
    saveUserData(defaultData);
    return defaultData;
};

// Helper to calculate level based on XP
export const calculateLevel = (xp: number): number => {
  for (let i = LEVELS_XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS_XP_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
};