'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import DashboardSidebar from '../../components/DashboardSidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

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
        <div style={{ display: 'flex', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            <DashboardSidebar />
            <main style={{ marginLeft: '260px', width: 'calc(100% - 260px)', padding: '32px' }}>
                {children}
            </main>
        </div>
    );
}
