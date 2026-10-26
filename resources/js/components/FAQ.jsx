import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/templates';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section id="faq" className="py-20 md:py-28 bg-[#FAF8F5]">
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

                {/* FAQ Accordion List */}
                <div className="space-y-4">
                    {FAQS.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
