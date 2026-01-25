import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const musicModules = import.meta.glob('../assets/music/*.mp3', { eager: true });
const tracks = Object.keys(musicModules).map(path => {
    const fileName = path.split('/').pop().replace('.mp3', '');
    return {
        title: fileName.replace(/_/g, ' ').replace(/-/g, ' ').toUpperCase(),
        file: musicModules[path].default || musicModules[path]
    };
});

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef(null);

    if (tracks.length === 0) {
        return (
            <div className="bg-[var(--bg-color)] border border-[var(--text-main)] flex flex-col w-full max-w-sm shadow-[4px_4px_0px_rgba(75,72,63,0.1)] opacity-50">
                <div className="bg-[var(--text-main)] text-[var(--bg-color)] px-4 py-1 text-[10px] font-mono font-bold tracking-[0.2em]">
                    SOUND_DATA // NO_FILES_FOUND
                </div>
                <div className="p-6 font-mono text-xs text-[var(--text-main)]">
                    PROPOSAL: Place MP3 files in [ src/assets/music ] to initialize tactical audio playback.
                </div>
            </div>
        );
    }

    const currentTrack = tracks[currentTrackIndex];

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play().catch(e => console.log("Audio play failed, user interaction may be required."));
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying, currentTrackIndex]);

    const handleTimeUpdate = () => {
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        if (duration) {
            setProgress((current / duration) * 100);
        }
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    };

    return (
        <div className="bg-[var(--bg-color)] border border-[var(--text-main)] flex flex-col w-full max-w-sm shadow-[4px_4px_0px_rgba(75,72,63,0.1)]">
            <audio
                ref={audioRef}
                src={currentTrack.file}
                onTimeUpdate={handleTimeUpdate}
                onEnded={nextTrack}
            />

            <div className="bg-[var(--text-main)] text-[var(--bg-color)] px-4 py-1 text-[10px] font-mono font-bold tracking-[0.2em] flex justify-between items-center">
                <span>SOUND_DATA // PLAYER</span>
                <span className="opacity-50">UNIT: Pod 042</span>
            </div>

            <div className="p-6 border-b border-[var(--text-main)]/20 text-[var(--text-main)]">
                <div className="text-[10px] font-mono opacity-50 mb-1 uppercase tracking-tighter">Now Executing:</div>
                <div className="font-mono text-sm font-bold uppercase truncate tracking-tight">
                    {currentTrack.title}
                </div>

                <div className="mt-4 space-y-1">
                    <div className="h-1.5 bg-[var(--text-main)]/10 relative">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-[var(--text-main)]"
                            style={{ width: `${progress}%` }}
                        />
                        <div className="absolute inset-0 flex justify-between px-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-px h-full bg-[var(--bg-color)] opacity-30" />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between text-[8px] font-mono opacity-40">
                        <span>00:00</span>
                        <span>Tactical Audio Record</span>
                        <span>99:99</span>
                    </div>
                </div>
            </div>

            <div className="max-h-40 overflow-y-auto font-mono text-[10px] py-1 border-b border-[var(--text-main)]/20 scrollbar-hide text-[var(--text-main)]">
                {tracks.map((track, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setCurrentTrackIndex(index);
                            setIsPlaying(true);
                        }}
                        className={`px-4 py-1.5 cursor-pointer flex items-center transition-colors ${currentTrackIndex === index
                            ? 'bg-[var(--text-main)] text-[var(--bg-color)]'
                            : 'hover:bg-[var(--text-main)]/5'
                            }`}
                    >
                        <span className="w-6 opacity-30">0{index + 1}</span>
                        <span className="truncate">{track.title}</span>
                        {currentTrackIndex === index && isPlaying && (
                            <motion.div
                                className={`ml-auto w-2 h-2 ${currentTrackIndex === index ? 'bg-[var(--bg-color)]' : 'bg-[var(--text-main)]'}`}
                                animate={{ scale: [1, 0.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 flex items-center justify-around text-[var(--text-main)]">
                <button
                    onClick={prevTrack}
                    className="p-2 border-none hover:bg-[var(--text-main)]/10 transition-colors"
                    style={{ cursor: 'none' }}
                >
                    <span className="font-mono text-xs">|&lt;</span>
                </button>
                <button
                    onClick={togglePlay}
                    className="p-3 bg-[var(--text-main)] text-[var(--bg-color)] flex items-center justify-center min-w-[3rem]"
                    style={{ cursor: 'none' }}
                >
                    <span className="font-mono text-xs font-bold">
                        {isPlaying ? "PAUSE" : "EXECUTE"}
                    </span>
                </button>
                <button
                    onClick={nextTrack}
                    className="p-2 border-none hover:bg-[var(--text-main)]/10 transition-colors"
                    style={{ cursor: 'none' }}
                >
                    <span className="font-mono text-xs">&gt;|</span>
                </button>
            </div>
        </div>
    );
};

export default MusicPlayer;
