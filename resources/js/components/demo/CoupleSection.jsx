import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const InstagramIcon = ({ className = "w-3.5 h-3.5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
);

export default function CoupleSection({ template }) {
    const { details, theme } = template;
    const { groom, bride, quote, quoteSource, couplePhoto } = details;

    return (
        <section id="couple" className="py-20 px-6 sm:px-10 text-center space-y-16 relative z-10">
            {/* Arched Joint Couple Portrait with Slow Zoom-In Reveal */}
            {couplePhoto && (
                <ScrollReveal animation="zoom-in" duration={1} delay={0.1}>
                    <div className="space-y-4 max-w-xs sm:max-w-sm mx-auto">
                        <div
                            className="relative aspect-[3/4] rounded-t-full overflow-hidden border-4 shadow-2xl p-1 bg-white"
                            style={{
                                borderColor: theme.accent,
                                boxShadow: `0 20px 40px -15px ${theme.accent}40`,
                            }}
                        >
                            <div className="w-full h-full rounded-t-full overflow-hidden">
                                <img
                                    src={couplePhoto}
                                    alt={`${groom.nickname} & ${bride.nickname}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        <div className="pt-1">
                            <span className="font-serif italic text-2xl font-bold tracking-tight" style={{ color: theme.text }}>
                                {groom.nickname} &amp; {bride.nickname}
                            </span>
                        </div>
                    </div>
                </ScrollReveal>
            )}

            {/* Quote Block with Fade-Up */}
            <ScrollReveal animation="fade-up" duration={0.9} delay={0.15}>
                <div className="max-w-xl mx-auto space-y-4">
                    <Heart className="w-5 h-5 mx-auto" style={{ color: theme.accent }} />
                    <blockquote
                        className="font-serif italic text-base sm:text-lg leading-relaxed"
                        style={{ color: theme.text }}
                    >
                        "{quote}"
                    </blockquote>
                    <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: theme.muted }}>
                        — {quoteSource}
                    </p>
                </div>
            </ScrollReveal>

            {/* Salam Pengantar with Fade-Up */}
            <ScrollReveal animation="fade-up" duration={0.9} delay={0.2}>
                <div className="space-y-2 max-w-lg mx-auto">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: theme.text }}>
                        Assalamu’alaikum Warahmatullahi Wabarakatuh
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.muted }}>
                        Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta’ala, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia pernikahan kami:
                    </p>
                </div>
            </ScrollReveal>

            {/* Couple Profiles Grid with Bidirectional Lateral Slide */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 max-w-2xl mx-auto items-center">
                {/* Groom Card */}
                <ScrollReveal animation="fade-right" duration={0.95} delay={0.25}>
                    <div className="space-y-4 text-center">
                        <div
                            className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full overflow-hidden p-1.5 border-2 shadow-lg"
                            style={{ borderColor: theme.accent }}
                        >
                            <img
                                src={groom.photo}
                                alt={groom.fullName}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <h4 className="font-serif text-2xl font-bold" style={{ color: theme.text }}>
                                {groom.fullName}
                            </h4>
                            <p className="text-xs" style={{ color: theme.muted }}>
                                Putra tercinta dari:
                            </p>
                            <p className="text-xs font-semibold" style={{ color: theme.text }}>
                                {groom.father} &amp; {groom.mother}
                            </p>
                        </div>
                        <a
                            href={`https://instagram.com/${groom.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-colors hover:opacity-80 cursor-pointer"
                            style={{ borderColor: theme.border, color: theme.accent }}
                        >
                            <InstagramIcon className="w-3.5 h-3.5" />
                            <span>@{groom.instagram}</span>
                        </a>
                    </div>
                </ScrollReveal>

                {/* Bride Card */}
                <ScrollReveal animation="fade-left" duration={0.95} delay={0.3}>
                    <div className="space-y-4 text-center">
                        <div
                            className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full overflow-hidden p-1.5 border-2 shadow-lg"
                            style={{ borderColor: theme.accent }}
                        >
                            <img
                                src={bride.photo}
                                alt={bride.fullName}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <h4 className="font-serif text-2xl font-bold" style={{ color: theme.text }}>
                                {bride.fullName}
                            </h4>
                            <p className="text-xs" style={{ color: theme.muted }}>
                                Putri tercinta dari:
                            </p>
                            <p className="text-xs font-semibold" style={{ color: theme.text }}>
                                {bride.father} &amp; {bride.mother}
                            </p>
                        </div>
                        <a
                            href={`https://instagram.com/${bride.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-colors hover:opacity-80 cursor-pointer"
                            style={{ borderColor: theme.border, color: theme.accent }}
                        >
                            <InstagramIcon className="w-3.5 h-3.5" />
                            <span>@{bride.instagram}</span>
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
