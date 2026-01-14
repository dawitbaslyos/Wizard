
import React from 'react';
import { Theme } from '../types';

interface EditorProps {
  code: string;
  setCode: (code: string) => void;
  onClear: () => void;
  theme: Theme;
}

const Editor: React.FC<EditorProps> = ({ code, setCode, onClear, theme }) => {
  const isDark = theme === 'dark';
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-end border-b pb-2 mb-2 border-inherit opacity-50">
        <label className={`text-[11px] uppercase tracking-[0.3em] font-bold`}>Incantation</label>
        <button 
          onClick={onClear}
          className="text-[9px] uppercase tracking-widest hover:opacity-100"
        >
          Reset Spells
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className={`w-full h-[400px] lg:h-[500px] bg-transparent font-code text-[13px] leading-relaxed outline-none transition-colors duration-700 resize-none ${
          isDark 
            ? 'text-zinc-400 focus:text-white' 
            : 'text-zinc-500 focus:text-black'
        }`}
        spellCheck={false}
        placeholder="Begin your chant..."
      />
    </div>
  );
};

export default Editor;
