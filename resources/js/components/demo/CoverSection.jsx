import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MailOpen, Heart, Sparkles, Edit3, Check, Calendar, MapPin } from 'lucide-react';
import PetalsCanvas from './PetalsCanvas';

export default function CoverSection({ template, onOpen, guestName, setGuestName }) {
    const { details, theme } = template;
    const [isEditingName, setIsEditingName] = useState(false);

    // Couple names
    const groomName = details?.groom?.nickname || 'Rafael';
    const brideName = details?.bride?.nickname || 'Yana';
    const weddingDateText = details?.events?.[0]?.dateText || 'Minggu, 20 Desember 2026';
    const venueName = details?.events?.[0]?.venue || 'Villa Bellagio & Lakeview Palace';

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-between p-6 sm:p-10 text-center overflow-hidden select-none">
            {/* 1. Cinematic 4K Background with Ken Burns Slow Zoom */}
            <motion.div
                initial={{ scale: 1.16, y: -15, filter: 'brightness(0.9) blur(3px)' }}
                animate={{
                    scale: [1.16, 1.03, 1.06],
                    y: [-15, 0, -5],
                    filter: 'brightness(0.88) blur(0px)',
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                }}
                className="absolute inset-0 z-0 origin-center"
            >
                <img
                    src={template.coverImage || '/images/wedding_cinematic_palace.jpg'}
                    alt="Wedding Venue Palace and Fountain"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* 2. Romantic Radial Lighting & Vignette Scrim */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/65 via-black/35 to-black/85 pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-radial-[circle_at_center] from-amber-500/10 via-transparent to-black/60 pointer-events-none" />

            {/* 3. Water Fountain Shimmer & Ripple Overlay Effect */}
            <div className="absolute inset-x-0 bottom-1/4 h-32 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-40 blur-xl pointer-events-none animate-pulse" />

            {/* 4. Falling Flower Petals & Golden Firefly Particles */}
            <PetalsCanvas count={30} />

            {/* 5. Top Wax Seal Monogram */}
            <motion.header
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                className="relative z-20 pt-6 sm:pt-10 space-y-2.5"
            >
                <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center font-serif text-2xl font-bold shadow-2xl border-2 border-white/40 backdrop-blur-md transition-transform hover:scale-105"
                    style={{
                        backgroundColor: 'rgba(140, 109, 70, 0.85)',
                        color: '#FAF8F5',
                        boxShadow: '0 0 25px rgba(212, 175, 55, 0.45)',
                    }}
                >
                    <span className="tracking-widest">
                        {groomName[0]}&amp;{brideName[0]}
                    </span>
                </div>
                <div className="space-y-0.5">
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-semibold text-white/90 drop-shadow">
                        The Wedding Invitation
                    </p>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
                </div>
            </motion.header>

            {/* 6. Middle Wedding Title & Couple Announcement */}
            <main className="relative z-20 my-auto py-8 sm:py-12 space-y-4 max-w-xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-xs sm:text-sm uppercase tracking-[0.4em] text-[#E8D8C3] font-serif font-light drop-shadow"
                >
                    The Wedding of
                </motion.p>

                {/* Main Couple Names with Letter Reveal & Soft Golden Glow */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
                    className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-tight leading-[1.05] drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)]"
                >
                    <span className="italic font-normal">{groomName}</span>{' '}
                    <span className="text-[#D4AF37] font-light font-serif italic text-4xl sm:text-6xl mx-1">
                        &amp;
                    </span>{' '}
                    <span className="italic font-normal">{brideName}</span>
                </motion.h1>

                {/* Decorative Floral Filigree Line */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.8 }}
                    className="flex items-center justify-center gap-3 my-3"
                >
                    <span className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
                    <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                    <span className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </motion.div>

                {/* Date & Venue Tagline */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.1 }}
                    className="space-y-1.5"
                >
                    <p className="text-sm sm:text-lg text-white font-serif tracking-widest uppercase drop-shadow font-medium">
                        {weddingDateText}
                    </p>
                    <p className="text-[11px] sm:text-xs text-white/80 font-sans tracking-wide drop-shadow flex items-center justify-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{venueName}</span>
                    </p>
                </motion.div>
            </main>

            {/* 7. Bottom Guest Recipient Box & Pulsing Buka Undangan Button */}
            <motion.footer
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.6 }}
                className="relative z-20 w-full max-w-sm pb-6 sm:pb-8 space-y-4"
            >
                {/* Guest Greeting Card */}
                <div className="bg-black/45 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 text-white space-y-2 text-center shadow-2xl">
                    <p className="text-[10px] sm:text-[11px] text-[#E8D8C3] uppercase tracking-[0.2em] font-medium">
                        Kepada Yth. Bapak/Ibu/Saudara/i:
                    </p>

                    {isEditingName ? (
                        <div className="flex items-center gap-1.5">
                            <input
                                type="text"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                className="w-full bg-white/15 px-3 py-1.5 rounded-lg text-sm text-white font-semibold text-center border border-white/40 focus:outline-none focus:border-[#D4AF37]"
                                autoFocus
                            />
                            <button
                                onClick={() => setIsEditingName(false)}
                                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                                title="Simpan Nama"
                            >
                                <Check className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <span className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow">
                                {guestName}
                            </span>
                            <button
                                onClick={() => setIsEditingName(true)}
                                className="text-white/60 hover:text-white p-1 transition-colors cursor-pointer"
                                title="Ubah Nama Tamu"
                            >
                                <Edit3 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}

                    <p className="text-[10px] text-white/60 pt-0.5">
                        *Mohon maaf apabila ada kesalahan penulisan nama atau gelar
                    </p>
                </div>

                {/* Primary CTA: Buka Undangan with Golden Pulsing Light */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onOpen}
                    className="w-full py-4 rounded-full text-white font-semibold text-sm shadow-[0_0_30px_rgba(140,109,70,0.5)] flex items-center justify-center gap-2.5 transition-all cursor-pointer border border-white/30 group relative overflow-hidden"
                    style={{ backgroundColor: theme.accent || '#8C6D46' }}
                >
                    {/* Shimmer sweep animation across button */}
                    <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[300%] transition-transform duration-1000" />

                    <MailOpen className="w-4 h-4 stroke-[2.2] text-[#FAF8F5] group-hover:scale-110 transition-transform" />
                    <span className="tracking-wider uppercase text-xs font-bold">Buka Undangan</span>
                </motion.button>
            </motion.footer>
        </section>
    );
}
