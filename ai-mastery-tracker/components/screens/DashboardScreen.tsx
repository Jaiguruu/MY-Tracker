import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useUserData } from '../../hooks/useUserData';
import XpDisplay from '../XpDisplay';
import BadgeDisplay from '../BadgeDisplay';
import { THREAT_QUOTES, INITIAL_SKILLS } from '../../constants';
import { Skill, ChartDataPoint } from '../../types';
import { ZapIcon, AwardIcon, TargetIcon, ListChecksIcon } from '../icons/LucideIcons'; 
import { NEW_ROADMAP_DATA } from '../../roadmapData'; 

const DashboardScreen: React.FC = () => {
  const { userData, lastEarnedXp, newlyAwardedBadge } = useUserData();

  const randomQuote = useMemo(() => THREAT_QUOTES[Math.floor(Math.random() * THREAT_QUOTES.length)], []);

  const skillProgressData: ChartDataPoint[] = userData.skills.map((skill: Skill) => ({
    name: skill.name.length > 15 ? INITIAL_SKILLS.find(s => s.id === skill.id)?.name.split(" ")[0] || skill.id : skill.name, 
    value: skill.currentHours > 0 ? (skill.currentHours / skill.targetHours) * 100 : 0,
    fill: skill.currentHours >= skill.targetHours ? '#00BFFF' : '#39FF14', // DeepSkyBlue for mastered, Green for in-progress
  }));
  
  const topSkillsData = skillProgressData
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const totalHoursGrinded = userData.skills.reduce((sum, skill) => sum + skill.currentHours, 0);
  const projectsCompleted = userData.projects.filter(p => p.status === 'Completed').length;
  const skillsMasteredCount = userData.skills.filter(s => s.currentHours >= s.targetHours).length;

  const roadmapProgress = useMemo(() => {
    const allRoadmapItems = NEW_ROADMAP_DATA.flatMap(phase => phase.categories.flatMap(cat => cat.items));
    const totalTasks = allRoadmapItems.length;
    if (totalTasks === 0) return 0;
    const completedCount = allRoadmapItems.filter(item => userData.completedRoadmapTasks.includes(item.id)).length;
    return (completedCount / totalTasks) * 100;
  }, [userData.completedRoadmapTasks]);

  return (
    <div className="p-4 md:p-6 space-y-6 custom-scrollbar h-full overflow-y-auto pb-24 md:pb-6">
      <header className="mb-6 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-orbitron neon-text-green">Welcome Back, <span className="neon-text-blue">{userData.userName}</span></h1>
        <p className="text-sky-300 mt-1 italic">"{randomQuote}"</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <XpDisplay userData={userData} lastEarnedXp={lastEarnedXp} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            <MetricCard icon={<ZapIcon className="w-8 h-8"/>} label="Total Grind" value={`${totalHoursGrinded.toFixed(1)} Hrs`} color="green" />
            <MetricCard icon={<TargetIcon className="w-8 h-8"/>} label="Projects Owned" value={`${projectsCompleted}/${userData.projects.length}`} color="blue" />
            <MetricCard icon={<AwardIcon className="w-8 h-8"/>} label="Skills Mastered" value={`${skillsMasteredCount}/${userData.skills.length}`} color="green" />
            <MetricCard icon={<ListChecksIcon className="w-8 h-8"/>} label="Codex Progress" value={`${roadmapProgress.toFixed(1)}%`} color="blue" />
          </div>

          <div className="glassmorphism p-4 rounded-lg shadow-xl border-2 neon-border-green">
            <h3 className="text-xl font-orbitron neon-text-green mb-4">Top Skill Saturation</h3>
            {topSkillsData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topSkillsData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                    <XAxis type="number" stroke="#60a5fa" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} /> {/* blue-400 */}
                    <YAxis dataKey="name" type="category" stroke="#60a5fa" width={100} interval={0} tick={{ fontSize: 12 }} />
                    <Tooltip
                    cursor={{ fill: 'rgba(14, 165, 233, 0.1)'}} /* sky-500/10 */
                    contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', border: '1px solid #0ea5e9', borderRadius: '8px', color: '#e0f2fe' }} /* slate-800, border-sky-500, text-sky-50 */
                    labelStyle={{ color: '#39FF14', fontWeight: 'bold' }}
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "Progress"]}
                    />
                    <Bar dataKey="value" barSize={20} radius={[0, 10, 10, 0]}>
                        {topSkillsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-sky-400 text-center py-10">No skill data yet. Start logging your grind!</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <BadgeDisplay userData={userData} newlyAwardedBadge={newlyAwardedBadge} />
          <div className="glassmorphism p-4 rounded-lg shadow-xl border-2 neon-border-blue">
            <h3 className="text-xl font-orbitron neon-text-blue mb-3">Quick Stats</h3>
            <ul className="space-y-2 text-sm">
                <StatItem label="Current Streak" value={`${userData.currentStreak} days`} isHot={userData.currentStreak > 3 && !userData.settings.pauseStreaks}/>
                <StatItem label="Longest Streak" value={`${userData.longestStreak} days`} />
                <StatItem label="Journal Entries" value={userData.journalEntries.length.toString()} />
                <StatItem label="X Posts Logged" value={userData.socialStats.xPosts.toString()} />
                {userData.settings.pauseStreaks && <StatItem label="Streak Status" value="Paused" isHot={true}/>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: 'green' | 'blue'; // Changed pink to blue
}
const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, color }) => (
    <div className={`glassmorphism p-4 rounded-lg shadow-lg flex items-center space-x-3 border-2 ${color === 'green' ? 'neon-border-green' : 'neon-border-blue'}`}>
        <div className={`p-2 rounded-full ${color === 'green' ? 'bg-green-500/30 text-green-400' : 'bg-sky-500/30 text-sky-400'}`}>
            {icon}
        </div>
        <div>
            <p className="text-xs text-slate-300 uppercase font-orbitron">{label}</p>
            <p className={`text-2xl font-orbitron ${color === 'green' ? 'neon-text-green' : 'neon-text-blue'}`}>{value}</p>
        </div>
    </div>
);

interface StatItemProps {
    label: string;
    value: string;
    isHot?: boolean;
}
const StatItem: React.FC<StatItemProps> = ({ label, value, isHot }) => (
    <li className="flex justify-between items-center">
        <span className="text-sky-300">{label}:</span>
        <span className={`font-bold font-orbitron ${isHot ? 'neon-text-red animate-pulse-text-red px-1' : 'text-sky-100'}`}>{value}</span>
    </li>
);

export default DashboardScreen;