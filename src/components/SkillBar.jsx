import { motion } from 'framer-motion';

const SkillBar = ({ name, level }) => {
    const levelToPercent = {
        'BEGINNER': 15,
        'NOVICE': 30,
        'INTERMEDIATE': 50,
        'ADVANCED': 75,
        'EXPERT': 95
    };

    const percent = levelToPercent[level] || 0;

    return (
        <div className="flex items-center gap-4 mb-3 group">
            <div className="w-24 font-mono text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                {name}
            </div>
            <div className="flex-1 h-2 bg-[var(--scanline-color)] relative overflow-hidden">
                <motion.div
                    className="h-full bg-[var(--text-main)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                />
                <div className="absolute inset-0 flex justify-between">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-px h-full bg-[var(--bg-color)] opacity-50" />
                    ))}
                </div>
            </div>
            <div className="w-24 font-mono text-[10px] text-right opacity-50 tracking-tighter">
                {level}
            </div>
        </div>
    );
};

export default SkillBar;
