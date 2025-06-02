import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={onClose} 
    >
      <div 
        className="glassmorphism p-6 rounded-xl shadow-2xl w-full max-w-lg border-2 neon-border-blue text-slate-100"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-orbitron neon-text-blue">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-sky-300 hover:text-sky-100 text-2xl font-bold transition-colors"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;