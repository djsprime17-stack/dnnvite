import React, { useState, useEffect } from 'react';
import {
    Save,
    CheckCircle,
    AlertCircle,
    MessageCircle,
    Building2,
    Clock,
    CreditCard,
    LogOut,
} from 'lucide-react';

export default function AdminSettingsPage({ onNavigate }) {
    const [token, setToken] = useState(() => localStorage.getItem('dnvite_token') || '');
    const [adminWhatsApp, setAdminWhatsApp] = useState('085723138515');
    const [brandName, setBrandName] = useState('DNVITE');
    const [operationalHours, setOperationalHours] = useState('Senin – Minggu: 08:00 – 21:00 WIB');
    const [bankAccounts, setBankAccounts] = useState([
        { bank: 'Bank Central Asia (BCA)', number: '8830192841', name: 'DNVITE INDONESIA' },
        { bank: 'Bank Mandiri', number: '1370019284711', name: 'DNVITE INDONESIA' },
    ]);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (!token) {
            onNavigate('admin-login');
        } else {
            fetchSettings();
        }
    }, [token]);

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/logout', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
        } finally {
            localStorage.removeItem('dnvite_token');
            localStorage.removeItem('dnvite_admin_user');
            onNavigate('admin-login');
        }
    };

    const fetchSettings = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/settings', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            if (res.status === 401) {
                handleLogout();
                return;
            }

            const data = await res.json();
            if (data.status === 'success' && data.data) {
                setAdminWhatsApp(data.data.admin_whatsapp || '085723138515');
                setBrandName(data.data.brand_name || 'DNVITE');
                setOperationalHours(data.data.operational_hours || 'Senin – Minggu: 08:00 – 21:00 WIB');
                if (data.data.bank_accounts && Array.isArray(data.data.bank_accounts)) {
                    setBankAccounts(data.data.bank_accounts);
                }
            }
        } catch (err) {
            console.error('Fetch settings error', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSuccessMsg('');
        setErrorMsg('');

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    admin_whatsapp: adminWhatsApp,
                    brand_name: brandName,
                    operational_hours: operationalHours,
                    bank_accounts: bankAccounts,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setSuccessMsg('Pengaturan platform berhasil diperbarui.');
                setTimeout(() => setSuccessMsg(''), 3000);
            } else {
                setErrorMsg(data.message || 'Gagal menyimpan pengaturan');
            }
        } catch (err) {
            console.error('Save settings error', err);
            setErrorMsg('Terjadi kesalahan saat menyimpan pengaturan.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleBankChange = (idx, field, value) => {
        const updated = [...bankAccounts];
        updated[idx][field] = value;
        setBankAccounts(updated);
    };

    return (
        <div className="min-h-screen bg-[#F7F5F0] text-[#1A1817] flex flex-col font-sans selection:bg-[#8C6D46] selection:text-white">
            {/* Top Workspace Chrome */}
            <header className="sticky top-0 z-30 bg-[#FAF8F5] border-b border-[#E5DDD0] px-6 py-3.5">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        {/* Monogram Brand */}
                        <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-[#1A1817] text-[#FAF8F5] flex items-center justify-center font-bold text-xs tracking-wider">
                                D
                            </span>
                            <div>
                                <span className="font-serif font-bold text-sm tracking-wide text-[#1A1817] block leading-none">
                                    DNVITE Studio
                                </span>
                                <span className="text-[10px] text-[#6E6864] uppercase tracking-wider font-semibold">
                                    Workspace Admin
                                </span>
                            </div>
                        </div>

                        {/* Navigation Pills */}
                        <nav className="hidden md:flex items-center gap-1 text-xs">
                            <button
                                onClick={() => onNavigate('admin')}
                                className="px-3 py-1.5 rounded-lg text-[#6E6864] hover:text-[#1A1817] hover:bg-black/5 font-medium transition-colors cursor-pointer"
                            >
                                Pesanan &amp; Ringkasan
                            </button>
                            <button
                                onClick={() => onNavigate('admin-templates')}
                                className="px-3 py-1.5 rounded-lg text-[#6E6864] hover:text-[#1A1817] hover:bg-black/5 font-medium transition-colors cursor-pointer"
                            >
                                Katalog Template
                            </button>
                            <button
                                onClick={() => onNavigate('admin-settings')}
                                className="px-3 py-1.5 rounded-lg bg-[#1A1817] text-white font-medium cursor-pointer"
                            >
                                Pengaturan Platform
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5DDD0] text-xs font-semibold text-[#1A1817] hover:bg-black/5 transition-colors cursor-pointer"
                        >
                            <LogOut className="w-3.5 h-3.5 text-[#6E6864]" />
                            <span>Keluar</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Area */}
            <main className="flex-1 max-w-[960px] w-full mx-auto px-6 py-8 space-y-6">
                <div>
                    <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1817]">
                        Pengaturan Platform &amp; Kontak Resmi
                    </h1>
                    <p className="text-xs text-[#6E6864]">
                        Sesuaikan nomor WhatsApp admin, nama brand, dan detail rekening bank untuk pembayaran customer.
                    </p>
                </div>

                {successMsg && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>{successMsg}</span>
                    </div>
                )}

                {errorMsg && (
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                {isLoading ? (
                    <div className="py-20 text-center text-[#6E6864]">
                        <div className="inline-flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-[#8C6D46]/30 border-t-[#8C6D46] rounded-full animate-spin"></span>
                            <span>Memuat pengaturan platform...</span>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSaveSettings} className="space-y-6">
                        {/* Business Info */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDD0] shadow-2xs space-y-5">
                            <h2 className="font-serif text-lg font-bold text-[#1A1817] border-b border-[#E5DDD0] pb-3">
                                Identitas &amp; Komunikasi
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#1A1817] flex items-center gap-1.5">
                                        <Building2 className="w-3.5 h-3.5 text-[#8C6D46]" />
                                        <span>Nama Brand / Usaha</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                        className="w-full p-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm text-[#1A1817] focus:outline-none focus:border-[#8C6D46]"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#1A1817] flex items-center gap-1.5">
                                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>Nomor WhatsApp Admin Resmi</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={adminWhatsApp}
                                        onChange={(e) => setAdminWhatsApp(e.target.value)}
                                        className="w-full p-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm text-[#1A1817] font-mono focus:outline-none focus:border-[#8C6D46]"
                                    />
                                    <span className="text-[10px] text-[#6E6864] block">
                                        Nomor ini digunakan untuk tombol WhatsApp handoff pemesanan dan floating button.
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1.5 pt-2">
                                <label className="text-xs font-semibold text-[#1A1817] flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-[#8C6D46]" />
                                    <span>Jam Operasional Pelayanan</span>
                                </label>
                                <input
                                    type="text"
                                    value={operationalHours}
                                    onChange={(e) => setOperationalHours(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm text-[#1A1817] focus:outline-none focus:border-[#8C6D46]"
                                />
                            </div>
                        </div>

                        {/* Bank Accounts */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDD0] shadow-2xs space-y-5">
                            <h2 className="font-serif text-lg font-bold text-[#1A1817] border-b border-[#E5DDD0] pb-3 flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-[#8C6D46]" />
                                <span>Rekening Bank Pembayaran Customer</span>
                            </h2>

                            <div className="space-y-4">
                                {bankAccounts.map((acc, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD0] grid grid-cols-1 sm:grid-cols-3 gap-3"
                                    >
                                        <div className="space-y-1">
                                            <label className="text-[11px] text-[#6E6864] block">Nama Bank</label>
                                            <input
                                                type="text"
                                                value={acc.bank}
                                                onChange={(e) => handleBankChange(idx, 'bank', e.target.value)}
                                                className="w-full p-2.5 rounded-xl border border-[#E5DDD0] bg-white text-xs font-medium focus:outline-none"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[11px] text-[#6E6864] block">Nomor Rekening</label>
                                            <input
                                                type="text"
                                                value={acc.number}
                                                onChange={(e) => handleBankChange(idx, 'number', e.target.value)}
                                                className="w-full p-2.5 rounded-xl border border-[#E5DDD0] bg-white text-xs font-mono font-medium focus:outline-none"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[11px] text-[#6E6864] block">Atas Nama (a.n)</label>
                                            <input
                                                type="text"
                                                value={acc.name}
                                                onChange={(e) => handleBankChange(idx, 'name', e.target.value)}
                                                className="w-full p-2.5 rounded-xl border border-[#E5DDD0] bg-white text-xs font-medium focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-right">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-8 py-3.5 rounded-full bg-[#8C6D46] hover:bg-[#745834] text-white font-semibold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                            >
                                <Save className="w-4 h-4" />
                                <span>{isSaving ? 'Menyimpan Pengaturan...' : 'Simpan Semua Pengaturan'}</span>
                            </button>
                        </div>
                    </form>
                )}
            </main>
        </div>
    );
}
