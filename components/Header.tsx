
import React, { useState, useRef, useEffect } from 'react';
import { Theme, View, User } from '../types';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  currentView: View;
  onViewChange: (view: View) => void;
  user: User;
  onAuth: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  theme, 
  onToggleTheme, 
  currentView, 
  onViewChange, 
  user,
  onAuth 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const navClass = (view: View) => `text-[10px] uppercase tracking-[0.2em] font-black transition-all pb-1 border-b-2 ${
    currentView === view 
      ? (isDark ? 'border-indigo-500 text-white' : 'border-black text-black') 
      : 'border-transparent text-zinc-500 hover:text-zinc-300'
  }`;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAccountClick = () => {
    if (user.isLoggedIn) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      onAuth();
    }
  };

  const handleSignOut = () => {
    setIsMenuOpen(false);
    onAuth();
  };

  return (
    <header className={`p-6 md:p-8 border-b flex flex-col md:flex-row justify-between items-center gap-6 transition-colors duration-700 ${isDark ? 'border-zinc-900 bg-black/50 backdrop-blur-md' : 'border-zinc-100 bg-white/50 backdrop-blur-md'} sticky top-0 z-50`}>
      <div className="flex items-center gap-4 md:gap-8">
        <button onClick={() => onViewChange('editor')} className="flex items-center gap-4 group">
          <h1 className="text-xl font-mystical uppercase tracking-[0.4em] font-black group-hover:text-indigo-500 transition-colors">Wizard</h1>
        </button>
        <div className={`h-6 w-[1px] hidden sm:block ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'}`}></div>
        
        <nav className="flex items-center gap-6">
          <button onClick={() => onViewChange('library')} className={navClass('library')}>Library</button>
          {user.isLoggedIn && (
            <button onClick={() => onViewChange('my-works')} className={navClass('my-works')}>My Works</button>
          )}
        </nav>
      </div>

      <div className="flex gap-4 items-center flex-wrap justify-center relative">
        {/* Donation Button */}
        <a 
          href="https://ko-fi.com/wizardlang" 
          target="_blank" 
          rel="noreferrer"
          className={`p-2.5 rounded-full border transition-all ${isDark ? 'border-zinc-800 hover:bg-zinc-900 text-amber-500' : 'border-zinc-100 hover:bg-zinc-50 text-amber-600'}`} 
          title="Support the Laboratory"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"/></svg>
        </a>

        {/* GitHub Link */}
        <a 
          href="https://github.com/dawitbaslyos/Wizard.git" 
          target="_blank" 
          rel="noreferrer" 
          className={`p-2.5 rounded-full border transition-all ${isDark ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-400' : 'border-zinc-100 hover:bg-zinc-50 text-zinc-600'}`} 
          title="Source Code"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </a>

        {/* Theme Toggle Button */}
        <button 
          onClick={onToggleTheme}
          className={`p-2.5 rounded-full border transition-all ${isDark ? 'border-zinc-800 hover:bg-zinc-900 text-yellow-500' : 'border-zinc-100 hover:bg-zinc-50 text-indigo-600'}`}
          title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
          {isDark ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
          )}
        </button>

        {/* Account Button & Dropdown */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={handleAccountClick}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all group ${
              isDark ? 'border-zinc-800 hover:bg-zinc-900 text-zinc-300' : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'
            } ${isMenuOpen ? (isDark ? 'bg-zinc-900' : 'bg-zinc-50') : ''}`}
          >
            <svg className={`w-4 h-4 transition-colors ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className={`text-[10px] uppercase tracking-widest font-black`}>
              {user.isLoggedIn ? user.name : 'Join'}
            </span>
          </button>

          {/* Mystical Dropdown Menu */}
          {user.isLoggedIn && isMenuOpen && (
            <div className={`absolute right-0 mt-4 w-56 border p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 z-50 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <div className={`p-4 mb-2 space-y-3 border-b ${isDark ? 'border-zinc-900' : 'border-zinc-100'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-[8px] uppercase tracking-widest opacity-40 font-bold">Total Works</span>
                  <span className="text-[10px] font-code font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[8px] uppercase tracking-widest opacity-40 font-bold">Total Likes</span>
                  <span className="text-[10px] font-code font-bold text-amber-500">142</span>
                </div>
              </div>
              
              <button 
                onClick={() => { setIsMenuOpen(false); onViewChange('my-works'); }}
                className={`w-full text-left px-4 py-3 text-[9px] uppercase tracking-[0.2em] font-bold transition-colors ${isDark ? 'hover:bg-zinc-900 text-zinc-400 hover:text-white' : 'hover:bg-zinc-50 text-zinc-600 hover:text-black'}`}
              >
                View Manifestations
              </button>
              
              <button 
                onClick={handleSignOut}
                className={`w-full text-left px-4 py-3 text-[9px] uppercase tracking-[0.2em] font-bold transition-colors border-t ${isDark ? 'border-zinc-900 hover:bg-red-950/20 text-red-500' : 'border-zinc-100 hover:bg-red-50 text-red-600'}`}
              >
                Sign Out Essence
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
