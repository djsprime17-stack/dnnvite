import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { FAQS } from '../data/templates';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <motion.section
            id="faq"
            initial={{ opacity: 0.85, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-40 -mt-10 sm:-mt-12 md:mt-0 pt-16 pb-20 md:py-28 bg-[#FAF8F5] rounded-t-[32px] sm:rounded-t-[44px] md:rounded-t-none shadow-[0_-20px_50px_rgba(26,24,23,0.14)] md:shadow-none border-t border-[#E5DDD0]/80 transition-all"
        >
            {/* Mobile Overlapping Sheet Handle */}
            <div className="w-12 h-1.5 rounded-full bg-[#8C6D46]/30 mx-auto -mt-10 mb-8 md:hidden" aria-hidden="true" />

            <div className="max-w-[860px] mx-auto px-5 sm:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-3">
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1817] tracking-tight">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                    <p className="text-base text-[#6E6864]">
                        Segala hal yang perlu Anda ketahui mengenai pemesanan undangan digital di DNVITE.
                    </p>
                </div>

                {/* FAQ Accordion List with Scroll Reveal */}
                <div className="space-y-4">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white rounded-2xl border border-[#E5DDD0] overflow-hidden transition-all duration-200"
                            >
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                                >
                                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#1A1817]">
                                        {faq.question}
                                    </span>
                                    <div
                                        className={`w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E5DDD0] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                                            isOpen ? 'rotate-180 bg-[#8C6D46] text-white border-[#8C6D46]' : 'text-[#6E6864]'
                                        }`}
                                    >
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#6E6864] leading-relaxed border-t border-[#E5DDD0]/60 animate-in fade-in duration-200">
                                        {faq.answer}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}
