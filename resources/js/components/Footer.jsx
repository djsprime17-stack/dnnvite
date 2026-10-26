import React from 'react';
import { MessageCircle, Heart, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ onNavigate }) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.footer
            initial={{ opacity: 0.9, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-50 bg-[#1A1817] text-[#FAF8F5] pt-18 pb-12 border-t border-white/10"
        >
            <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#FAF8F5]/10">
                    {/* Brand Column */}
                    <div className="md:col-span-5 space-y-5 text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#8C6D46] text-white flex items-center justify-center font-serif text-2xl font-bold tracking-wider">
                                D
                            </div>
                            <span className="font-serif text-3xl font-bold tracking-tight text-[#FAF8F5]">
                                DNVITE
                            </span>
                        </div>
                        <p className="text-sm text-[#FAF8F5]/70 leading-relaxed max-w-sm">
                            Platform undangan pernikahan digital bernuansa editorial luxury. Menghadirkan kenangan terindah dalam balutan kemewahan yang abadi.
                        </p>
                        <div className="pt-2">
                            <a
                                href="https://wa.me/6285723138515"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8C6D46] hover:bg-[#745834] text-white text-xs font-semibold transition-colors"
                            >
                                <MessageCircle className="w-4 h-4 fill-white" />
                                <span>WhatsApp Admin: 085723138515</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="md:col-span-3 space-y-4 text-left">
                        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D46]">
                            Navigasi
                        </p>
                        <ul className="space-y-2.5 text-sm text-[#FAF8F5]/70">
                            <li>
                                <a href="#" className="hover:text-white transition-colors">
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a href="#template" className="hover:text-white transition-colors">
                                    Katalog Template
                                </a>
                            </li>
                            <li>
                                <a href="#fitur" className="hover:text-white transition-colors">
                                    Fitur &amp; Keunggulan
                                </a>
                            </li>
                            <li>
                                <a href="#cara-pesan" className="hover:text-white transition-colors">
                                    Cara Pemesanan
                                </a>
                            </li>
                            <li>
                                <a href="#faq" className="hover:text-white transition-colors">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Operational & Support Column */}
                    <div className="md:col-span-4 space-y-4 text-left">
                        <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#8C6D46]">
                            Layanan Pelanggan
                        </p>
                        <p className="text-sm text-[#FAF8F5]/70 leading-relaxed">
                            Butuh bantuan kilat atau pemesanan kustom? Tim kami siap melayani Anda setiap hari:
                        </p>
                        <div className="bg-[#FAF8F5]/5 p-4 rounded-2xl border border-[#FAF8F5]/10 text-xs space-y-1">
                            <p className="font-semibold text-white">Jam Operasional Layanan:</p>
                            <p className="text-[#FAF8F5]/70">Senin – Minggu: 08:00 – 21:00 WIB</p>
                            <p className="text-[#8C6D46] pt-1">Respons WhatsApp &lt; 15 Menit</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F5]/50">
                    <p className="flex items-center gap-1.5">
                        <span>&copy; {new Date().getFullYear()} DNVITE. Dibuat dengan</span>
                        <Heart className="w-3.5 h-3.5 text-[#8C6D46] fill-[#8C6D46]" />
                        <span>untuk pernikahan impian Anda.</span>
                    </p>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => onNavigate ? onNavigate('admin-login') : (window.location.hash = '#/admin/login')}
                            className="hover:text-white/80 transition-colors cursor-pointer text-[#FAF8F5]/40 hover:underline underline-offset-4"
                        >
                            Portal Admin
                        </button>

                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-1.5 hover:text-white transition-colors group cursor-pointer"
                        >
                            <span>Kembali ke atas</span>
                            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}
