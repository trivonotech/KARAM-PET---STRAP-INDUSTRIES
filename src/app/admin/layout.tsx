'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import styles from './admin-layout.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
                <p>Loading...</p>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    return (
        <div className={styles.layoutContainer}>
            <header className={styles.mobileHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                        className={styles.menuBtn}
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        ☰
                    </button>
                    <span className={styles.mobileTitle}>KARAM ADMIN</span>
                </div>
                <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)', borderRadius: 8 }}></div>
            </header>

            <AdminSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
