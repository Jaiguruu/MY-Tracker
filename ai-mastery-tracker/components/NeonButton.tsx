import React from 'react';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'green' | 'red' | 'blue' | 'default';
  className?: string;
  icon?: React.ReactNode;
}

const NeonButton: React.FC<NeonButtonProps> = ({ children, variant = 'green', className = '', icon, ...props }) => {
  const baseStyle = "font-orbitron px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2";
  
  let variantStyle = '';
  switch (variant) {
    case 'green':
      variantStyle = 'bg-green-500/80 hover:bg-green-500 text-white shadow-md hover:shadow-lg hover:shadow-green-500/50 focus:ring-green-400 neon-border-green';
      break;
    case 'red': // Changed from pink to red
      variantStyle = 'bg-red-500/80 hover:bg-red-500 text-white shadow-md hover:shadow-lg hover:shadow-red-500/50 focus:ring-red-400 neon-border-red';
      break;
    case 'blue': // Existing blue, ensure consistency
      variantStyle = 'bg-sky-500/80 hover:bg-sky-500 text-white shadow-md hover:shadow-lg hover:shadow-sky-500/50 focus:ring-sky-400 neon-border-sky-400';
      break;
    default: // A more subtle default using blues
      variantStyle = 'bg-slate-700/80 hover:bg-slate-600 text-sky-100 shadow-md hover:shadow-lg hover:shadow-slate-600/50 focus:ring-sky-500 border-2 border-slate-500 hover:border-sky-400';
      break;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default NeonButton;