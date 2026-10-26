import React from 'react';
import { Smartphone, Music2, MessageSquareHeart, Navigation, CreditCard, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedContent from './AnimatedContent';

export default function Benefits() {
    const benefits = [
        {
            icon: Smartphone,
            title: 'Mobile-First Perfection',
            description: 'Tata letak dirancang khusus untuk kenyamanan genggaman smartphone, menjamin teks dan foto tampil proporsional tanpa zoom atau scroll horizontal.',
        },
        {
            icon: Music2,
            title: 'Alunan Musik Romantis',
            description: 'Dilengkapi pemutar musik latar berkualitas jernih yang otomatis mengalun lembut saat amplop dibuka, disertai tombol kontrol audio yang fleksibel.',
        },
        {
            icon: MessageSquareHeart,
            title: 'RSVP & Doa Real-Time',
            description: 'Tamu dapat mengonfirmasi kehadiran serta menuliskan untaian doa restu secara langsung yang tampil rapi pada buku tamu digital.',
        },
        {
            icon: Navigation,
            title: 'Navigasi Presisi Venue',
            description: 'Terintegrasi langsung dengan Google Maps dan Waze sehingga tamu undangan dapat menemukan rute tercepat menuju lokasi akad maupun resepsi.',
        },
        {
            icon: CreditCard,
            title: 'Amplop Digital Cashless',
            description: 'Memberikan kemudahan bagi tamu yang berhalangan hadir untuk mengirimkan tanda kasih melalui transfer rekening bank atau scan QRIS.',
        },
        {
            icon: HeartHandshake,
            title: 'Linimasa Kisah Cinta',
            description: 'Bagikan narasi perjalanan cinta Anda mulai dari awal perjumpaan, momen komitmen, hingga pelaminan dengan tata letak galeri yang puitis.',
        },
    ];

    return (
        <motion.section
            id="fitur"
            initial={{ opacity: 0.85, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 -mt-10 sm:-mt-12 md:mt-0 pt-16 pb-20 md:py-28 bg-[#FAF8F5] rounded-t-[32px] sm:rounded-t-[44px] md:rounded-t-none shadow-[0_-20px_50px_rgba(26,24,23,0.14)] md:shadow-none border-t border-[#E5DDD0]/80 transition-all"
        >
            {/* Mobile Overlapping Sheet Handle */}
            <div className="w-12 h-1.5 rounded-full bg-[#8C6D46]/30 mx-auto -mt-10 mb-8 md:hidden" aria-hidden="true" />

            <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
                {/* Section Header */}
                <AnimatedContent
                    distance={50}
                    direction="vertical"
                    duration={0.8}
                    ease="power3.out"
                    threshold={0.15}
                >
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1817] tracking-tight">
                            Fitur Lengkap yang Memudahkan Anda
                        </h2>
                        <p className="text-base text-[#6E6864]">
                            DNVITE menyatukan estetika seni undangan tradisional dengan kecanggihan interaktivitas modern.
                        </p>
                    </div>
                </AnimatedContent>

                {/* Benefits Grid with Staggered Children */}
                <AnimatedContent
                    distance={60}
                    direction="vertical"
                    duration={0.8}
                    ease="power3.out"
                    stagger={0.08}
                    threshold={0.1}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {benefits.map((b, idx) => {
                        const Icon = b.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.12 }}
                                transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white p-8 rounded-3xl border border-[#E5DDD0] shadow-sm hover:border-[#8C6D46] transition-all duration-300 text-left space-y-4 group"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-[#F2ECE4] text-[#8C6D46] group-hover:bg-[#8C6D46] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                                    <Icon className="w-6 h-6 stroke-[1.75]" />
                                </div>
                                <h3 className="font-serif text-2xl font-bold text-[#1A1817] group-hover:text-[#8C6D46] transition-colors">
                                    {b.title}
                                </h3>
                                <p className="text-sm text-[#6E6864] leading-relaxed">
                                    {b.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </AnimatedContent>
            </div>
        </motion.section>
    );
}
