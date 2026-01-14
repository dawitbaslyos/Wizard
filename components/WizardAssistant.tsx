
import React, { useState } from 'react';
import { getWizardHelp } from '../services/gemini';

const WizardAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFolded, setIsFolded] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await getWizardHelp(input);
    setResponse(result || '');
    setLoading(false);
    setInput('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-inherit pb-4">
        <h2 className="text-[11px] uppercase tracking-[0.3em] font-black opacity-40">Consult The Master</h2>
        <button 
          onClick={() => setIsFolded(!isFolded)}
          className="text-[9px] uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity"
        >
          {isFolded ? '[ Unfold ]' : '[ Fold ]'}
        </button>
      </div>

      {!isFolded && (
        <div className="flex flex-col gap-6 animate-in fade-in duration-500">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="SEEK KNOWLEDGE..."
              className="flex-1 bg-transparent border-b border-inherit py-2 text-[10px] outline-none placeholder:text-zinc-700 uppercase focus:border-zinc-500 transition-colors"
            />
            <button
              onClick={handleAsk}
              disabled={loading}
              className={`text-[10px] uppercase font-bold transition-all ${loading ? 'opacity-20' : 'hover:tracking-widest'}`}
            >
              {loading ? 'Consulting...' : 'Summon'}
            </button>
          </div>

          <div className={`text-[10px] uppercase leading-relaxed tracking-wider transition-all min-h-[100px] border-l-2 pl-6 ${response ? 'opacity-100 italic text-zinc-400' : 'opacity-20'}`}>
            {response || "The Grandmaster awaits your query. What mysteries shall we unravel?"}
          </div>
          
          <div className="text-[8px] uppercase tracking-[0.2em] opacity-10 text-right">
            Astral Connection: Active
          </div>
        </div>
      )}
      
      {isFolded && (
        <div className="py-4 text-center">
          <p className="text-[9px] uppercase tracking-[0.5em] opacity-10">Crystal Ball Dimmed</p>
        </div>
      )}
    </div>
  );
};

export default WizardAssistant;
