
import React from 'react';
import { Theme, ManifestedWork } from '../types';

interface GalleryProps {
  title: string;
  subtitle: string;
  works: ManifestedWork[];
  theme: Theme;
  onSelectWork: (work: ManifestedWork) => void;
}

const Gallery: React.FC<GalleryProps> = ({ title, subtitle, works, theme, onSelectWork }) => {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-mystical uppercase tracking-[0.5em] font-black">{title}</h2>
        <p className="text-[10px] uppercase tracking-widest opacity-40">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map((work) => (
          <div 
            key={work.id}
            onClick={() => onSelectWork(work)}
            className={`group cursor-pointer border p-6 transition-all duration-500 hover:scale-[1.02] ${
              isDark ? 'border-zinc-800 bg-zinc-950/40 hover:border-indigo-500 hover:bg-zinc-900' : 'border-zinc-200 bg-zinc-50/40 hover:border-black hover:bg-white'
            }`}
          >
            <div className={`aspect-square mb-6 border flex items-center justify-center relative overflow-hidden ${isDark ? 'border-zinc-900 bg-black' : 'border-zinc-100 bg-zinc-100'}`}>
               <span className="text-[8px] uppercase tracking-[0.5em] opacity-20 group-hover:opacity-40 transition-opacity">Preview Not Visualized</span>
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-[12px] uppercase tracking-[0.2em] font-black group-hover:text-indigo-400 transition-colors">{work.title}</h3>
                <span className="text-[8px] opacity-30 font-bold">{work.timestamp}</span>
              </div>
              <div className="flex justify-between items-center border-t border-inherit pt-4">
                <span className="text-[9px] uppercase tracking-widest opacity-40 font-bold">Author: {work.author}</span>
                <span className={`text-[8px] uppercase tracking-widest font-black px-2 py-1 rounded border ${isDark ? 'border-zinc-800 text-zinc-600' : 'border-zinc-200 text-zinc-400'}`}>View Spell</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {works.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-20">No manifestation found in this realm</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
