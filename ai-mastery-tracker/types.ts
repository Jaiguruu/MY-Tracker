export interface Skill {
  id: string;
  name: string;
  currentHours: number;
  targetHours: number;
  category: string; // e.g., NLP, RAG, General AI
}

export enum Mood {
  Unstoppable = "Unstoppable",
  Neutral = "Neutral",
  Tired = "Tired",
}

export interface JournalEntry {
  id: string;
  date: string; // ISO string
  dominatedTasks: string[]; // Could be skill IDs or custom tasks
  hoursGrinded: Array<{ skillId: string, hours: number }>;
  projectsWorkedOn: string; // Text description
  challengesToCrush: string; // Text description
  socialPosts: string[]; // URLs
  mood: Mood;
  aiFeedback?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "Not Started" | "In Progress" | "Completed";
  linkedSkills: string[]; // IDs of skills
}

export enum BadgeId {
  RAGTitan = "RAG_TITAN",
  StreakDemon5 = "STREAK_DEMON_5",
  StreakDemon10 = "STREAK_DEMON_10",
  ProjectNovice = "PROJECT_NOVICE",
  ProjectAdept = "PROJECT_ADEPT",
  GrindMaster50 = "GRIND_MASTER_50H", // 50 total hours
  GrindMaster100 = "GRIND_MASTER_100H", // 100 total hours
  Journalist5 = "JOURNALIST_5", // 5 journal entries
  Journalist10 = "JOURNALIST_10", // 10 journal entries
  SkillLearner = "SKILL_LEARNER", // Learned 1 skill
  SkillProdigy = "SKILL_PRODIGY", // Learned 3 skills
  Phase1Complete = "PHASE_1_COMPLETE",
  Phase2Complete = "PHASE_2_COMPLETE",
  Phase3Complete = "PHASE_3_COMPLETE",
  Phase4Complete = "PHASE_4_COMPLETE",
  RoadmapConqueror = "ROADMAP_CONQUEROR", // All tasks in new roadmap done
}

export interface Badge {
  id: BadgeId;
  name: string;
  description: string;
  icon: string; // SVG or emoji
  achievedDate?: string; // ISO string
}

export interface UserData {
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastJournalDate?: string; // ISO string (date part only)
  skills: Skill[];
  projects: Project[];
  journalEntries: JournalEntry[];
  badges: BadgeId[];
  socialStats: {
    xPosts: number;
    mediumArticles: number;
    linkedInConnections: number;
  };
  settings: {
    soundEffects: boolean;
    theme: "cyberpunk-default"; // Future themes can be added
    pauseStreaks: boolean; 
    socraticAiEnabled: boolean; // Added for Socratic AI Teacher
  };
  userName: string;
  completedRoadmapTasks: string[]; // Stores IDs of completed RoadmapItems
}

// For Recharts
export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

export interface HeatmapDataPoint {
  date: string; // YYYY-MM-DD
  count: number; // e.g., hours grinded or entries made
}

// New Roadmap Structure Types
export type RoadmapItemType = 
  | 'Skill' 
  | 'AI Basics'
  | 'Soft Skills'
  | 'Resource' 
  | 'Project' 
  | 'Branding' 
  | 'EvilEdge' 
  | 'Milestone'
  | 'NLP'
  | 'System Design'
  | 'RAG'
  | 'MLOps'
  | 'Agentic AI'
  | 'MCP'
  | 'Interview Prep'
  | 'Deliverables';

export interface RoadmapItem {
  id: string; // Unique ID for the task, e.g., "p1-s1"
  text: string; // Main description of the task
  subText?: string; // Additional details, e.g., "Python (Pandas, FastAPI)..."
  type: RoadmapItemType;
  xp: number; // XP awarded for completing this item
  url?: string; // URL for resources or further information
  // `completed` status will be derived from `userData.completedRoadmapTasks`
}

export interface RoadmapCategoryContent {
  id: string; // Unique ID for the category, e.g., "p1-cat-skills"
  title: string; // Title of the category, e.g., "Skills", "Resources"
  items: RoadmapItem[];
}

export interface RoadmapPhase {
  id: string; // Unique ID for the phase, e.g., "phase1"
  title: string; // Title of the phase, e.g., "Phase 1: Foundations (June–Aug 2025)"
  objective?: string; // Objective description for the phase
  categories: RoadmapCategoryContent[];
}

export type RoadmapStructure = RoadmapPhase[];

// For Socratic AI Interaction
export interface SocraticInteractionState {
  isOpen: boolean;
  task: RoadmapItem | null; // The task being reflected upon
  question: string | null;
  userReflection: string;
  isLoadingQuestion: boolean;
}