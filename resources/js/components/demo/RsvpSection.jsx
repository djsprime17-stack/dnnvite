import React, { useState } from 'react';
import { Send, MessageSquareHeart, CheckCircle2, User, Users } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function RsvpSection({ template, defaultGuestName }) {
    const { details, theme } = template;
    const [wishes, setWishes] = useState(details.initialWishes || []);

    const [name, setName] = useState(defaultGuestName || '');
    const [attendance, setAttendance] = useState('Hadir');
    const [guestCount, setGuestCount] = useState('1');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        const newWish = {
            name: name.trim(),
            attendance,
            message: message.trim(),
            timestamp: 'Baru saja',
        };

        setWishes([newWish, ...wishes]);
        setMessage('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section id="rsvp" className="py-20 px-6 sm:px-10 max-w-2xl mx-auto space-y-12 text-center relative z-10">
            <ScrollReveal animation="fade-up" duration={0.8} delay={0.1}>
                <div className="space-y-3">
                    <span
                        className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                        style={{
                            backgroundColor: `${theme.accent}15`,
                            color: theme.accent,
                        }}
                    >
                        <MessageSquareHeart className="w-3.5 h-3.5" />
                        <span>Konfirmasi &amp; Ucapan</span>
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: theme.text }}>
                        RSVP &amp; Buku Tamu
                    </h3>
                    <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: theme.muted }}>
                        Kirimkan konfirmasi kehadiran dan doa restu Anda untuk kedua mempelai tercinta.
                    </p>
                </div>
            </ScrollReveal>

            {/* RSVP Form with Fade-Up */}
            <ScrollReveal animation="fade-up" duration={0.9} delay={0.2}>
                <form
                    onSubmit={handleSubmit}
                    className="p-6 sm:p-8 rounded-3xl border shadow-sm text-left space-y-5 hover:shadow-md transition-shadow duration-300"
                    style={{
                        backgroundColor: theme.cardBg,
                        borderColor: theme.border,
                    }}
                >
                    {submitted && (
                        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 flex items-center gap-2 text-xs font-semibold animate-in fade-in">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Terima kasih! Konfirmasi dan doa restu Anda telah berhasil tersimpan.</span>
                        </div>
                    )}

                    {/* Input Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold" style={{ color: theme.text }}>
                            Nama Lengkap Anda
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Contoh: Bpk. Ahmad Dahlan &amp; Istri"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none transition-colors"
                                style={{
                                    backgroundColor: theme.bg,
                                    borderColor: theme.border,
                                    color: theme.text,
                                }}
                            />
                            <User className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                        </div>
                    </div>

                    {/* Radio Attendance */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold" style={{ color: theme.text }}>
                            Konfirmasi Kehadiran
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {['Hadir', 'Berhalangan'].map((status) => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => setAttendance(status)}
                                    className={`py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                                        attendance === status
                                            ? 'text-white shadow-sm'
                                            : 'hover:bg-black/5'
                                    }`}
                                    style={{
                                        backgroundColor: attendance === status ? theme.accent : 'transparent',
                                        borderColor: attendance === status ? theme.accent : theme.border,
                                        color: attendance === status ? '#FFFFFF' : theme.text,
                                    }}
                                >
                                    {status === 'Hadir' ? '✓ Berkenan Hadir' : '✕ Berhalangan'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Guest Count (If Hadir) */}
                    {attendance === 'Hadir' && (
                        <div className="space-y-1.5 animate-in fade-in">
                            <label className="text-xs font-semibold" style={{ color: theme.text }}>
                                Jumlah Tamu yang Hadir
                            </label>
                            <div className="relative">
                                <select
                                    value={guestCount}
                                    onChange={(e) => setGuestCount(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                                    style={{
                                        backgroundColor: theme.bg,
                                        borderColor: theme.border,
                                        color: theme.text,
                                    }}
                                >
                                    <option value="1">1 Orang</option>
                                    <option value="2">2 Orang</option>
                                    <option value="3">3 Orang</option>
                                </select>
                                <Users className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                            </div>
                        </div>
                    )}

                    {/* Message Textarea */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold" style={{ color: theme.text }}>
                            Untaian Doa &amp; Ucapan Selamat
                        </label>
                        <textarea
                            required
                            rows="3"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tuliskan ucapan dan doa tulus Anda untuk kedua mempelai..."
                            className="w-full p-3.5 rounded-xl border text-xs sm:text-sm focus:outline-none transition-colors"
                            style={{
                                backgroundColor: theme.bg,
                                borderColor: theme.border,
                                color: theme.text,
                            }}
                        />
                    </div>

                    {/* Submit CTA */}
                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-full text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-98 transition-all cursor-pointer"
                        style={{ backgroundColor: theme.accent }}
                    >
                        <Send className="w-4 h-4" />
                        <span>Kirim Konfirmasi &amp; Ucapan</span>
                    </button>
                </form>
            </ScrollReveal>

            {/* Wishes Feed List with ScrollReveal */}
            <ScrollReveal animation="fade-up" duration={0.85} delay={0.25}>
                <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between px-2">
                        <h4 className="font-serif text-xl font-bold" style={{ color: theme.text }}>
                            Doa Restu Sahabat ({wishes.length})
                        </h4>
                        <span className="text-xs" style={{ color: theme.muted }}>
                            Real-time feed
                        </span>
                    </div>

                    <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                        {wishes.map((w, i) => (
                            <div
                                key={i}
                                className="p-4 sm:p-5 rounded-2xl border space-y-2 text-xs sm:text-sm transition-all hover:-translate-y-0.5 duration-200"
                                style={{
                                    backgroundColor: theme.cardBg,
                                    borderColor: theme.border,
                                }}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold font-serif text-base" style={{ color: theme.text }}>
                                        {w.name}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                                w.attendance === 'Hadir'
                                                    ? 'bg-emerald-500/10 text-emerald-600'
                                                    : 'bg-gray-500/10 text-gray-500'
                                            }`}
                                        >
                                            {w.attendance}
                                        </span>
                                        <span className="text-[10px]" style={{ color: theme.muted }}>
                                            {w.timestamp}
                                        </span>
                                    </div>
                                </div>

                                <p className="leading-relaxed" style={{ color: theme.muted }}>
                                    "{w.message}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}
