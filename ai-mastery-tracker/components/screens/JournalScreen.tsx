import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useUserData } from '../../hooks/useUserData';
import { JournalEntry, Mood, Skill } from '../../types';
import NeonButton from '../NeonButton';
import { getAIFeedbackForJournal, isGeminiAvailable } from '../../services/geminiService';
import { MOOD_OPTIONS, JOURNAL_SUBMISSION_SOUND_PATH, API_KEY_ERROR_MESSAGE } from '../../constants';
import Modal from '../Modal';
import { SendIcon, ListChecksIcon, ZapIcon } from '../icons/LucideIcons';

interface JournalFormData {
  dominatedTasksText: string;
  hoursGrinded: Array<{ skillId: string; hours: number }>;
  projectsWorkedOn: string;
  challengesToCrush: string;
  socialPostsText: string;
  mood: Mood;
}

// Helper type to get keys of TFormValues whose values are strings
type StringFieldValueKeys<TFormValues> = {
  [K in keyof TFormValues]: TFormValues[K] extends string ? K : never;
}[keyof TFormValues];

const JournalScreen: React.FC = () => {
  const { userData, addJournalEntry } = useUserData();
  const [isLoadingAiFeedback, setIsLoadingAiFeedback] = useState(false);
  const [aiFeedbackResult, setAiFeedbackResult] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [geminiStatus, setGeminiStatus] = useState(isGeminiAvailable());

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<JournalFormData>({
    defaultValues: {
      dominatedTasksText: '',
      hoursGrinded: [{ skillId: userData.skills[0]?.id || '', hours: 1 }],
      projectsWorkedOn: '',
      challengesToCrush: '',
      socialPostsText: '',
      mood: Mood.Neutral,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "hoursGrinded"
  });

  const onSubmit: SubmitHandler<JournalFormData> = async (data) => {
    setIsLoadingAiFeedback(true);
    setAiFeedbackResult(null);

    const dominatedTasksArray = data.dominatedTasksText.split(',').map(task => task.trim()).filter(task => task.length > 0);
    const socialPostsArray = data.socialPostsText.split(',').map(url => url.trim()).filter(url => url.length > 0);

    const newEntryData: Omit<JournalEntry, 'id' | 'date' | 'aiFeedback'> = {
      dominatedTasks: dominatedTasksArray,
      hoursGrinded: data.hoursGrinded.filter(h => h.skillId && h.hours > 0),
      projectsWorkedOn: data.projectsWorkedOn,
      challengesToCrush: data.challengesToCrush,
      socialPosts: socialPostsArray,
      mood: data.mood,
    };

    let feedbackFromAI: string | undefined;
    if (geminiStatus) {
      try {
        feedbackFromAI = await getAIFeedbackForJournal(newEntryData as JournalEntry);
        setAiFeedbackResult(feedbackFromAI);
      } catch (e) {
        console.error("AI feedback fetch error:", e);
        setAiFeedbackResult("Failed to get AI feedback. Connection unstable?");
      }
    } else {
       setAiFeedbackResult(API_KEY_ERROR_MESSAGE);
    }
    
    addJournalEntry(newEntryData, feedbackFromAI);
    
    if (userData.settings.soundEffects) {
      new Audio(JOURNAL_SUBMISSION_SOUND_PATH).play().catch(e => console.warn("Audio play failed:", e));
    }
    
    setShowSuccessModal(true);
    setIsLoadingAiFeedback(false);
    reset({
        dominatedTasksText: '',
        hoursGrinded: [{ skillId: userData.skills[0]?.id || '', hours: 1 }],
        projectsWorkedOn: '',
        challengesToCrush: '',
        socialPostsText: '',
        mood: Mood.Neutral,
    });
  };
  
  useEffect(() => {
    setGeminiStatus(isGeminiAvailable());
  }, []);


  const renderInputField = (
    name: StringFieldValueKeys<JournalFormData>, // Use the restricted type for 'name'
    label: string,
    placeholder: string,
    type: string = "text",
    isTextarea: boolean = false
  ) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-orbitron text-sky-300 mb-1">{label}</label>
      <Controller
        name={name} // 'name' is now guaranteed to be a key for a string field
        control={control}
        rules={{ required: name !== 'socialPostsText' && name !== 'projectsWorkedOn' && name !== 'challengesToCrush' }}
        render={({ field }) => ( // field.value will be inferred as 'string'
          isTextarea ? (
            <textarea
              {...field} // field.value is now correctly 'string'
              id={name}
              placeholder={placeholder}
              rows={2}
              className="w-full p-3 bg-slate-800/70 border-2 border-slate-700 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors text-slate-100 placeholder-slate-500"
            />
          ) : (
            <input
              {...field} // field.value is now correctly 'string'
              id={name}
              type={type}
              placeholder={placeholder}
              className="w-full p-3 bg-slate-800/70 border-2 border-slate-700 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors text-slate-100 placeholder-slate-500"
            />
          )
        )}
      />
      {errors[name] && <p className="text-red-400 text-xs mt-1">This field is required, operative.</p>}
    </div>
  );

  return (
    <div className="p-4 md:p-6 custom-scrollbar h-full overflow-y-auto pb-24 md:pb-6">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-orbitron neon-text-green">Daily Grind Log</h1>
        <p className="text-sky-300 mt-1">Report your conquests. The system is watching.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="glassmorphism p-6 rounded-lg shadow-xl border-2 neon-border-blue space-y-6">
        {renderInputField("dominatedTasksText", "What did you dominate today, god-tier? (comma-separated tasks)", "e.g., NLP model tuning, RAG pipeline setup")}
        
        <div>
          <label className="block text-sm font-orbitron text-sky-300 mb-1">Hours of pure grind per skill?</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2 mb-2">
              <Controller
                name={`hoursGrinded.${index}.skillId`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <select {...field} className="flex-grow p-3 bg-slate-800/70 border-2 border-slate-700 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-100">
                    <option value="">Select Skill</option>
                    {userData.skills.map((skill: Skill) => (
                      <option key={skill.id} value={skill.id}>{skill.name}</option>
                    ))}
                  </select>
                )}
              />
              <Controller
                name={`hoursGrinded.${index}.hours`}
                control={control}
                rules={{ required: true, min: 0.1, max: 12 }}
                render={({ field }) => (
                  <input type="number" {...field} step="0.5" placeholder="Hours" className="w-24 p-3 bg-slate-800/70 border-2 border-slate-700 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-100" />
                )}
              />
              <button type="button" onClick={() => remove(index)} className="text-red-400 hover:text-red-300 p-2 rounded-md bg-slate-700/50 hover:bg-red-500/30">&times;</button>
            </div>
          ))}
          <NeonButton type="button" variant="default" onClick={() => append({ skillId: userData.skills[0]?.id || '', hours: 1 })} className="text-xs py-2">
            Add Skill Grind
          </NeonButton>
          {errors.hoursGrinded && <p className="text-red-400 text-xs mt-1">Specify skill and valid hours (0.1-12).</p>}
        </div>

        {renderInputField("projectsWorkedOn", "Projects you owned?", "e.g., Agentic AI Bot v0.2", "text", true)}
        {renderInputField("challengesToCrush", "Challenges you'll crush next?", "e.g., Master multi-modal RAG", "text", true)}
        {renderInputField("socialPostsText", "X posts that flexed your aura? (comma-separated URLs)", "e.g., https://x.com/user/status/123, https://x.com/user/status/456")}
        
        <div>
          <label htmlFor="mood" className="block text-sm font-orbitron text-sky-300 mb-1">Mood: Still a menace?</label>
          <Controller
            name="mood"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select {...field} id="mood" className="w-full p-3 bg-slate-800/70 border-2 border-slate-700 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-100">
                {MOOD_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            )}
          />
        </div>

        <NeonButton type="submit" variant="green" className="w-full" disabled={isSubmitting || isLoadingAiFeedback} icon={<SendIcon />}>
          {isSubmitting || isLoadingAiFeedback ? "TRANSMITTING..." : "SUBMIT & AMPLIFY AURA"}
        </NeonButton>
      </form>
      
      {!geminiStatus && (
        <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500 text-yellow-300 rounded-md text-sm">
            {API_KEY_ERROR_MESSAGE} AI Coach feedback is currently offline.
        </div>
      )}

      {showSuccessModal && (
        <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} title="Transmission Received">
          <div className="text-center">
            <ListChecksIcon className="w-16 h-16 text-green-400 neon-text-green mx-auto mb-4" />
            <p className="text-xl font-orbitron text-slate-100 mb-2">Journal Entry Logged!</p>
            <p className="text-sky-300 mb-4">Your grind has been recorded. XP and aura boosted.</p>
            {aiFeedbackResult && (
              <div className="mt-4 p-4 bg-slate-800/50 border border-slate-600 rounded-md text-left">
                <h4 className="font-orbitron text-sky-400 neon-text-blue mb-2">AI Coach Transmission:</h4>
                <p className="text-slate-200 whitespace-pre-wrap">{aiFeedbackResult}</p>
              </div>
            )}
            <NeonButton onClick={() => setShowSuccessModal(false)} variant="blue" className="mt-6">
              Continue the Ascent
            </NeonButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default JournalScreen;