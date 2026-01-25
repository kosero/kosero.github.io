import { motion, AnimatePresence } from 'framer-motion';

const PodDialogue = ({ isOpen, onClose, message, podName = "Pod 042" }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed bottom-12 right-12 z-50 w-full max-w-md"
                >
                    <div className="bg-[var(--bg-color)] border-2 border-[var(--text-main)] p-6 relative shadow-[8px_8px_0px_rgba(75,72,63,0.2)]">
                        <div className="absolute top-0 left-6 -translate-y-1/2 bg-[var(--text-main)] text-[var(--bg-color)] px-4 py-1 text-xs font-mono font-bold tracking-widest uppercase">
                            {podName}
                        </div>

                        <div className="font-mono text-[var(--text-main)] text-sm leading-relaxed mt-2">
                            <span className="opacity-50 mr-2">PROPOSAL:</span>
                            {message}
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={onClose}
                                className="text-[10px] font-mono opacity-50 hover:opacity-100 transition-opacity uppercase tracking-tighter text-[var(--text-main)] border-[var(--text-main)]"
                                style={{ cursor: 'none' }}
                            >
                                [ CLICK TO DISMISS ]
                            </button>
                        </div>

                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-[var(--text-main)]" />
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-[var(--text-main)]" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PodDialogue;
