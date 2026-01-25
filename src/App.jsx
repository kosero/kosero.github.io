import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Cursor from './components/Cursor';
import Home from './pages/Home';
import PodDialogue from './components/PodDialogue';
import MusicPlayer from './components/MusicPlayer';
import TerminalOverlay from './components/TerminalOverlay';
import SelfDestructOverlay from './components/SelfDestructOverlay';
import CombatOverlay from './components/CombatOverlay';

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  const [isCrashed, setIsCrashed] = useState(false);
  const [showPodDialogue, setShowPodDialogue] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSelfDestructing, setIsSelfDestructing] = useState(false);
  const [isCombatOpen, setIsCombatOpen] = useState(false);
  const [keySequence, setKeySequence] = useState('');

  useEffect(() => {
    const handleKeyPress = (e) => {
      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        setKeySequence(prev => {
          const next = (prev + char).slice(-10);

          if (next.endsWith('GLORY')) {
            setIsTerminalOpen(true);
            return '';
          }
          if (next.endsWith('DESTROY')) {
            setIsSelfDestructing(true);
            return '';
          }
          if (next.endsWith('START')) {
            setIsCombatOpen(true);
            return '';
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const triggerCrash = () => {
    setIsCrashed(true);
  };

  const handleTriggerPodDialogue = () => {
    setShowPodDialogue(true);
  };

  if (isCrashed) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scaleY: 1, scaleX: 1, opacity: 1 }}
          animate={{
            scaleY: [1, 0.005, 0.005, 0],
            scaleX: [1, 1, 0.005, 0],
            opacity: [1, 1, 1, 0]
          }}
          transition={{
            duration: 0.4,
            times: [0, 0.4, 0.8, 1],
            ease: "easeInOut"
          }}
          className="fixed inset-0 bg-[#dcd8c0] z-[10000] pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="w-full h-full p-12 flex flex-col justify-between text-[#dcd8c0] font-mono"
        >
          <div className="scanlines opacity-30 pointer-events-none" />

          <div className="space-y-8 max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-7xl font-bold tracking-tighter text-[#ff3333] border-b-4 border-[#ff3333] pb-4"
            >
              [ FATAL://SYSTEM_CRASH ]
            </motion.div>

            <div className="space-y-6 text-xl opacity-90">
              <p className="font-bold text-[#ff3333] animate-pulse">ERROR_CODE: BLACK_BOX_SIGNAL_LOST</p>
              <div className="space-y-2 opacity-70 text-sm border-l-2 border-[#dcd8c0]/20 pl-6">
                <p>&gt; RECOVERY_PHASE_01: MEMORY_DUMP... [FAILED]</p>
                <p>&gt; RECOVERY_PHASE_02: YO RHA_COMMAND_UPLINK... [STALL]</p>
                <p>&gt; RECOVERY_PHASE_03: LOG_CORE_REINIT... [CRITICAL_FAILURE]</p>
                <p>&gt; VIRUS_THRESHOLD: 98% [CAUTION]</p>
                <p>&gt; TERMINATING_ALL_NON_ESSENTIAL_TASKS...</p>
              </div>
            </div>

            <div className="bg-[#dcd8c0] text-[#0a0a0a] p-10 mt-12 border-l-[12px] border-[#ff3333]">
              <h2 className="text-3xl font-bold mb-4 uppercase">System Malfunction</h2>
              <p className="text-lg opacity-90 leading-relaxed">
                A serious error has occurred in the tactical interface.
                Operation cannot continue in the current state.
                The unit and its data records are at risk of corruption.
              </p>
              <p className="mt-8 font-bold border-t border-[#0a0a0a]/20 pt-4 cursor-pointer hover:underline" onClick={() => window.location.reload()}>
                &gt;&gt; INITIATE_MANUAL_REBOOT (F5)
              </p>
            </div>
          </div>

          <div className="flex justify-between items-end border-t border-[#dcd8c0]/10 pt-8 mt-auto relative z-10">
            <div className="text-sm opacity-30">
              UNRECOVERABLE_FAILURE_ID: 04-2B-9S-A2
            </div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-2xl font-bold tracking-[0.8em] opacity-60"
            >
              GLORY TO MANKIND.
            </motion.div>
          </div>

          <motion.div
            animate={{
              backgroundColor: ["rgba(255,0,0,0)", "rgba(255,0,0,0.1)", "rgba(0,0,255,0.05)", "rgba(255,0,0,0)"],
              opacity: [0, 0.2, 0.1, 0]
            }}
            transition={{ repeat: Infinity, duration: 0.15, repeatDelay: 3 }}
            className="fixed inset-0 pointer-events-none z-20"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto flex flex-col relative overflow-hidden text-[var(--text-main)]">
      <div className="scanlines" />

      <Header theme={theme} toggleTheme={toggleTheme} onTriggerEasterEgg={handleTriggerPodDialogue} />

      <main className="flex-grow flex items-center justify-center py-12 px-16 w-full">
        <Home triggerCrash={triggerCrash} />
      </main>

      <div className="fixed right-8 bottom-12 z-40 hidden xl:block w-72">
        <MusicPlayer />
      </div>

      <PodDialogue
        isOpen={showPodDialogue}
        onClose={() => setShowPodDialogue(false)}
        message="Proposal: External entity is currently analyzing data records. Tactical advice: Continue observation. Glory to Mankind."
      />

      <TerminalOverlay
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      <SelfDestructOverlay
        isOpen={isSelfDestructing}
      />

      <CombatOverlay
        isOpen={isCombatOpen}
        onClose={() => setIsCombatOpen(false)}
      />

      <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-[var(--text-dim)] pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-[var(--text-dim)] pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-[var(--text-dim)] pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-[var(--text-dim)] pointer-events-none" />
      <Cursor />
    </div>
  );
}

export default App;
