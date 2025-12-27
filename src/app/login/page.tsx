'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
    const { user, login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        if (user) {
            router.push('/admin');
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoggingIn(true);
        try {
            await login(email, password);
        } catch (err: any) {
            console.error("Login Error:", err);
            // Display friendly error
            if (err.message.includes("Invalid admin email")) {
                setError("This email is not authorized for admin access.");
            } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
                setError("Invalid email or password.");
            } else if (err.code === 'auth/too-many-requests') {
                setError("Too many attempts. Please try again later.");
            } else {
                setError("Failed to sign in. Please check your credentials.");
            }
        } finally {
            setIsLoggingIn(false);
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
            <form
                onSubmit={handleSubmit}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    textAlign: 'center'
                }}
            >
                <div style={{ marginBottom: '24px', position: 'relative', width: '120px', height: '60px', margin: '0 auto 24px' }}>
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </div>

                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                    Admin Login
                </h1>
                <p style={{ color: '#6b7280', marginBottom: '32px' }}>
                    Enter your credentials to access the panel
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

                <div style={{ marginBottom: '16px', textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '1rem'
                        }}
                        placeholder="admin@example.com"
                    />
                </div>

                <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '1rem'
                        }}
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoggingIn}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#e11d48',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                        opacity: isLoggingIn ? 0.7 : 1,
                        transition: 'background-color 0.2s'
                    }}
                >
                    {isLoggingIn ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}
