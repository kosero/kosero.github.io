import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            const target = e.target;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[20000] border border-current rounded-full mix-blend-difference"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                    opacity: 1
                }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                style={{ position: 'fixed', color: 'var(--text-main)' }}
            />
            <div
                className="fixed top-0 left-0 w-2 h-2 bg-current rounded-full pointer-events-none z-[20000] mix-blend-difference"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transform: 'translate(-50%, -50%)',
                    color: 'var(--text-main)'
                }}
            />
        </>
    );
};

export default Cursor;
