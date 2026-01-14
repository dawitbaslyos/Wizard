
import React, { useState } from 'react';
import { WIZARD_LIBRARIES } from '../constants';
import { Theme } from '../types';

interface SpellbookProps { theme: Theme; }

type BookType = 'Book of Picture' | 'Book of Ether';

const Spellbook: React.FC<SpellbookProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [activeBook, setActiveBook] = useState<BookType>('Book of Picture');
  
  const bookCategories: BookType[] = ['Book of Picture', 'Book of Ether'];

  const filteredSpells = WIZARD_LIBRARIES.filter(item => 
    item.book === activeBook || item.book === 'General Alchemy'
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-8 border-b border-inherit pb-10">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className={`text-[12px] uppercase tracking-[0.4em] font-mystical font-black ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>
              The Grand Lexicon
            </h2>
            <p className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Choose your path of study</p>
          </div>
          <span className="text-[8px] uppercase tracking-[0.3em] opacity-20 hidden md:block">Scroll for more wisdom</span>
        </div>

        <div className="flex gap-4">
          {bookCategories.map((book) => (
            <button
              key={book}
              onClick={() => setActiveBook(book)}
              className={`relative flex-1 py-4 px-6 text-[10px] uppercase tracking-[0.3em] font-black transition-all duration-500 overflow-hidden group ${
                activeBook === book
                  ? (isDark ? 'text-white border-white' : 'text-black border-black')
                  : (isDark ? 'text-zinc-600 hover:text-zinc-400 border-zinc-900' : 'text-zinc-400 hover:text-zinc-600 border-zinc-100')
              }`}
            >
              <div className={`absolute inset-0 border transition-colors duration-500 ${
                activeBook === book ? 'border-inherit' : 'border-transparent'
              }`} />
              
              {/* Background Glow on Active */}
              {activeBook === book && (
                <div className={`absolute inset-0 opacity-5 blur-xl ${isDark ? 'bg-indigo-500' : 'bg-indigo-200'}`} />
              )}
              
              <span className="relative z-10">{book}</span>
              
              {/* Animated underline */}
              <div className={`absolute bottom-0 left-0 h-[2px] bg-current transition-all duration-700 ${
                activeBook === book ? 'w-full' : 'w-0'
              }`} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 min-h-[450px]">
        {filteredSpells.map((item, idx) => (
          <div 
            key={`${activeBook}-${idx}`} 
            className="group flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" 
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex items-start gap-5">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border text-[9px] font-black transition-all duration-500 ${
                isDark 
                ? 'border-zinc-800 text-zinc-700 group-hover:border-zinc-500 group-hover:text-zinc-400' 
                : 'border-zinc-100 text-zinc-300 group-hover:border-zinc-300 group-hover:text-zinc-500'
              }`}>
                {idx < 9 ? `0${idx + 1}` : idx + 1}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <code className={`text-[14px] font-code transition-colors font-medium ${isDark ? 'text-indigo-400 group-hover:text-white' : 'text-indigo-600 group-hover:text-indigo-900'}`}>
                    {item.spell}
                  </code>
                  {item.book === 'General Alchemy' && (
                    <span className={`text-[7px] border px-1.5 py-0.5 uppercase tracking-widest font-bold opacity-40 rounded ${isDark ? 'border-zinc-700' : 'border-zinc-200'}`}>
                      CORE
                    </span>
                  )}
                </div>
                
                <p className={`text-[11px] uppercase leading-relaxed tracking-wider transition-opacity duration-700 ${isDark ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-zinc-500'}`}>
                  {item.description}
                </p>
                
                <div className={`mt-4 p-4 text-[10px] font-code transition-all duration-500 border-l-2 ${
                  isDark 
                  ? 'bg-zinc-950/30 border-zinc-800 text-zinc-500 group-hover:border-indigo-500/50 group-hover:text-zinc-400' 
                  : 'bg-zinc-50 border-zinc-100 text-zinc-400 group-hover:border-indigo-300 group-hover:text-zinc-600'
                }`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] uppercase tracking-widest opacity-30 font-bold">Ritual Command</span>
                  </div>
                  {item.example}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-12 opacity-10 text-[9px] uppercase tracking-[0.8em] text-center border-t border-inherit font-mystical">
        Wisdom flows from the source
      </div>
    </div>
  );
};

export default Spellbook;
