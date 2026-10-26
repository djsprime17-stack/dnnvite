import React from 'react';
import { Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function LoveStorySection({ template }) {
    const { details, theme } = template;
    const { loveStory } = details;

    if (!loveStory || loveStory.length === 0) return null;

    return (
        <section
            id="story"
            className="relative z-30 -mt-6 sm:-mt-8 pt-16 pb-20 px-6 sm:px-10 rounded-t-[32px] shadow-[0_-12px_32px_rgba(0,0,0,0.06)] max-w-2xl mx-auto space-y-12 text-center transition-all"
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
                        className="inline-flex items-center gap-1 px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                        style={{
                            backgroundColor: `${theme.accent}15`,
                            color: theme.accent,
                        }}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Our Journey</span>
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: theme.text }}>
                        Kisah Kasih Kami
                    </h3>
                    <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: theme.muted }}>
                        Setiap detik kebersamaan adalah untaian rasa syukur yang menuntun kami pada ikatan suci ini.
                    </p>
                </div>
            </ScrollReveal>

            {/* Timeline Tree with Staggered Fade-Up */}
            <div className="relative border-l-2 ml-4 sm:ml-8 space-y-10 text-left"
                style={{ borderColor: theme.border }}
            >
                {loveStory.map((story, i) => (
                    <div key={i} className="relative pl-6 sm:pl-8 group">
                        {/* Dot on line */}
                        <div
                            className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-white transition-transform group-hover:scale-125 duration-300"
                            style={{
                                borderColor: theme.accent,
                                backgroundColor: theme.accent,
                            }}
                        />

                        {/* Story Card with ScrollReveal */}
                        <ScrollReveal animation="fade-up" duration={0.85} delay={0.15 + i * 0.1}>
                            <div
                                className="p-5 sm:p-6 rounded-2xl border shadow-sm space-y-2 transition-all hover:shadow-md hover:-translate-y-1 duration-300"
                                style={{
                                    backgroundColor: theme.cardBg,
                                    borderColor: theme.border,
                                }}
                            >
                                <span
                                    className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider"
                                    style={{
                                        backgroundColor: `${theme.accent}20`,
                                        color: theme.accent,
                                    }}
                                >
                                    {story.year}
                                </span>
                                <h4 className="font-serif text-xl font-bold" style={{ color: theme.text }}>
                                    {story.title}
                                </h4>
                                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.muted }}>
                                    {story.desc}
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                ))}
            </div>
        </section>
    );
}
