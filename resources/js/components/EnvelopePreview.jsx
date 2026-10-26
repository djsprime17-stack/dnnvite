import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Music, Volume2, VolumeX, Heart, RefreshCw } from 'lucide-react';

export default function EnvelopePreview() {
    const [guestName, setGuestName] = useState('Bpk/Ibu Tamu Terhormat');
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setIsPlaying(true);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Input customizer for Guest Name */}
            <div className="mb-4 bg-[#F2ECE4] p-3 rounded-2xl border border-[#E5DDD0] flex items-center gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-[#8C6D46] shrink-0" />
                <span className="text-xs font-semibold text-[#8C6D46] uppercase tracking-wider shrink-0">
                    Coba Ketik:
                </span>
                <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value || 'Tamu Terhormat')}
                    placeholder="Ketik nama Anda di sini..."
                    className="w-full bg-white px-3 py-1.5 rounded-lg border border-[#E5DDD0] text-xs font-medium text-[#1A1817] focus:outline-none focus:border-[#8C6D46] transition-colors"
                />
            </div>

            {/* Interactive Envelope Device */}
            <div className="relative bg-[#FFFFFF] rounded-3xl p-5 border border-[#E5DDD0] shadow-sm overflow-hidden">
                {/* Header Status Bar inside Envelope Box */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DDD0] text-xs text-[#6E6864]">
                    <span className="flex items-center gap-1.5 font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Live Interactive Simulator
                    </span>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-[#8C6D46] hover:text-[#745834] transition-colors"
                    >
                        {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                        <span>{isPlaying ? 'Musik Nyala' : 'Musik Mati'}</span>
                    </button>
                </div>

                {/* Envelope Body */}
                <div className="relative min-h-[360px] bg-[#FAF8F5] rounded-2xl border border-[#E5DDD0] p-6 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300">
                    <AnimatePresence mode="wait">
                        {!isOpen ? (
                            <motion.div
                                key="envelope-closed"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center justify-center space-y-4 py-6"
                            >
                                {/* Envelope Decorative Flap Graphic */}
                                <div className="relative w-28 h-20 bg-[#F2ECE4] border-2 border-[#E5DDD0] rounded-lg shadow-sm flex items-center justify-center">
                                    <div className="absolute inset-0 border-t-8 border-t-[#E5DDD0] border-l-[54px] border-l-transparent border-r-[54px] border-r-transparent"></div>
                                    {/* Wax Seal Stamp */}
                                    <button
                                        onClick={toggleOpen}
                                        className="relative z-10 w-12 h-12 rounded-full bg-[#8C6D46] hover:bg-[#745834] text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer group"
                                        title="Buka Undangan"
                                    >
                                        <Heart className="w-5 h-5 fill-white/80 group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#8C6D46] font-semibold">
                                        The Wedding Of
                                    </p>
                                    <h4 className="font-serif text-2xl font-bold text-[#1A1817]">
                                        Raden &amp; Andini
                                    </h4>
                                    <p className="text-xs text-[#6E6864] pt-1">
                                        Sabtu, 28 November 2026
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <span className="text-[11px] text-[#6E6864] block mb-1">
                                        Undangan Resmi Khusus:
                                    </span>
                                    <span className="inline-block px-3.5 py-1 bg-[#F2ECE4] text-[#1A1817] font-semibold text-xs rounded-full border border-[#E5DDD0]">
                                        {guestName}
                                    </span>
                                </div>

                                <button
                                    onClick={toggleOpen}
                                    className="mt-3 px-5 py-2 rounded-full bg-[#8C6D46] hover:bg-[#745834] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                                >
                                    <span>Buka Segel Amplop</span>
                                    <Heart className="w-3.5 h-3.5 fill-white" />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="envelope-open"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                className="w-full bg-white border border-[#E5DDD0] rounded-xl p-5 shadow-sm space-y-3"
                            >
                                <div className="flex items-center justify-between pb-2 border-b border-[#E5DDD0]">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
                                        Surat Undangan Terbuka
                                    </span>
                                    <button
                                        onClick={toggleOpen}
                                        className="text-xs text-[#6E6864] hover:text-[#1A1817] flex items-center gap-1 font-medium"
                                    >
                                        <RefreshCw className="w-3 h-3" />
                                        <span>Tutup</span>
                                    </button>
                                </div>

                                <div className="space-y-1 text-center py-2">
                                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D46] font-medium">
                                        Walimatul 'Ursy
                                    </p>
                                    <h3 className="font-serif text-2xl font-bold text-[#1A1817] tracking-tight">
                                        Raden Arya &amp; Andini Putri
                                    </h3>
                                    <div className="w-8 h-[1px] bg-[#8C6D46] mx-auto my-2"></div>
                                    <p className="text-xs text-[#1A1817] font-serif italic">
                                        "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan"
                                    </p>
                                </div>

                                <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E5DDD0] text-xs space-y-1 text-left">
                                    <p className="text-[11px] text-[#6E6864]">Kepada Tamu Terhormat:</p>
                                    <p className="text-sm font-bold text-[#8C6D46]">{guestName}</p>
                                    <p className="text-[11px] text-[#6E6864] pt-1">
                                        Merupakan kehormatan bagi kami atas kehadiran dan doa restu Anda.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-left pt-1">
                                    <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E5DDD0]">
                                        <p className="text-[10px] text-[#8C6D46] font-semibold uppercase">Akad Nikah</p>
                                        <p className="text-xs font-bold text-[#1A1817]">08:00 - 10:00 WIB</p>
                                        <p className="text-[10px] text-[#6E6864] truncate">Masjid Agung Al-Azhar</p>
                                    </div>
                                    <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E5DDD0]">
                                        <p className="text-[10px] text-[#8C6D46] font-semibold uppercase">Resepsi</p>
                                        <p className="text-xs font-bold text-[#1A1817]">11:00 - 14:00 WIB</p>
                                        <p className="text-[10px] text-[#6E6864] truncate">Grand Ballroom Hotel</p>
                                    </div>
                                </div>

                                {isPlaying && (
                                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C6D46] font-medium pt-1">
                                        <Music className="w-3.5 h-3.5 animate-bounce" />
                                        <span>Memutar: Canon in D (Piano &amp; Cello)</span>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
