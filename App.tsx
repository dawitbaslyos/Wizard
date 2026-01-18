
import React, { useState, useEffect } from 'react';
import { INITIAL_CODE, MOCK_LIBRARY_WORKS, MOCK_MY_WORKS } from './constants';
import { parseWizardCode } from './services/interpreter';
import MagicCanvas from './components/MagicCanvas';
import Spellbook from './components/Spellbook';
import WizardAssistant from './components/WizardAssistant';
import Header from './components/Header';
import Footer from './components/Footer';
import Editor from './components/Editor';
import Gallery from './components/Gallery';
import AuthModal from './components/AuthModal';
import { Theme, View, User } from './types';

const App: React.FC = () => {
  const [code, setCode] = useState(INITIAL_CODE);
  const [theme, setTheme] = useState<Theme>('dark');
  const [currentView, setCurrentView] = useState<View>('editor');
  const [renderState, setRenderState] = useState(parseWizardCode(INITIAL_CODE));
  const [user, setUser] = useState<User>({ id: '', name: '', isLoggedIn: false });
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    setRenderState(parseWizardCode(code));
  }, [code]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleAuth = () => {
    if (user.isLoggedIn) {
      // Simple logout for demo
      setUser({ id: '', name: '', isLoggedIn: false });
      setCurrentView('editor');
    } else {
      setShowAuth(true);
    }
  };

  const loginUser = (name: string) => {
    setUser({ id: 'u1', name, isLoggedIn: true });
    setShowAuth(false);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans selection:bg-indigo-500 selection:text-white ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        currentView={currentView} 
        onViewChange={setCurrentView}
        user={user}
        onAuth={handleAuth}
      />

      <main className="max-w-screen-2xl mx-auto p-6 lg:p-12 animate-in fade-in duration-1000">
        
        {currentView === 'editor' && (
          <div className="space-y-12">
            {/* Editor Row */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className={`border p-6 h-full transition-colors duration-700 ${isDark ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50/40'}`}>
                <Editor code={code} setCode={setCode} onClear={() => setCode(INITIAL_CODE)} theme={theme} />
              </div>
              <div className={`border p-6 h-full transition-colors duration-700 flex flex-col items-center justify-center ${isDark ? 'border-zinc-800 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50/40'}`}>
                <label className={`text-[11px] uppercase tracking-[0.3em] font-bold opacity-30 block mb-6 text-center w-full`}>The Manifestation</label>
                <MagicCanvas renderState={renderState} theme={theme} />
              </div>
            </section>

            {/* Support/Docs Row */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className={`lg:col-span-8 border p-8 transition-colors duration-700 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <Spellbook theme={theme} />
              </div>
              <div className={`lg:col-span-4 border p-8 transition-colors duration-700 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <WizardAssistant />
              </div>
            </section>
          </div>
        )}

        {currentView === 'library' && (
          <Gallery 
            title="Ancient Library" 
            subtitle="Publicly Manifested Rituals" 
            works={MOCK_LIBRARY_WORKS} 
            theme={theme} 
            onSelectWork={(w) => {
              setCode(w.code);
              setCurrentView('editor');
            }}
          />
        )}

        {currentView === 'my-works' && (
          <Gallery 
            title="Personal Grimoire" 
            subtitle="Your Secret Manifestations" 
            works={MOCK_MY_WORKS} 
            theme={theme} 
            onSelectWork={(w) => {
              setCode(w.code);
              setCurrentView('editor');
            }}
          />
        )}
      </main>

      <Footer theme={theme} />

      {showAuth && (
        <AuthModal 
          onClose={() => setShowAuth(false)} 
          onLogin={loginUser} 
          theme={theme} 
        />
      )}
    </div>
  );
};

export default App;
