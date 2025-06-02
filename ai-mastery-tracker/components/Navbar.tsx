import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, TrendingUpIcon, SettingsIcon, ZapIcon, ListChecksIcon } from './icons/LucideIcons';
import { APP_NAME } from '../constants';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  currentPath: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center p-2 md:p-3 hover:bg-red-500/30 transition-all duration-200 rounded-lg group ${
        isActive ? 'bg-red-600/50 neon-border-red' : 'text-sky-300 hover:text-red-400'
      }`}
    >
      <span className={`w-6 h-6 md:w-7 md:h-7 mb-1 ${isActive ? 'text-red-400 neon-text-red' : 'group-hover:text-red-300'}`}>{icon}</span>
      <span className="text-xs md:text-sm font-orbitron">{label}</span>
    </Link>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:relative md:w-20 lg:w-24 bg-slate-900/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-t-2 md:border-t-0 md:border-r-2 border-red-500/50 md:border-red-500/30 p-2 md:p-4 md:h-screen z-50">
      <div className="md:flex md:flex-col md:h-full md:justify-between">
        <div className="hidden md:block text-center mb-8">
          <Link to="/" className="neon-text-green text-3xl font-orbitron font-bold tracking-tighter">
            {APP_NAME.split(" ")[0][0]}<span className="neon-text-blue">{APP_NAME.split(" ")[1][0]}</span>{APP_NAME.split(" ")[2][0]}
          </Link>
        </div>
        
        <div className="flex justify-around items-center md:flex-col md:space-y-4 lg:space-y-6">
          <NavItem to="/" icon={<HomeIcon />} label="Dash" currentPath={location.pathname} />
          <NavItem to="/journal" icon={<BookOpenIcon />} label="Log" currentPath={location.pathname} />
          <NavItem to="/roadmap" icon={<ListChecksIcon />} label="Codex" currentPath={location.pathname} /> 
          <NavItem to="/progress" icon={<TrendingUpIcon />} label="Stats" currentPath={location.pathname} />
          <NavItem to="/focus" icon={<ZapIcon />} label="Focus" currentPath={location.pathname} />
          <NavItem to="/settings" icon={<SettingsIcon />} label="Tune" currentPath={location.pathname} />
        </div>
        <div className="hidden md:block mt-auto text-center">
            <p className="text-xs text-sky-400">&copy; 2027</p>
            <p className="text-xs text-sky-500">Aura Level: Max</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;