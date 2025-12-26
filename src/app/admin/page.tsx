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
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Panel</h1>
                <p className={styles.subtitle}>Manage website content and settings.</p>
            </div>

            {/* Hero Section Card */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Hero Section</h2>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label className={styles.label}>
                        Hero Title
                    </label>
                    <textarea
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        rows={3}
                        className={styles.textarea}
                        placeholder="Enter main headline..."
                    />
                    <p className={styles.helperText}>
                        Use line 1, line 2 etc. for breaks if needed based on design.
                    </p>
                </div>

                <div>
                    <label className={styles.label}>
                        Hero Subtitle
                    </label>
                    <textarea
                        value={heroSubtitle}
                        onChange={(e) => setHeroSubtitle(e.target.value)}
                        rows={3}
                        className={styles.textarea}
                        placeholder="Enter subtitle description..."
                    />
                </div>
            </div>

            {/* Stats Section Card */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Key Statistics</h2>
                </div>

                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <div style={{ marginBottom: '12px' }}>
                                <label className={styles.label} style={{ fontSize: '0.75rem' }}>
                                    Value
                                </label>
                                <input
                                    type="text"
                                    value={stat.value}
                                    onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                                    className={styles.input}
                                    style={{ fontWeight: 700 }}
                                />
                            </div>
                            <div>
                                <label className={styles.label} style={{ fontSize: '0.75rem' }}>
                                    Label
                                </label>
                                <input
                                    type="text"
                                    value={stat.label}
                                    onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Clients Section Card */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Industries Served & Clients</h2>
                </div>

                {uploadError && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem', border: '1px solid #fecaca' }}>
                        <strong>Error:</strong> {uploadError}
                    </div>
                )}
                <p className={styles.subtitle} style={{ marginBottom: '16px' }}>
                    Manage the 18 logos displayed in the 'Industries Served' marquee (Home) and 'Our Clients' grid (About).
                </p>

                <div className={styles.logoGrid}>
                    {clientInputs.map((url, index) => (
                        <div key={index} className={styles.logoSlot}>
                            <div className={`${styles.imageContainer} ${url ? styles.filled : ''}`}>
                                {url ? (
                                    <>
                                        <Image
                                            src={url}
                                            alt={`Slot ${index + 1}`}
                                            fill
                                            style={{ objectFit: 'contain', padding: '12px' }}
                                            unoptimized
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeClientLogo(index);
                                            }}
                                            className={styles.removeButton}
                                            title="Remove Logo"
                                        >
                                            ✕
                                        </button>
                                    </>
                                ) : (
                                    <span className={styles.placeholderText}>Slot {index + 1}</span>
                                )}

                                {clientUploadingIndex === index && (
                                    <div className={styles.uploadOverlay}>
                                        Uploading...
                                    </div>
                                )}
                            </div>

                            <label className={styles.uploadLabel}>
                                {url ? 'Change Logo' : '+ Upload Logo'}
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
                    ))}
                </div>
            </div>

            {/* Floating Save Bar */}
            <div className={styles.saveBar}>
                {showSuccess && (
                    <span className={styles.successMessage}>
                        ✓ Saved Successfully
                    </span>
                )}
                <button
                    onClick={handleSave}
                    className={styles.saveButton}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
