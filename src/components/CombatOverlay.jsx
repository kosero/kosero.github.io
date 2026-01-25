import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CombatOverlay = ({ isOpen, onClose }) => {
    const [gameState, setGameState] = useState('active');
    const [survivalTime, setSurvivalTime] = useState(0);
    const [bullets, setBullets] = useState([]);
    const [playerBullets, setPlayerBullets] = useState([]);
    const [playerPos, setPlayerPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight * 0.8 });
    const [playerRotation, setPlayerRotation] = useState(0);

    const keysPressed = useRef({});
    const playerPosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight * 0.8 });
    const playerRotationRef = useRef(0);
    const gameStateRef = useRef('active');
    const requestRef = useRef();
    const startTimeRef = useRef();
    const lastShotTimeRef = useRef(0);
    const bulletIdCounter = useRef(0);
    const pBulletIdCounter = useRef(10000);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            keysPressed.current[key] = true;
            if (e.key === 'Escape' && isOpen) onClose();
        };
        const handleKeyUp = (e) => {
            const key = e.key.toLowerCase();
            keysPressed.current[key] = false;
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isOpen, onClose]);

    const update = () => {
        if (gameStateRef.current !== 'active') return;

        const now = performance.now();
        if (!startTimeRef.current) startTimeRef.current = now;
        const elapsed = (now - startTimeRef.current) / 1000;
        setSurvivalTime(elapsed);

        let dx = 0;
        let dy = 0;
        if (keysPressed.current['w'] || keysPressed.current['arrowup']) dy -= 1;
        if (keysPressed.current['s'] || keysPressed.current['arrowdown']) dy += 1;
        if (keysPressed.current['a'] || keysPressed.current['arrowleft']) dx -= 1;
        if (keysPressed.current['d'] || keysPressed.current['arrowright']) dx += 1;

        if (dx !== 0 || dy !== 0) {
            const speed = 7.5;
            const nx = Math.max(50, Math.min(window.innerWidth - 50, playerPosRef.current.x + dx * speed));
            const ny = Math.max(50, Math.min(window.innerHeight - 50, playerPosRef.current.y + dy * speed));
            playerPosRef.current = { x: nx, y: ny };
            setPlayerPos({ x: nx, y: ny });

            const angle = Math.atan2(dx, -dy) * (180 / Math.PI);
            playerRotationRef.current = angle;
            setPlayerRotation(angle);
        }

        if (keysPressed.current[' '] && now - lastShotTimeRef.current > 100) {
            lastShotTimeRef.current = now;
            const rad = (playerRotationRef.current) * (Math.PI / 180);
            const bSpeed = 18;
            setPlayerBullets(prev => [
                ...prev,
                {
                    id: pBulletIdCounter.current++,
                    x: playerPosRef.current.x,
                    y: playerPosRef.current.y,
                    vx: Math.sin(rad) * bSpeed,
                    vy: -Math.cos(rad) * bSpeed,
                    rotation: playerRotationRef.current
                }
            ]);
        }

        setBullets(prev => {
            let next = [...prev];
            if (Math.random() < 0.06 + (elapsed * 0.008)) {
                const side = Math.floor(Math.random() * 4);
                let x, y, angle;
                const speed = 3 + Math.random() * 2 + (elapsed * 0.08);
                if (side === 0) { x = Math.random() * window.innerWidth; y = -20; angle = Math.PI / 2; }
                else if (side === 1) { x = window.innerWidth + 20; y = Math.random() * window.innerHeight; angle = Math.PI; }
                else if (side === 2) { x = Math.random() * window.innerWidth; y = window.innerHeight + 20; angle = -Math.PI / 2; }
                else { x = -20; y = Math.random() * window.innerHeight; angle = 0; }
                angle += (Math.random() - 0.5) * 0.5;
                next.push({ id: bulletIdCounter.current++, x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed });
            }
            next = next.map(b => ({ ...b, x: b.x + b.vx, y: b.y + b.vy }))
                .filter(b => b.x > -100 && b.x < window.innerWidth + 100 && b.y > -100 && b.y < window.innerHeight + 100);

            for (const b of next) {
                if (Math.hypot(b.x - playerPosRef.current.x, b.y - playerPosRef.current.y) < 6) {
                    gameStateRef.current = 'lost';
                    setGameState('lost');
                    return next;
                }
            }
            return next;
        });

        setPlayerBullets(prev => {
            let next = prev.map(pb => ({ ...pb, x: pb.x + pb.vx, y: pb.y + pb.vy }))
                .filter(pb => pb.y > -100 && pb.y < window.innerHeight + 100 && pb.x > -100 && pb.x < window.innerWidth + 100);

            setBullets(enemies => {
                let currentEnemies = [...enemies];
                next = next.filter(pb => {
                    const hitIndex = currentEnemies.findIndex(e => Math.hypot(e.x - pb.x, e.y - pb.y) < 25);
                    if (hitIndex !== -1) {
                        currentEnemies.splice(hitIndex, 1);
                        return false;
                    }
                    return true;
                });
                return currentEnemies;
            });
            return next;
        });

        if (gameStateRef.current === 'active') requestRef.current = requestAnimationFrame(update);
    };

    useEffect(() => {
        if (isOpen && gameState === 'active') {
            startTimeRef.current = null;
            gameStateRef.current = 'active';
            requestRef.current = requestAnimationFrame(update);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            startTimeRef.current = null;
        };
    }, [isOpen, gameState]);

    const resetGame = () => {
        setBullets([]);
        setPlayerBullets([]);
        setSurvivalTime(0);
        playerPosRef.current = { x: window.innerWidth / 2, y: window.innerHeight * 0.8 };
        setPlayerPos(playerPosRef.current);
        playerRotationRef.current = 0;
        setPlayerRotation(0);
        gameStateRef.current = 'active';
        setGameState('active');
        startTimeRef.current = null;
        requestRef.current = requestAnimationFrame(update);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="combat-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`fixed inset-0 z-[10000] bg-[#0a0a0a]/90 backdrop-blur-md font-mono select-none overflow-hidden ${gameState === 'active' ? 'cursor-none' : 'cursor-auto !important'}`}
                >
                    <div className="scanlines opacity-20 pointer-events-none" />

                    {/* HUD */}
                    <div className="absolute top-12 left-12 right-12 flex justify-between items-start text-[#dcd8c0] z-50">
                        <div className="space-y-1">
                            <div className="text-xs opacity-50 tracking-[0.3em]">TACTICAL_FLIGHT_STATUS</div>
                            <div className={`text-2xl font-bold ${gameState === 'lost' ? 'text-[#ff3333]' : 'text-[#dcd8c0]'}`}>
                                {gameState === 'active' ? 'MISSION://IN_PROGRESS' : 'UNIT://LOST'}
                            </div>
                        </div>
                        <div className="text-right space-y-1">
                            <div className="text-xs opacity-50 tracking-[0.3em]">STRENGTHENING_SIGNAL</div>
                            <div className="text-4xl font-bold tracking-tighter">
                                {survivalTime.toFixed(2)}<span className="text-xl ml-1">s</span>
                            </div>
                        </div>
                    </div>

                    {gameState === 'active' && (
                        <motion.div
                            className="absolute z-40"
                            animate={{
                                x: playerPos.x,
                                y: playerPos.y,
                                rotate: playerRotation
                            }}
                            transition={{
                                rotate: { type: "spring", stiffness: 120, damping: 15 },
                                x: { type: "just" },
                                y: { type: "just" }
                            }}
                        >
                            <div className="relative">
                                <div
                                    className="absolute border-2 border-[#dcd8c0] bg-[#0a0a0a] flex items-center justify-center"
                                    style={{ width: '18px', height: '30px', left: '-9px', top: '-15px' }}
                                >
                                    <div className="w-[4px] h-[10px] bg-[#ff3333] animate-pulse rounded-full shadow-[0_0_8px_#ff3333]" />
                                </div>
                                <div
                                    className="absolute bg-[#dcd8c0]/40 -skew-y-12 shadow-[0_0_15px_rgba(220,216,192,0.3)]"
                                    style={{ width: '36px', height: '3px', left: '-45px', top: '0px' }}
                                />
                                <div
                                    className="absolute bg-[#dcd8c0]/40 skew-y-12 shadow-[0_0_15px_rgba(220,216,192,0.3)]"
                                    style={{ width: '36px', height: '3px', left: '9px', top: '0px' }}
                                />
                                <motion.div
                                    animate={{ opacity: [0.3, 0.7, 0.3], height: [30, 60, 30] }}
                                    transition={{ repeat: Infinity, duration: 0.1 }}
                                    className="absolute bg-[#dcd8c0]/20 blur-[3px]"
                                    style={{ width: '6px', left: '-3px', top: '15px' }}
                                />
                            </div>
                        </motion.div>
                    )}

                    {playerBullets.map(pb => (
                        <div
                            key={pb.id}
                            className="absolute w-[3px] h-[18px] bg-[#dcd8c0] shadow-[0_0_20px_#dcd8c0]"
                            style={{
                                left: pb.x,
                                top: pb.y,
                                transform: `translate(-50%, -50%) rotate(${pb.rotation}deg)`
                            }}
                        />
                    ))}

                    {bullets.map(b => (
                        <div
                            key={b.id}
                            className="absolute w-10 h-10 border border-[#ff3333]/40 rounded-full flex items-center justify-center"
                            style={{ left: b.x, top: b.y, transform: 'translate(-50%, -50%)' }}
                        >
                            <div className="w-4 h-4 bg-[#ff3333] rounded-full shadow-[0_0_25px_#ff3333]" />
                            <div className="absolute inset-0 rounded-full animate-ping bg-[#ff3333]/30" />
                        </div>
                    ))}

                    {gameState === 'lost' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-12 bg-[#0a0a0a]/80 backdrop-blur-md pointer-events-auto z-[60]"
                        >
                            <h2 className="text-7xl font-bold text-[#ff3333] mb-4 tracking-tighter border-b-4 border-[#ff3333] pb-2 text-center underline-offset-8">BLACK_BOX_SIGNAL_LOST</h2>
                            <p className="text-[#dcd8c0] text-xl mb-12 opacity-80">Operational duration: {survivalTime.toFixed(2)} seconds.</p>

                            <div className="flex gap-8">
                                <button
                                    onClick={resetGame}
                                    className="border border-[#dcd8c0] text-[#dcd8c0] px-10 py-4 hover:bg-[#dcd8c0] hover:text-[#0a0a0a] transition-all font-bold tracking-widest bg-transparent uppercase text-lg"
                                >
                                    &gt;&gt; REINITIALIZE_FLIGHT_UNIT
                                </button>
                                <button
                                    onClick={onClose}
                                    className="border border-[#ff3333]/50 text-[#ff3333]/50 px-10 py-4 hover:bg-[#ff3333] hover:text-[#0a0a0a] transition-all font-bold tracking-widest bg-transparent uppercase text-lg"
                                >
                                    &gt;&gt; RETURN_TO_BUNKER
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {gameState === 'active' && survivalTime < 5 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-24 left-1/2 -translate-x-1/2 text-[#dcd8c0]/40 text-center space-y-2 uppercase"
                        >
                            <p className="text-sm tracking-[0.5em] font-bold">[W][A][S][D] TO NAVIGATE FLIGHT UNIT</p>
                            <p className="text-xs tracking-[0.3em]">[SPACE] TO INITIATE TACTICAL LASER SYSTEM</p>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CombatOverlay;
