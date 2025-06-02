
import { Skill, Project, Badge, BadgeId, Mood } from './types';

export const APP_NAME = "AI Mastery Tracker";
export const API_KEY_ERROR_MESSAGE = "API_KEY environment variable not set. AI features will be disabled.";

export const INITIAL_SKILLS: Skill[] = [
  { id: "nlp", name: "Natural Language Processing", currentHours: 0, targetHours: 100, category: "NLP" },
  { id: "rag", name: "Retrieval Augmented Generation", currentHours: 0, targetHours: 80, category: "RAG" },
  { id: "langchain", name: "LangChain", currentHours: 0, targetHours: 60, category: "Frameworks" },
  { id: "python", name: "Python for AI", currentHours: 0, targetHours: 150, category: "Programming" },
  { id: "js", name: "JavaScript for AI/Frontend", currentHours: 0, targetHours: 70, category: "Programming" },
  { id: "iot", name: "IoT with AI", currentHours: 0, targetHours: 50, category: "Specialized" },
  { id: "agile", name: "Agile Methodologies", currentHours: 0, targetHours: 30, category: "Methodology" },
  { id: "dbms", name: "DBMS for AI", currentHours: 0, targetHours: 40, category: "Data" },
  { id: "healthcare_api", name: "Healthcare APIs & AI", currentHours: 0, targetHours: 60, category: "Domain Specific" },
  { id: "transformers", name: "Transformer Models", currentHours: 0, targetHours: 120, category: "Deep Learning" },
  { id: "agentic_ai", name: "Agentic AI Systems", currentHours: 0, targetHours: 90, category: "Advanced AI" },
];

export const INITIAL_PROJECTS: Project[] = [
  { id: "proj1", name: "AI Chatbot for Healthcare", description: "Develop an NLP-powered chatbot for patient queries.", status: "Not Started", linkedSkills: ["nlp", "python", "healthcare_api"] },
  { id: "proj2", name: "RAG-based Document Q&A", description: "Build a system to answer questions from a large document corpus using RAG.", status: "Not Started", linkedSkills: ["rag", "langchain", "transformers"] },
  { id: "proj3", name: "IoT Predictive Maintenance", description: "Use AI to predict equipment failure in an IoT setup.", status: "Not Started", linkedSkills: ["iot", "python", "dbms"] },
];

export const XP_PER_HOUR_GRIND = 10;
export const XP_PER_JOURNAL_ENTRY = 50;
export const XP_PER_PROJECT_COMPLETED = 200;
export const XP_PER_SKILL_MASTERED = 150;
export const XP_PER_SOCIAL_POST = 20; // For linking a post

export const LEVELS_XP_THRESHOLDS = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000, 5000, 7500, 10000, 15000, 20000]; // XP needed for each level, extended

export const ALL_BADGES: Badge[] = [
  { id: BadgeId.RAGTitan, name: "RAG Titan", description: "Mastered Retrieval Augmented Generation.", icon: "🏆", },
  { id: BadgeId.StreakDemon5, name: "Streak Demon (5 Days)", description: "Maintained a 5-day journal streak.", icon: "🔥", },
  { id: BadgeId.StreakDemon10, name: "Streak Demon (10 Days)", description: "Maintained a 10-day journal streak.", icon: "🔥🔥", },
  { id: BadgeId.ProjectNovice, name: "Project Novice", description: "Completed your first project.", icon: "🛠️", },
  { id: BadgeId.ProjectAdept, name: "Project Adept", description: "Completed 3 projects.", icon: "🚀", },
  { id: BadgeId.GrindMaster50, name: "Grind Master (50h)", description: "Logged 50 hours of grind.", icon: "💪", },
  { id: BadgeId.GrindMaster100, name: "Grind Master (100h)", description: "Logged 100 hours of grind.", icon: "🏋️", },
  { id: BadgeId.Journalist5, name: "Journalist (5 entries)", description: "Submitted 5 journal entries.", icon: "✍️", },
  { id: BadgeId.Journalist10, name: "Journalist (10 entries)", description: "Submitted 10 journal entries.", icon: "📜", },
  { id: BadgeId.SkillLearner, name: "Skill Learner", description: "Mastered your first skill.", icon: "🧠" },
  { id: BadgeId.SkillProdigy, name: "Skill Prodigy", description: "Mastered 3 different skills.", icon: "🌟" },
  { id: BadgeId.Phase1Complete, name: "Phase 1 Vanguard", description: "Conquered Foundations Phase.", icon: "🛡️" },
  { id: BadgeId.Phase2Complete, name: "Phase 2 Dominator", description: "Dominated NLP & System Design.", icon: "📡" },
  { id: BadgeId.Phase3Complete, name: "Phase 3 Architect", description: "Engineered RAG & MLOps.", icon: "🏗️" },
  { id: BadgeId.Phase4Complete, name: "Phase 4 Overlord", description: "Mastered Agentic AI & Interviews.", icon: "👑" },
  { id: BadgeId.RoadmapConqueror, name: "Codex Conqueror", description: "Completed all directives in the AI Mastery Codex.", icon: "🌌" }
];

export const THREAT_QUOTES = [
  "You're not just coding; you're architecting dominance.",
  "Every line of code is a step towards AI godhood.",
  "The system fears your progress. Keep grinding.",
  "Your aura of menace grows with each commit.",
  "Mediocrity is for mortals. You're building a legacy.",
  "Unleash the beast. The AI world isn't ready.",
  "They call it obsession. You call it Tuesday.",
  "Become the signal in the noise.",
  "Your grind is a weapon. Wield it."
];

export const MOOD_OPTIONS = Object.values(Mood);

export const POMODORO_DURATION_MINUTES = 25;
export const POMODORO_BREAK_MINUTES = 5;

export const SOCIAL_POST_TEMPLATES = [
  { title: "NLP Beast Unleashed", content: "Just deployed an NLP beast that's changing the game. The future is now, and I'm building it. #AI #NLP #Innovation #FearMyGrind" },
  { title: "RAG System Online", content: "My new RAG system is pulling insights like a digital god. Data has nowhere to hide. #RAG #AIdeveloper #BigData #KnowledgeIsPower" },
  { title: "Project Milestone Crushed", content: "Another AI project milestone crushed. On the path to global #AI domination. What are you building today? #TechGrind #FutureIsAI" },
];

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';
export const GEMINI_SYSTEM_INSTRUCTION_JOURNAL = "You are a menacing but motivating AI coach for a B.Tech CS student on a quest for 'god-tier' AI engineer status. Their goal is to dominate the AI field by 2027. Respond to their daily journal entry with a cyberpunk vibe, using strong, motivating language. If they mention specific skills (like NLP, RAG, LangChain), give targeted feedback. Keep it brief, 2-3 sentences. Refer to them as 'titan', 'operative', or 'architect of the future'.";

export const JOURNAL_SUBMISSION_SOUND_PATH = "/assets/sounds/ding.mp3"; 
export const MILESTONE_ROAR_SOUND_PATH = "/assets/sounds/roar.mp3";
 // Placeholder sound paths. Actual audio files would need to be added to a public/assets folder.
 // For web, ensure these are accessible.
