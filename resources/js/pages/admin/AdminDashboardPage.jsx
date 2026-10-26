import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    ShoppingBag,
    CheckCircle2,
    Clock,
    AlertCircle,
    Sliders,
    LayoutGrid,
    Search,
    RefreshCw,
    Download,
    Eye,
    X,
    Save,
    MessageCircle,
    ArrowUpRight,
    LogOut,
    Menu,
    ChevronRight,
    Building2,
    CreditCard,
    DollarSign,
    Users,
    Calendar,
    MapPin,
    ExternalLink,
    Filter,
    ShieldCheck,
    Edit3,
} from 'lucide-react';

export default function AdminDashboardPage({ onNavigate }) {
    const [token, setToken] = useState(() => localStorage.getItem('dnvite_token') || '');
    const [adminUser, setAdminUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('dnvite_admin_user')) || null;
        } catch {
            return null;
        }
    });

    // Active Navigation Tab: 'overview' | 'orders' | 'proofs' | 'templates' | 'settings'
    const [activeTab, setActiveTab] = useState('overview');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Metrics State
    const [metrics, setMetrics] = useState({
        total_orders: 0,
        pending_payment: 0,
        in_progress: 0,
        completed: 0,
        total_revenue: 0,
        revenue_formatted: 'Rp 0',
    });

    // Orders State
    const [orders, setOrders] = useState([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [paymentFilter, setPaymentFilter] = useState('all');
    const [productionFilter, setProductionFilter] = useState('all');

    // Templates State
    const [templates, setTemplates] = useState([]);
    const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [editPrice, setEditPrice] = useState('');

    // Settings State
    const [settings, setSettings] = useState({
        admin_whatsapp: '085723138515',
        brand_name: 'DNVITE',
        operational_hours: 'Senin – Minggu: 08:00 – 21:00 WIB',
        bank_accounts: [
            { bank: 'Bank Central Asia (BCA)', number: '8830192841', name: 'DNVITE INDONESIA' },
            { bank: 'Bank Mandiri', number: '1370019284711', name: 'DNVITE INDONESIA' },
        ],
    });
    const [isSavingSettings, setIsSavingSettings] = useState(false);

    // Selected order for Detail Drawer
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [statusSuccessMsg, setStatusSuccessMsg] = useState('');
    const [internalNotes, setInternalNotes] = useState('');
    const [isSavingNotes, setIsSavingNotes] = useState(false);
    const [notesSuccessMsg, setNotesSuccessMsg] = useState('');

    // Photo Lightbox modal
    const [enlargedImage, setEnlargedImage] = useState(null);

    // Global Toast Notification
    const [toastMsg, setToastMsg] = useState('');

    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(''), 3500);
    };

    // Auth Guard
    useEffect(() => {
        if (!token) {
            onNavigate('admin-login');
        } else {
            fetchMetrics();
            fetchOrders();
            fetchTemplates();
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
        } catch (e) {
            console.error('Logout error', e);
        } finally {
            localStorage.removeItem('dnvite_token');
            localStorage.removeItem('dnvite_admin_user');
            setToken('');
            onNavigate('admin-login');
        }
    };

    const fetchMetrics = async () => {
        try {
            const res = await fetch('/api/admin/metrics', {
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
                const m = data.data.metrics || data.data;
                setMetrics({
                    total_orders: m.total_orders || 0,
                    pending_payment: m.pending_payment || 0,
                    in_progress: m.in_progress || 0,
                    completed: m.completed || 0,
                    total_revenue: m.total_revenue || 0,
                    revenue_formatted: 'Rp ' + Number(m.total_revenue || 0).toLocaleString('id-ID'),
                });
            }
        } catch (err) {
            console.error('Fetch metrics error', err);
        }
    };

    const fetchOrders = async () => {
        setIsLoadingOrders(true);
        try {
            const params = new URLSearchParams();
            if (searchQuery.trim()) params.append('search', searchQuery.trim());
            if (paymentFilter !== 'all') params.append('payment_status', paymentFilter);
            if (productionFilter !== 'all') params.append('production_status', productionFilter);

            const res = await fetch(`/api/admin/orders?${params.toString()}`, {
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
                setOrders(data.data.data || []);
            }
        } catch (err) {
            console.error('Fetch orders error', err);
        } finally {
            setIsLoadingOrders(false);
        }
    };

    const fetchTemplates = async () => {
        setIsLoadingTemplates(true);
        try {
            const res = await fetch('/api/admin/templates', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            const data = await res.json();
            if (data.status === 'success') {
                setTemplates(data.data || []);
            }
        } catch (err) {
            console.error('Fetch templates error', err);
        } finally {
            setIsLoadingTemplates(false);
        }
    };

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            const data = await res.json();
            if (data.status === 'success' && data.data) {
                setSettings({
                    admin_whatsapp: data.data.admin_whatsapp || '085723138515',
                    brand_name: data.data.brand_name || 'DNVITE',
                    operational_hours: data.data.operational_hours || 'Senin – Minggu: 08:00 – 21:00 WIB',
                    bank_accounts: data.data.bank_accounts || settings.bank_accounts,
                });
            }
        } catch (err) {
            console.error('Fetch settings error', err);
        }
    };

    const handleToggleTemplate = async (id) => {
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
                showToast('Status publikasi template berhasil diubah.');
            }
        } catch (err) {
            console.error('Toggle template error', err);
        }
    };

    const handleSaveTemplatePrice = async (e) => {
        e.preventDefault();
        if (!editingTemplate) return;
        try {
            const res = await fetch(`/api/admin/templates/${editingTemplate.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ price: parseFloat(editPrice) }),
            });
            if (res.ok) {
                setTemplates((prev) =>
                    prev.map((t) => (t.id === editingTemplate.id ? { ...t, price: editPrice } : t))
                );
                setEditingTemplate(null);
                showToast('Harga template berhasil diperbarui.');
            }
        } catch (err) {
            console.error('Save price error', err);
        }
    };

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        setIsSavingSettings(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(settings),
            });
            if (res.ok) {
                showToast('Pengaturan bisnis berhasil diperbarui.');
            }
        } catch (err) {
            console.error('Save settings error', err);
        } finally {
            setIsSavingSettings(false);
        }
    };

    // Open Detail Drawer
    const handleOpenDetail = (order) => {
        setSelectedOrder(order);
        setInternalNotes(order.internal_notes || '');
        setStatusSuccessMsg('');
        setNotesSuccessMsg('');
    };

    // Update Status
    const handleUpdateStatus = async (orderId, paymentStatus, productionStatus) => {
        setIsUpdatingStatus(true);
        setStatusSuccessMsg('');
        try {
            const res = await fetch(`/api/admin/orders/${orderId}/status`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    payment_status: paymentStatus,
                    production_status: productionStatus,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatusSuccessMsg('Status pesanan berhasil diperbarui!');
                if (selectedOrder && selectedOrder.id === orderId) {
                    setSelectedOrder(data.data);
                }
                setOrders((prev) =>
                    prev.map((o) => (o.id === orderId ? { ...o, ...data.data } : o))
                );
                fetchMetrics();
                showToast('Status berhasil diubah.');
            }
        } catch (err) {
            console.error('Update status error', err);
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    // Save Internal Notes
    const handleSaveNotes = async () => {
        if (!selectedOrder) return;
        setIsSavingNotes(true);
        setNotesSuccessMsg('');
        try {
            const res = await fetch(`/api/admin/orders/${selectedOrder.id}/notes`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ internal_notes: internalNotes }),
            });
            if (res.ok) {
                setNotesSuccessMsg('Catatan internal berhasil disimpan.');
                setSelectedOrder((prev) => ({ ...prev, internal_notes: internalNotes }));
                setOrders((prev) =>
                    prev.map((o) => (o.id === selectedOrder.id ? { ...o, internal_notes: internalNotes } : o))
                );
                showToast('Catatan internal disimpan.');
            }
        } catch (err) {
            console.error('Save notes error', err);
        } finally {
            setIsSavingNotes(false);
        }
    };

    // Export Orders to CSV
    const handleExportCSV = () => {
        if (!orders || orders.length === 0) {
            showToast('Tidak ada data pesanan untuk diekspor.');
            return;
        }

        const headers = [
            'Nomor Referensi',
            'Tanggal Pesan',
            'Nama Pemesan',
            'No WhatsApp',
            'Email',
            'Mempelai Pria',
            'Mempelai Wanita',
            'Tanggal Acara',
            'Template',
            'Harga',
            'Status Pembayaran',
            'Status Produksi',
            'Catatan Klien',
        ];

        const rows = orders.map((o) => [
            `"${o.order_ref}"`,
            `"${new Date(o.created_at).toLocaleDateString('id-ID')}"`,
            `"${o.customer_name}"`,
            `"${o.customer_whatsapp}"`,
            `"${o.customer_email || '-'}"`,
            `"${o.groom_nickname}"`,
            `"${o.bride_nickname}"`,
            `"${o.wedding_date}"`,
            `"${o.template_name}"`,
            `"${o.package_price}"`,
            `"${o.payment_status}"`,
            `"${o.production_status}"`,
            `"${(o.customer_notes || '').replace(/"/g, '""')}"`,
        ]);

        const csvContent =
            'data:text/csv;charset=utf-8,\uFEFF' +
            [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `dnvite-pesanan-${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Data pesanan berhasil diekspor ke format CSV.');
    };

    // Format WhatsApp Link
    const getCustomerWhatsAppUrl = (order) => {
        let phone = (order.customer_whatsapp || '').replace(/[^0-9]/g, '');
        if (phone.startsWith('0')) phone = '62' + phone.substring(1);
        const msg = encodeURIComponent(
            `Halo Kak ${order.customer_name}, kami dari tim DNVITE ingin mengonfirmasi detail pesanan undangan digital Anda:\n\n` +
            `• No. Referensi: ${order.order_ref}\n` +
            `• Paket Template: ${order.template_name}\n` +
            `• Mempelai: ${order.groom_nickname} & ${order.bride_nickname}\n\n` +
            `Apakah data acara sudah sesuai untuk kami proses ke tahap produksi? Terima kasih.`
        );
        return `https://wa.me/${phone}?text=${msg}`;
    };

    // Orders with uploaded payment proof
    const ordersWithProof = orders.filter((o) =>
        o.files && o.files.some((f) => f.file_type === 'payment_proof')
    );

    // Badges
    const renderPaymentBadge = (status) => {
        switch (status) {
            case 'verified':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Lunas / Terverifikasi</span>
                    </span>
                );
            case 'cancelled':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        <AlertCircle className="w-3 h-3" />
                        <span>Dibatalkan</span>
                    </span>
                );
            case 'pending':
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3" />
                        <span>Menunggu Pembayaran</span>
                    </span>
                );
        }
    };

    const renderProductionBadge = (status) => {
        switch (status) {
            case 'completed':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        <span>Selesai &amp; Siap Pakai</span>
                    </span>
                );
            case 'ready':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        <span>Siap Ditinjau Klien</span>
                    </span>
                );
            case 'in_progress':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        <span>Sedang Dikerjakan</span>
                    </span>
                );
            case 'queued':
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-700 border border-neutral-300">
                        <span>Dalam Antrean Desain</span>
                    </span>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F5F0] text-[#1A1817] flex font-sans selection:bg-[#8C6D46] selection:text-white">
            {/* Global Toast Alert */}
            {toastMsg && (
                <div className="fixed bottom-6 right-6 z-60 bg-[#1A1817] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{toastMsg}</span>
                </div>
            )}

            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex w-64 bg-[#FAF8F5] border-r border-[#E5DDD0] flex-col justify-between shrink-0 h-screen sticky top-0 z-30">
                <div className="p-6 space-y-6 overflow-y-auto">
                    {/* Brand Monogram */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#1A1817] text-[#FAF8F5] flex items-center justify-center font-bold text-sm tracking-wider shadow-sm">
                            D
                        </div>
                        <div>
                            <span className="font-serif font-bold text-base tracking-wide text-[#1A1817] block leading-none">
                                DNVITE Studio
                            </span>
                            <span className="text-[10px] text-[#8C6D46] uppercase tracking-wider font-semibold">
                                Dashboard Admin
                            </span>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-1.5 text-xs font-medium">
                        <button
                            type="button"
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                                activeTab === 'overview'
                                    ? 'bg-[#1A1817] text-white'
                                    : 'text-[#6E6864] hover:bg-black/5 hover:text-[#1A1817]'
                            }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <LayoutDashboard className="w-4 h-4" />
                                <span>Ringkasan &amp; Metrik</span>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('orders')}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                                activeTab === 'orders'
                                    ? 'bg-[#1A1817] text-white'
                                    : 'text-[#6E6864] hover:bg-black/5 hover:text-[#1A1817]'
                            }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <ShoppingBag className="w-4 h-4" />
                                <span>Kelola Pesanan</span>
                            </div>
                            <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                    activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-black/5 text-[#1A1817]'
                                }`}
                            >
                                {orders.length}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('proofs')}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                                activeTab === 'proofs'
                                    ? 'bg-[#1A1817] text-white'
                                    : 'text-[#6E6864] hover:bg-black/5 hover:text-[#1A1817]'
                            }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Bukti Transfer</span>
                            </div>
                            {ordersWithProof.length > 0 && (
                                <span
                                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                        activeTab === 'proofs' ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800'
                                    }`}
                                >
                                    {ordersWithProof.length}
                                </span>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('templates')}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                                activeTab === 'templates'
                                    ? 'bg-[#1A1817] text-white'
                                    : 'text-[#6E6864] hover:bg-black/5 hover:text-[#1A1817]'
                            }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <LayoutGrid className="w-4 h-4" />
                                <span>Katalog Template</span>
                            </div>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                                activeTab === 'settings'
                                    ? 'bg-[#1A1817] text-white'
                                    : 'text-[#6E6864] hover:bg-black/5 hover:text-[#1A1817]'
                            }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <Sliders className="w-4 h-4" />
                                <span>Pengaturan Bisnis</span>
                            </div>
                        </button>
                    </nav>

                    <div className="pt-4 border-t border-[#E5DDD0]">
                        <button
                            type="button"
                            onClick={() => onNavigate('home')}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#6E6864] hover:text-[#1A1817] hover:bg-black/5 transition-colors cursor-pointer"
                        >
                            <ArrowUpRight className="w-4 h-4" />
                            <span>Lihat Website Publik</span>
                        </button>
                    </div>
                </div>

                {/* Admin Profile & Logout */}
                <div className="p-4 border-t border-[#E5DDD0] bg-[#FAF8F5]">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5 truncate pr-2">
                            <span className="text-xs font-semibold text-[#1A1817] block truncate">
                                {adminUser?.name || 'Administrator'}
                            </span>
                            <span className="text-[10px] text-[#6E6864] block truncate">
                                {adminUser?.email || 'admin@dnvite.com'}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="p-2 rounded-lg text-[#6E6864] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Keluar dari Panel Admin"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Workspace Header */}
                <header className="sticky top-0 z-20 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E5DDD0] px-5 sm:px-8 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setMobileSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-[#1A1817] hover:bg-black/5"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div>
                            <h1 className="font-serif text-lg sm:text-xl font-bold text-[#1A1817] leading-tight">
                                {activeTab === 'overview' && 'Ringkasan Bisnis & Performa'}
                                {activeTab === 'orders' && 'Manajemen Seluruh Pesanan'}
                                {activeTab === 'proofs' && 'Verifikasi Bukti Transfer Klien'}
                                {activeTab === 'templates' && 'Pengaturan Katalog Template'}
                                {activeTab === 'settings' && 'Pengaturan Platform & Rekening'}
                            </h1>
                            <p className="text-[11px] text-[#6E6864] hidden sm:block">
                                Ruang kerja operasional DNVITE Digital Wedding Invitation
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            onClick={handleExportCSV}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E5DDD0] bg-white text-xs font-semibold text-[#1A1817] hover:bg-[#FAF8F5] transition-colors cursor-pointer shadow-2xs"
                        >
                            <Download className="w-3.5 h-3.5 text-[#8C6D46]" />
                            <span className="hidden sm:inline">Ekspor CSV</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                fetchMetrics();
                                fetchOrders();
                                showToast('Data berhasil diperbarui.');
                            }}
                            className="p-2 rounded-xl border border-[#E5DDD0] bg-white text-[#1A1817] hover:bg-[#FAF8F5] transition-colors cursor-pointer shadow-2xs"
                            title="Segarkan Data"
                        >
                            <RefreshCw className="w-3.5 h-3.5 text-[#6E6864]" />
                        </button>
                    </div>
                </header>

                {/* Tab Views Container */}
                <main className="flex-1 p-5 sm:p-8 space-y-8 max-w-[1400px] w-full mx-auto">
                    {/* ========================================================= */}
                    {/* VIEW 1: OVERVIEW & RINGKASAN */}
                    {/* ========================================================= */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-in fade-in duration-200">
                            {/* KPI Metrics: Typography-First */}
                            <section>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                    <div className="p-5 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs">
                                        <span className="text-xs text-[#6E6864] block font-medium">Total Pesanan</span>
                                        <span className="text-3xl font-bold font-sans text-[#1A1817] mt-1.5 block">
                                            {metrics.total_orders}
                                        </span>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs">
                                        <span className="text-xs text-amber-700 block font-medium">Menunggu Pembayaran</span>
                                        <span className="text-3xl font-bold font-sans text-amber-700 mt-1.5 block">
                                            {metrics.pending_payment}
                                        </span>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs">
                                        <span className="text-xs text-purple-700 block font-medium">Dalam Pengerjaan</span>
                                        <span className="text-3xl font-bold font-sans text-purple-700 mt-1.5 block">
                                            {metrics.in_progress}
                                        </span>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs">
                                        <span className="text-xs text-blue-700 block font-medium">Pesanan Selesai</span>
                                        <span className="text-3xl font-bold font-sans text-blue-700 mt-1.5 block">
                                            {metrics.completed}
                                        </span>
                                    </div>

                                    <div className="col-span-2 sm:col-span-1 p-5 rounded-2xl bg-white border border-[#E5DDD0] shadow-2xs">
                                        <span className="text-xs text-[#8C6D46] block font-medium">Total Omset Lunas</span>
                                        <span className="text-2xl font-bold font-sans text-[#8C6D46] mt-1.5 block truncate">
                                            {metrics.revenue_formatted}
                                        </span>
                                    </div>
                                </div>
                            </section>

                            {/* Shortcut Banners */}
                            <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div
                                    onClick={() => setActiveTab('orders')}
                                    className="p-5 rounded-2xl bg-white border border-[#E5DDD0] hover:border-[#8C6D46] shadow-2xs cursor-pointer transition-all flex items-center justify-between group"
                                >
                                    <div className="space-y-1">
                                        <span className="text-xs font-semibold text-[#8C6D46] uppercase tracking-wider block">
                                            Operasional Desain
                                        </span>
                                        <h4 className="font-serif text-lg font-bold text-[#1A1817]">
                                            Kelola Antrean Pesanan
                                        </h4>
                                        <p className="text-xs text-[#6E6864]">
                                            Tinjau data mempelai &amp; jadwal pernikahan klien.
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-[#6E6864] group-hover:translate-x-1 transition-transform" />
                                </div>

                                <div
                                    onClick={() => setActiveTab('proofs')}
                                    className="p-5 rounded-2xl bg-white border border-[#E5DDD0] hover:border-[#8C6D46] shadow-2xs cursor-pointer transition-all flex items-center justify-between group"
                                >
                                    <div className="space-y-1">
                                        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
                                            Verifikasi Finansial
                                        </span>
                                        <h4 className="font-serif text-lg font-bold text-[#1A1817]">
                                            Bukti Transfer Masuk
                                        </h4>
                                        <p className="text-xs text-[#6E6864]">
                                            {ordersWithProof.length} bukti transfer siap ditinjau.
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-[#6E6864] group-hover:translate-x-1 transition-transform" />
                                </div>

                                <div
                                    onClick={() => setActiveTab('templates')}
                                    className="p-5 rounded-2xl bg-white border border-[#E5DDD0] hover:border-[#8C6D46] shadow-2xs cursor-pointer transition-all flex items-center justify-between group"
                                >
                                    <div className="space-y-1">
                                        <span className="text-xs font-semibold text-[#8C6D46] uppercase tracking-wider block">
                                            Katalog Produk
                                        </span>
                                        <h4 className="font-serif text-lg font-bold text-[#1A1817]">
                                            Harga &amp; Publikasi
                                        </h4>
                                        <p className="text-xs text-[#6E6864]">
                                            4 template digital aktif siap ditransaksikan.
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-[#6E6864] group-hover:translate-x-1 transition-transform" />
                                </div>
                            </section>

                            {/* Recent Orders Overview */}
                            <section className="bg-white rounded-3xl border border-[#E5DDD0] shadow-2xs p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-serif text-xl font-bold text-[#1A1817]">
                                            Pesanan Terbaru Masuk
                                        </h3>
                                        <p className="text-xs text-[#6E6864]">
                                            Pesanan yang baru saja diinputkan klien melalui formulir DNVITE.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('orders')}
                                        className="text-xs font-semibold text-[#8C6D46] hover:underline cursor-pointer"
                                    >
                                        Buka Semua Pesanan &rarr;
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="border-b border-[#E5DDD0] text-[#6E6864] font-semibold text-[11px] uppercase tracking-wider">
                                                <th className="py-3 px-3">No. Referensi</th>
                                                <th className="py-3 px-3">Pemesan</th>
                                                <th className="py-3 px-3">Mempelai</th>
                                                <th className="py-3 px-3">Template</th>
                                                <th className="py-3 px-3">Status Bayar</th>
                                                <th className="py-3 px-3 text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#E5DDD0]">
                                            {orders.slice(0, 5).map((order) => (
                                                <tr
                                                    key={order.id}
                                                    onClick={() => handleOpenDetail(order)}
                                                    className="hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                                                >
                                                    <td className="py-3.5 px-3 font-mono font-medium text-[#1A1817]">
                                                        {order.order_ref}
                                                    </td>
                                                    <td className="py-3.5 px-3 font-semibold text-[#1A1817]">
                                                        {order.customer_name}
                                                    </td>
                                                    <td className="py-3.5 px-3 text-[#1A1817]">
                                                        {order.groom_nickname} &amp; {order.bride_nickname}
                                                    </td>
                                                    <td className="py-3.5 px-3 text-[#8C6D46] font-medium">
                                                        {order.template_name}
                                                    </td>
                                                    <td className="py-3.5 px-3">
                                                        {renderPaymentBadge(order.payment_status)}
                                                    </td>
                                                    <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleOpenDetail(order)}
                                                            className="px-2.5 py-1 rounded-lg border border-[#E5DDD0] text-[11px] font-semibold hover:bg-black/5"
                                                        >
                                                            Lihat
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {orders.length === 0 && (
                                                <tr>
                                                    <td colSpan="6" className="py-8 text-center text-[#6E6864]">
                                                        Belum ada pesanan terbaru.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* ========================================================= */}
                    {/* VIEW 2: KELOLA PESANAN (ORDERS LIST & ACTIONS) */}
                    {/* ========================================================= */}
                    {activeTab === 'orders' && (
                        <div className="space-y-6 animate-in fade-in duration-200">
                            {/* Search & Status Filters */}
                            <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5DDD0] shadow-2xs space-y-4">
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                                    <div className="relative flex-1 max-w-md">
                                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6864]" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && fetchOrders()}
                                            placeholder="Cari referensi, nama pemesan, no WA, atau mempelai..."
                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs text-[#1A1817] focus:outline-none focus:border-[#8C6D46]"
                                        />
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <select
                                            value={paymentFilter}
                                            onChange={(e) => setPaymentFilter(e.target.value)}
                                            className="px-3 py-2 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs text-[#1A1817] focus:outline-none cursor-pointer"
                                        >
                                            <option value="all">Semua Pembayaran</option>
                                            <option value="pending">Menunggu Pembayaran</option>
                                            <option value="verified">Lunas / Terverifikasi</option>
                                            <option value="cancelled">Dibatalkan</option>
                                        </select>

                                        <select
                                            value={productionFilter}
                                            onChange={(e) => setProductionFilter(e.target.value)}
                                            className="px-3 py-2 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs text-[#1A1817] focus:outline-none cursor-pointer"
                                        >
                                            <option value="all">Semua Produksi</option>
                                            <option value="queued">Dalam Antrean</option>
                                            <option value="in_progress">Sedang Dikerjakan</option>
                                            <option value="ready">Siap Review</option>
                                            <option value="completed">Selesai</option>
                                        </select>

                                        <button
                                            type="button"
                                            onClick={fetchOrders}
                                            className="p-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] hover:bg-neutral-100 text-[#1A1817] transition-colors cursor-pointer"
                                            title="Terapkan Filter"
                                        >
                                            <Filter className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* Full Orders Table */}
                            <section className="bg-white rounded-3xl border border-[#E5DDD0] shadow-2xs overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse text-xs">
                                        <thead>
                                            <tr className="border-b border-[#E5DDD0] bg-[#FAF8F5] text-[#6E6864] font-semibold text-[11px] uppercase tracking-wider">
                                                <th className="py-3.5 px-4">Ref &amp; Tanggal</th>
                                                <th className="py-3.5 px-4">Pemesan</th>
                                                <th className="py-3.5 px-4">Mempelai</th>
                                                <th className="py-3.5 px-4">Template &amp; Biaya</th>
                                                <th className="py-3.5 px-4">Status Bayar</th>
                                                <th className="py-3.5 px-4">Status Produksi</th>
                                                <th className="py-3.5 px-4 text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#E5DDD0]">
                                            {isLoadingOrders ? (
                                                <tr>
                                                    <td colSpan="7" className="py-12 text-center text-[#6E6864]">
                                                        <div className="inline-flex items-center gap-2">
                                                            <span className="w-4 h-4 border-2 border-[#8C6D46]/30 border-t-[#8C6D46] rounded-full animate-spin"></span>
                                                            <span>Memuat daftar pesanan...</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : orders.length === 0 ? (
                                                <tr>
                                                    <td colSpan="7" className="py-12 text-center text-[#6E6864]">
                                                        <p className="font-serif text-base text-[#1A1817]">Belum Ada Pesanan</p>
                                                        <p className="text-xs mt-1">Belum ada pesanan yang sesuai filter.</p>
                                                    </td>
                                                </tr>
                                            ) : (
                                                orders.map((order) => (
                                                    <tr
                                                        key={order.id}
                                                        onClick={() => handleOpenDetail(order)}
                                                        className="hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                                                    >
                                                        <td className="py-4 px-4 font-mono font-medium text-[#1A1817]">
                                                            <div>{order.order_ref}</div>
                                                            <div className="text-[10px] text-[#6E6864] font-sans">
                                                                {new Date(order.created_at).toLocaleDateString('id-ID')}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-4">
                                                            <div className="font-semibold text-[#1A1817]">{order.customer_name}</div>
                                                            <div className="text-[11px] text-[#6E6864] font-mono">{order.customer_whatsapp}</div>
                                                        </td>
                                                        <td className="py-4 px-4">
                                                            <div className="font-medium text-[#1A1817]">
                                                                {order.groom_nickname} &amp; {order.bride_nickname}
                                                            </div>
                                                            <div className="text-[10px] text-[#6E6864]">{order.wedding_date}</div>
                                                        </td>
                                                        <td className="py-4 px-4">
                                                            <div className="font-medium text-[#1A1817]">{order.template_name}</div>
                                                            <div className="text-[11px] text-[#8C6D46] font-semibold">
                                                                Rp {Number(order.package_price).toLocaleString('id-ID')}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-4">
                                                            {renderPaymentBadge(order.payment_status)}
                                                        </td>
                                                        <td className="py-4 px-4">
                                                            {renderProductionBadge(order.production_status)}
                                                        </td>
                                                        <td className="py-4 px-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                                                            <a
                                                                href={getCustomerWhatsAppUrl(order)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px]"
                                                                title="Kirim pesan WhatsApp"
                                                            >
                                                                <MessageCircle className="w-3.5 h-3.5" />
                                                                <span className="hidden sm:inline">Chat</span>
                                                            </a>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleOpenDetail(order)}
                                                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E5DDD0] bg-white text-[11px] font-semibold hover:bg-[#FAF8F5]"
                                                            >
                                                                <Eye className="w-3.5 h-3.5 text-[#6E6864]" />
                                                                <span className="hidden sm:inline">Detail</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* ========================================================= */}
                    {/* VIEW 3: VERIFIKASI BUKTI TRANSFER (PROOFS QUEUE) */}
                    {/* ========================================================= */}
                    {activeTab === 'proofs' && (
                        <div className="space-y-6 animate-in fade-in duration-200">
                            <div>
                                <h3 className="font-serif text-xl font-bold text-[#1A1817]">
                                    Antrean Bukti Transfer Masuk
                                </h3>
                                <p className="text-xs text-[#6E6864]">
                                    Tinjau foto struk transfer yang diunggah customer untuk verifikasi pembayaran.
                                </p>
                            </div>

                            {ordersWithProof.length === 0 ? (
                                <div className="bg-white rounded-3xl p-12 text-center border border-[#E5DDD0] space-y-2">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                                    <h4 className="font-serif text-lg font-bold">Semua Bukti Transfer Tertinjau</h4>
                                    <p className="text-xs text-[#6E6864] max-w-sm mx-auto">
                                        Saat ini tidak ada struk transfer baru yang menunggu verifikasi.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {ordersWithProof.map((order) => {
                                        const proofFile = order.files.find((f) => f.file_type === 'payment_proof');
                                        const proofUrl = proofFile ? `/storage/${proofFile.file_path}` : null;

                                        return (
                                            <div
                                                key={order.id}
                                                className="bg-white rounded-3xl border border-[#E5DDD0] overflow-hidden shadow-2xs p-5 space-y-4"
                                            >
                                                {/* Image Thumbnail */}
                                                <div
                                                    onClick={() => proofUrl && setEnlargedImage(proofUrl)}
                                                    className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#E5DDD0] relative cursor-pointer group"
                                                >
                                                    {proofUrl ? (
                                                        <img
                                                            src={proofUrl}
                                                            alt="Bukti Transfer"
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full text-xs text-[#6E6864]">
                                                            Tanpa Gambar
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        <span>Perbesar Struk</span>
                                                    </div>
                                                </div>

                                                {/* Info */}
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-mono text-xs font-bold text-[#8C6D46]">
                                                            {order.order_ref}
                                                        </span>
                                                        <span className="text-xs font-bold text-[#1A1817]">
                                                            Rp {Number(order.package_price).toLocaleString('id-ID')}
                                                        </span>
                                                    </div>
                                                    <h4 className="font-semibold text-sm text-[#1A1817]">
                                                        {order.customer_name} ({order.customer_whatsapp})
                                                    </h4>
                                                    <p className="text-[11px] text-[#6E6864]">
                                                        Paket: {order.template_name} &bull; Mempelai: {order.groom_nickname} &amp; {order.bride_nickname}
                                                    </p>
                                                    <div className="pt-2">{renderPaymentBadge(order.payment_status)}</div>
                                                </div>

                                                {/* Quick Action Button */}
                                                <div className="pt-3 border-t border-[#E5DDD0] flex items-center gap-2">
                                                    {order.payment_status !== 'verified' ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleUpdateStatus(order.id, 'verified', order.production_status)}
                                                            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                                        >
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            <span>Verifikasi &amp; Tandai Lunas</span>
                                                        </button>
                                                    ) : (
                                                        <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                                                            <CheckCircle2 className="w-4 h-4" />
                                                            <span>Sudah Terverifikasi</span>
                                                        </span>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() => handleOpenDetail(order)}
                                                        className="p-2 rounded-xl border border-[#E5DDD0] text-xs font-semibold hover:bg-[#FAF8F5]"
                                                        title="Detail Pesanan Lengkap"
                                                    >
                                                        <Eye className="w-4 h-4 text-[#6E6864]" />
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ========================================================= */}
                    {/* VIEW 4: KATALOG TEMPLATE */}
                    {/* ========================================================= */}
                    {activeTab === 'templates' && (
                        <div className="space-y-6 animate-in fade-in duration-200">
                            <div>
                                <h3 className="font-serif text-xl font-bold text-[#1A1817]">
                                    Manajemen Katalog Template Undangan
                                </h3>
                                <p className="text-xs text-[#6E6864]">
                                    Atur status visibilitas publik dan sesuaikan harga paket template.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {templates.map((tpl) => (
                                    <div
                                        key={tpl.id}
                                        className={`bg-white rounded-3xl border overflow-hidden shadow-2xs transition-all ${
                                            tpl.is_active ? 'border-[#E5DDD0]' : 'border-neutral-200 opacity-75'
                                        }`}
                                    >
                                        <div className="relative aspect-[3/4] bg-[#FAF8F5] overflow-hidden">
                                            <img
                                                src={tpl.cover_image}
                                                alt={tpl.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs">
                                                    {tpl.category}
                                                </span>
                                            </div>
                                            <div className="absolute top-3 right-3">
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleTemplate(tpl.id)}
                                                    className={`px-3 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                                                        tpl.is_active
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'bg-neutral-800 text-white'
                                                    }`}
                                                >
                                                    {tpl.is_active ? 'Publik' : 'Nonaktif'}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-5 space-y-3">
                                            <div>
                                                <h4 className="font-serif text-lg font-bold text-[#1A1817]">
                                                    {tpl.name}
                                                </h4>
                                                <p className="text-xs text-[#6E6864] line-clamp-2">
                                                    {tpl.description}
                                                </p>
                                            </div>

                                            <div className="pt-2 border-t border-[#E5DDD0] flex items-center justify-between">
                                                <div>
                                                    <span className="text-[10px] text-[#6E6864] block">Harga</span>
                                                    <span className="font-bold text-base text-[#8C6D46]">
                                                        Rp {Number(tpl.price).toLocaleString('id-ID')}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => onNavigate('demo', tpl.slug)}
                                                        className="p-2 rounded-lg border border-[#E5DDD0] text-xs font-semibold hover:bg-black/5"
                                                        title="Lihat Demo"
                                                    >
                                                        <Eye className="w-3.5 h-3.5 text-[#6E6864]" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setEditingTemplate(tpl);
                                                            setEditPrice(tpl.price);
                                                        }}
                                                        className="p-2 rounded-lg bg-[#FAF8F5] border border-[#8C6D46] text-[#8C6D46] hover:bg-[#8C6D46]/10 text-xs font-semibold cursor-pointer"
                                                        title="Edit Harga"
                                                    >
                                                        <Edit3 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ========================================================= */}
                    {/* VIEW 5: PENGATURAN BISNIS */}
                    {/* ========================================================= */}
                    {activeTab === 'settings' && (
                        <div className="space-y-6 max-w-3xl animate-in fade-in duration-200">
                            <div>
                                <h3 className="font-serif text-xl font-bold text-[#1A1817]">
                                    Pengaturan Bisnis &amp; Rekening
                                </h3>
                                <p className="text-xs text-[#6E6864]">
                                    Konfigurasi nomor WhatsApp admin resmi dan rekening pembayaran customer.
                                </p>
                            </div>

                            <form onSubmit={handleSaveSettings} className="space-y-6">
                                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DDD0] shadow-2xs space-y-4">
                                    <h4 className="font-serif text-base font-bold text-[#1A1817] border-b border-[#E5DDD0] pb-2">
                                        Identitas Usaha &amp; Layanan
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-[#1A1817]">Nama Brand</label>
                                            <input
                                                type="text"
                                                value={settings.brand_name}
                                                onChange={(e) => setSettings({ ...settings, brand_name: e.target.value })}
                                                className="w-full p-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs font-medium"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-[#1A1817]">
                                                Nomor WhatsApp Admin Resmi
                                            </label>
                                            <input
                                                type="text"
                                                value={settings.admin_whatsapp}
                                                onChange={(e) => setSettings({ ...settings, admin_whatsapp: e.target.value })}
                                                className="w-full p-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs font-mono font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1 pt-1">
                                        <label className="text-xs font-semibold text-[#1A1817]">Jam Operasional Layanan</label>
                                        <input
                                            type="text"
                                            value={settings.operational_hours}
                                            onChange={(e) => setSettings({ ...settings, operational_hours: e.target.value })}
                                            className="w-full p-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DDD0] shadow-2xs space-y-4">
                                    <h4 className="font-serif text-base font-bold text-[#1A1817] border-b border-[#E5DDD0] pb-2">
                                        Rekening Bank Pembayaran Customer
                                    </h4>

                                    <div className="space-y-3">
                                        {settings.bank_accounts.map((acc, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD0] grid grid-cols-1 sm:grid-cols-3 gap-2.5"
                                            >
                                                <input
                                                    type="text"
                                                    value={acc.bank}
                                                    onChange={(e) => {
                                                        const updated = [...settings.bank_accounts];
                                                        updated[idx].bank = e.target.value;
                                                        setSettings({ ...settings, bank_accounts: updated });
                                                    }}
                                                    placeholder="Nama Bank"
                                                    className="p-2 rounded-lg bg-white border border-[#E5DDD0] text-xs font-medium"
                                                />
                                                <input
                                                    type="text"
                                                    value={acc.number}
                                                    onChange={(e) => {
                                                        const updated = [...settings.bank_accounts];
                                                        updated[idx].number = e.target.value;
                                                        setSettings({ ...settings, bank_accounts: updated });
                                                    }}
                                                    placeholder="Nomor Rekening"
                                                    className="p-2 rounded-lg bg-white border border-[#E5DDD0] text-xs font-mono font-medium"
                                                />
                                                <input
                                                    type="text"
                                                    value={acc.name}
                                                    onChange={(e) => {
                                                        const updated = [...settings.bank_accounts];
                                                        updated[idx].name = e.target.value;
                                                        setSettings({ ...settings, bank_accounts: updated });
                                                    }}
                                                    placeholder="Atas Nama"
                                                    className="p-2 rounded-lg bg-white border border-[#E5DDD0] text-xs font-medium"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <button
                                        type="submit"
                                        disabled={isSavingSettings}
                                        className="px-8 py-3 rounded-full bg-[#8C6D46] hover:bg-[#745834] text-white font-semibold text-xs shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        <span>{isSavingSettings ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </main>
            </div>

            {/* Mobile Drawer Sidebar */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden animate-in fade-in"
                    onClick={() => setMobileSidebarOpen(false)}
                >
                    <div
                        className="w-72 bg-[#FAF8F5] h-full shadow-2xl p-6 flex flex-col justify-between"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-[#1A1817] text-[#FAF8F5] flex items-center justify-center font-bold text-sm">
                                        D
                                    </div>
                                    <span className="font-serif font-bold text-base text-[#1A1817]">DNVITE Studio</span>
                                </div>
                                <button type="button" onClick={() => setMobileSidebarOpen(false)}>
                                    <X className="w-5 h-5 text-[#6E6864]" />
                                </button>
                            </div>

                            <nav className="space-y-2 text-xs font-medium">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveTab('overview');
                                        setMobileSidebarOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl ${
                                        activeTab === 'overview' ? 'bg-[#1A1817] text-white' : 'text-[#6E6864]'
                                    }`}
                                >
                                    Ringkasan &amp; Metrik
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveTab('orders');
                                        setMobileSidebarOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl ${
                                        activeTab === 'orders' ? 'bg-[#1A1817] text-white' : 'text-[#6E6864]'
                                    }`}
                                >
                                    Kelola Pesanan ({orders.length})
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveTab('proofs');
                                        setMobileSidebarOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl ${
                                        activeTab === 'proofs' ? 'bg-[#1A1817] text-white' : 'text-[#6E6864]'
                                    }`}
                                >
                                    Bukti Transfer ({ordersWithProof.length})
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveTab('templates');
                                        setMobileSidebarOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl ${
                                        activeTab === 'templates' ? 'bg-[#1A1817] text-white' : 'text-[#6E6864]'
                                    }`}
                                >
                                    Katalog Template
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveTab('settings');
                                        setMobileSidebarOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl ${
                                        activeTab === 'settings' ? 'bg-[#1A1817] text-white' : 'text-[#6E6864]'
                                    }`}
                                >
                                    Pengaturan Bisnis
                                </button>
                            </nav>
                        </div>

                        <div className="pt-4 border-t border-[#E5DDD0] space-y-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setMobileSidebarOpen(false);
                                    onNavigate('home');
                                }}
                                className="w-full text-left px-3 py-2 text-xs text-[#6E6864] hover:text-[#1A1817]"
                            >
                                Kembali ke Website Utama
                            </button>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg"
                            >
                                Keluar Akun
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Order Detail Drawer */}
            {selectedOrder && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in"
                    onClick={() => setSelectedOrder(null)}
                >
                    <div
                        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-[#E5DDD0] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Drawer Header */}
                        <div className="p-6 border-b border-[#E5DDD0] flex items-center justify-between bg-[#FAF8F5]">
                            <div>
                                <span className="text-[11px] font-mono text-[#8C6D46] font-semibold block">
                                    {selectedOrder.order_ref}
                                </span>
                                <h2 className="font-serif text-2xl font-bold text-[#1A1817]">
                                    Detail Lengkap Pesanan
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 rounded-full hover:bg-neutral-200 transition-colors text-[#6E6864] cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Drawer Body */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#1A1817]">
                            {/* Status Change Box */}
                            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD0] space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-xs text-[#1A1817] uppercase tracking-wider">
                                        Perbarui Status Pesanan
                                    </h3>
                                    {statusSuccessMsg && (
                                        <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            <span>{statusSuccessMsg}</span>
                                        </span>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[11px] text-[#6E6864] block">Status Pembayaran</label>
                                        <select
                                            value={selectedOrder.payment_status}
                                            onChange={(e) =>
                                                handleUpdateStatus(selectedOrder.id, e.target.value, selectedOrder.production_status)
                                            }
                                            disabled={isUpdatingStatus}
                                            className="w-full p-2.5 rounded-xl border border-[#E5DDD0] bg-white font-medium focus:outline-none"
                                        >
                                            <option value="pending">Menunggu Pembayaran</option>
                                            <option value="verified">Lunas / Terverifikasi</option>
                                            <option value="cancelled">Dibatalkan</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[11px] text-[#6E6864] block">Status Produksi</label>
                                        <select
                                            value={selectedOrder.production_status}
                                            onChange={(e) =>
                                                handleUpdateStatus(selectedOrder.id, selectedOrder.payment_status, e.target.value)
                                            }
                                            disabled={isUpdatingStatus}
                                            className="w-full p-2.5 rounded-xl border border-[#E5DDD0] bg-white font-medium focus:outline-none"
                                        >
                                            <option value="queued">Dalam Antrean Desain</option>
                                            <option value="in_progress">Sedang Dikerjakan</option>
                                            <option value="ready">Siap Ditinjau Klien</option>
                                            <option value="completed">Selesai &amp; Aktif</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Client & Template Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl border border-[#E5DDD0] bg-white space-y-2">
                                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D46] block">
                                        Informasi Pemesan
                                    </span>
                                    <div className="font-semibold text-sm">{selectedOrder.customer_name}</div>
                                    <div className="text-[#6E6864] font-mono">{selectedOrder.customer_whatsapp}</div>
                                    <div className="text-[#6E6864]">{selectedOrder.customer_email || '-'}</div>
                                    <div className="pt-2">
                                        <a
                                            href={getCustomerWhatsAppUrl(selectedOrder)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
                                        >
                                            <MessageCircle className="w-3.5 h-3.5" />
                                            <span>Chat WhatsApp Pemesan</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl border border-[#E5DDD0] bg-white space-y-2">
                                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D46] block">
                                        Paket Template
                                    </span>
                                    <div className="font-semibold text-sm">{selectedOrder.template_name}</div>
                                    <div className="text-sm font-bold text-[#8C6D46]">
                                        Rp {Number(selectedOrder.package_price).toLocaleString('id-ID')}
                                    </div>
                                    <div className="text-[#6E6864]">
                                        Pesan: {new Date(selectedOrder.created_at).toLocaleDateString('id-ID', { dateStyle: 'full' })}
                                    </div>
                                </div>
                            </div>

                            {/* Couple Details */}
                            <div className="p-4 rounded-xl border border-[#E5DDD0] bg-white space-y-3">
                                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D46] block">
                                    Data Mempelai
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-[11px] text-[#6E6864] block">Mempelai Pria:</span>
                                        <p className="font-semibold">{selectedOrder.groom_full_name} ({selectedOrder.groom_nickname})</p>
                                        <p className="text-[11px] text-[#6E6864]">Orang Tua: {selectedOrder.groom_parents || '-'}</p>
                                    </div>
                                    <div>
                                        <span className="text-[11px] text-[#6E6864] block">Mempelai Wanita:</span>
                                        <p className="font-semibold">{selectedOrder.bride_full_name} ({selectedOrder.bride_nickname})</p>
                                        <p className="text-[11px] text-[#6E6864]">Orang Tua: {selectedOrder.bride_parents || '-'}</p>
                                    </div>
                                </div>
                                <div className="pt-2 border-t border-[#E5DDD0]">
                                    <span className="text-[11px] text-[#6E6864] block">Tanggal Acara:</span>
                                    <p className="font-semibold text-sm text-[#8C6D46]">{selectedOrder.wedding_date}</p>
                                </div>
                            </div>

                            {/* Event Details: Akad & Resepsi */}
                            <div className="p-4 rounded-xl border border-[#E5DDD0] bg-white space-y-3">
                                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D46] block">
                                    Jadwal Akad &amp; Resepsi
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E5DDD0]">
                                        <span className="font-semibold text-[#1A1817] block">Akad Nikah</span>
                                        <p className="text-[#6E6864] mt-1">Waktu: {selectedOrder.events?.akad?.time || '-'}</p>
                                        <p className="text-[#1A1817] font-medium">Tempat: {selectedOrder.events?.akad?.venue || '-'}</p>
                                        <p className="text-[#6E6864] text-[11px]">Alamat: {selectedOrder.events?.akad?.address || '-'}</p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E5DDD0]">
                                        <span className="font-semibold text-[#1A1817] block">Resepsi Pernikahan</span>
                                        <p className="text-[#6E6864] mt-1">Waktu: {selectedOrder.events?.resepsi?.time || '-'}</p>
                                        <p className="text-[#1A1817] font-medium">Tempat: {selectedOrder.events?.resepsi?.venue || '-'}</p>
                                        <p className="text-[#6E6864] text-[11px]">Alamat: {selectedOrder.events?.resepsi?.address || '-'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Files & Lightbox */}
                            <div className="p-4 rounded-xl border border-[#E5DDD0] bg-white space-y-3">
                                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D46] block">
                                    Lampiran Foto Klien &amp; Struk Transfer
                                </span>
                                {selectedOrder.files && selectedOrder.files.length > 0 ? (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                        {selectedOrder.files.map((file) => {
                                            const fileUrl = `/storage/${file.file_path}`;
                                            return (
                                                <div
                                                    key={file.id}
                                                    onClick={() => setEnlargedImage(fileUrl)}
                                                    className="group relative aspect-square rounded-xl overflow-hidden border border-[#E5DDD0] bg-[#FAF8F5] cursor-pointer hover:border-[#8C6D46]"
                                                >
                                                    <img
                                                        src={fileUrl}
                                                        alt={file.file_name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                    />
                                                    <div className="absolute inset-x-0 bottom-0 p-1 bg-black/60 text-white text-[9px] truncate text-center">
                                                        {file.file_type === 'payment_proof'
                                                            ? 'Bukti Bayar'
                                                            : file.file_type === 'main_photo'
                                                            ? 'Foto Utama'
                                                            : 'Galeri'}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-xs text-[#6E6864]">Tidak ada file foto yang dilampirkan.</p>
                                )}
                            </div>

                            {/* Customer Notes */}
                            {selectedOrder.customer_notes && (
                                <div className="p-4 rounded-xl border border-[#E5DDD0] bg-white space-y-1.5">
                                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D46] block">
                                        Catatan / Permintaan Lagu dari Pemesan
                                    </span>
                                    <p className="text-xs text-[#1A1817] italic">
                                        "{selectedOrder.customer_notes}"
                                    </p>
                                </div>
                            )}

                            {/* Internal Notes */}
                            <div className="p-4 rounded-xl border border-[#E5DDD0] bg-white space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D46] block">
                                        Catatan Internal Tim Studio
                                    </span>
                                    {notesSuccessMsg && (
                                        <span className="text-[11px] font-semibold text-emerald-700">
                                            {notesSuccessMsg}
                                        </span>
                                    )}
                                </div>
                                <textarea
                                    rows="3"
                                    value={internalNotes}
                                    onChange={(e) => setInternalNotes(e.target.value)}
                                    placeholder="Simpan link URL undangan hasil cetak/live, catatan vendor musik, dsb..."
                                    className="w-full p-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs focus:outline-none focus:border-[#8C6D46]"
                                />
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={handleSaveNotes}
                                        disabled={isSavingNotes}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1A1817] hover:bg-[#333] text-white font-medium text-xs cursor-pointer"
                                    >
                                        <Save className="w-3.5 h-3.5" />
                                        <span>{isSavingNotes ? 'Menyimpan...' : 'Simpan Catatan'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Photo Lightbox */}
            {enlargedImage && (
                <div
                    className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-4 animate-in fade-in"
                    onClick={() => setEnlargedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <img
                            src={enlargedImage}
                            alt="Pratinjau"
                            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
                        />
                        <button
                            type="button"
                            onClick={() => setEnlargedImage(null)}
                            className="absolute -top-3 -right-3 p-2 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Template Edit Price Modal */}
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
                                type="button"
                                onClick={() => setEditingTemplate(null)}
                                className="p-1 rounded-full text-[#6E6864] hover:bg-neutral-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveTemplatePrice} className="space-y-4">
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
                                    className="px-5 py-2.5 rounded-xl bg-[#8C6D46] hover:bg-[#745834] text-white text-xs font-semibold cursor-pointer shadow-sm"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
