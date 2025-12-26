'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
    const { user, signInWithGoogle } = useAuth();
    const router = useRouter();
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            router.push('/admin');
        }
    }, [user, router]);

    const handleLogin = async () => {
        setError('');
        try {
            await signInWithGoogle();
        } catch (err) {
            setError('Failed to sign in. Please try again.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '24px', position: 'relative', width: '120px', height: '60px', margin: '0 auto 24px' }}>
                    {/* Using a placeholder or the actual logo if available */}
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </div>

                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                    Welcome Admin
                </h1>
                <p style={{ color: '#6b7280', marginBottom: '32px' }}>
                    Sign in to access the Admin Panel
                </p>

                {error && (
                    <div style={{
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '24px',
                        fontSize: '0.875rem'
                    }}>
                        {error}
                    </div>
                )}

                <button
                    onClick={handleLogin}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        padding: '12px',
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: 500,
                        color: '#374151',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        style={{ width: '20px', height: '20px', marginRight: '12px' }}
                    />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
