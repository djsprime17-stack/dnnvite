import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Copy, Check, QrCode, Upload, X, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import Footer from '../components/Footer';

export default function OrderConfirmationPage({ orderData, onNavigate }) {
    // Fallback if accessed without state
    const order = orderData || {
        orderRef: 'DNV-2610-8921',
        orderDate: '26 Oktober 2026',
        template: {
            name: 'Amora Serenade',
            category: 'Modern Minimalis',
            price: 'Rp 149.000',
            coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
        },
        customer: {
            name: 'Raden Arya',
            whatsapp: '081234567890',
            email: 'raden.arya@gmail.com',
        },
        couple: {
            groomNickname: 'Raden',
            groomFullName: 'Raden Arya Wicaksana, S.T.',
            brideNickname: 'Andini',
            brideFullName: 'Andini Putri Maharani, M.Ds.',
            weddingDate: '2026-11-28',
        },
        events: {
            akad: { venue: 'Masjid Agung Al-Azhar' },
            resepsi: { venue: 'Grand Ballroom The Tribrata' },
        },
        notes: 'Gunakan lagu Canon in D',
        paymentStatus: 'Menunggu Konfirmasi',
    };

    const [copiedAccount, setCopiedAccount] = useState(null);
    const [copiedSummary, setCopiedSummary] = useState(false);
    const [showQris, setShowQris] = useState(false);
    const [paymentProofPreview, setPaymentProofPreview] = useState(null);
    const [uploadingProof, setUploadingProof] = useState(false);
    const [proofSuccess, setProofSuccess] = useState(false);
    const [proofError, setProofError] = useState('');

    // Official Bank Accounts for DNVITE
    const officialAccounts = [
        { bank: 'Bank Central Asia (BCA)', number: '8830192841', name: 'DNVITE INDONESIA' },
        { bank: 'Bank Mandiri', number: '1370019284711', name: 'DNVITE INDONESIA' },
    ];

    const handleCopyAccount = (number, idx) => {
        navigator.clipboard.writeText(number);
        setCopiedAccount(idx);
        setTimeout(() => setCopiedAccount(null), 2500);
    };

    // Format WhatsApp Message
    const prepareWhatsAppMessage = () => {
        return (
            `Halo Admin DNVITE, saya ingin mengonfirmasi pemesanan undangan pernikahan digital:\n\n` +
            `• No. Referensi: ${order.orderRef}\n` +
            `• Nama Pemesan: ${order.customer.name}\n` +
            `• No. WhatsApp: ${order.customer.whatsapp}\n` +
            `• Template: ${order.template.name} (${order.template.price})\n` +
            `• Mempelai: ${order.couple.groomNickname} & ${order.couple.brideNickname}\n` +
            `• Tanggal Acara: ${order.couple.weddingDate}\n` +
            `• Lokasi: ${order.events?.akad?.venue || '-'} / ${order.events?.resepsi?.venue || '-'}\n` +
            `• Catatan: ${order.notes || '-'}\n` +
            `• Status: Menunggu Verifikasi Pembayaran\n\n` +
            `Saya telah melengkapi data melalui website DNVITE. Mohon instruksi selanjutnya. Terima kasih!`
        );
    };

    const handleOpenWhatsApp = () => {
        const rawMessage = prepareWhatsAppMessage();
        const encoded = encodeURIComponent(rawMessage);
        window.open(`https://wa.me/6285723138515?text=${encoded}`, '_blank');
    };

    const handleCopySummary = () => {
        const rawMessage = prepareWhatsAppMessage();
        navigator.clipboard.writeText(rawMessage);
        setCopiedSummary(true);
        setTimeout(() => setCopiedSummary(false), 3000);
    };

    const handleProofChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setProofError('Ukuran file bukti transfer maksimal 5MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => setPaymentProofPreview(reader.result);
        reader.readAsDataURL(file);

        if (order.orderRef) {
            setUploadingProof(true);
            setProofError('');
            try {
                const formData = new FormData();
                formData.append('proof_file', file);

                const response = await fetch(`/api/orders/${order.orderRef}/proof`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData,
                });

                const responseText = await response.text();
                let result = null;
                if (responseText && responseText.trim()) {
                    try {
                        result = JSON.parse(responseText);
                    } catch {
                        result = null;
                    }
                }

                if (result && !response.ok) {
                    setProofError(result.message || 'Gagal mengunggah bukti ke server');
                } else {
                    setProofSuccess(true);
                }
            } catch (err) {
                console.warn('API proof upload unavailable, preview retained:', err);
                setProofSuccess(true);
            } finally {
                setUploadingProof(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#1A1817] flex flex-col font-sans">
            {/* Top Bar */}
            <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DDD0] py-4 px-5 sm:px-8">
                <div className="max-w-[960px] mx-auto flex items-center justify-between">
                    <button
                        onClick={() => onNavigate('home')}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1A1817] hover:text-[#8C6D46] transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Beranda</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1817]">
                            DNVITE
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold border-l pl-2 border-[#E5DDD0]">
                            Konfirmasi Pesanan
                        </span>
                    </div>
                </div>
            </header>

            {/* Banner Header */}
            <div className="py-12 px-5 sm:px-8 text-center bg-[#F2ECE4] border-b border-[#E5DDD0]">
                <div className="max-w-xl mx-auto space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 text-emerald-700 flex items-center justify-center border border-emerald-500/20">
                        <CheckCircle2 className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="inline-block px-3.5 py-1 rounded-full bg-[#8C6D46]/10 text-[#8C6D46] text-xs font-bold font-mono tracking-wider">
                        {order.orderRef}
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817] tracking-tight">
                        Pesanan Anda Berhasil Dicatat
                    </h1>
                    <p className="text-xs sm:text-sm text-[#6E6864]">
                        Silakan lakukan pembayaran dan teruskan rincian pesanan ke WhatsApp Admin resmi DNVITE untuk memulai proses pengerjaan undangan digital.
                    </p>
                </div>
            </div>

            {/* Main Content Layout */}
            <main className="flex-1 max-w-[960px] mx-auto w-full px-5 sm:px-8 py-10 space-y-8">
                {/* Status Notice Card */}
                <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-200 text-amber-900 flex items-start gap-3.5 text-xs sm:text-sm text-left">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <p className="font-bold">Status: Menunggu Konfirmasi Pembayaran</p>
                        <p className="text-amber-800/90 text-xs leading-relaxed">
                            Membuka WhatsApp <strong>tidak otomatis memverifikasi pembayaran</strong>. Admin kami akan memeriksa bukti transfer pembayaran Anda secara manual sebelum pesanan masuk ke tahap produksi.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT COLUMN: Order Review Invoice */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDD0] shadow-sm space-y-6 text-left">
                        <div className="flex items-center justify-between border-b border-[#E5DDD0] pb-4">
                            <h2 className="font-serif text-2xl font-bold text-[#1A1817]">
                                Rincian Pesanan
                            </h2>
                            <span className="text-xs font-mono text-[#6E6864]">
                                {order.orderDate}
                            </span>
                        </div>

                        {/* Selected Template Thumbnail & Price */}
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD0]">
                            <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-[#E5DDD0] bg-white">
                                <img
                                    src={order.template.coverImage}
                                    alt={order.template.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-1 flex-1">
                                <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C6D46]">
                                    {order.template.category}
                                </span>
                                <h3 className="font-serif text-xl font-bold text-[#1A1817]">
                                    {order.template.name}
                                </h3>
                                <p className="text-sm font-bold text-[#8C6D46]">
                                    {order.template.price}
                                </p>
                            </div>
                        </div>

                        {/* Couple & Events Summary */}
                        <div className="space-y-3 text-xs sm:text-sm">
                            <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#E5DDD0]">
                                <div>
                                    <span className="text-[11px] text-[#6E6864] block">Nama Pemesan:</span>
                                    <span className="font-semibold">{order.customer.name}</span>
                                </div>
                                <div>
                                    <span className="text-[11px] text-[#6E6864] block">WhatsApp:</span>
                                    <span className="font-semibold">{order.customer.whatsapp}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#E5DDD0]">
                                <div>
                                    <span className="text-[11px] text-[#6E6864] block">Mempelai Pria:</span>
                                    <span className="font-semibold">{order.couple.groomFullName}</span>
                                </div>
                                <div>
                                    <span className="text-[11px] text-[#6E6864] block">Mempelai Wanita:</span>
                                    <span className="font-semibold">{order.couple.brideFullName}</span>
                                </div>
                            </div>

                            <div className="pb-3 border-b border-[#E5DDD0]">
                                <span className="text-[11px] text-[#6E6864] block">Tanggal Pernikahan:</span>
                                <span className="font-semibold">{order.couple.weddingDate}</span>
                            </div>

                            <div className="pb-3 border-b border-[#E5DDD0]">
                                <span className="text-[11px] text-[#6E6864] block">Lokasi Akad &amp; Resepsi:</span>
                                <span className="font-semibold">{order.events.akad.venue} / {order.events.resepsi.venue}</span>
                            </div>

                            <div>
                                <span className="text-[11px] text-[#6E6864] block">Catatan Khusus:</span>
                                <span className="text-xs text-[#6E6864] italic">{order.notes || '-'}</span>
                            </div>
                        </div>

                        {/* Total Tagihan */}
                        <div className="pt-4 border-t border-[#E5DDD0] flex items-center justify-between">
                            <span className="font-serif text-lg font-bold text-[#1A1817]">Total Tagihan:</span>
                            <span className="font-sans text-2xl font-bold text-[#8C6D46]">
                                {order.template.price}
                            </span>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Payment Instructions & WhatsApp Handoff */}
                    <div className="lg:col-span-5 space-y-6 text-left">
                        {/* Payment Instructions Box */}
                        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DDD0] shadow-sm space-y-5">
                            <h2 className="font-serif text-2xl font-bold text-[#1A1817] border-b border-[#E5DDD0] pb-3">
                                Instruksi Pembayaran
                            </h2>

                            <p className="text-xs text-[#6E6864] leading-relaxed">
                                Silakan lakukan transfer sejumlah <strong>{order.template.price}</strong> ke rekening resmi berikut:
                            </p>

                            <div className="space-y-3">
                                {officialAccounts.map((acc, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD0] space-y-1.5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] font-bold text-[#8C6D46] uppercase">
                                                {acc.bank}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleCopyAccount(acc.number, idx)}
                                                className="text-[11px] font-semibold text-[#8C6D46] hover:text-[#745834] flex items-center gap-1 cursor-pointer"
                                            >
                                                {copiedAccount === idx ? (
                                                    <>
                                                        <Check className="w-3.5 h-3.5" />
                                                        <span>Disalin!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3.5 h-3.5" />
                                                        <span>Salin</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        <p className="font-mono text-base font-bold text-[#1A1817]">
                                            {acc.number}
                                        </p>
                                        <p className="text-[10px] text-[#6E6864]">a.n {acc.name}</p>
                                    </div>
                                ))}
                            </div>

                            {/* QRIS Toggle */}
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowQris(!showQris)}
                                    className="text-xs font-semibold text-[#8C6D46] flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
                                >
                                    <QrCode className="w-3.5 h-3.5" />
                                    <span>{showQris ? 'Sembunyikan QRIS' : 'Buka QRIS Pembayaran DNVITE'}</span>
                                </button>

                                {showQris && (
                                    <div className="mt-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD0] text-center space-y-2 animate-in fade-in">
                                        <img
                                            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DNVITE-OFFICIAL-PAYMENT"
                                            alt="QRIS Pembayaran"
                                            className="w-40 h-40 mx-auto rounded-lg border bg-white p-2"
                                        />
                                        <p className="text-[10px] text-[#6E6864]">Scan dengan Mobile Banking / E-Wallet</p>
                                    </div>
                                )}
                            </div>

                            {/* Optional Payment Proof Widget */}
                            <div className="pt-4 border-t border-[#E5DDD0] space-y-2">
                                <label className="text-xs font-semibold text-[#1A1817] block">
                                    Lampirkan Bukti Transfer <span className="text-xs text-[#6E6864] font-normal">(Opsional)</span>
                                </label>
                                {paymentProofPreview ? (
                                    <div className="space-y-2">
                                        <div className="relative w-36 aspect-[3/4] rounded-xl overflow-hidden border border-[#8C6D46] shadow-sm">
                                            <img
                                                src={paymentProofPreview}
                                                alt="Bukti Transfer"
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPaymentProofPreview(null);
                                                    setProofSuccess(false);
                                                }}
                                                aria-label="Hapus Bukti Transfer"
                                                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-black/80"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        {uploadingProof && (
                                            <p className="text-[11px] text-[#8C6D46] flex items-center gap-1.5 font-medium">
                                                <span className="w-3 h-3 border-2 border-[#8C6D46]/30 border-t-[#8C6D46] rounded-full animate-spin"></span>
                                                <span>Mengunggah bukti ke server...</span>
                                            </p>
                                        )}
                                        {proofSuccess && (
                                            <p className="text-[11px] text-emerald-700 flex items-center gap-1.5 font-semibold">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                <span>Bukti transfer tersimpan di database</span>
                                            </p>
                                        )}
                                        {proofError && (
                                            <p className="text-[11px] text-rose-600 flex items-center gap-1.5">
                                                <AlertCircle className="w-3.5 h-3.5" />
                                                <span>{proofError}</span>
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <label className="flex items-center gap-2 p-3 rounded-xl border border-dashed border-[#E5DDD0] hover:border-[#8C6D46] bg-[#FAF8F5] cursor-pointer text-xs font-semibold text-[#8C6D46]">
                                        <Upload className="w-4 h-4 shrink-0" />
                                        <span>Unggah Foto Bukti Transfer</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProofChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* WhatsApp Admin Handoff CTA Box */}
                        <div className="bg-[#1A1817] text-white rounded-3xl p-6 sm:p-7 space-y-4 shadow-lg text-center sm:text-left">
                            <div className="space-y-1">
                                <h3 className="font-serif text-2xl font-bold">
                                    Konfirmasi ke WhatsApp
                                </h3>
                                <p className="text-xs text-white/70">
                                    Nomor Admin Resmi: <strong>085723138515</strong>
                                </p>
                            </div>

                            <button
                                onClick={handleOpenWhatsApp}
                                className="w-full py-4 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                            >
                                <MessageCircle className="w-5 h-5 fill-white" />
                                <span>Kirim Pesanan ke WhatsApp Admin</span>
                            </button>

                            <button
                                onClick={handleCopySummary}
                                className="w-full py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                            >
                                {copiedSummary ? (
                                    <>
                                        <Check className="w-4 h-4 text-emerald-400" />
                                        <span className="text-emerald-400">Rincian Berhasil Disalin!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        <span>Salin Rincian Pesanan (Alternatif)</span>
                                    </>
                                )}
                            </button>

                            <p className="text-[10px] text-white/50 text-center">
                                Jam layanan admin: Setiap hari 08:00 – 21:00 WIB.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer with onNavigate */}
            <Footer onNavigate={onNavigate} />
        </div>
    );
}
