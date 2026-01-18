
import React from 'react';
import { Theme } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (name: string) => void;
  theme: Theme;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin, theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className={`w-full max-w-md border p-12 relative overflow-hidden ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-2xl'}`}>
        {/* Decorative corner */}
        <div className="absolute -top-12 -right-12 w-24 h-24 rotate-45 bg-indigo-500 opacity-20"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[10px] uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-opacity font-bold"
        >
          [ Dismiss ]
        </button>

        <div className="space-y-10 text-center relative z-10">
          <div className="space-y-3">
            <div className={`mx-auto w-12 h-12 flex items-center justify-center rounded-xl mb-6 border ${isDark ? 'border-zinc-800 text-indigo-400' : 'border-zinc-100 text-indigo-600'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-mystical uppercase tracking-[0.4em] font-black">Gate of Entry</h2>
            <p className="text-[9px] uppercase tracking-[0.3em] opacity-40 font-bold">Connect your GitHub essence to sync rituals</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => onLogin('Archmage-Git')}
              className={`w-full flex items-center justify-center gap-4 py-5 text-[11px] uppercase tracking-[0.4em] font-black border transition-all group ${
                isDark 
                  ? 'border-white bg-white text-black hover:bg-zinc-200' 
                  : 'border-black bg-black text-white hover:bg-zinc-800'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              Sign In With GitHub
            </button>
            
            <div className="flex items-center gap-4 opacity-20 py-2">
              <div className="flex-1 h-[1px] bg-current"></div>
              <span className="text-[8px] uppercase tracking-widest font-bold">Secure via Firebase</span>
              <div className="flex-1 h-[1px] bg-current"></div>
            </div>

            <p className="text-[9px] uppercase tracking-widest leading-relaxed opacity-40 px-6">
              By joining, you agree to manifesting your spells in the open library for the progress of the craft.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
