
import React from 'react';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const isDark = theme === 'dark';
  return (
    <header className={`p-8 border-b flex justify-between items-center transition-colors duration-700 ${isDark ? 'border-zinc-900' : 'border-zinc-100'}`}>
      <div className="flex items-center gap-6">
        <h1 className="text-lg font-mystical uppercase tracking-[0.4em] font-black">Wizard</h1>
        <div className={`h-6 w-[1px] hidden sm:block ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'}`}></div>
        <span className={`text-[10px] uppercase tracking-[0.3em] hidden sm:inline opacity-40 font-bold`}>Generative Laboratory</span>
      </div>
      <div className="flex gap-4 items-center">
        <button 
          onClick={onToggleTheme}
          className={`text-[9px] uppercase tracking-[0.2em] font-bold border-b transition-all pb-1 ${isDark ? 'border-zinc-800 text-zinc-500 hover:text-white hover:border-white' : 'border-zinc-100 text-zinc-400 hover:text-black hover:border-black'}`}
        >
          {theme} theme
        </button>
      </div>
    </header>
  );
};

export default Header;
