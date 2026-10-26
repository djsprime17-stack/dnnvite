import React, { useState } from 'react';
import { Eye, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TEMPLATES } from '../data/templates';
import AnimatedContent from './AnimatedContent';

export default function FeaturedTemplates({ onNavigate }) {
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    const categories = ['Semua', 'Modern Minimalis', 'Traditional Royalty', 'Romantic Floral', 'Luxury Classic'];

    const filteredTemplates =
        selectedCategory === 'Semua'
            ? TEMPLATES
            : TEMPLATES.filter((t) => t.category === selectedCategory);

    const handleOrderClick = (template) => {
        onNavigate('order', template.id);
    };

    return (
        <motion.section
            id="template"
            initial={{ opacity: 0.9, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 py-18 sm:py-24 md:py-32 bg-[#F2ECE4] border-t border-[#E5DDD0]"
        >
            <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
                {/* Section Header */}
                <AnimatedContent
                    distance={35}
                    direction="vertical"
                    duration={0.7}
                    ease="power3.out"
                    threshold={0.15}
                >
                    <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1817] tracking-tight">
                            Koleksi Template Undangan Unggulan
                        </h2>
                        <p className="text-base text-[#6E6864] leading-relaxed">
                            Setiap template dirancang dengan tipografi editorial mewah dan tata letak yang responsif sempurna di semua layar smartphone.
                        </p>
                    </div>
                </AnimatedContent>

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#8C6D46] focus-visible:outline-none ${
                                selectedCategory === cat
                                    ? 'bg-[#8C6D46] text-white shadow-xs'
                                    : 'bg-white/90 text-[#1A1817]/85 hover:bg-white border border-[#E5DDD0]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Template Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-stretch">
                    {filteredTemplates.map((template, idx) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: (idx % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            className="group bg-white rounded-3xl overflow-hidden border border-[#E5DDD0] shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                        >
                            {/* Card Image Container (Consistent 3:4 ratio) */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-[#FAF8F5]">
                                <img
                                    src={template.coverImage}
                                    alt={template.name}
                                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                                    loading="lazy"
                                />
                                {/* Bottom dark gradient for contrast */}
                                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 via-black/15 to-transparent pointer-events-none" />

                                {/* Category Badge */}
                                <div className="absolute top-3.5 left-3.5 z-10">
                                    <span className="px-3 py-1 rounded-full bg-[#1A1817]/85 backdrop-blur-md text-white text-[11px] font-medium tracking-wide shadow-xs">
                                        {template.category}
                                    </span>
                                </div>

                                {/* Popular / Exclusive Tag */}
                                <div className="absolute top-3.5 right-3.5 z-10">
                                    <span className="px-2.5 py-1 rounded-full bg-[#8C6D46] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                                        {template.tag}
                                    </span>
                                </div>
                            </div>

                            {/* Card Details Body */}
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2 text-left">
                                    {/* Title with uniform min-height */}
                                    <h3 className="font-serif text-2xl font-bold text-[#1A1817] group-hover:text-[#8C6D46] transition-colors min-h-[32px] flex items-center">
                                        {template.name}
                                    </h3>

                                    {/* Description with uniform min-height & line-clamp */}
                                    <p className="text-xs text-[#6E6864] line-clamp-2 leading-relaxed min-h-[36px]">
                                        {template.description}
                                    </p>

                                    {/* Features Checklist with aligned min-height */}
                                    <div className="pt-3 pb-1 space-y-2 border-t border-[#E5DDD0]/70 min-h-[104px]">
                                        {template.features.slice(0, 4).map((f, i) => (
                                             <div key={i} className="flex items-center gap-2 text-xs text-[#1A1817]/85">
                                                <div className="w-4 h-4 rounded-full bg-[#8C6D46]/10 text-[#8C6D46] flex items-center justify-center shrink-0">
                                                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                                                </div>
                                                <span className="truncate">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Price & Dual Action Buttons (Pinned to bottom) */}
                                <div className="mt-auto pt-4 border-t border-[#E5DDD0] space-y-3.5">
                                    {/* Price Row */}
                                    <div className="flex items-baseline justify-between gap-2">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-bold text-[#8C6D46] font-sans">
                                                {template.price}
                                            </span>
                                            <span className="text-xs text-[#6E6864] line-through">
                                                {template.originalPrice}
                                            </span>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full bg-[#8C6D46]/10 text-[#8C6D46] text-[10px] font-bold uppercase tracking-wider shrink-0">
                                            Paket Komplit
                                        </span>
                                    </div>

                                    {/* Dual Action Buttons */}
                                    <div className="grid grid-cols-2 gap-2.5">
                                        <button
                                            type="button"
                                            onClick={() => onNavigate('demo', template.id)}
                                            className="h-10 inline-flex items-center justify-center gap-1.5 px-3 rounded-full border border-[#8C6D46] text-[#8C6D46] hover:bg-[#8C6D46]/10 active:scale-[0.98] text-xs font-semibold transition-all cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#8C6D46] focus-visible:outline-none"
                                        >
                                            <Eye className="w-3.5 h-3.5 shrink-0" />
                                            <span>Lihat Demo</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleOrderClick(template)}
                                            className="h-10 inline-flex items-center justify-center gap-1.5 px-3 rounded-full bg-[#8C6D46] hover:bg-[#745834] active:scale-[0.98] text-white text-xs font-semibold shadow-2xs hover:shadow transition-all cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#8C6D46] focus-visible:outline-none"
                                        >
                                            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                                            <span>Pesan</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom View All Link to Dedicated Catalog */}
                <div className="mt-14 text-center">
                    <button
                        type="button"
                        onClick={() => onNavigate('catalog')}
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] active:scale-[0.98] border border-[#8C6D46] text-[#8C6D46] font-semibold text-sm shadow-xs hover:shadow transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#8C6D46] focus-visible:outline-none"
                    >
                        <span>Buka Katalog Lengkap dengan Filter &amp; Pencarian</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.section>
    );
}
