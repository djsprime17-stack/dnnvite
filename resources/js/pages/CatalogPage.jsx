import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Eye, ShoppingBag, Check, Sparkles, Filter, X } from 'lucide-react';
import { TEMPLATES } from '../data/templates';
import Footer from '../components/Footer';

export default function CatalogPage({ onNavigate }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [sortBy, setSortBy] = useState('popular');

    const categories = ['Semua', 'Modern Minimalis', 'Traditional Royalty', 'Romantic Floral', 'Luxury Classic'];

    const filteredTemplates = useMemo(() => {
        let result = TEMPLATES.filter((t) => {
            const matchesCategory =
                selectedCategory === 'Semua' || t.category === selectedCategory;
            const matchesSearch =
                t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (sortBy === 'price-low') {
            result.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
                const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
                return priceA - priceB;
            });
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
                const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
                return priceB - priceA;
            });
        }

        return result;
    }, [searchQuery, selectedCategory, sortBy]);

    const handleOrder = (template) => {
        onNavigate('order', template.id);
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#1A1817] flex flex-col font-sans">
            {/* Top Bar Navigation */}
            <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DDD0] py-4 px-5 sm:px-8">
                <div className="max-w-[1240px] mx-auto flex items-center justify-between">
                    <button
                        onClick={() => onNavigate('home')}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A1817] hover:text-[#8C6D46] transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Beranda</span>
                    </button>

                    <a href="#" onClick={() => onNavigate('home')} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#8C6D46] text-white flex items-center justify-center font-serif text-lg font-bold">
                            D
                        </div>
                        <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1817]">
                            DNVITE
                        </span>
                    </a>
                </div>
            </header>

            {/* Catalog Hero Banner */}
            <div className="py-16 px-5 sm:px-8 text-center bg-[#F2ECE4] border-b border-[#E5DDD0]">
                <div className="max-w-3xl mx-auto space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#8C6D46]/10 text-[#8C6D46] text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Katalog Resmi DNVITE</span>
                    </span>
                    <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1817] tracking-tight">
                        Eksplorasi Tema Undangan Pernikahan
                    </h1>
                    <p className="text-sm sm:text-base text-[#6E6864] max-w-xl mx-auto">
                        Pilih rancangan desain yang selaras dengan konsep hari bahagia Anda. Uji coba langsung setiap fitur interaktif sebelum memesan.
                    </p>
                </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="py-8 px-5 sm:px-8 border-b border-[#E5DDD0] bg-white sticky top-[65px] z-30 shadow-xs">
                <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari tema atau kategori..."
                            className="w-full pl-10 pr-10 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E5DDD0] text-xs sm:text-sm text-[#1A1817] placeholder-[#6E6864] focus:outline-none focus:border-[#8C6D46] transition-colors"
                        />
                        <Search className="w-4 h-4 text-[#6E6864] absolute left-3.5 top-3" />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3.5 top-3 text-[#6E6864] hover:text-[#1A1817]"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-[#8C6D46] text-white shadow-xs'
                                        : 'bg-[#FAF8F5] text-[#1A1817] hover:bg-[#F2ECE4] border border-[#E5DDD0]'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Sort Selector */}
                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                        <span className="text-xs text-[#6E6864] shrink-0">Urutkan:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-[#FAF8F5] border border-[#E5DDD0] text-xs font-medium text-[#1A1817] rounded-full px-3 py-1.5 focus:outline-none"
                        >
                            <option value="popular">Paling Populer</option>
                            <option value="price-low">Harga: Rendah ke Tinggi</option>
                            <option value="price-high">Harga: Tinggi ke Rendah</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Template Grid Section */}
            <main className="flex-1 py-14 px-5 sm:px-8 max-w-[1240px] mx-auto w-full">
                {filteredTemplates.length === 0 ? (
                    <div className="py-20 text-center space-y-4">
                        <p className="text-lg font-serif font-bold text-[#1A1817]">
                            Tidak ada tema yang cocok dengan pencarian "{searchQuery}"
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('Semua');
                            }}
                            className="px-5 py-2 rounded-full bg-[#8C6D46] text-white text-xs font-semibold"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                        {filteredTemplates.map((template) => (
                            <div
                                key={template.id}
                                className="group bg-white rounded-3xl overflow-hidden border border-[#E5DDD0] shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Top Image (Consistent 3:4 ratio) */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#F2ECE4]">
                                    <img
                                        src={template.coverImage}
                                        alt={template.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 via-black/10 to-transparent pointer-events-none" />

                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-3 py-1 rounded-full bg-[#1A1817]/85 backdrop-blur-md text-white text-xs font-medium shadow-xs">
                                            {template.category}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="px-3 py-1 rounded-full bg-[#8C6D46] text-white text-xs font-bold uppercase tracking-wider shadow-xs">
                                            {template.tag}
                                        </span>
                                    </div>
                                </div>

                                {/* Body Information */}
                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2 text-left">
                                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1817] group-hover:text-[#8C6D46] transition-colors min-h-[36px] flex items-center">
                                            {template.name}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#6E6864] line-clamp-2 leading-relaxed min-h-[40px]">
                                            {template.description}
                                        </p>

                                        {/* Features List with pinned min-height */}
                                        <div className="pt-3 pb-1 space-y-2 border-t border-[#E5DDD0]/70 min-h-[105px]">
                                            {template.features.slice(0, 4).map((f, i) => (
                                                <div key={i} className="flex items-center gap-2 text-xs text-[#1A1817]/80">
                                                    <div className="w-4 h-4 rounded-full bg-[#8C6D46]/10 text-[#8C6D46] flex items-center justify-center shrink-0">
                                                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                                                    </div>
                                                    <span className="truncate">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price and Action Buttons (Pinned to Bottom) */}
                                    <div className="mt-auto pt-4 border-t border-[#E5DDD0] space-y-3.5">
                                        <div className="flex items-baseline justify-between gap-2">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-bold text-[#8C6D46] font-sans">
                                                    {template.price}
                                                </span>
                                                <span className="text-xs text-[#6E6864] line-through">
                                                    {template.originalPrice}
                                                </span>
                                            </div>
                                            <span className="px-2.5 py-0.5 rounded-full bg-[#8C6D46]/10 text-[#8C6D46] text-[10px] font-bold uppercase tracking-wider shrink-0">
                                                Paket Komplit
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2.5">
                                            <button
                                                type="button"
                                                onClick={() => onNavigate('demo', template.id)}
                                                className="h-11 inline-flex items-center justify-center gap-1.5 px-3 rounded-full border border-[#8C6D46] text-[#8C6D46] hover:bg-[#8C6D46]/10 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-98"
                                            >
                                                <Eye className="w-3.5 h-3.5 shrink-0" />
                                                <span>Lihat Demo</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleOrder(template)}
                                                className="h-11 inline-flex items-center justify-center gap-1.5 px-3 rounded-full bg-[#8C6D46] hover:bg-[#745834] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-98"
                                            >
                                                <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                                                <span>Pesan Sekarang</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
