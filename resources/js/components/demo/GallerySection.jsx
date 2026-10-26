import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function GallerySection({ template }) {
    const { details, theme } = template;
    const { gallery } = details;
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const nextImage = (e) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev + 1) % gallery.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    };

    return (
        <section
            id="gallery"
            className="relative z-40 -mt-6 sm:-mt-8 pt-16 pb-20 px-6 sm:px-10 rounded-t-[32px] shadow-[0_-12px_32px_rgba(0,0,0,0.06)] max-w-3xl mx-auto space-y-12 text-center transition-all"
            style={{ backgroundColor: theme.cardBg }}
        >
            {/* Delicate Overlapping Handle Accent */}
            <div
                className="w-10 h-1 rounded-full mx-auto -mt-10 mb-8 opacity-40"
                style={{ backgroundColor: theme.accent }}
            />
            <ScrollReveal animation="fade-up" duration={0.8} delay={0.1}>
                <div className="space-y-3">
                    <span
                        className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                        style={{
                            backgroundColor: `${theme.accent}15`,
                            color: theme.accent,
                        }}
                    >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Galeri Bahagia</span>
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: theme.text }}>
                        Momen Kebersamaan
                    </h3>
                    <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: theme.muted }}>
                        Kumpulan potret kehangatan dan senyuman yang menyertai langkah kami menuju pelaminan.
                    </p>
                </div>
            </ScrollReveal>

            {/* Photo Grid with Staggered Zoom-In */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {gallery.map((photoUrl, idx) => (
                    <ScrollReveal
                        key={idx}
                        animation="zoom-in"
                        duration={0.85}
                        delay={0.15 + (idx % 3) * 0.1}
                    >
                        <div
                            onClick={() => openLightbox(idx)}
                            className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-sm border hover:shadow-xl transition-all duration-500"
                            style={{ borderColor: theme.border }}
                        >
                            <img
                                src={photoUrl}
                                alt={`Galeri ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <ZoomIn className="w-6 h-6 stroke-[1.5]" />
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            {/* Lightbox Modal */}
            {lightboxIndex !== null && (
                <div
                    onClick={closeLightbox}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
                >
                    <button
                        onClick={closeLightbox}
                        aria-label="Tutup Foto"
                        className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-4xl max-h-[85vh] flex items-center justify-center"
                    >
                        <img
                            src={gallery[lightboxIndex]}
                            alt="Zoomed Photo"
                            className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
                        />

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevImage}
                            aria-label="Foto Sebelumnya"
                            className="absolute left-3 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextImage}
                            aria-label="Foto Selanjutnya"
                            className="absolute right-3 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="absolute bottom-6 left-0 right-0 text-center text-white/80 text-xs tracking-widest font-mono">
                        {lightboxIndex + 1} / {gallery.length}
                    </div>
                </div>
            )}
        </section>
    );
}
