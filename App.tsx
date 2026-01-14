
import React, { useState, useEffect } from 'react';
import { INITIAL_CODE } from './constants';
import { parseWizardCode } from './services/interpreter';
import MagicCanvas from './components/MagicCanvas';
import Spellbook from './components/Spellbook';
import WizardAssistant from './components/WizardAssistant';
import Header from './components/Header';
import Footer from './components/Footer';
import Editor from './components/Editor';
import { Theme } from './types';

const App: React.FC = () => {
  const [code, setCode] = useState(INITIAL_CODE);
  const [theme, setTheme] = useState<Theme>('dark');
  const [renderState, setRenderState] = useState(parseWizardCode(INITIAL_CODE));

  useEffect(() => {
    setRenderState(parseWizardCode(code));
  }, [code]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans selection:bg-zinc-500 selection:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="max-w-screen-2xl mx-auto p-6 lg:p-12 space-y-12">
        
        {/* Row 1: Code Editor + Display */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className={`border p-6 h-full transition-colors duration-700 ${isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-50'}`}>
            <Editor code={code} setCode={setCode} onClear={() => setCode(INITIAL_CODE)} theme={theme} />
          </div>
          <div className={`border p-6 h-full transition-colors duration-700 flex flex-col items-center justify-center ${isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-50'}`}>
            <label className={`text-[11px] uppercase tracking-[0.3em] font-bold opacity-30 block mb-6 text-center w-full`}>The Manifestation</label>
            <MagicCanvas renderState={renderState} theme={theme} />
          </div>
        </section>

        {/* Row 2: Lexicon & Ask-Wizard */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className={`lg:col-span-8 border p-8 transition-colors duration-700 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <Spellbook theme={theme} />
          </div>
          <div className={`lg:col-span-4 border p-8 transition-colors duration-700 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <WizardAssistant />
          </div>
        </section>

      </main>

      <Footer theme={theme} />
    </div>
  );
};

export default App;
