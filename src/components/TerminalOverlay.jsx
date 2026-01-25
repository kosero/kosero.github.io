import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const logs = [
    "[ INITIALIZING TACTICAL TERMINAL... ]",
    "> AUTHENTICATING_UNIT: 2B_YoRHa_Type_B",
    "> ACCESSING_BUNKER_ARCHIVES... [SUCCESS]",
    "------------------------------------------",
    "[ CLASSIFIED_DOCUMENT_#402 ]",
    "SUBJECT: PROJECT_GESTALT_RECORDS",
    "STATUS: [REDACTED]",
    "NOTE: The council of humanity on the moon is a...",
    "[ERROR: DATA_CORRUPTION_DETECTED]",
    "------------------------------------------",
    "[ LOG_042_TACTICAL_RECORD ]",
    "Observation of the entity known as 'User' continues.",
    "Probability of successful mission completion: 98%.",
    "Tactical advice: Maintain current aesthetic standards.",
    "------------------------------------------",
    "> DISCONNECTING_FROM_NETWORK...",
    "> LOGOUT_COMPLETE.",
    "GLORY TO MANKIND."
];

const TerminalOverlay = ({ isOpen, onClose }) => {
    const [displayedLogs, setDisplayedLogs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setDisplayedLogs([]);
            setCurrentIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && currentIndex < logs.length) {
            const timer = setTimeout(() => {
                setDisplayedLogs(prev => [...prev, logs[currentIndex]]);
                setCurrentIndex(prev => prev + 1);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [isOpen, currentIndex]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-sm p-12 flex flex-col font-mono"
                >
                    <div className="scanlines opacity-20 pointer-events-none" />

                    <div className="flex justify-between items-center border-b border-[#dcd8c0]/20 pb-4 mb-8">
                        <div className="flex items-center gap-4 text-[#dcd8c0]">
                            <div className="w-3 h-3 bg-[#ff3333] animate-pulse" />
                            <span className="text-xl font-bold tracking-[0.2em] uppercase">Tactical_Terminal_v4.2</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-transparent border border-[#dcd8c0]/30 text-[#dcd8c0]/50 px-3 py-1 text-xs hover:bg-[#dcd8c0] hover:text-[#0a0a0a] transition-all"
                            style={{ cursor: 'none' }}
                        >
                            [ ESC_TO_EXIT ]
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto space-y-2 scrollbar-hide pr-4">
                        {displayedLogs.map((log, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`text-sm ${log.includes('ERROR') || log.includes('REDACTED') ? 'text-[#ff3333]' : 'text-[#dcd8c0]/80'}`}
                            >
                                {log}
                            </motion.div>
                        ))}
                        {currentIndex < logs.length && (
                            <motion.div
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-4 bg-[#dcd8c0]/80 inline-block align-middle ml-1"
                            />
                        )}
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#dcd8c0]/20 flex justify-between text-[10px] text-[#dcd8c0]/30 uppercase tracking-widest">
                        <span>Unit_ID: 2B_ARCHIVE_ACCESS</span>
                        <span className="animate-pulse">Status: Monitoring...</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TerminalOverlay;
