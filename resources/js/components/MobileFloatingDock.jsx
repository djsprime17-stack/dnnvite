import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Play, MessageCircle } from 'lucide-react';

export default function MobileFloatingDock({ onNavigate }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show dock after scrolling down 120px
            setVisible(window.scrollY > 120);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.nav
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-4 inset-x-4 z-40 md:hidden flex items-center justify-between gap-2 p-2 rounded-full bg-[#1A1817]/95 backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.35)] select-none"
                    aria-label="Navigasi Aksi Cepat Mobile"
                >
                    {/* Katalog Button */}
                    <button
                        onClick={() => onNavigate('catalog')}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 text-white text-xs font-semibold transition-all cursor-pointer"
                    >
                        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Katalog</span>
                    </button>

                    {/* Coba Demo Button */}
                    <button
                        onClick={() => onNavigate('demo', 'amora-serenade')}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#8C6D46] hover:bg-[#745834] active:scale-95 text-white text-xs font-semibold shadow-md transition-all cursor-pointer relative overflow-hidden"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute top-2 right-2"></span>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Live Demo</span>
                    </button>

                    {/* WhatsApp Direct Chat */}
                    <a
                        href="https://wa.me/6285723138515?text=Halo%20Admin%20DNVITE,%20saya%20tertarik%20dengan%20undangan%20pernikahan%20digital."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shrink-0 shadow transition-all cursor-pointer"
                        aria-label="Chat WhatsApp Admin"
                    >
                        <MessageCircle className="w-4 h-4 fill-white" />
                    </a>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
