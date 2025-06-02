import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { JournalEntry, RoadmapItem } from '../types';
import { API_KEY_ERROR_MESSAGE, GEMINI_MODEL_TEXT, GEMINI_SYSTEM_INSTRUCTION_JOURNAL } from '../constants';

let ai: GoogleGenAI | null = null;
const apiKey = process.env.API_KEY;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
} else {
  console.warn(API_KEY_ERROR_MESSAGE);
}

export const getAIFeedbackForJournal = async (entry: JournalEntry): Promise<string> => {
  if (!ai) {
    return "AI feedback disabled: API key not configured.";
  }

  const { dominatedTasks, hoursGrinded, projectsWorkedOn, challengesToCrush, mood, socialPosts } = entry;
  
  const hoursSummary = hoursGrinded.map(h => `${h.skillId}: ${h.hours}h`).join(', ');

  const promptContent = `
    Student's Journal Entry:
    - Tasks Dominated: ${dominatedTasks.join(', ') || 'None specified'}
    - Hours of Grind: ${hoursSummary || 'None specified'}
    - Projects Worked On: ${projectsWorkedOn || 'None specified'}
    - Challenges to Crush Next: ${challengesToCrush || 'None specified'}
    - Social Posts (URLs): ${socialPosts.join(', ') || 'None specified'}
    - Current Mood: ${mood}
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: promptContent,
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION_JOURNAL,
        temperature: 0.7, // Moderately creative but focused
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error getting AI feedback from Gemini:", error);
    return "Error connecting to AI coach. Are you connected to the matrix?";
  }
};

export const getSocraticQuestion = async (task: RoadmapItem): Promise<string> => {
  if (!ai) {
    return "Socratic AI disabled: API key not configured.";
  }
  
  const systemInstruction = `You are a Socratic AI Tutor. A student has just reported completing a task related to '${task.type}' described as: '${task.text}${task.subText ? ` (${task.subText})` : ''}'. Ask them one concise, insightful, open-ended Socratic question to help them reflect deeply on what they've learned or how they approached it. The question should stimulate critical thinking and be under 200 characters. Do not ask for a summary of the task. Frame it as a direct question to the student.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_TEXT, // Using flash model as requested
      contents: `Task completed: ${task.text}`, // Simple content, system instruction carries the weight
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.75, 
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error getting Socratic question from Gemini:", error);
    return "Error connecting to Socratic AI. Perhaps the Oracle is busy?";
  }
};


export const isGeminiAvailable = (): boolean => !!ai;