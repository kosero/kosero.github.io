import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SelfDestructOverlay = ({ isOpen, onComplete }) => {
    const [phase, setPhase] = useState('countdown');
    const [count, setCount] = useState(3);

    useEffect(() => {
        if (!isOpen) {
            setPhase('countdown');
            setCount(3);
            return;
        }

        if (phase === 'countdown') {
            if (count > 0) {
                const timer = setTimeout(() => setCount(count - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                setPhase('explosion');
            }
        }

        if (phase === 'explosion') {
            const timer = setTimeout(() => setPhase('ending'), 1000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, phase, count]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] overflow-hidden pointer-events-none">

                    {phase === 'countdown' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto"
                        >
                            <div className="text-[#ff3333] font-mono text-center space-y-4">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.5 }}
                                    className="text-2xl font-bold border-2 border-[#ff3333] px-8 py-4 mb-8"
                                >
                                    !! WARNING: SELF-DESTRUCT INITIATED !!
                                </motion.div>
                                <div className="text-8xl font-bold tracking-widest">{count}</div>
                                <div className="text-sm opacity-50 uppercase tracking-[0.3em]">Black Box Overload Imminent</div>
                            </div>
                        </motion.div>
                    )}

                    {phase === 'explosion' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                scale: [1, 1.2, 1.5, 2]
                            }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 bg-white z-[210] pointer-events-auto"
                        />
                    )}

                    {phase === 'ending' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center p-12 pointer-events-auto"
                        >
                            <div className="max-w-2xl w-full space-y-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                    className="text-[#dcd8c0] text-center"
                                >
                                    <h2 className="text-6xl font-bold tracking-[0.2em] mb-4">Ending [W]</h2>
                                    <p className="text-xl font-mono opacity-60">broken [w]ebsite</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 3 }}
                                    className="text-[#dcd8c0]/40 font-mono text-sm leading-relaxed text-center"
                                >
                                    The tactical records have been permanently erased.
                                    Operation failed due to intentional tactical error.
                                    This unit is no longer operational.
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 5 }}
                                    className="flex justify-center pt-8"
                                >
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="border border-[#dcd8c0] text-[#dcd8c0] px-8 py-3 hover:bg-[#dcd8c0] hover:text-[#0a0a0a] transition-all font-mono"
                                        style={{ cursor: 'none' }}
                                    >
                                        &gt;&gt; REBOOT_SYSTEM
                                    </button>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.2 }}
                                transition={{ delay: 6 }}
                                className="absolute bottom-8 text-[10px] text-[#dcd8c0] font-mono tracking-widest"
                            >
                                GLORY TO MANKIND.
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            )}
        </AnimatePresence>
    );
};

export default SelfDestructOverlay;
