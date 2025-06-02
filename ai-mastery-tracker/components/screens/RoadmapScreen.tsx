import React from 'react';
import { useUserData } from '../../hooks/useUserData';
import { NEW_ROADMAP_DATA } from '../../roadmapData';
import { RoadmapItem as RoadmapItemTypeInterface, RoadmapCategoryContent, RoadmapPhase as RoadmapPhaseTypeInterface } from '../../types'; // Renamed to avoid conflict
import { CheckSquare, Square, ExternalLinkIcon, TargetIcon } from '../icons/LucideIcons'; 

interface RoadmapItemProps {
  item: RoadmapItemTypeInterface;
  isCompleted: boolean;
  onToggle: (itemId: string, itemXp: number) => void;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ item, isCompleted, onToggle }) => {
  const isEvilEdge = item.type === 'EvilEdge';
  return (
    <div 
      className={`mb-2 p-3 rounded-md transition-all duration-200 cursor-pointer flex items-start space-x-3
                  ${isCompleted ? (isEvilEdge ? 'bg-red-500/20 border-l-4 border-red-500' : 'bg-green-500/20 border-l-4 border-green-500') : 'bg-slate-800/40 hover:bg-slate-700/60 border-l-4 border-transparent'}
                  ${isEvilEdge && !isCompleted ? 'neon-border-red border-l-4 border-red-500' : ''}
                 `}
      onClick={() => onToggle(item.id, item.xp)}
    >
      <div>
        {isCompleted ? <CheckSquare className={`w-5 h-5 ${isEvilEdge ? 'text-red-400' : 'text-green-400'} mt-1`} /> : <Square className="w-5 h-5 text-sky-400 mt-1" />}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <span className={`font-semibold ${isEvilEdge ? 'neon-text-red' : 'text-slate-100'}`}>
            {item.text}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${isEvilEdge ? 'bg-red-500/30 text-red-300' : 'bg-slate-700/50 text-sky-300'}`}>
            {item.type} | +{item.xp} XP
          </span>
        </div>
        {item.subText && <p className="text-xs text-sky-400 mt-0.5">{item.subText}</p>}
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} 
            className="text-xs text-sky-400 hover:text-sky-300 hover:underline inline-flex items-center mt-1"
          >
            <ExternalLinkIcon className="w-3 h-3 mr-1" />
            Access Resource
          </a>
        )}
      </div>
    </div>
  );
};

const RoadmapCategory: React.FC<{ category: RoadmapCategoryContent, completedTasks: string[], onToggleTask: (itemId: string, itemXp: number) => void }> = ({ category, completedTasks, onToggleTask }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-orbitron text-green-400 neon-text-green mb-2 pl-1 border-b-2 border-green-800/50 pb-1">
        {category.title}
      </h3>
      {category.items.map(item => (
        <RoadmapItem 
          key={item.id} 
          item={item} 
          isCompleted={completedTasks.includes(item.id)} 
          onToggle={onToggleTask} 
        />
      ))}
    </div>
  );
};

const RoadmapPhase: React.FC<{ phase: RoadmapPhaseTypeInterface, completedTasks: string[], onToggleTask: (itemId: string, itemXp: number) => void }> = ({ phase, completedTasks, onToggleTask }) => {
  const [isExpanded, setIsExpanded] = React.useState(phase.id === "phase1"); 

  const totalTasksInPhase = phase.categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedTasksInPhase = phase.categories.reduce((sum, cat) => 
    sum + cat.items.filter(item => completedTasks.includes(item.id)).length, 0);
  const phaseProgress = totalTasksInPhase > 0 ? (completedTasksInPhase / totalTasksInPhase) * 100 : 0;

  const phaseTitleColor = phase.id === "deliverables" ? "neon-text-green" : "neon-text-blue";
  const phaseBorderColor = phase.id === "deliverables" ? "neon-border-green" : "neon-border-blue";
  const phaseProgressBarGradient = phase.id === "deliverables" ? "from-green-500 to-teal-600" : "from-sky-500 to-blue-600";


  return (
    <div className={`glassmorphism p-4 md:p-6 rounded-lg shadow-xl border-2 ${phaseBorderColor} mb-6`}>
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className={`text-2xl font-orbitron ${phaseTitleColor}`}>
          {phase.title}
        </h2>
        <span className="text-sm text-sky-300 font-orbitron">{phaseProgress.toFixed(0)}% Done</span>
      </div>
      {phase.objective && <p className="text-sky-300 mt-1 mb-3 italic">{phase.objective}</p>}
      
      <div className={`w-full bg-slate-800/50 rounded-full h-2.5 my-2 border ${phase.id === "deliverables" ? "border-green-500/30" : "border-sky-500/30"}`}>
        <div
          className={`bg-gradient-to-r ${phaseProgressBarGradient} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${phaseProgress}%` }}
        ></div>
      </div>

      {isExpanded && (
        <div className="mt-4">
          {phase.categories.map(category => (
            <RoadmapCategory 
              key={category.id} 
              category={category} 
              completedTasks={completedTasks} 
              onToggleTask={onToggleTask} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const RoadmapScreen: React.FC = () => {
  const { userData, toggleRoadmapTask } = useUserData();
  
  const allRoadmapItems = NEW_ROADMAP_DATA.flatMap(phase => phase.categories.flatMap(cat => cat.items));
  const totalRoadmapTasks = allRoadmapItems.length;
  const completedCount = allRoadmapItems.filter(item => userData.completedRoadmapTasks.includes(item.id)).length;
  const overallProgress = totalRoadmapTasks > 0 ? (completedCount / totalRoadmapTasks) * 100 : 0;

  return (
    <div className="p-4 md:p-6 custom-scrollbar h-full overflow-y-auto pb-24 md:pb-6">
      <header className="mb-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-orbitron neon-text-green flex items-center">
                <TargetIcon className="w-8 h-8 mr-3 text-green-400"/>
                12-Month AI Mastery Codex
            </h1>
            <div className="text-right">
                <p className="text-xl font-orbitron neon-text-blue">{overallProgress.toFixed(1)}% Annihilated</p>
                <p className="text-xs text-sky-300">{completedCount} / {totalRoadmapTasks} Directives Executed</p>
            </div>
        </div>
        <p className="text-sky-300 mt-1">Your path to AI Godhood. Execute each directive. No weakness permitted.</p>
      </header>

      {NEW_ROADMAP_DATA.map(phase => (
        <RoadmapPhase 
          key={phase.id} 
          phase={phase} 
          completedTasks={userData.completedRoadmapTasks} 
          onToggleTask={toggleRoadmapTask} 
        />
      ))}
    </div>
  );
};

export default RoadmapScreen;