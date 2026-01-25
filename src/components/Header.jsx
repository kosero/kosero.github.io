import { useState } from 'react';
import { motion } from 'framer-motion';

const Header = ({ theme, toggleTheme, onTriggerEasterEgg }) => {
    const navItems = ['HOME', 'PROJECTS', 'SKILLS', 'CONTACT'];
    const [logoClicks, setLogoClicks] = useState(0);

    const handleLogoClick = () => {
        setLogoClicks(prev => {
            const next = prev + 1;
            if (next >= 5) {
                onTriggerEasterEgg();
                return 0;
            }
            return next;
        });

        setTimeout(() => setLogoClicks(0), 2000);
    };

    return (
        <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl z-40 px-16 py-6 flex justify-between items-center bg-[var(--bg-color)]/80 backdrop-blur-sm border-b border-[var(--text-dim)]">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={handleLogoClick}>
                <div className="w-8 h-8 bg-[var(--text-main)] overflow-hidden transition-transform group-active:scale-95">
                    <div className="w-full h-full bg-[var(--text-main)] animate-pulse"></div>
                </div>
                <h1 className="text-xl font-bold tracking-widest font-mono select-none">
                    SYSTEM://<span className="opacity-50 transition-opacity group-hover:opacity-80">KEREM</span>
                </h1>
            </div>

            <nav className="hidden md:flex gap-8">
                {navItems.map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="relative group font-mono text-lg hover:text-[var(--text-main)] transition-colors"
                    >
                        <span className="group-hover:opacity-100 opacity-60">[{item}]</span>
                        <motion.div
                            className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-[var(--text-main)] origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </a>
                ))}
            </nav>

            <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-1 border border-[var(--text-dim)] hover:bg-[var(--text-main)] hover:text-[var(--bg-color)] transition-all"
            >
                <span className="font-mono text-sm">
                    VISUAL://{theme === 'light' ? 'LIGHT' : 'DARK'}
                </span>
            </button>
        </header>
    );
};

export default Header;
