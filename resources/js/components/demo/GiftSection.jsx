import React, { useState } from 'react';
import { Gift, Copy, Check, QrCode } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function GiftSection({ template }) {
    const { details, theme } = template;
    const { bankAccounts } = details;
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleCopy = (accountNumber, idx) => {
        navigator.clipboard.writeText(accountNumber);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2500);
    };

    if (!bankAccounts || bankAccounts.length === 0) return null;

    return (
        <section id="gift" className="py-20 px-6 sm:px-10 max-w-2xl mx-auto space-y-12 text-center relative z-10">
            <ScrollReveal animation="fade-up" duration={0.8} delay={0.1}>
                <div className="space-y-3">
                    <span
                        className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                        style={{
                            backgroundColor: `${theme.accent}15`,
                            color: theme.accent,
                        }}
                    >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Tanda Kasih</span>
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: theme.text }}>
                        Amplop Digital &amp; Kado
                    </h3>
                    <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: theme.muted }}>
                        Doa restu Anda merupakan karunia terindah bagi kami. Bagi keluarga dan sahabat yang berkenan memberikan tanda kasih, dapat mengirimkan melalui:
                    </p>
                </div>
            </ScrollReveal>

            {/* Bank Accounts Grid with Staggered Slide-Up */}
            <div className="space-y-4">
                {bankAccounts.map((account, idx) => (
                    <ScrollReveal
                        key={idx}
                        animation="fade-up"
                        duration={0.85}
                        delay={0.15 + idx * 0.1}
                    >
                        <div
                            className="p-6 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left hover:shadow-md transition-shadow duration-300"
                            style={{
                                backgroundColor: theme.cardBg,
                                borderColor: theme.border,
                            }}
                        >
                            <div className="space-y-1">
                                <span
                                    className="text-xs font-bold uppercase tracking-wider block"
                                    style={{ color: theme.accent }}
                                >
                                    {account.bank}
                                </span>
                                <p
                                    className="font-mono text-xl sm:text-2xl font-bold tracking-wider"
                                    style={{ color: theme.text }}
                                >
                                    {account.accountNumber}
                                </p>
                                <p className="text-xs font-medium" style={{ color: theme.muted }}>
                                    a.n. {account.accountHolder}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleCopy(account.accountNumber, idx)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                                style={{
                                    backgroundColor: copiedIndex === idx ? '#10B981' : theme.bg,
                                    borderColor: copiedIndex === idx ? '#10B981' : theme.border,
                                    color: copiedIndex === idx ? '#FFFFFF' : theme.text,
                                }}
                            >
                                {copiedIndex === idx ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 text-white" />
                                        <span>Tersalin!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                                        <span>Salin No. Rekening</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
