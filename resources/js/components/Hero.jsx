import React from 'react';
import { ArrowUpRight, Play, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroPhoneMockup from './HeroPhoneMockup';

export default function Hero({ onNavigate }) {
    return (
        <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#FAF8F5]">
            <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left Column: Editorial Headline & Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-7 space-y-6 sm:space-y-7 text-left"
                    >
                        {/* Headline: strictly 2 lines or fewer */}
                        <h1 className="font-serif text-[36px] sm:text-[48px] lg:text-[58px] font-bold text-[#1A1817] leading-[1.12] tracking-tight">
                            Undangan Pernikahan Mewah dengan Cerita yang Abadi
                        </h1>

                        {/* Supporting Sentence */}
                        <p className="text-base sm:text-lg text-[#6E6864] leading-relaxed max-w-xl font-normal">
                            Hadirkan kesan pertama yang memikat untuk hari bahagia Anda. Desain bernuansa editorial, musik pengiring yang intim, RSVP interaktif, dan panduan lokasi presisi.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                            <button
                                onClick={() => onNavigate('catalog')}
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#8C6D46] hover:bg-[#745834] active:scale-[0.98] text-white text-base font-semibold transition-all duration-200 shadow-xs hover:shadow cursor-pointer focus-visible:ring-2 focus-visible:ring-[#8C6D46] focus-visible:outline-none"
                            >
                                <span>Jelajahi Template</span>
                                <ArrowUpRight className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => onNavigate('demo', 'amora-serenade')}
                                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full border border-[#8C6D46] text-[#8C6D46] hover:bg-[#8C6D46]/10 active:scale-[0.98] text-base font-semibold transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#8C6D46] focus-visible:outline-none"
                            >
                                <Play className="w-4 h-4 fill-current" />
                                <span>Coba Demo Langsung</span>
                            </button>
                        </div>

                        {/* Trust & Guarantee Notes */}
                        <div className="pt-4 border-t border-[#E5DDD0] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#6E6864]">
                            <div className="flex items-center gap-1.5 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-[#8C6D46] shrink-0" />
                                <span>Proses Kilat 1–2 Hari Kerja</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-[#8C6D46] shrink-0" />
                                <span>Revisi Sepuasnya Sampai Hari H</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-[#8C6D46] shrink-0" />
                                <span>Tanpa Batasan Kuota Tamu</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Realistic Smartphone Mockup */}
                    <div className="lg:col-span-5 flex justify-center w-full pt-4 lg:pt-0">
                        <HeroPhoneMockup onNavigate={onNavigate} />
                    </div>
                </div>
            </div>
        </section>
    );
}
