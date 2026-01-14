
import React from 'react';
import { Theme } from '../types';

interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <footer className={`p-16 border-t transition-colors duration-700 ${isDark ? 'border-zinc-900' : 'border-zinc-100'}`}>
      <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
        <p className="text-[10px] uppercase tracking-[0.6em] opacity-20 font-bold">Pure Logic. Pure Art.</p>
        <div className="flex gap-8">
          <span className="text-[10px] uppercase tracking-widest opacity-20">Wizard v1.3</span>
          <span className="text-[10px] uppercase tracking-widest opacity-20">© 2025</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
