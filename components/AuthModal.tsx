
import React, { useState } from 'react';
import { Theme } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (name: string) => void;
  theme: Theme;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin, theme }) => {
  const [name, setName] = useState('');
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className={`w-full max-w-md border p-12 relative ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-2xl'}`}>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[10px] uppercase tracking-widest opacity-30 hover:opacity-100"
        >
          [ Close ]
        </button>

        <div className="space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-xl font-mystical uppercase tracking-[0.4em] font-black">Enter The Laboratory</h2>
            <p className="text-[9px] uppercase tracking-widest opacity-40">Identify yourself to the Grandmaster</p>
          </div>

          <div className="space-y-6">
            <input 
              type="text" 
              placeholder="YOUR MAGICAL NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && name.trim() && onLogin(name)}
              className="w-full bg-transparent border-b border-inherit py-4 text-center text-[12px] tracking-[0.3em] outline-none uppercase placeholder:text-zinc-800"
              autoFocus
            />
            
            <button 
              onClick={() => name.trim() && onLogin(name)}
              disabled={!name.trim()}
              className={`w-full py-4 text-[10px] uppercase tracking-[0.5em] font-black border transition-all ${
                isDark 
                  ? 'border-white hover:bg-white hover:text-black' 
                  : 'border-black hover:bg-black hover:text-white'
              } disabled:opacity-10 disabled:cursor-not-allowed`}
            >
              Initialize Essence
            </button>
          </div>

          <p className="text-[8px] uppercase tracking-widest opacity-20">Your works will be manifested across all realms</p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
