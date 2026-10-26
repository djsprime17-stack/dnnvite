import React, { useState } from 'react';
import { ArrowLeft, Lock, Mail, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage({ onNavigate, onLoginSuccess }) {
    const [email, setEmail] = useState('admin@dnvite.com');
    const [password, setPassword] = useState('password123');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Email atau kata sandi tidak valid.');
            }

            // Save token and admin info
            localStorage.setItem('dnvite_token', result.data.token);
            localStorage.setItem('dnvite_admin_user', JSON.stringify(result.data.user));

            if (onLoginSuccess) {
                onLoginSuccess(result.data);
            }

            onNavigate('admin');
        } catch (err) {
            console.error('Login error:', err);
            setErrorMsg(err.message || 'Terjadi kesalahan saat masuk ke sistem.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAutoLogin = async () => {
        setEmail('admin@dnvite.com');
        setPassword('password123');
        setErrorMsg('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email: 'admin@dnvite.com', password: 'password123' }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Email atau kata sandi tidak valid.');
            }

            localStorage.setItem('dnvite_token', result.data.token);
            localStorage.setItem('dnvite_admin_user', JSON.stringify(result.data.user));

            if (onLoginSuccess) {
                onLoginSuccess(result.data);
            }

            onNavigate('admin');
        } catch (err) {
            console.error('Login error:', err);
            setErrorMsg(err.message || 'Terjadi kesalahan saat masuk ke sistem.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] text-[#1A1817] flex flex-col justify-between font-sans selection:bg-[#8C6D46] selection:text-white">
            {/* Top Navigation */}
            <header className="py-6 px-6 sm:px-12 flex items-center justify-between">
                <button
                    onClick={() => onNavigate('home')}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#6E6864] hover:text-[#1A1817] transition-colors cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Website Utama</span>
                </button>

                <div className="flex items-center gap-2 font-serif text-lg tracking-wider font-bold text-[#1A1817]">
                    <span className="w-7 h-7 rounded-lg bg-[#1A1817] text-[#FAF8F5] flex items-center justify-center font-bold text-xs tracking-normal">
                        D
                    </span>
                    <span>DNVITE</span>
                </div>
            </header>

            {/* Login Card */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#E5DDD0] shadow-sm space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-[#8C6D46]/10 text-[#8C6D46] flex items-center justify-center mx-auto mb-3">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1817]">
                            Portal Admin DNVITE
                        </h1>
                        <p className="text-xs text-[#6E6864]">
                            Kelola pesanan klien, konfirmasi pembayaran, dan katalog template pernikahan digital.
                        </p>
                    </div>

                    {/* Error Alert */}
                    {errorMsg && (
                        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#1A1817]">
                                Alamat Email
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6864]" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@dnvite.com"
                                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm text-[#1A1817] focus:outline-none focus:border-[#8C6D46] transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#1A1817]">
                                Kata Sandi
                            </label>
                            <div className="relative">
                                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6864]" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-[#E5DDD0] bg-[#FAF8F5] text-xs sm:text-sm text-[#1A1817] focus:outline-none focus:border-[#8C6D46] transition-colors"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-xl bg-[#8C6D46] hover:bg-[#745834] disabled:opacity-60 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    <span>Memverifikasi Akun...</span>
                                </>
                            ) : (
                                <span>Masuk ke Dashboard</span>
                            )}
                        </button>
                    </form>

                    {/* Quick Demo Credentials Autofill */}
                    <div className="pt-4 border-t border-[#E5DDD0] text-center space-y-2.5">
                        <p className="text-[11px] text-[#6E6864]">Akun Administrator Standar:</p>
                        <button
                            type="button"
                            onClick={handleAutoLogin}
                            disabled={isLoading}
                            className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2ECE4] border border-[#E5DDD0] text-xs font-semibold text-[#8C6D46] transition-colors cursor-pointer"
                        >
                            <ShieldCheck className="w-4 h-4 text-[#8C6D46]" />
                            <span>Masuk Cepat 1-Klik (admin@dnvite.com)</span>
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-[#6E6864] border-t border-[#E5DDD0]">
                &copy; {new Date().getFullYear()} DNVITE Studio. Akses terbatas untuk tim operasional resmi.
            </footer>
        </div>
    );
}
