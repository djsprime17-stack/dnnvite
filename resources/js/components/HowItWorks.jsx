import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { HOW_IT_WORKS_STEPS } from '../data/templates';
import AnimatedContent from './AnimatedContent';

export default function HowItWorks() {
    return (
        <motion.section
            id="cara-pesan"
            initial={{ opacity: 0.9, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 py-18 sm:py-24 md:py-32 bg-[#F2ECE4] border-t border-[#E5DDD0]"
        >
            <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
                {/* Section Header */}
                <AnimatedContent
                    distance={50}
                    direction="vertical"
                    duration={0.8}
                    ease="power3.out"
                    threshold={0.15}
                >
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1817] tracking-tight">
                            Cara Mudah Memesan di DNVITE
                        </h2>
                        <p className="text-base text-[#6E6864]">
                            Tiga langkah praktis tanpa syarat registrasi atau login yang membingungkan.
                        </p>
                    </div>
                </AnimatedContent>

                {/* Steps Cards with Stagger */}
                <AnimatedContent
                    distance={60}
                    direction="vertical"
                    duration={0.8}
                    ease="power3.out"
                    stagger={0.12}
                    threshold={0.1}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
                >
                    {HOW_IT_WORKS_STEPS.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.12 }}
                            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white rounded-3xl p-8 border border-[#E5DDD0] shadow-sm flex flex-col justify-between space-y-6 relative text-left"
                        >
                            <div className="space-y-4">
                                <span className="font-serif text-4xl font-bold text-[#8C6D46]/40 block">
                                    {step.number}
                                </span>
                                <h3 className="font-serif text-2xl font-bold text-[#1A1817]">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-[#6E6864] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-[#E5DDD0] flex items-center gap-2 text-xs font-semibold text-[#8C6D46]">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Mudah &amp; Terpandu</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatedContent>

                {/* Bottom Action Card */}
                <AnimatedContent
                    distance={40}
                    direction="vertical"
                    duration={0.8}
                    ease="power3.out"
                    delay={0.1}
                    threshold={0.15}
                >
                    <div className="mt-14 bg-white rounded-3xl p-8 sm:p-10 border border-[#E5DDD0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                        <div className="space-y-1">
                            <h4 className="font-serif text-2xl font-bold text-[#1A1817]">
                                Punya Pertanyaan Khusus Terkait Desain?
                            </h4>
                            <p className="text-sm text-[#6E6864]">
                                Konsultasikan kebutuhan konsep pernikahan Anda langsung dengan admin DNVITE via WhatsApp.
                            </p>
                        </div>

                        <a
                            href="https://wa.me/6285723138515?text=Halo%20Admin%20DNVITE,%20saya%20ingin%20konsultasi%20mengenai%20undangan%20pernikahan%20digital."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#8C6D46] hover:bg-[#745834] text-white text-sm font-semibold transition-all shadow-sm hover:shadow shrink-0"
                        >
                            <span>Konsultasi WhatsApp</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </AnimatedContent>
            </div>
        </motion.section>
    );
}
