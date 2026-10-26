import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    Volume2,
    VolumeX,
    Sparkles,
    Calendar,
    MapPin,
    ArrowRight,
    ArrowUpRight,
    RotateCcw,
    Disc3,
    Wifi,
    Battery,
} from 'lucide-react';

export default function HeroPhoneMockup({ onNavigate }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [guestName, setGuestName] = useState('Bpk/Ibu Tamu Terhormat');
    const [isEditingGuest, setIsEditingGuest] = useState(false);

    // Audio playback reference
    const audioRef = useRef(null);

    useEffect(() => {
        // High quality royalty-free acoustic wedding piano audio stream
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
        };
    }, []);

    const togglePlayAudio = (e) => {
        if (e) e.stopPropagation();
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    };

    const handleOpenInvitation = () => {
        setIsOpen(true);
        if (!isPlaying && audioRef.current) {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
        }
    };

    const handleCloseInvitation = (e) => {
        if (e) e.stopPropagation();
        setIsOpen(false);
    };

    return (
        <div className="relative w-full max-w-[340px] sm:max-w-[360px] mx-auto select-none">
            {/* Ambient Lighting Aura behind Phone */}
            <div
                className="absolute -inset-6 bg-gradient-to-tr from-[#8C6D46]/25 via-[#D4AF37]/15 to-[#8C6D46]/10 rounded-[60px] blur-2xl -z-10 pointer-events-none"
                aria-hidden="true"
            />

            {/* Floating Trust Badge: Top Right */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden sm:flex absolute -top-4 -right-8 z-20 items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E5DDD0] shadow-lg text-[11px] font-semibold text-[#1A1817]"
            >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Interactive Demo</span>
            </motion.div>

            {/* Floating Trust Badge: Bottom Left */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden sm:flex absolute -bottom-4 -left-8 z-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E5DDD0] shadow-lg text-xs font-semibold text-[#1A1817]"
            >
                <div className="w-6 h-6 rounded-full bg-[#8C6D46]/10 text-[#8C6D46] flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                    <span className="block leading-tight text-[#1A1817]">Format Mobile-First</span>
                    <span className="text-[10px] text-[#6E6864] font-normal">Sentuhan Layar Responsif</span>
                </div>
            </motion.div>

            {/* Smartphone Outer Chassis with Floating Animation */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: 'easeInOut',
                }}
                className="relative rounded-[50px] p-3 sm:p-3.5 bg-gradient-to-b from-[#2D2A28] via-[#1D1B1A] to-[#141312] shadow-[0_25px_60px_-12px_rgba(26,24,23,0.35),0_0_0_1px_rgba(255,255,255,0.08),0_0_40px_rgba(140,109,70,0.18)] ring-1 ring-[#8C6D46]/30"
            >
                {/* Side Hardware Buttons */}
                <div className="absolute -left-[5px] top-28 w-[3px] h-10 bg-[#3A3532] rounded-l-sm" />
                <div className="absolute -left-[5px] top-42 w-[3px] h-10 bg-[#3A3532] rounded-l-sm" />
                <div className="absolute -right-[5px] top-32 w-[3px] h-14 bg-[#3A3532] rounded-r-sm" />

                {/* Inner Screen Display (Bezel & Viewport) */}
                <div className="relative rounded-[40px] overflow-hidden bg-[#FAF8F5] aspect-[9/18.5] flex flex-col justify-between border border-[#1A1817]/40 shadow-inner">
                    {/* Top Phone Chrome: Dynamic Island & Status Bar */}
                    <div className="absolute top-0 inset-x-0 z-30 pt-2 px-5 flex items-center justify-between text-[#FAF8F5] pointer-events-none">
                        <span className="text-[11px] font-semibold tracking-tight text-white drop-shadow-xs">
                            09:41
                        </span>

                        {/* Dynamic Island Pill */}
                        <div className="w-22 h-4.5 bg-[#1A1817] rounded-full flex items-center justify-between px-2.5 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                            <span className="w-2 h-2 rounded-full bg-[#122218] border border-emerald-500/60" />
                        </div>

                        {/* Signal & Battery Icons */}
                        <div className="flex items-center gap-1.5 text-white drop-shadow-xs">
                            <Wifi className="w-3 h-3 stroke-[2.2]" />
                            <div className="flex items-center gap-0.5">
                                <Battery className="w-3.5 h-3.5 stroke-[2.2]" />
                            </div>
                        </div>
                    </div>

                    {/* Glass Glare Sheen Reflection across screen */}
                    <div
                        className="pointer-events-none absolute -top-40 -left-40 w-80 h-96 bg-gradient-to-br from-white/12 via-white/4 to-transparent rotate-25 z-20 rounded-full"
                        aria-hidden="true"
                    />

                    {/* Screen Viewport Modes: Cover vs Inside Content */}
                    <AnimatePresence mode="wait">
                        {!isOpen ? (
                            /* SCREEN MODE 1: ELEGANT COVER */
                            <motion.div
                                key="cover-mode"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.35 }}
                                className="relative flex-1 flex flex-col justify-between p-5 pt-12 text-center text-white overflow-hidden"
                            >
                                {/* Full Cover Image Background with Rich Vignette */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                                        alt="Sampul Undangan"
                                        className="w-full h-full object-cover scale-105"
                                    />
                                    {/* Multi-layered Editorial Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#1A1817]/75 via-[#1A1817]/40 to-[#1A1817]/90" />
                                </div>

                                {/* Top Floating Audio Toggle Widget */}
                                <div className="relative z-10 flex items-center justify-between pt-1">
                                    <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-semibold tracking-wider uppercase border border-white/20">
                                        Wedding Invitation
                                    </span>

                                    <button
                                        type="button"
                                        onClick={togglePlayAudio}
                                        className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                                        title={isPlaying ? 'Matikan Musik' : 'Nyalakan Musik'}
                                    >
                                        {isPlaying ? (
                                            <>
                                                <Disc3 className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                                                <Volume2 className="w-3.5 h-3.5" />
                                            </>
                                        ) : (
                                            <VolumeX className="w-3.5 h-3.5 text-white/80" />
                                        )}
                                    </button>
                                </div>

                                {/* Center Hero Invitation Details */}
                                <div className="relative z-10 my-auto py-4 space-y-3">
                                    {/* Subtle Gold Floral Monogram Crest */}
                                    <div className="w-12 h-12 rounded-full border border-amber-300/40 bg-white/10 backdrop-blur-sm mx-auto flex items-center justify-center shadow-inner">
                                        <span className="font-serif text-lg font-bold text-amber-200 tracking-wider">
                                            R &amp; A
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-[0.28em] text-amber-200/90 font-medium">
                                            The Wedding Celebration Of
                                        </p>
                                        <h3 className="font-serif text-3xl font-bold tracking-tight text-white drop-shadow-sm leading-tight">
                                            Raden &amp; Andini
                                        </h3>
                                        <p className="text-xs text-white/80 font-light pt-0.5">
                                            Sabtu, 28 November 2026
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Area: Guest Recipient & Open CTA */}
                                <div className="relative z-10 space-y-3 pb-1">
                                    {/* Personalized Guest Badge */}
                                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-2.5 border border-white/15">
                                        <span className="text-[10px] text-white/70 block">
                                            Kepada Yth. Bapak/Ibu/Saudara/i:
                                        </span>
                                        {isEditingGuest ? (
                                            <input
                                                type="text"
                                                autoFocus
                                                value={guestName}
                                                onChange={(e) => setGuestName(e.target.value)}
                                                onBlur={() => setIsEditingGuest(false)}
                                                onKeyDown={(e) => e.key === 'Enter' && setIsEditingGuest(false)}
                                                className="w-full text-center text-xs font-semibold bg-white/20 text-white rounded px-2 py-0.5 mt-1 focus:outline-none"
                                            />
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setIsEditingGuest(true)}
                                                className="text-xs font-bold text-amber-200 hover:underline cursor-pointer mt-0.5"
                                                title="Klik untuk ubah nama tamu"
                                            >
                                                {guestName || 'Tamu Terhormat'} ✎
                                            </button>
                                        )}
                                    </div>

                                    {/* Open Invitation Wax Seal CTA Button */}
                                    <button
                                        type="button"
                                        onClick={handleOpenInvitation}
                                        className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#8C6D46] via-[#A07D53] to-[#8C6D46] hover:from-[#745834] hover:to-[#745834] text-white font-semibold text-xs tracking-wide shadow-[0_4px_16px_rgba(140,109,70,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer group active:scale-98"
                                    >
                                        <Heart className="w-3.5 h-3.5 fill-white group-hover:scale-110 transition-transform" />
                                        <span>Buka Undangan</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            /* SCREEN MODE 2: INSIDE INVITATION PREVIEW */
                            <motion.div
                                key="inside-mode"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.35 }}
                                className="relative flex-1 flex flex-col justify-between p-4 pt-11 bg-[#FAF8F5] text-[#1A1817] overflow-y-auto custom-scrollbar"
                            >
                                {/* Top In-App Navigation Bar */}
                                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5DDD0]">
                                    <button
                                        type="button"
                                        onClick={handleCloseInvitation}
                                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8C6D46] hover:underline cursor-pointer"
                                    >
                                        <RotateCcw className="w-3 h-3" />
                                        <span>Sampul</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={togglePlayAudio}
                                        className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8C6D46]/10 text-[10px] font-semibold text-[#8C6D46]"
                                    >
                                        {isPlaying ? (
                                            <>
                                                <Disc3 className="w-3 h-3 animate-spin" />
                                                <span>Musik Aktif</span>
                                            </>
                                        ) : (
                                            <span>Musik Nonaktif</span>
                                        )}
                                    </button>
                                </div>

                                {/* Inside Content Preview */}
                                <div className="space-y-3.5 text-center my-auto">
                                    <span className="text-[10px] uppercase tracking-widest text-[#8C6D46] font-bold block">
                                        Mempelai Bahagia
                                    </span>

                                    {/* Mini Couple Avatars */}
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#8C6D46] shadow-sm">
                                            <img
                                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                                                alt="Raden"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="font-serif text-lg text-[#8C6D46] font-bold">&amp;</span>
                                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#8C6D46] shadow-sm">
                                            <img
                                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                                                alt="Andini"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-serif text-xl font-bold text-[#1A1817]">
                                            Raden &amp; Andini
                                        </h4>
                                        <p className="text-[11px] text-[#6E6864] pt-0.5">
                                            Putra &amp; Putri Keluarga Wicaksana &amp; Kusuma
                                        </p>
                                    </div>

                                    {/* Mini Event Schedule Card */}
                                    <div className="p-2.5 rounded-2xl bg-white border border-[#E5DDD0] text-left text-[11px] space-y-1.5 shadow-2xs">
                                        <div className="flex items-center gap-1.5 text-[#1A1817] font-semibold">
                                            <Calendar className="w-3.5 h-3.5 text-[#8C6D46]" />
                                            <span>Sabtu, 28 November 2026</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#6E6864]">
                                            <MapPin className="w-3.5 h-3.5 text-[#8C6D46]" />
                                            <span>The Tribrata Darmawangsa, Jakarta</span>
                                        </div>
                                    </div>

                                    {/* Countdown Preview */}
                                    <div className="grid grid-cols-4 gap-1 text-center">
                                        <div className="p-1.5 rounded-lg bg-white border border-[#E5DDD0]">
                                            <span className="font-bold text-xs text-[#8C6D46] block">32</span>
                                            <span className="text-[8px] text-[#6E6864]">Hari</span>
                                        </div>
                                        <div className="p-1.5 rounded-lg bg-white border border-[#E5DDD0]">
                                            <span className="font-bold text-xs text-[#8C6D46] block">14</span>
                                            <span className="text-[8px] text-[#6E6864]">Jam</span>
                                        </div>
                                        <div className="p-1.5 rounded-lg bg-white border border-[#E5DDD0]">
                                            <span className="font-bold text-xs text-[#8C6D46] block">28</span>
                                            <span className="text-[8px] text-[#6E6864]">Menit</span>
                                        </div>
                                        <div className="p-1.5 rounded-lg bg-white border border-[#E5DDD0]">
                                            <span className="font-bold text-xs text-[#8C6D46] block">45</span>
                                            <span className="text-[8px] text-[#6E6864]">Detik</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Full Interactive Demo Link */}
                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={() => onNavigate && onNavigate('demo', 'amora-serenade')}
                                        className="w-full py-2.5 px-3 rounded-2xl bg-[#1A1817] hover:bg-[#333] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
                                    >
                                        <span>Coba Demo Layar Penuh</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-[#8C6D46]" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom Home Indicator Bar */}
                    <div className="py-1.5 flex justify-center bg-transparent pointer-events-none">
                        <div className="w-28 h-1 bg-[#1A1817]/40 rounded-full" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
