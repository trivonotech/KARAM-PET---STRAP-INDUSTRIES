'use client';

import { useState, useEffect } from 'react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { auth } from '../../lib/firebase';
import { convertImageToBase64 } from '../../lib/imageUtils';
import styles from './page.module.css';
import Image from 'next/image';

export default function DashboardPage() {
    const { config, updateHomeContent, updateClientLogos } = useSiteConfig();
    const [heroTitle, setHeroTitle] = useState('');
    const [heroSubtitle, setHeroSubtitle] = useState('');
    const [stats, setStats] = useState<{ value: string; label: string }[]>([]);

    // Client Logos Logic
    const [clientInputs, setClientInputs] = useState<string[]>(Array(18).fill(''));
    const [clientUploadingIndex, setClientUploadingIndex] = useState<number | null>(null);

    const [showSuccess, setShowSuccess] = useState(false);

    const [uploadError, setUploadError] = useState<string | null>(null);

    useEffect(() => {
        if (config.homeContent) {
            setHeroTitle(config.homeContent.heroTitle);
            setHeroSubtitle(config.homeContent.heroSubtitle);
            setStats(config.homeContent.stats);
        }
        if (config.clientLogos) {
            // Ensure we have 18 slots, pad if necessary
            const loaded = config.clientLogos;
            if (loaded.length < 18) {
                setClientInputs([...loaded, ...Array(18 - loaded.length).fill('')]);
            } else {
                setClientInputs(loaded.slice(0, 18));
            }
        }
    }, [config]);

    const handleStatChange = (index: number, field: 'value' | 'label', text: string) => {
        const newStats = [...stats];
        newStats[index] = { ...newStats[index], [field]: text };
        setStats(newStats);
    };

    const handleClientImageUpload = async (index: number, file: File) => {
        if (!file) return;

        // Reset error
        setUploadError(null);

        // 1. Auth Check
        if (!auth.currentUser) {
            setUploadError("You are not logged in! Please refresh the page.");
            return;
        }

        try {
            setClientUploadingIndex(index);
            console.log(`Starting processing for slot ${index}...`);

            // 2. Convert to Base64 (Firestore-only mode)
            const base64String = await convertImageToBase64(file);
            console.log("Converted to Base64. Length:", base64String.length);

            // 3. Update State AND Firestore (Auto-Save)
            const newInputs = [...clientInputs];
            newInputs[index] = base64String;
            setClientInputs(newInputs);

            console.log("Saving to Firestore...");
            await updateClientLogos(newInputs);
            console.log("Saved.");

        } catch (error: any) {
            console.error("Client Logo Save failed detailed:", error);
            // Show error ON SCREEN
            setUploadError(`Save failed: ${error.message || error}`);
            // Also alert just in case
            alert(`Error: ${error.message}`);
        } finally {
            setClientUploadingIndex(null);
        }
    };

    const removeClientLogo = async (index: number) => {
        // Removed confirm dialog for faster interaction
        try {
            const newInputs = [...clientInputs];
            newInputs[index] = ''; // Clear slot but keep index
            setClientInputs(newInputs);
            await updateClientLogos(newInputs); // Auto-Save
        } catch (error) {
            console.error("Failed to remove logo", error);
            setUploadError("Failed to save changes.");
        }
    };

    const handleSave = () => {
        updateHomeContent({
            heroTitle,
            heroSubtitle,
            stats
        });
        updateClientLogos(clientInputs); // Save Clients
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Home & About Page Manager</h1>
                <p className={styles.subtitle}>Edit site content and upload logos.</p>
            </div>

            <div className={styles.contentGrid} style={{ display: 'flex', flexDirection: 'column', maxWidth: '800px' }}>

                {/* Hero Section Card */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Hero Section</h2>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                            Hero Title
                        </label>
                        <textarea
                            value={heroTitle}
                            onChange={(e) => setHeroTitle(e.target.value)}
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #d1d5db',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                            placeholder="Enter main headline..."
                        />
                        <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
                            Use line 1, line 2 etc. for breaks if needed based on design.
                        </p>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                            Hero Subtitle
                        </label>
                        <textarea
                            value={heroSubtitle}
                            onChange={(e) => setHeroSubtitle(e.target.value)}
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #d1d5db',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                            placeholder="Enter subtitle description..."
                        />
                    </div>
                </div>

                {/* Stats Section Card */}
                <div className={styles.card} style={{ marginTop: '24px' }}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Key Statistics</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        {stats.map((stat, index) => (
                            <div key={index} style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #f3f4f6' }}>
                                <div style={{ marginBottom: '12px' }}>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                                        Value
                                    </label>
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: '1px solid #d1d5db',
                                            fontWeight: 700,
                                            color: '#111827'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                                        Label
                                    </label>
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: '1px solid #d1d5db',
                                            color: '#4b5563'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Clients Section Card */}
                <div className={styles.card} style={{ marginTop: '24px' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <h2 className={styles.cardTitle} style={{ marginBottom: '16px' }}>About Page: Our Clients</h2>
                        {uploadError && (
                            <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem', border: '1px solid #fecaca' }}>
                                <strong>Error:</strong> {uploadError}
                            </div>
                        )}
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '16px' }}>
                            Manage the 18 client logo slots (displayed precisely as below).
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                            {/* Helper to render a group of inputs */}
                            {[
                                [0, 1, 2, 3],       // Row 1: 4
                                [4, 5, 6],          // Row 2: 3
                                [7, 8, 9, 10],      // Row 3: 4
                                [11, 12, 13],       // Row 4: 3
                                [14, 15, 16, 17]    // Row 5: 4
                            ].map((rowIndices, rowIndex) => (
                                <div key={rowIndex} style={{ display: 'flex', gap: '12px', justifyContent: 'center', width: '100%' }}>
                                    {rowIndices.map((index) => {
                                        const url = clientInputs[index];
                                        return (
                                            <div key={index} style={{
                                                width: '120px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '4px'
                                            }}>
                                                <div style={{
                                                    height: '60px',
                                                    width: '100%',
                                                    backgroundColor: url ? '#f3f4f6' : '#f9fafb',
                                                    border: url ? '1px solid #d1d5db' : '1px dashed #d1d5db',
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}>
                                                    {url ? (
                                                        <>
                                                            <Image
                                                                src={url}
                                                                alt={`Slot ${index + 1}`}
                                                                fill
                                                                style={{ objectFit: 'contain', padding: '8px' }}
                                                                unoptimized
                                                            />
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeClientLogo(index);
                                                                }}
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '4px',
                                                                    right: '4px',
                                                                    background: 'rgba(255,255,255,0.9)',
                                                                    borderRadius: '50%',
                                                                    width: '24px',
                                                                    height: '24px',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    border: '1px solid #fee2e2',
                                                                    cursor: 'pointer',
                                                                    color: '#ef4444',
                                                                    fontSize: '14px',
                                                                    fontWeight: 'bold',
                                                                    zIndex: 10,
                                                                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                                                }}
                                                                title="Remove Logo"
                                                            >
                                                                ✕
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span style={{ fontSize: '0.65rem', color: '#9ca3af' }}>Slot {index + 1}</span>
                                                    )}

                                                    {clientUploadingIndex === index && (
                                                        <div style={{
                                                            position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontSize: '0.65rem', fontWeight: 'bold', color: '#2563eb'
                                                        }}>
                                                            ...
                                                        </div>
                                                    )}
                                                </div>

                                                <label style={{
                                                    display: 'block',
                                                    textAlign: 'center',
                                                    fontSize: '0.7rem',
                                                    color: '#2563eb',
                                                    cursor: 'pointer',
                                                    padding: '2px',
                                                }}>
                                                    {url ? 'Change' : '+ Upload'}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) handleClientImageUpload(index, file);
                                                        }}
                                                        disabled={clientUploadingIndex === index}
                                                    />
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Save Actions */}
                <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                        onClick={handleSave}
                        style={{
                            padding: '12px 32px',
                            backgroundColor: '#e11d48',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '1rem',
                            boxShadow: '0 4px 6px -1px rgba(225, 29, 72, 0.2)'
                        }}
                    >
                        Save Changes
                    </button>

                    {showSuccess && (
                        <span style={{ color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#ecfdf5', padding: '8px 16px', borderRadius: 'full' }}>
                            ✓ Published Successfully
                        </span>
                    )}
                </div>

            </div>
        </div>
    );
}
