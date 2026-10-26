import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../data/templates';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <motion.section
            id="faq"
            initial={{ opacity: 0.9, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-40 py-18 sm:py-24 md:py-32 bg-[#FAF8F5] border-t border-[#E5DDD0]"
        >
            <div className="max-w-[860px] mx-auto px-5 sm:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16 space-y-3">
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1817] tracking-tight">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                    <p className="text-base text-[#6E6864] leading-relaxed max-w-xl mx-auto">
                        Segala hal yang perlu Anda ketahui mengenai pemesanan undangan digital di DNVITE.
                    </p>
                </div>

                {/* FAQ Accordion List */}
                <div className="space-y-4">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white rounded-2xl border border-[#E5DDD0] overflow-hidden transition-all duration-200 shadow-2xs hover:border-[#8C6D46]/40"
                            >
                                <button
                                    onClick={() => toggle(idx)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${idx}`}
                                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#8C6D46] focus-visible:outline-none"
                                >
                                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#1A1817] hover:text-[#8C6D46] transition-colors">
                                        {faq.question}
                                    </span>
                                    <div
                                        className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                                            isOpen
                                                ? 'rotate-180 bg-[#8C6D46] text-white border-[#8C6D46]'
                                                : 'bg-[#FAF8F5] text-[#6E6864] border-[#E5DDD0]'
                                        }`}
                                    >
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            id={`faq-answer-${idx}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#6E6864] leading-relaxed border-t border-[#E5DDD0]/60">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}
