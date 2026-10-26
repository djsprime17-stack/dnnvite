import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function CountdownSection({ template }) {
    const { details, theme } = template;
    const targetDate = new Date(details.weddingDate).getTime();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    const timeUnits = [
        { label: 'Hari', value: timeLeft.days },
        { label: 'Jam', value: timeLeft.hours },
        { label: 'Menit', value: timeLeft.minutes },
        { label: 'Detik', value: timeLeft.seconds },
    ];

    return (
        <section
            id="countdown"
            className="py-16 px-6 sm:px-10 text-center my-6 rounded-3xl max-w-2xl mx-auto border relative z-10"
            style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.border,
            }}
        >
            <ScrollReveal animation="fade-up" duration={0.8} delay={0.1}>
                <div className="space-y-2 mb-8">
                    <span
                        className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                        style={{
                            backgroundColor: `${theme.accent}15`,
                            color: theme.accent,
                        }}
                    >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Menghitung Hari Bahagia</span>
                    </span>
                    <h3 className="font-serif text-3xl font-bold" style={{ color: theme.text }}>
                        Waktu Menuju Hari H
                    </h3>
                </div>
            </ScrollReveal>

            {/* Countdown Grid with Zoom-in & Stagger */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto">
                {timeUnits.map((u, i) => (
                    <ScrollReveal key={i} animation="zoom-in" duration={0.85} delay={0.15 + i * 0.08}>
                        <div
                            className="p-3 sm:p-4 rounded-2xl border text-center shadow-sm hover:scale-105 transition-transform duration-300"
                            style={{
                                backgroundColor: theme.bg,
                                borderColor: theme.border,
                            }}
                        >
                            <span
                                className="font-serif text-3xl sm:text-4xl font-bold block"
                                style={{ color: theme.accent }}
                            >
                                {String(u.value).padStart(2, '0')}
                            </span>
                            <span className="text-[11px] font-medium tracking-wide" style={{ color: theme.muted }}>
                                {u.label}
                            </span>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
