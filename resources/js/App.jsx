import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedTemplates from './components/FeaturedTemplates';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CatalogPage from './pages/CatalogPage';
import DemoPage from './pages/DemoPage';
import OrderPage from './pages/OrderPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminTemplatesPage from './pages/admin/AdminTemplatesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import { MessageCircle } from 'lucide-react';

export default function App() {
    const parseHashRoute = () => {
        const hash = window.location.hash;
        if (hash === '#/admin/login' || hash === '#/admin-login' || hash === '#admin-login') {
            return { page: 'admin-login', templateId: null };
        }
        if (hash === '#/admin/templates' || hash === '#/admin-templates') {
            return { page: 'admin-templates', templateId: null };
        }
        if (hash === '#/admin/settings' || hash === '#/admin-settings') {
            return { page: 'admin-settings', templateId: null };
        }
        if (hash === '#/admin' || hash.startsWith('#/admin/') || hash === '#admin') {
            return { page: 'admin', templateId: null };
        }
        if (hash.startsWith('#/demo/')) {
            const templateId = hash.replace('#/demo/', '');
            return { page: 'demo', templateId: templateId || 'amora-serenade' };
        }
        if (hash.startsWith('#/order/')) {
            const templateId = hash.replace('#/order/', '');
            return { page: 'order', templateId: templateId || 'amora-serenade' };
        }
        if (hash === '#/order-confirmation' || hash === '#order-confirmation') {
            return { page: 'confirmation', templateId: null };
        }
        if (hash === '#/catalog' || hash === '#catalog') {
            return { page: 'catalog', templateId: null };
        }
        return { page: 'home', templateId: null };
    };

    const [route, setRoute] = useState(parseHashRoute);

    // Persist order in local state & localStorage
    const [currentOrder, setCurrentOrder] = useState(() => {
        try {
            const saved = localStorage.getItem('dnvite_current_order');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        const handleHashChange = () => {
            const parsed = parseHashRoute();
            setRoute(parsed);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleNavigate = (page, id = null) => {
        if (page === 'demo' && id) {
            window.location.hash = `#/demo/${id}`;
        } else if (page === 'order' && id) {
            window.location.hash = `#/order/${id}`;
        } else if (page === 'confirmation') {
            window.location.hash = '#/order-confirmation';
        } else if (page === 'catalog') {
            window.location.hash = '#/catalog';
        } else if (page === 'admin-login') {
            window.location.hash = '#/admin/login';
        } else if (page === 'admin') {
            window.location.hash = '#/admin';
        } else if (page === 'admin-templates') {
            window.location.hash = '#/admin/templates';
        } else if (page === 'admin-settings') {
            window.location.hash = '#/admin/settings';
        } else {
            window.location.hash = '#/';
        }
    };

    const handleOrderSubmit = (orderData) => {
        setCurrentOrder(orderData);
        try {
            localStorage.setItem('dnvite_current_order', JSON.stringify(orderData));
        } catch (e) {
            console.error('Failed to save order to localStorage', e);
        }
    };

    const renderPageContent = () => {
        // Render Admin Pages
        if (route.page === 'admin-login') {
            return <AdminLoginPage onNavigate={handleNavigate} />;
        }

        if (route.page === 'admin') {
            return <AdminDashboardPage onNavigate={handleNavigate} />;
        }

        if (route.page === 'admin-templates') {
            return <AdminTemplatesPage onNavigate={handleNavigate} />;
        }

        if (route.page === 'admin-settings') {
            return <AdminSettingsPage onNavigate={handleNavigate} />;
        }

        // Render Order Confirmation Page
        if (route.page === 'confirmation') {
            return (
                <OrderConfirmationPage
                    orderData={currentOrder}
                    onNavigate={handleNavigate}
                />
            );
        }

        // Render Order Page
        if (route.page === 'order') {
            return (
                <OrderPage
                    templateId={route.templateId || 'amora-serenade'}
                    onNavigate={handleNavigate}
                    onOrderSubmit={handleOrderSubmit}
                />
            );
        }

        // Render Demo Page (Full Interactive Simulation)
        if (route.page === 'demo') {
            return (
                <DemoPage
                    templateId={route.templateId || 'amora-serenade'}
                    onNavigate={handleNavigate}
                />
            );
        }

        // Render Dedicated Catalog Page
        if (route.page === 'catalog') {
            return <CatalogPage onNavigate={handleNavigate} />;
        }

        // Default: Render Landing Page
        return (
            <div className="min-h-screen bg-[#FAF8F5] text-[#1A1817] flex flex-col font-sans selection:bg-[#8C6D46] selection:text-white">
                {/* Header & Navigation */}
                <Navbar onNavigate={handleNavigate} />

                {/* Main Landing Sections */}
                <main className="flex-1">
                    <Hero onNavigate={handleNavigate} />
                    <FeaturedTemplates onNavigate={handleNavigate} />
                    <Benefits />
                    <HowItWorks />
                    <FAQ />
                </main>

                {/* Footer */}
                <Footer onNavigate={handleNavigate} />

                {/* Floating WhatsApp Quick Action Button */}
                <aside aria-label="Bantuan Langsung">
                    <a
                        href="https://wa.me/6285723138515?text=Halo%20Admin%20DNVITE,%20saya%20ingin%20bertanya%20mengenai%20undangan%20pernikahan%20digital."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#8C6D46] hover:bg-[#745834] text-white shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center group"
                        aria-label="Hubungi Admin WhatsApp"
                    >
                        <MessageCircle className="w-6 h-6 fill-white" />
                        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 text-xs font-semibold transition-all duration-300">
                            Chat Admin WA
                        </span>
                    </a>
                </aside>
            </div>
        );
    };

    return (
        <MotionConfig reducedMotion="never">
            {renderPageContent()}
        </MotionConfig>
    );
}
