import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc3 } from 'lucide-react';

export default function AudioController({ template, isAutoPlaying }) {
    const { details, theme } = template;
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const synthContextRef = useRef(null);
    const synthTimerRef = useRef(null);

    // Initialize HTML5 Audio with reliable wedding stream
    useEffect(() => {
        const audio = new Audio(
            'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=romantic-piano-10702.mp3'
        );
        audio.loop = true;
        audioRef.current = audio;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            stopPianoSynth();
        };
    }, []);

    // Web Audio API Synthesizer Fallback (Chopin-style romantic piano arpeggios in D major)
    const startPianoSynth = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            synthContextRef.current = ctx;

            // Notes in Hz (D major romantic piano arpeggios: D4, F#4, A4, D5, C#5, B4, A4, G4, F#4, E4)
            const chords = [
                [293.66, 369.99, 440.0, 587.33], // D maj
                [246.94, 293.66, 369.99, 493.88], // B min
                [220.0, 277.18, 329.63, 440.0],  // A maj
                [196.0, 246.94, 293.66, 392.0],  // G maj
            ];

            let chordIndex = 0;
            let noteIndex = 0;

            const playNextNote = () => {
                if (ctx.state === 'suspended') {
                    ctx.resume();
                }
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                const chord = chords[chordIndex];
                const freq = chord[noteIndex % chord.length];

                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, ctx.currentTime);

                // Gentle piano attack and smooth decay
                gain.gain.setValueAtTime(0.001, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 1.25);

                noteIndex++;
                if (noteIndex >= chord.length) {
                    noteIndex = 0;
                    chordIndex = (chordIndex + 1) % chords.length;
                }
            };

            synthTimerRef.current = setInterval(playNextNote, 420);
        } catch (e) {
            console.warn('Web Audio synth not supported', e);
        }
    };

    const stopPianoSynth = () => {
        if (synthTimerRef.current) {
            clearInterval(synthTimerRef.current);
            synthTimerRef.current = null;
        }
        if (synthContextRef.current) {
            try {
                synthContextRef.current.close();
            } catch (e) {}
            synthContextRef.current = null;
        }
    };

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current
                .play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(() => {
                    // Fallback to Web Audio synthesized piano
                    startPianoSynth();
                    setIsPlaying(true);
                });
        } else {
            startPianoSynth();
            setIsPlaying(true);
        }
    };

    const pauseAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        stopPianoSynth();
        setIsPlaying(false);
    };

    // Auto-trigger on Buka Undangan
    useEffect(() => {
        if (isAutoPlaying && !isPlaying) {
            playAudio();
        }
    }, [isAutoPlaying]);

    const togglePlay = () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    };

    return (
        <aside aria-label="Pemutar Audio Undangan">
            <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5">
                <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Hentikan Musik Latar' : 'Putar Musik Latar'}
                    className="w-12 h-12 rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.35)] flex items-center justify-center text-white border-2 border-white/30 transition-transform hover:scale-110 active:scale-95 cursor-pointer group"
                    style={{ backgroundColor: theme.accent || '#8C6D46' }}
                    title={isPlaying ? 'Jeda Musik' : 'Putar Musik Romantis'}
                >
                    <Disc3
                        className={`w-6 h-6 stroke-[1.8] ${isPlaying ? 'animate-spin' : ''}`}
                        style={{ animationDuration: '4s' }}
                    />
                </button>

                {isPlaying && (
                    <div
                        onClick={togglePlay}
                        className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xl backdrop-blur-md border animate-in fade-in cursor-pointer hover:opacity-90"
                        style={{
                            backgroundColor: `${theme.cardBg || '#FFFFFF'}F0`,
                            borderColor: theme.border,
                            color: theme.text,
                        }}
                    >
                        <Volume2 className="w-3.5 h-3.5 animate-pulse" style={{ color: theme.accent }} />
                        <span className="max-w-[150px] truncate text-[11px]">
                            {details?.audioTitle || 'Canon in D Piano'}
                        </span>
                    </div>
                )}
            </div>
        </aside>
    );
}
