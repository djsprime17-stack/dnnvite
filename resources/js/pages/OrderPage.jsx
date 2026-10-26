import React, { useState } from 'react';
import { ArrowLeft, Upload, X, Check, Image as ImageIcon, Sparkles, Heart, AlertCircle, ShoppingBag } from 'lucide-react';
import { TEMPLATES } from '../data/templates';
import Footer from '../components/Footer';

export default function OrderPage({ templateId, onNavigate, onOrderSubmit }) {
    const selectedTemplate = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];

    // Form State
    const [template, setTemplate] = useState(selectedTemplate);

    // Step 1: Customer Contact
    const [customerName, setCustomerName] = useState('');
    const [customerWhatsApp, setCustomerWhatsApp] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');

    // Step 2: Couple & Event
    const [groomNickname, setGroomNickname] = useState('');
    const [groomFullName, setGroomFullName] = useState('');
    const [groomParents, setGroomParents] = useState('');

    const [brideNickname, setBrideNickname] = useState('');
    const [brideFullName, setBrideFullName] = useState('');
    const [brideParents, setBrideParents] = useState('');

    const [weddingDate, setWeddingDate] = useState('');

    const [akadTime, setAkadTime] = useState('');
    const [akadVenue, setAkadVenue] = useState('');
    const [akadAddress, setAkadAddress] = useState('');

    const [resepsiTime, setResepsiTime] = useState('');
    const [resepsiVenue, setResepsiVenue] = useState('');
    const [resepsiAddress, setResepsiAddress] = useState('');

    // Step 3: Photos & Notes
    const [mainPhoto, setMainPhoto] = useState(null);
    const [mainPhotoPreview, setMainPhotoPreview] = useState(null);
    const [galleryPhotos, setGalleryPhotos] = useState([]);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [notes, setNotes] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handlers for Photo Uploads
    const handleMainPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrorMsg('Ukuran foto utama maksimal 5MB');
                return;
            }
            setMainPhoto(file);
            const reader = new FileReader();
            reader.onload = () => setMainPhotoPreview(reader.result);
            reader.readAsDataURL(file);
            setErrorMsg('');
        }
    };

    const handleRemoveMainPhoto = () => {
        setMainPhoto(null);
        setMainPhotoPreview(null);
    };

    const handleGalleryPhotosChange = (e) => {
        const files = Array.from(e.target.files);
        if (galleryPhotos.length + files.length > 5) {
            setErrorMsg('Maksimal 5 foto galeri tambahan');
            return;
        }

        const newFiles = [...galleryPhotos, ...files].slice(0, 5);
        setGalleryPhotos(newFiles);

        const newPreviews = [];
        newFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                newPreviews.push(reader.result);
                if (newPreviews.length === newFiles.length) {
                    setGalleryPreviews([...newPreviews]);
                }
            };
            reader.readAsDataURL(file);
        });
        setErrorMsg('');
    };

    const handleRemoveGalleryPhoto = (index) => {
        const updatedFiles = galleryPhotos.filter((_, i) => i !== index);
        const updatedPreviews = galleryPreviews.filter((_, i) => i !== index);
        setGalleryPhotos(updatedFiles);
        setGalleryPreviews(updatedPreviews);
    };

    // Submit Order Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!customerName.trim() || !customerWhatsApp.trim()) {
            setErrorMsg('Nama pemesan dan Nomor WhatsApp aktif wajib diisi.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!groomNickname.trim() || !brideNickname.trim() || !weddingDate) {
            setErrorMsg('Nama kedua mempelai dan tanggal pernikahan wajib diisi.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (!akadVenue.trim() || !resepsiVenue.trim()) {
            setErrorMsg('Lokasi acara akad dan resepsi wajib diisi.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);
        setErrorMsg('');

        // Prepare order data upfront (used regardless of API availability)
        const clientOrderRef = 'DNV-' + new Date().toISOString().slice(2, 4) + new Date().toISOString().slice(5, 7) + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();

        const orderData = {
            orderRef: clientOrderRef,
            orderDate: new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
            template: {
                id: template.id,
                name: template.name,
                category: template.category,
                price: template.price,
                coverImage: template.coverImage,
            },
            customer: {
                name: customerName,
                whatsapp: customerWhatsApp,
                email: customerEmail || '-',
            },
            couple: {
                groomNickname,
                groomFullName: groomFullName || groomNickname,
                groomParents: groomParents || '-',
                brideNickname,
                brideFullName: brideFullName || brideNickname,
                brideParents: brideParents || '-',
                weddingDate,
            },
            events: {
                akad: {
                    time: akadTime || '08:00 - Selesai',
                    venue: akadVenue,
                    address: akadAddress || akadVenue,
                },
                resepsi: {
                    time: resepsiTime || '11:00 - Selesai',
                    venue: resepsiVenue,
                    address: resepsiAddress || resepsiVenue,
                },
            },
            photos: {
                mainPhotoPreview,
                galleryPreviews,
            },
            notes: notes || '-',
            paymentStatus: 'Menunggu Konfirmasi',
        };

        try {
            const formData = new FormData();
            formData.append('customer_name', customerName.trim());
            formData.append('customer_whatsapp', customerWhatsApp.trim());
            if (customerEmail && customerEmail.trim()) {
                formData.append('customer_email', customerEmail.trim());
            }
            formData.append('template_slug', template.id);
            formData.append('groom_nickname', groomNickname.trim());
            formData.append('groom_full_name', (groomFullName || groomNickname).trim());
            if (groomParents && groomParents.trim()) {
                formData.append('groom_parents', groomParents.trim());
            }
            formData.append('bride_nickname', brideNickname.trim());
            formData.append('bride_full_name', (brideFullName || brideNickname).trim());
            if (brideParents && brideParents.trim()) {
                formData.append('bride_parents', brideParents.trim());
            }
            formData.append('wedding_date', weddingDate);

            // Events mapping
            formData.append('events[akad][venue]', akadVenue.trim());
            formData.append('events[akad][time]', (akadTime || '08:00 - Selesai').trim());
            formData.append('events[akad][address]', (akadAddress || akadVenue).trim());
            formData.append('events[resepsi][venue]', resepsiVenue.trim());
            formData.append('events[resepsi][time]', (resepsiTime || '11:00 - Selesai').trim());
            formData.append('events[resepsi][address]', (resepsiAddress || resepsiVenue).trim());

            if (notes && notes.trim()) {
                formData.append('customer_notes', notes.trim());
            }

            if (mainPhoto) {
                formData.append('main_photo', mainPhoto);
            }

            if (galleryPhotos && galleryPhotos.length > 0) {
                galleryPhotos.forEach((file) => {
                    formData.append('gallery_photos[]', file);
                });
            }

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            });

            // Safely read response as text first to handle 0-byte, empty, or non-JSON responses without syntax errors
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
                // Real validation error from backend
                const message = result.message || 'Gagal menyimpan pesanan. Silakan periksa kembali data Anda.';
                const details = result.errors ? Object.values(result.errors).flat().join(' ') : '';
                setErrorMsg(`${message} ${details}`.trim());
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsSubmitting(false);
                return;
            }

            if (result && result.data) {
                // API success — update with server-generated data
                const savedOrder = result.data;
                orderData.orderRef = savedOrder.order_ref || orderData.orderRef;
                orderData.id = savedOrder.id;
                orderData.orderDate = new Date(savedOrder.created_at || Date.now()).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                });
            }
        } catch (err) {
            console.warn('API unavailable or static host, proceeding with client order flow:', err);
        }

        // Always proceed to confirmation page (WhatsApp handles the actual order)
        if (onOrderSubmit) {
            onOrderSubmit(orderData);
        }

        onNavigate('confirmation');
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#1A1817] flex flex-col font-sans">
            {/* Top Bar */}
            <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E5DDD0] py-4 px-5 sm:px-8">
                <div className="max-w-[960px] mx-auto flex items-center justify-between">
                    <button
                        onClick={() => onNavigate('catalog')}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1A1817] hover:text-[#8C6D46] transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Katalog</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1817]">
                            DNVITE
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold border-l pl-2 border-[#E5DDD0]">
                            Formulir Pemesanan
                        </span>
                    </div>
                </div>
            </header>

            {/* Header Title */}
            <div className="py-10 px-5 sm:px-8 text-center bg-[#F2ECE4] border-b border-[#E5DDD0]">
                <div className="max-w-xl mx-auto space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8C6D46]/10 text-[#8C6D46] text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Pemesanan Cepat Tanpa Login</span>
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1817] tracking-tight">
                        Lengkapi Data Undangan Anda
                    </h1>
                    <p className="text-xs sm:text-sm text-[#6E6864]">
                        Mohon isi informasi acara dengan teliti. Data ini akan langsung diaplikasikan ke dalam template undangan digital Anda.
                    </p>
                </div>
            </div>

            {/* Main Form Container */}
            <main className="flex-1 max-w-[960px] mx-auto w-full px-5 sm:px-8 py-10">
                {/* Selected Template Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DDD0] shadow-sm mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5 w-full sm:w-auto">
                        <div className="w-20 h-24 rounded-2xl overflow-hidden shrink-0 bg-[#FAF8F5] border border-[#E5DDD0]">
                            <img
                                src={template.coverImage}
                                alt={template.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-1 text-left">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#8C6D46]/10 text-[#8C6D46] text-[11px] font-bold uppercase tracking-wider">
                                Template Terpilih
                            </span>
                            <h3 className="font-serif text-2xl font-bold text-[#1A1817]">
                                {template.name}
                            </h3>
                            <p className="text-xs text-[#6E6864]">
                                Kategori: {template.category}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-[#E5DDD0]">
                        <div className="text-left sm:text-right">
                            <span className="text-xs text-[#6E6864] block">Total Biaya Paket</span>
                            <span className="font-sans text-2xl font-bold text-[#8C6D46]">
                                {template.price}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => onNavigate('catalog')}
                            className="text-xs font-semibold text-[#8C6D46] underline underline-offset-4 hover:opacity-80"
                        >
                            Ganti Tema
                        </button>
                    </div>
                </div>

                {/* Validation Error Alert */}
                {errorMsg && (
                    <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* SEKSI 1: DATA PEMESAN */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDD0] shadow-sm space-y-6 text-left">
                        <div className="border-b border-[#E5DDD0] pb-4">
                            <h2 className="font-serif text-2xl font-bold text-[#1A1817]">
                                1. Kontak Pemesan
                            </h2>
                            <p className="text-xs text-[#6E6864] pt-0.5">
                                Untuk pengiriman konfirmasi, draft link undangan, dan notifikasi proses pembuatan.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#1A1817]">
                                    Nama Lengkap Pemesan <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Contoh: Raden Arya"
                                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:border-[#8C6D46] transition-colors"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#1A1817]">
                                    Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    required
                                    value={customerWhatsApp}
                                    onChange={(e) => setCustomerWhatsApp(e.target.value)}
                                    placeholder="Contoh: 081234567890"
                                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:border-[#8C6D46] transition-colors"
                                />
                                <span className="text-[10px] text-[#6E6864] block">
                                    Pastikan nomor WhatsApp aktif untuk verifikasi pesanan.
                                </span>
                            </div>

                            <div className="sm:col-span-2 space-y-1.5">
                                <label className="text-xs font-semibold text-[#1A1817]">
                                    Email Pemesan <span className="text-xs text-[#6E6864] font-normal">(Opsional)</span>
                                </label>
                                <input
                                    type="email"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    placeholder="Contoh: raden.arya@gmail.com"
                                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:border-[#8C6D46] transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEKSI 2: DATA MEMPELAI & RANGKAIAN ACARA */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDD0] shadow-sm space-y-8 text-left">
                        <div className="border-b border-[#E5DDD0] pb-4">
                            <h2 className="font-serif text-2xl font-bold text-[#1A1817]">
                                2. Data Kedua Mempelai &amp; Jadwal Acara
                            </h2>
                            <p className="text-xs text-[#6E6864] pt-0.5">
                                Informasi sakral yang akan tertera pada sampul dan isi undangan.
                            </p>
                        </div>

                        {/* Mempelai Pria */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D46] block">
                                Mempelai Pria (Groom)
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#1A1817]">
                                        Nama Panggilan Pria <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={groomNickname}
                                        onChange={(e) => setGroomNickname(e.target.value)}
                                        placeholder="Contoh: Raden"
                                        className="w-full px-4 py-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:border-[#8C6D46] transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#1A1817]">
                                        Nama Lengkap &amp; Gelar Pria <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={groomFullName}
                                        onChange={(e) => setGroomFullName(e.target.value)}
                                        placeholder="Contoh: Raden Arya Wicaksana, S.T."
                                        className="w-full px-4 py-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:border-[#8C6D46] transition-colors"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-1.5">
                                    <label className="text-xs font-semibold text-[#1A1817]">
                                        Nama Orang Tua Mempelai Pria
                                    </label>
                                    <input
                                        type="text"
                                        value={groomParents}
                                        onChange={(e) => setGroomParents(e.target.value)}
                                        placeholder="Contoh: Bpk. Bambang Wicaksana & Ibu Ratih Sulistyowati"
                                        className="w-full px-4 py-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:border-[#8C6D46] transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Mempelai Wanita */}
                        <div className="space-y-4 pt-4 border-t border-[#E5DDD0]">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D46] block">
                                Mempelai Wanita (Bride)
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#1A1817]">
                                        Nama Panggilan Wanita <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={brideNickname}
                                        onChange={(e) => setBrideNickname(e.target.value)}
                                        placeholder="Contoh: Andini"
                                        className="w-full px-4 py-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:border-[#8C6D46] transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#1A1817]">
                                        Nama Lengkap &amp; Gelar Wanita <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={brideFullName}
                                        onChange={(e) => setBrideFullName(e.target.value)}
                                        placeholder="Contoh: Andini Putri Maharani, M.Ds."
                                        className="w-full px-4 py-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:border-[#8C6D46] transition-colors"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-1.5">
                                    <label className="text-xs font-semibold text-[#1A1817]">
                                        Nama Orang Tua Mempelai Wanita
                                    </label>
                                    <input
                                        type="text"
                                        value={brideParents}
                                        onChange={(e) => setBrideParents(e.target.value)}
                                        placeholder="Contoh: Bpk. Hendra Kusuma & Ibu Ratna Dewi"
                                        className="w-full px-4 py-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:border-[#8C6D46] transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tanggal & Acara */}
                        <div className="space-y-4 pt-4 border-t border-[#E5DDD0]">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D46] block">
                                Tanggal &amp; Rangkaian Acara
                            </span>

                            <div className="space-y-1.5 max-w-sm">
                                <label className="text-xs font-semibold text-[#1A1817]">
                                    Tanggal Pernikahan <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={weddingDate}
                                    onChange={(e) => setWeddingDate(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:border-[#8C6D46]"
                                />
                            </div>

                            {/* Akad Nikah */}
                            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD0] space-y-3">
                                <span className="text-xs font-bold text-[#1A1817]">Sesi 1: Akad Nikah / Pemberkatan</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-medium text-[#6E6864]">Waktu Acara</label>
                                        <input
                                            type="text"
                                            value={akadTime}
                                            onChange={(e) => setAkadTime(e.target.value)}
                                            placeholder="Contoh: 08:00 - 10:00 WIB"
                                            className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-medium text-[#6E6864]">Nama Tempat / Masjid / Gereja <span className="text-rose-500">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            value={akadVenue}
                                            onChange={(e) => setAkadVenue(e.target.value)}
                                            placeholder="Contoh: Masjid Agung Al-Azhar"
                                            className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-xs"
                                        />
                                    </div>
                                    <div className="sm:col-span-2 space-y-1">
                                        <label className="text-[11px] font-medium text-[#6E6864]">Alamat Lengkap Lokasi</label>
                                        <input
                                            type="text"
                                            value={akadAddress}
                                            onChange={(e) => setAkadAddress(e.target.value)}
                                            placeholder="Contoh: Jl. Sisingamangaraja No. 1, Kebayoran Baru, Jakarta Selatan"
                                            className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Resepsi */}
                            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD0] space-y-3">
                                <span className="text-xs font-bold text-[#1A1817]">Sesi 2: Resepsi Pernikahan</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-medium text-[#6E6864]">Waktu Acara</label>
                                        <input
                                            type="text"
                                            value={resepsiTime}
                                            onChange={(e) => setResepsiTime(e.target.value)}
                                            placeholder="Contoh: 11:00 - 14:00 WIB"
                                            className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-xs"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-medium text-[#6E6864]">Nama Gedung / Hotel / Ballroom <span className="text-rose-500">*</span></label>
                                        <input
                                            type="text"
                                            required
                                            value={resepsiVenue}
                                            onChange={(e) => setResepsiVenue(e.target.value)}
                                            placeholder="Contoh: Grand Ballroom The Tribrata"
                                            className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-xs"
                                        />
                                    </div>
                                    <div className="sm:col-span-2 space-y-1">
                                        <label className="text-[11px] font-medium text-[#6E6864]">Alamat Lengkap Lokasi</label>
                                        <input
                                            type="text"
                                            value={resepsiAddress}
                                            onChange={(e) => setResepsiAddress(e.target.value)}
                                            placeholder="Contoh: Jl. Darmawangsa III No. 2, Kebayoran Baru, Jakarta Selatan"
                                            className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SEKSI 3: FOTO & CATATAN KHUSUS */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDD0] shadow-sm space-y-6 text-left">
                        <div className="border-b border-[#E5DDD0] pb-4">
                            <h2 className="font-serif text-2xl font-bold text-[#1A1817]">
                                3. Foto &amp; Catatan Khusus
                            </h2>
                            <p className="text-xs text-[#6E6864] pt-0.5">
                                Unggah foto terbaik Anda dengan pratinjau instan. Anda dapat mengganti atau menghapus foto kapan saja.
                            </p>
                        </div>

                        {/* Main Couple Photo Dropzone */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-[#1A1817] block">
                                Foto Utama Pasangan <span className="text-xs text-[#6E6864] font-normal">(Maksimal 5MB)</span>
                            </label>

                            {mainPhotoPreview ? (
                                <div className="relative w-48 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#8C6D46] shadow-md group">
                                    <img
                                        src={mainPhotoPreview}
                                        alt="Pratinjau Foto Utama"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveMainPhoto}
                                        aria-label="Hapus Foto Utama"
                                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/50 text-white text-[10px] text-center rounded-lg backdrop-blur-xs">
                                        Foto Utama Siap
                                    </div>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#E5DDD0] hover:border-[#8C6D46] rounded-2xl bg-[#FAF8F5] cursor-pointer transition-colors max-w-sm">
                                    <Upload className="w-8 h-8 text-[#8C6D46] mb-2" />
                                    <span className="text-xs font-semibold text-[#1A1817]">
                                        Pilih Foto Utama Mempelai
                                    </span>
                                    <span className="text-[10px] text-[#6E6864] mt-1">
                                        Format JPG, PNG, atau WEBP
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleMainPhotoChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        {/* Additional Gallery Photos Dropzone (Optional) */}
                        <div className="space-y-2 pt-4 border-t border-[#E5DDD0]">
                            <label className="text-xs font-semibold text-[#1A1817] block">
                                Foto Galeri Tambahan <span className="text-xs text-[#6E6864] font-normal">(Opsional, Maksimal 5 Foto)</span>
                            </label>

                            <div className="flex flex-wrap gap-3">
                                {galleryPreviews.map((preview, idx) => (
                                    <div
                                        key={idx}
                                        className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#E5DDD0] shadow-xs group"
                                    >
                                        <img
                                            src={preview}
                                            alt={`Galeri ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveGalleryPhoto(idx)}
                                            className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}

                                {galleryPhotos.length < 5 && (
                                    <label className="w-24 h-24 rounded-xl border-2 border-dashed border-[#E5DDD0] hover:border-[#8C6D46] bg-[#FAF8F5] flex flex-col items-center justify-center cursor-pointer transition-colors">
                                        <Upload className="w-5 h-5 text-[#8C6D46]" />
                                        <span className="text-[10px] font-semibold text-[#6E6864] mt-1">+ Tambah</span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleGalleryPhotosChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Special Notes (Optional) */}
                        <div className="space-y-1.5 pt-4 border-t border-[#E5DDD0]">
                            <label className="text-xs font-semibold text-[#1A1817]">
                                Catatan Khusus / Permintaan Lagu <span className="text-xs text-[#6E6864] font-normal">(Opsional)</span>
                            </label>
                            <textarea
                                rows="3"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Contoh: Mohon gunakan lagu latar 'Until I Found You' dan tambahkan nomor rekening BCA mempelai."
                                className="w-full p-3.5 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm focus:outline-none focus:border-[#8C6D46] transition-colors"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={() => onNavigate('catalog')}
                            className="text-xs font-semibold text-[#6E6864] hover:text-[#1A1817] transition-colors order-2 sm:order-1"
                        >
                            Batalkan &amp; Kembali
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#8C6D46] hover:bg-[#745834] disabled:opacity-60 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer order-1 sm:order-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    <span>Menyimpan Pesanan ke Server...</span>
                                </>
                            ) : (
                                <>
                                    <span>Lanjut ke Review Pesanan &amp; Pembayaran</span>
                                    <ShoppingBag className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>

            {/* Footer with onNavigate */}
            <Footer onNavigate={onNavigate} />
        </div>
    );
}
