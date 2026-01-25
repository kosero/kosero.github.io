import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import SkillBar from '../components/SkillBar';

import profileImg from '../assets/profile.jpeg';
import sustainImg from '../assets/sustain.png';

const Home = ({ triggerCrash }) => {
    return (
        <div className="w-full max-w-7xl mx-auto py-12 flex flex-col gap-24" style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>

            <section id="home" className="min-h-[50vh] flex flex-col md:flex-row items-center justify-center gap-16">
                <motion.div
                    className="relative w-64 h-64 md:w-80 md:h-80 shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute inset-0 border-2 border-[var(--text-dim)] rotate-3"></div>
                    <div className="absolute inset-0 border-2 border-[var(--text-main)] -rotate-2"></div>
                    <img
                        src={profileImg}
                        alt="Kerem"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </motion.div>

                <div className="space-y-6 max-w-xl text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                            KEREM
                        </h2>
                        <div className="flex items-center justify-center md:justify-start gap-4 text-[var(--text-dim)] font-mono text-sm md:text-base">
                            <span>AGE: 18</span>
                            <span>//</span>
                            <span>CLASS: C DEV</span>
                            <span>//</span>
                            <span>LOC: EARTH</span>
                        </div>
                    </motion.div>

                    <motion.p
                        className="text-lg leading-relaxed opacity-90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Hi there! I'm a software developer with a deep passion for low-level programming and game development.
                        I've been using Linux for over 5 years and coding for 3.
                        Currently, I'm focusing on building my own tools and engines to bring creative ideas to life.
                        I love C, experimenting with Rust, and I absolutely adore Lua for scripting.
                    </motion.p>
                </div>
            </section>

            <section id="projects" className="w-full flex flex-col gap-12">
                <div className="flex flex-col items-center gap-4 text-center border-b border-[var(--text-dim)] pb-8">
                    <h2 className="text-3xl md:text-4xl font-bold">ARCHIVES // PROJECTS</h2>
                    <span className="font-mono text-xs opacity-60">Displaying public records...</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <ProjectCard
                        title="SUSTAIN ENGINE"
                        description="A custom 2D game engine written in C. It features LuaJIT for high-performance scripting."
                        image={sustainImg}
                        tags={['C', 'LuaJIT', 'Game Engine', 'Systems']}
                        link="https://github.com/kosero/sustain"
                    />

                    <ProjectCard
                        title="[ DATA_REDACTED ]"
                        description="DECRYPTING... [ERROR: PERMISSION_DENIED]. Current status: Information currently restricted by Command. Deployment schedule pending further evaluation."
                        tags={['CLASSIFIED', 'ENCRYPTED', 'B-TYPE']}
                        onClick={triggerCrash}
                    />
                </div>
            </section>

            <section id="skills" className="w-full flex flex-col gap-12">
                <div className="flex flex-col items-center gap-4 text-center border-b border-[var(--text-dim)] pb-8">
                    <h2 className="text-3xl font-bold">UNIT DATA // SKILLS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch">
                    <div className="w-full space-y-8">
                        <SkillBar name="C Language" level="INTERMEDIATE" />
                        <SkillBar name="Linux Ops" level="ADVANCED" />
                        <SkillBar name="Lua Scripting" level="NOVICE" />
                        <SkillBar name="Rust" level="INTERMEDIATE" />
                        <SkillBar name="Unity / C#" level="BEGINNER" />
                        <SkillBar name="Godot " level="INTERMEDIATE" />
                        <SkillBar name="OS Dev" level="NOVICE" />
                    </div>

                    <div className="bg-[rgba(var(--text-dim),0.05)] border border-[var(--text-dim)] relative flex flex-col justify-center min-h-[300px]" style={{ padding: '2rem 2.5rem' }}>
                        <h3 className="text-xl font-bold mb-6 font-mono">ADDITIONAL NOTES</h3>
                        <ul className="space-y-4 text-sm font-mono opacity-80 list-disc pl-6">
                            <li>Fan of the Nier Automata aesthetic and philosophy.</li>
                            <li>Experienced in low-level systems programming.</li>
                            <li>Advocate for open-source and efficient code.</li>
                            <li>Building tools from scratch to understand how things work.</li>
                        </ul>

                        <div className="absolute bottom-4 right-4 text-[var(--text-dim)] opacity-20 text-6xl font-bold select-none">
                            2B
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="pb-24 text-center">
                <h2 className="text-2xl font-bold mb-12">INITIATE COMMUNICATION</h2>
                <div className="flex justify-center gap-12 text-lg">
                    <a href="https://github.com/kosero" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-dim)] transition-colors">GITHUB</a>
                    <span>//</span>
                    <a href="mailto:kosero@tuta.io" className="hover:text-[var(--text-dim)] transition-colors">EMAIL</a>
                    <span>//</span>
                    <a href="http://discord.com/users/1418736782492700672" className="hover:text-[var(--text-dim)] transition-colors">DISCORD</a>
                </div>
                <p className="mt-16 text-xs font-mono opacity-50">
                    GLORY TO MANKIND. © {new Date().getFullYear()} KEREM.
                </p>
            </section>
        </div>
    );
};

export default Home;
