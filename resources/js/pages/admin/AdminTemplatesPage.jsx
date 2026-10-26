import React, { useState, useEffect } from 'react';
import {
    LayoutGrid,
    Search,
    RefreshCw,
    Edit3,
    Check,
    X,
    Eye,
    LogOut,
    CheckCircle,
    Sliders,
    Sparkles,
} from 'lucide-react';

export default function AdminTemplatesPage({ onNavigate }) {
    const [token, setToken] = useState(() => localStorage.getItem('dnvite_token') || '');
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [editPrice, setEditPrice] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (!token) {
            onNavigate('admin-login');
        } else {
            fetchTemplates();
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

    const fetchTemplates = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/templates', {
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
            if (data.status === 'success') {
                setTemplates(data.data || []);
            }
        } catch (err) {
            console.error('Fetch templates error', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleActive = async (id) => {
        try {
            const res = await fetch(`/api/admin/templates/${id}/toggle`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            if (res.ok) {
                setTemplates((prev) =>
                    prev.map((t) => (t.id === id ? { ...t, is_active: !t.is_active } : t))
                );
                setSuccessMsg('Status publikasi template berhasil diubah.');
                setTimeout(() => setSuccessMsg(''), 3000);
            }
        } catch (err) {
            console.error('Toggle template error', err);
        }
    };

    const handleStartEdit = (tpl) => {
        setEditingTemplate(tpl);
        setEditPrice(tpl.price);
    };

    const handleSavePrice = async (e) => {
        e.preventDefault();
        if (!editingTemplate) return;

        setIsSaving(true);
        try {
            const res = await fetch(`/api/admin/templates/${editingTemplate.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    price: parseFloat(editPrice),
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setTemplates((prev) =>
                    prev.map((t) => (t.id === editingTemplate.id ? { ...t, price: editPrice } : t))
                );
                setEditingTemplate(null);
                setSuccessMsg('Harga template berhasil diperbarui.');
                setTimeout(() => setSuccessMsg(''), 3000);
            }
        } catch (err) {
            console.error('Save price error', err);
        } finally {
            setIsSaving(false);
        }
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
                                className="px-3 py-1.5 rounded-lg bg-[#1A1817] text-white font-medium cursor-pointer"
                            >
                                Katalog Template
                            </button>
                            <button
                                onClick={() => onNavigate('admin-settings')}
                                className="px-3 py-1.5 rounded-lg text-[#6E6864] hover:text-[#1A1817] hover:bg-black/5 font-medium transition-colors cursor-pointer"
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
            <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1817]">
                            Katalog Template Undangan
                        </h1>
                        <p className="text-xs text-[#6E6864]">
                            Kelola status publikasi, harga jual, dan tinjau live demo masing-masing template.
                        </p>
                    </div>

                    {successMsg && (
                        <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" />
                            <span>{successMsg}</span>
                        </div>
                    )}
                </div>

                {/* Templates Grid */}
                {isLoading ? (
                    <div className="py-20 text-center text-[#6E6864]">
                        <div className="inline-flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-[#8C6D46]/30 border-t-[#8C6D46] rounded-full animate-spin"></span>
                            <span>Memuat katalog template...</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((tpl) => (
                            <div
                                key={tpl.id}
                                className={`rounded-3xl border bg-white overflow-hidden shadow-2xs transition-all ${
                                    tpl.is_active ? 'border-[#E5DDD0]' : 'border-neutral-200 opacity-75'
                                }`}
                            >
                                {/* Cover Header */}
                                <div className="relative aspect-[16/10] bg-[#FAF8F5] overflow-hidden">
                                    <img
                                        src={tpl.cover_image}
                                        alt={tpl.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs">
                                            {tpl.category}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <button
                                            onClick={() => handleToggleActive(tpl.id)}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-xs cursor-pointer transition-colors ${
                                                tpl.is_active
                                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                                    : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                                            }`}
                                        >
                                            {tpl.is_active ? 'Publik / Aktif' : 'Nonaktif'}
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <div className="space-y-1">
                                        <h3 className="font-serif text-xl font-bold text-[#1A1817]">
                                            {tpl.name}
                                        </h3>
                                        <p className="text-xs text-[#6E6864] line-clamp-2">
                                            {tpl.description || 'Template undangan pernikahan editorial eksklusif.'}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-[#E5DDD0] flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] text-[#6E6864] block">Harga Paket</span>
                                            <span className="text-lg font-bold text-[#8C6D46]">
                                                Rp {Number(tpl.price).toLocaleString('id-ID')}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => onNavigate('demo', tpl.slug)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E5DDD0] text-xs font-semibold text-[#1A1817] hover:bg-black/5 transition-colors cursor-pointer"
                                            >
                                                <Eye className="w-3.5 h-3.5 text-[#6E6864]" />
                                                <span>Demo</span>
                                            </button>

                                            <button
                                                onClick={() => handleStartEdit(tpl)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#8C6D46] text-xs font-semibold text-[#8C6D46] hover:bg-[#8C6D46]/10 transition-colors cursor-pointer"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                                <span>Ubah</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Edit Template Price Modal */}
            {editingTemplate && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
                    onClick={() => setEditingTemplate(null)}
                >
                    <div
                        className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DDD0] shadow-xl space-y-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="font-serif text-xl font-bold text-[#1A1817]">
                                Edit Harga {editingTemplate.name}
                            </h2>
                            <button
                                onClick={() => setEditingTemplate(null)}
                                className="p-1 rounded-full text-[#6E6864] hover:bg-neutral-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSavePrice} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[#1A1817]">
                                    Harga Paket (Rupiah)
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    step="1000"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-sm text-[#1A1817] focus:outline-none focus:border-[#8C6D46]"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingTemplate(null)}
                                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#6E6864] hover:text-[#1A1817]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-5 py-2.5 rounded-xl bg-[#8C6D46] hover:bg-[#745834] text-white text-xs font-semibold cursor-pointer shadow-sm"
                                >
                                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
