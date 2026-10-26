import React from 'react';
import { ArrowUpRight, Play, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroPhoneMockup from './HeroPhoneMockup';

export default function Hero({ onNavigate }) {
    return (
        <section className="sticky top-0 z-0 md:relative pt-28 pb-24 sm:pb-28 md:pt-40 md:pb-32 overflow-hidden bg-[#FAF8F5]">
            <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
                    {/* Left Column: Editorial Headline & Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7 space-y-7 text-left"
                    >
                        {/* Headline: strictly 2 lines or fewer */}
                        <h1 className="font-serif text-[38px] sm:text-[50px] lg:text-[62px] font-bold text-[#1A1817] leading-[1.08] tracking-tight">
                            Undangan Pernikahan Mewah dengan Cerita yang Abadi
                        </h1>

                        {/* Supporting Sentence */}
                        <p className="text-base sm:text-lg text-[#6E6864] leading-relaxed max-w-xl font-normal">
                            Hadirkan kesan pertama yang memikat untuk hari bahagia Anda. Desain bernuansa editorial, musik pengiring yang intim, RSVP interaktif, dan panduan lokasi presisi.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                            <button
                                onClick={() => onNavigate('catalog')}
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#8C6D46] hover:bg-[#745834] active:scale-[0.98] text-white text-base font-semibold transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                            >
                                <span>Jelajahi Template</span>
                                <ArrowUpRight className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => onNavigate('demo', 'amora-serenade')}
                                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full border border-[#8C6D46] text-[#8C6D46] hover:bg-[#8C6D46]/10 active:scale-[0.98] text-base font-semibold transition-all duration-200 cursor-pointer"
                            >
                                <Play className="w-4 h-4 fill-current" />
                                <span>Coba Demo Langsung</span>
                            </button>
                        </div>

                        {/* Trust & Guarantee Notes */}
                        <div className="pt-4 border-t border-[#E5DDD0] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#6E6864]">
                            <div className="flex items-center gap-1.5 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-[#8C6D46]" />
                                <span>Proses Kilat 1–2 Hari Kerja</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-[#8C6D46]" />
                                <span>Revisi Sepuasnya Sampai Hari H</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-[#8C6D46]" />
                                <span>Tanpa Batasan Kuota Tamu</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Realistic Smartphone Mockup */}
                    <div className="lg:col-span-5 flex justify-center w-full">
                        <HeroPhoneMockup onNavigate={onNavigate} />
                    </div>
                </div>

                {/* Mobile Scroll Indicator */}
                <div className="flex md:hidden flex-col items-center justify-center pt-8 text-[#8C6D46] animate-bounce opacity-70">
                    <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll untuk melihat koleksi</span>
                    <ChevronDown className="w-4 h-4 mt-0.5" />
                </div>
            </div>
        </section>
    );
}
