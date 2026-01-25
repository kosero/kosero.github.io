import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, image, tags, link, onClick }) => {
    const Container = link ? motion.a : motion.div;

    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <Container
            href={link}
            onClick={handleClick}
            target={link ? "_blank" : undefined}
            rel={link ? "noopener noreferrer" : undefined}
            className={`group relative border border-[var(--text-dim)] bg-[rgba(var(--bg-color),0.5)] overflow-hidden block ${link || onClick ? 'cursor-pointer' : ''}`}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="h-48 overflow-hidden border-b border-[var(--text-dim)] relative">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1.5rem' }}
                        className="grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-[var(--scanline-color)] flex items-center justify-center font-mono text-sm opacity-50">
                        NO_IMAGE_DATA
                    </div>
                )}
                <div className="absolute top-0 left-4 bg-[var(--text-main)] text-[var(--bg-color)] text-xs px-2 py-1 font-mono">
                    ID: {Math.floor(Math.random() * 9000) + 1000}
                </div>
            </div>

            <div style={{ padding: '2rem 2.5rem' }}>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--dark-accent)] transition-colors">
                    {title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map(tag => (
                        <span key={tag} className="text-xs border border-[var(--text-dim)] px-2 py-0.5 font-mono opacity-75">
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="text-[var(--text-dim)] mb-6 text-sm leading-relaxed font-mono">
                    {description}
                </p>

                {link && (
                    <div className="inline-block border-b border-[var(--text-main)] pb-0.5 group-hover:text-[var(--dark-accent)] transition-colors text-sm font-bold tracking-wider">
                        INITIATE_LINK &gt;&gt;
                    </div>
                )}
            </div>

            <div className="absolute inset-0 bg-[var(--text-main)] opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity duration-300" />
        </Container>
    );
};

export default ProjectCard;
