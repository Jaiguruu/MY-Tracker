import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useUserData } from '../../hooks/useUserData';
import { Skill, Project, ChartDataPoint, HeatmapDataPoint } from '../../types';
import NeonButton from '../NeonButton';
import { SOCIAL_POST_TEMPLATES, ALL_BADGES } from '../../constants';
import Modal from '../Modal';
import { ListChecksIcon, TargetIcon, ExternalLinkIcon } from '../icons/LucideIcons';

const SkillCard: React.FC<{ skill: Skill, onUpdate: (id: string, hours: number) => void }> = ({ skill, onUpdate }) => {
  const percentage = skill.targetHours > 0 ? Math.min((skill.currentHours / skill.targetHours) * 100, 100) : 0;
  const isMastered = percentage >= 100;
  const [hoursToAdd, setHoursToAdd] = useState(1);

  const handleAddHours = () => {
    if (hoursToAdd > 0 && !isMastered) {
      onUpdate(skill.id, hoursToAdd);
      setHoursToAdd(1); 
    }
  };

  return (
    <div className={`glassmorphism p-4 rounded-lg shadow-lg border-2 ${isMastered ? 'neon-border-blue' : 'neon-border-green'}`}>
      <h4 className={`font-orbitron text-lg ${isMastered ? 'neon-text-blue' : 'neon-text-green'}`}>{skill.name}</h4>
      <p className="text-xs text-sky-400 mb-1">{skill.category}</p>
      <div className="w-full bg-slate-800/50 rounded-full h-3 my-2 border border-slate-600/50">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${isMastered ? 'bg-sky-500' : 'bg-green-500'}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-slate-200 mb-2">
        {skill.currentHours.toFixed(1)} / {skill.targetHours} Hrs ({percentage.toFixed(1)}%)
      </p>
      {!isMastered && (
        <div className="flex items-center space-x-2 mt-2">
          <input 
            type="number" 
            value={hoursToAdd} 
            onChange={(e) => setHoursToAdd(parseFloat(e.target.value))} 
            min="0.5" 
            step="0.5"
            className="w-20 p-1 text-sm bg-slate-800/70 border border-slate-700 rounded-md focus:ring-1 focus:ring-green-500 text-slate-100"
          />
          <NeonButton onClick={handleAddHours} variant="green" className="text-xs px-3 py-1">Log Hours</NeonButton>
        </div>
      )}
      {isMastered && <p className="font-orbitron text-sky-400 neon-text-blue text-sm">DOMAIN MASTERED</p>}
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project, onUpdateStatus: (id: string, status: Project['status']) => void }> = ({ project, onUpdateStatus }) => {
  return (
    <div className="glassmorphism p-4 rounded-lg shadow-lg border-2 neon-border-green">
      <h4 className="font-orbitron text-lg neon-text-green">{project.name}</h4>
      <p className="text-xs text-sky-400 mb-1 h-10 overflow-y-auto custom-scrollbar">{project.description}</p>
      <p className="text-sm text-slate-200 mb-2">
        Status: <span className={`font-bold ${project.status === 'Completed' ? 'text-sky-400' : 'text-green-400'}`}>{project.status}</span>
      </p>
      <div className="flex space-x-2 mt-2">
        {(["Not Started", "In Progress", "Completed"] as Project['status'][]).map(status => (
          project.status !== status && <NeonButton 
            key={status}
            onClick={() => onUpdateStatus(project.id, status)} 
            variant={status === "Completed" ? "blue" : "default"} 
            className="text-xs px-3 py-1 flex-1"
          >
            Set: {status}
          </NeonButton>
        ))}
      </div>
    </div>
  );
};


const ProgressScreen: React.FC = () => {
  const { userData, updateSkillProgress, updateProjectStatus } = useUserData();
  const [selectedSocialTemplate, setSelectedSocialTemplate] = useState<(typeof SOCIAL_POST_TEMPLATES)[0] | null>(null);

  const skillCategories = Array.from(new Set(userData.skills.map(s => s.category)));

  const heatmapData: HeatmapDataPoint[] = React.useMemo(() => {
    const data: { [date: string]: number } = {};
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    userData.journalEntries.forEach(entry => {
      const entryDate = new Date(entry.date);
      if (entryDate >= thirtyDaysAgo) {
        const dateStr = entryDate.toISOString().split('T')[0];
        data[dateStr] = (data[dateStr] || 0) + 1; 
      }
    });
    return Object.entries(data).map(([date, count]) => ({ date, count }));
  }, [userData.journalEntries]);


  return (
    <div className="p-4 md:p-6 custom-scrollbar h-full overflow-y-auto pb-24 md:pb-6">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-orbitron neon-text-green">Progress Matrix</h1>
        <p className="text-sky-300 mt-1">Visualize your ascent. Every metric is a weapon.</p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-orbitron neon-text-blue mb-4 flex items-center"><ListChecksIcon className="w-7 h-7 mr-2"/>Skill Codex</h2>
        {skillCategories.map(category => (
          <div key={category} className="mb-6">
            <h3 className="text-xl font-orbitron text-green-300 mb-3 border-b-2 border-green-700/30 pb-1">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userData.skills.filter(s => s.category === category).map(skill => (
                <SkillCard key={skill.id} skill={skill} onUpdate={updateSkillProgress} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-orbitron neon-text-blue mb-4 flex items-center"><TargetIcon className="w-7 h-7 mr-2"/>Project Arsenal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData.projects.map(project => (
            <ProjectCard key={project.id} project={project} onUpdateStatus={updateProjectStatus} />
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-orbitron neon-text-blue mb-4">Journey Milestones</h2>
        <div className="glassmorphism p-4 rounded-lg shadow-xl border-2 neon-border-green">
          {userData.badges.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-slate-200">
              {userData.badges.map(badgeId => {
                const badgeInfo = ALL_BADGES.find(b => b.id === badgeId);
                return <li key={badgeId}>{badgeInfo?.icon} {badgeInfo?.name} - <span className="text-xs text-sky-400">{badgeInfo?.description}</span></li>;
              })}
            </ul>
          ) : (
            <p className="text-sky-400">No milestones unlocked yet. The path awaits.</p>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-orbitron neon-text-blue mb-4">Grind Consistency (Last 30 Days)</h2>
        <div className="glassmorphism p-4 rounded-lg shadow-xl border-2 neon-border-green min-h-[150px]">
          {heatmapData.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 30 }).map((_, i) => {
                 const d = new Date();
                 d.setDate(d.getDate() - (29 - i)); 
                 const dateStr = d.toISOString().split('T')[0];
                 const dataPoint = heatmapData.find(p => p.date === dateStr);
                 const intensity = dataPoint ? Math.min(dataPoint.count, 5) : 0; 
                 const colors = ['bg-slate-800/30', 'bg-green-700/40', 'bg-green-600/60', 'bg-green-500/80', 'bg-green-400', 'bg-green-300'];
                 return <div key={i} title={`${dateStr}: ${dataPoint?.count || 0} entries`} className={`w-6 h-6 rounded-sm ${colors[intensity]} border border-slate-700`}></div>;
              })}
            </div>
          ) : (
            <p className="text-sky-400 text-center py-8">Log journal entries to see your grind consistency.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-orbitron neon-text-blue mb-4 flex items-center"><ExternalLinkIcon className="w-7 h-7 mr-2"/>Aura Amplification (Social)</h2>
        <div className="glassmorphism p-4 rounded-lg shadow-xl border-2 neon-border-green">
          <p className="text-sky-300 mb-3">Broadcast your dominance. Use these templates or craft your own.</p>
          <div className="space-y-3">
            {SOCIAL_POST_TEMPLATES.map((template, index) => (
              <div key={index} className="p-3 bg-slate-800/50 rounded-md border border-slate-700">
                <h5 className="font-bold text-green-400">{template.title}</h5>
                <p className="text-sm text-slate-200 mb-2">{template.content}</p>
                <NeonButton onClick={() => setSelectedSocialTemplate(template)} variant="blue" className="text-xs px-3 py-1">
                  Copy & Amplify
                </NeonButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedSocialTemplate && (
        <Modal isOpen={!!selectedSocialTemplate} onClose={() => setSelectedSocialTemplate(null)} title="Amplify Aura">
          <h3 className="text-xl font-orbitron neon-text-green mb-2">{selectedSocialTemplate.title}</h3>
          <textarea
            readOnly
            value={selectedSocialTemplate.content}
            rows={5}
            className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 mb-4"
          />
          <NeonButton 
            onClick={() => {
              navigator.clipboard.writeText(selectedSocialTemplate.content);
              alert("Copied to clipboard! Now go flex your aura.");
              setSelectedSocialTemplate(null);
            }}
            variant="green"
          >
            Copy to Clipboard
          </NeonButton>
        </Modal>
      )}
    </div>
  );
};

export default ProgressScreen;