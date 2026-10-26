import React, { useState, useRef, useEffect } from 'react';
import {
    ArrowLeft,
    Smartphone,
    Monitor,
    ShoppingBag,
    Heart,
    Share2,
    Check,
    RotateCcw,
    Users,
    Calendar,
    Clock,
    BookOpen,
    Image as ImageIcon,
    MessageSquare,
    Gift,
    Sparkles,
    ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEMPLATES } from '../data/templates';
import CoverSection from '../components/demo/CoverSection';
import CoupleSection from '../components/demo/CoupleSection';
import CountdownSection from '../components/demo/CountdownSection';
import EventSection from '../components/demo/EventSection';
import LoveStorySection from '../components/demo/LoveStorySection';
import GallerySection from '../components/demo/GallerySection';
import RsvpSection from '../components/demo/RsvpSection';
import GiftSection from '../components/demo/GiftSection';
import AudioController from '../components/demo/AudioController';
import ScrollReveal from '../components/demo/ScrollReveal';
import ParallaxDecor from '../components/demo/ParallaxDecor';

export default function DemoPage({ templateId, onNavigate }) {
    const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
    const { theme, details } = template;

    const [isMobileFrame, setIsMobileFrame] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [guestName, setGuestName] = useState('Bpk/Ibu Tamu Terhormat');
    const [copiedShare, setCopiedShare] = useState(false);
    const [activeSection, setActiveSection] = useState('couple');

    const scrollContainerRef = useRef(null);

    const handleOpenInvitation = () => {
        setIsOpen(true);
        setIsAutoPlaying(true);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleReopenCover = () => {
        setIsOpen(false);
    };

    const handleOrder = () => {
        onNavigate('order', template.id);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
    };

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(id);
        }
    };

    return (
        <div className="min-h-screen bg-[#141312] text-white flex flex-col font-sans select-none overflow-x-hidden">
            {/* Top Simulator Studio Control Bar */}
            <header className="sticky top-0 z-50 bg-[#1A1817]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onNavigate('catalog')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Katalog</span>
                    </button>

                    <div className="hidden sm:flex items-center gap-2">
                        <span className="font-serif text-lg font-bold text-white tracking-tight">
                            {template.name}
                        </span>
                        <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                            style={{ backgroundColor: theme.accent }}
                        >
                            {template.category}
                        </span>
                    </div>
                </div>

                {/* Center: Device Frame Switcher & Cover Reset */}
                <div className="flex items-center gap-2">
                    {/* Device Switcher (Desktop only) */}
                    <div className="hidden lg:flex items-center bg-white/10 p-1 rounded-full border border-white/10 text-xs font-semibold">
                        <button
                            onClick={() => setIsMobileFrame(true)}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                                isMobileFrame ? 'bg-white text-[#141312] shadow' : 'text-white/70 hover:text-white'
                            }`}
                        >
                            <Smartphone className="w-3.5 h-3.5" />
                            <span>Frame HP</span>
                        </button>
                        <button
                            onClick={() => setIsMobileFrame(false)}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                                !isMobileFrame ? 'bg-white text-[#141312] shadow' : 'text-white/70 hover:text-white'
                            }`}
                        >
                            <Monitor className="w-3.5 h-3.5" />
                            <span>Layar Penuh</span>
                        </button>
                    </div>

                    {/* Re-Open Cover Button (when inside invitation) */}
                    {isOpen && (
                        <button
                            onClick={handleReopenCover}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                            title="Buka Ulang Halaman Cover Sinematik"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Cover Depan</span>
                        </button>
                    )}
                </div>

                {/* Right: Share & Order CTA */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleShare}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer"
                        title="Bagikan Tautan Demo"
                    >
                        {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                    </button>

                    <button
                        onClick={handleOrder}
                        className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-white text-xs font-bold transition-all transform hover:scale-105 active:scale-95 shadow cursor-pointer"
                        style={{ backgroundColor: theme.accent }}
                    >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Pesan Desain Ini</span>
                        <span className="sm:hidden">Pesan</span>
                        <span className="hidden md:inline">({template.price})</span>
                    </button>
                </div>
            </header>

            {/* Main Interactive Stage */}
            <main className="flex-1 flex items-center justify-center py-4 lg:py-8 px-0 sm:px-4">
                <div
                    className={`w-full transition-all duration-300 relative shadow-2xl ${
                        isMobileFrame
                            ? 'max-w-[430px] rounded-[48px] border-[10px] border-[#2E2A28] overflow-hidden my-auto ring-1 ring-white/10'
                            : 'max-w-4xl rounded-3xl border border-white/10 overflow-hidden my-auto'
                    }`}
                    style={{ backgroundColor: theme.bg }}
                >
                    {/* Simulated Phone Top Speaker & Camera Notch (Mobile Frame Only) */}
                    {isMobileFrame && (
                        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-40 w-28 h-4 bg-[#2E2A28] rounded-full flex items-center justify-center gap-2 pointer-events-none">
                            <div className="w-2.5 h-2.5 rounded-full bg-black/70 border border-white/10" />
                            <div className="w-8 h-1 rounded-full bg-black/50" />
                        </div>
                    )}

                    {/* Stage Inner Container */}
                    <div
                        ref={scrollContainerRef}
                        className="min-h-[640px] max-h-[88vh] overflow-y-auto relative scroll-smooth"
                        style={{ color: theme.text }}
                    >
                        <AnimatePresence mode="wait">
                            {!isOpen ? (
                                /* 1. CINEMATIC 4K OPENING COVER */
                                <motion.div
                                    key="cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0.98, y: -20 }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <CoverSection
                                        template={template}
                                        onOpen={handleOpenInvitation}
                                        guestName={guestName}
                                        setGuestName={setGuestName}
                                    />
                                </motion.div>
                            ) : (
                                /* 2. FULL OPENED INVITATION CONTENT */
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                    className="pb-24 relative"
                                >
                                    {/* Multi-layered Parallax Ambient Background */}
                                    <ParallaxDecor theme={theme} />

                                    {/* Invitation Header Hero Banner with ScrollReveal */}
                                    <div className="relative pt-16 pb-12 px-6 text-center overflow-hidden border-b z-10"
                                        style={{ borderColor: theme.border, backgroundColor: theme.cardBg }}
                                    >
                                        <ScrollReveal animation="fade-up" duration={0.8} delay={0.1}>
                                            <div className="space-y-3 relative z-10 max-w-lg mx-auto">
                                                <span
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest"
                                                    style={{ backgroundColor: `${theme.accent}15`, color: theme.accent }}
                                                >
                                                    <Sparkles className="w-3.5 h-3.5" />
                                                    <span>Walimatul 'Ursy</span>
                                                </span>

                                                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight"
                                                    style={{ color: theme.text }}
                                                >
                                                    {details?.groom?.nickname || 'Rafael'} &amp; {details?.bride?.nickname || 'Yana'}
                                                </h1>

                                                <p className="text-xs uppercase tracking-widest font-medium" style={{ color: theme.muted }}>
                                                    {details?.events?.[0]?.dateText || 'Minggu, 20 Desember 2026'}
                                                </p>
                                            </div>
                                        </ScrollReveal>
                                    </div>

                                    {/* 1. Couple Profile Section */}
                                    <CoupleSection template={template} />

                                    {/* 2. Live Countdown Timer */}
                                    <CountdownSection template={template} />

                                    {/* 3. Event Details: Akad & Resepsi + Maps + Calendar */}
                                    <EventSection template={template} />

                                    {/* 4. Love Story Timeline */}
                                    <LoveStorySection template={template} />

                                    {/* 5. Photo Gallery & Lightbox */}
                                    <GallerySection template={template} />

                                    {/* 6. RSVP & Live Wishes Guestbook */}
                                    <RsvpSection template={template} defaultGuestName={guestName} />

                                    {/* 7. Digital Gift / Cashless Envelope */}
                                    <GiftSection template={template} />

                                    {/* Closing Monogram & Message with ScrollReveal */}
                                    <footer className="py-16 px-6 text-center space-y-4 border-t relative z-10" style={{ borderColor: theme.border }}>
                                        <ScrollReveal animation="fade-up" duration={0.85} delay={0.15}>
                                            <div
                                                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center font-serif text-lg font-bold text-white shadow mb-3"
                                                style={{ backgroundColor: theme.accent }}
                                            >
                                                {details?.groom?.nickname?.[0]}&amp;{details?.bride?.nickname?.[0]}
                                            </div>
                                            <p className="font-serif italic text-base" style={{ color: theme.text }}>
                                                Ungkapan terima kasih yang tulus dari kami berdua.
                                            </p>
                                            <p className="text-xs font-semibold pt-1" style={{ color: theme.muted }}>
                                                Keluarga Besar {details?.groom?.fullName} &amp; {details?.bride?.fullName}
                                            </p>
                                        </ScrollReveal>
                                    </footer>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Floating Bottom Navigation Dock (Shown when invitation is opened) */}
                    {isOpen && (
                        <div className="absolute bottom-4 inset-x-0 z-30 flex justify-center px-4 pointer-events-none">
                            <nav aria-label="Navigasi Bagian Undangan" className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#1A1817]/90 backdrop-blur-md border border-white/20 shadow-2xl pointer-events-auto">
                                <button
                                    onClick={() => scrollToSection('couple')}
                                    className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                    title="Profil Mempelai"
                                >
                                    <Users className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => scrollToSection('countdown')}
                                    className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                    title="Hitung Mundur"
                                >
                                    <Clock className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => scrollToSection('events')}
                                    className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                    title="Jadwal Acara &amp; Peta"
                                >
                                    <Calendar className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => scrollToSection('story')}
                                    className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                    title="Kisah Kasih"
                                >
                                    <BookOpen className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => scrollToSection('gallery')}
                                    className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                    title="Galeri Foto"
                                >
                                    <ImageIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => scrollToSection('rsvp')}
                                    className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                    title="Konfirmasi RSVP &amp; Ucapan"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => scrollToSection('gift')}
                                    className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                                    title="Tanda Kasih / Amplop Digital"
                                >
                                    <Gift className="w-4 h-4" />
                                </button>
                            </nav>
                        </div>
                    )}

                    {/* Floating Audio Controller */}
                    <AudioController template={template} isAutoPlaying={isAutoPlaying} />
                </div>
            </main>
        </div>
    );
}
