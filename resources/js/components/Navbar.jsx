import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';

export default function Navbar({ onNavigate }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (e, target) => {
        e.preventDefault();
        setMobileOpen(false);
        if (target === 'catalog') {
            onNavigate('catalog');
        } else if (target === 'home') {
            onNavigate('home');
        } else {
            // Anchor scroll on home
            onNavigate('home');
            setTimeout(() => {
                const element = document.querySelector(target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DDD0] shadow-sm py-3.5'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-[1240px] mx-auto px-5 sm:px-8 flex items-center justify-between">
                {/* Brand Wordmark */}
                <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, 'home')}
                    className="group flex items-center gap-2.5 text-left cursor-pointer"
                >
                    <div className="w-9 h-9 rounded-full bg-[#8C6D46] text-white flex items-center justify-center font-serif text-xl font-bold tracking-wider shadow-sm transition-transform group-hover:scale-105">
                        D
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1817] leading-none">
                            DNVITE
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D46] font-semibold mt-0.5">
                            Wedding Invitation
                        </span>
                    </div>
                </a>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8">
                    <a
                        href="#"
                        onClick={(e) => handleLinkClick(e, 'home')}
                        className="text-[15px] font-medium text-[#1A1817]/80 hover:text-[#8C6D46] transition-colors relative py-1"
                    >
                        Beranda
                    </a>
                    <a
                        href="#catalog"
                        onClick={(e) => handleLinkClick(e, 'catalog')}
                        className="text-[15px] font-medium text-[#1A1817]/80 hover:text-[#8C6D46] transition-colors relative py-1"
                    >
                        Katalog Template
                    </a>
                    <a
                        href="#fitur"
                        onClick={(e) => handleLinkClick(e, '#fitur')}
                        className="text-[15px] font-medium text-[#1A1817]/80 hover:text-[#8C6D46] transition-colors relative py-1"
                    >
                        Fitur
                    </a>
                    <a
                        href="#cara-pesan"
                        onClick={(e) => handleLinkClick(e, '#cara-pesan')}
                        className="text-[15px] font-medium text-[#1A1817]/80 hover:text-[#8C6D46] transition-colors relative py-1"
                    >
                        Cara Pesan
                    </a>
                    <a
                        href="#faq"
                        onClick={(e) => handleLinkClick(e, '#faq')}
                        className="text-[15px] font-medium text-[#1A1817]/80 hover:text-[#8C6D46] transition-colors relative py-1"
                    >
                        FAQ
                    </a>
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={() => onNavigate('admin')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E5DDD0] bg-white/70 hover:bg-white text-xs font-semibold text-[#6E6864] hover:text-[#1A1817] transition-all shadow-2xs hover:shadow cursor-pointer"
                        title="Portal Akses Admin DNVITE"
                    >
                        <Shield className="w-3.5 h-3.5 text-[#8C6D46]" />
                        <span>Admin</span>
                    </button>
                    <button
                        onClick={() => onNavigate('catalog')}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8C6D46] hover:bg-[#745834] text-white text-[14px] font-semibold transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
                    >
                        <span>Jelajahi Template</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Buka Navigasi"
                    className="md:hidden p-2 text-[#1A1817] hover:text-[#8C6D46] transition-colors cursor-pointer"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className="md:hidden bg-[#FAF8F5] border-b border-[#E5DDD0] px-5 py-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col space-y-3">
                        <a
                            href="#"
                            onClick={(e) => handleLinkClick(e, 'home')}
                            className="text-base font-medium text-[#1A1817] hover:text-[#8C6D46] py-1 transition-colors"
                        >
                            Beranda
                        </a>
                        <a
                            href="#catalog"
                            onClick={(e) => handleLinkClick(e, 'catalog')}
                            className="text-base font-medium text-[#1A1817] hover:text-[#8C6D46] py-1 transition-colors"
                        >
                            Katalog Template
                        </a>
                        <a
                            href="#fitur"
                            onClick={(e) => handleLinkClick(e, '#fitur')}
                            className="text-base font-medium text-[#1A1817] hover:text-[#8C6D46] py-1 transition-colors"
                        >
                            Fitur
                        </a>
                        <a
                            href="#cara-pesan"
                            onClick={(e) => handleLinkClick(e, '#cara-pesan')}
                            className="text-base font-medium text-[#1A1817] hover:text-[#8C6D46] py-1 transition-colors"
                        >
                            Cara Pesan
                        </a>
                        <a
                            href="#faq"
                            onClick={(e) => handleLinkClick(e, '#faq')}
                            className="text-base font-medium text-[#1A1817] hover:text-[#8C6D46] py-1 transition-colors"
                        >
                            FAQ
                        </a>
                    </div>
                    <div className="pt-3 border-t border-[#E5DDD0] flex flex-col gap-2">
                        <button
                            onClick={() => {
                                setMobileOpen(false);
                                onNavigate('catalog');
                            }}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#8C6D46] text-white text-sm font-semibold transition-colors cursor-pointer"
                        >
                            <span>Jelajahi Template</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => {
                                setMobileOpen(false);
                                onNavigate('admin');
                            }}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#E5DDD0] bg-white text-xs font-semibold text-[#6E6864] hover:text-[#1A1817] transition-colors cursor-pointer"
                        >
                            <Shield className="w-3.5 h-3.5 text-[#8C6D46]" />
                            <span>Portal Admin DNVITE</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
