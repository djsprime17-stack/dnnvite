import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function EventSection({ template }) {
    const { details, theme } = template;

    const generateGoogleCalendarUrl = (event) => {
        const title = encodeURIComponent(`${event.title} — ${details.groom.nickname} & ${details.bride.nickname}`);
        const detailsText = encodeURIComponent(`Undangan Pernikahan ${details.groom.fullName} & ${details.bride.fullName} di ${event.venue}`);
        const location = encodeURIComponent(`${event.venue}, ${event.address}`);
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${detailsText}&location=${location}`;
    };

    return (
        <section
            id="events"
            className="relative z-20 -mt-6 sm:-mt-8 pt-16 pb-20 px-6 sm:px-10 rounded-t-[32px] shadow-[0_-12px_32px_rgba(0,0,0,0.06)] space-y-12 max-w-3xl mx-auto transition-all"
            style={{ backgroundColor: theme.cardBg }}
        >
            {/* Delicate Overlapping Handle Accent */}
            <div
                className="w-10 h-1 rounded-full mx-auto -mt-10 mb-8 opacity-40"
                style={{ backgroundColor: theme.accent }}
            />
            <ScrollReveal animation="fade-up" duration={0.8} delay={0.1}>
                <div className="text-center space-y-3">
                    <span
                        className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                        style={{
                            backgroundColor: `${theme.accent}15`,
                            color: theme.accent,
                        }}
                    >
                        Informasi &amp; Lokasi Acara
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: theme.text }}>
                        Rangkaian Acara Pernikahan
                    </h3>
                    <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: theme.muted }}>
                        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
                    </p>
                </div>
            </ScrollReveal>

            {/* Events Cards with Staggered Lateral Reveal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {details.events.map((event, idx) => (
                    <ScrollReveal
                        key={idx}
                        animation={idx === 0 ? 'fade-right' : 'fade-left'}
                        duration={0.9}
                        delay={0.2 + idx * 0.15}
                    >
                        <div
                            className="rounded-3xl p-6 sm:p-8 border shadow-sm text-center flex flex-col justify-between space-y-6 h-full hover:shadow-lg transition-shadow duration-300"
                            style={{
                                backgroundColor: theme.cardBg,
                                borderColor: theme.border,
                            }}
                        >
                            <div className="space-y-4">
                                <div
                                    className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center font-serif text-xl font-bold shadow-sm"
                                    style={{
                                        backgroundColor: `${theme.accent}20`,
                                        color: theme.accent,
                                    }}
                                >
                                    {idx === 0 ? '01' : '02'}
                                </div>

                                <h4 className="font-serif text-2xl font-bold" style={{ color: theme.text }}>
                                    {event.title}
                                </h4>

                                <div className="space-y-2 text-xs sm:text-sm text-left bg-black/5 p-4 rounded-2xl"
                                    style={{ color: theme.text }}
                                >
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 shrink-0" style={{ color: theme.accent }} />
                                        <span>{event.dateText}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 shrink-0" style={{ color: theme.accent }} />
                                        <span>{event.timeText}</span>
                                    </div>
                                    <div className="flex items-start gap-2 pt-1 border-t border-black/10">
                                        <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accent }} />
                                        <div>
                                            <p className="font-semibold">{event.venue}</p>
                                            <p className="text-[11px] leading-relaxed pt-0.5" style={{ color: theme.muted }}>
                                                {event.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-2 pt-2">
                                <a
                                    href={event.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-2.5 px-4 rounded-full text-white text-xs font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-98 shadow-sm cursor-pointer"
                                    style={{ backgroundColor: theme.accent }}
                                >
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>Petunjuk Arah Google Maps</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>

                                <a
                                    href={generateGoogleCalendarUrl(event)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-2 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors hover:bg-black/5 cursor-pointer"
                                    style={{
                                        borderColor: theme.border,
                                        color: theme.text,
                                    }}
                                >
                                    <CalendarPlus className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                    <span>Simpan ke Kalender</span>
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
