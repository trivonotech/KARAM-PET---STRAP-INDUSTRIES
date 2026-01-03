'use client';

import { useState, useEffect } from 'react';
import { useSiteConfig, ClientLogo } from '../../context/SiteConfigContext';
import { auth } from '../../lib/firebase';
import { convertImageToBase64 } from '../../lib/imageUtils';
import { convertFileToBase64 } from '../../lib/base64Utils';
import styles from './page.module.css';
import Image from 'next/image';

export default function DashboardPage() {
    const { config, updateHomeContent, updateClientLogos } = useSiteConfig();

    const [stats, setStats] = useState<{ value: string; label: string }[]>([]);

    // Client Logos Logic
    const [clientInputs, setClientInputs] = useState<ClientLogo[]>([]);

    const [clientUploadingIndex, setClientUploadingIndex] = useState<number | null>(null);

    const [showSuccess, setShowSuccess] = useState(false);

    const [uploadError, setUploadError] = useState<string | null>(null);

    const [isSaving, setIsSaving] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (config.homeContent) {
            setStats(config.homeContent.stats);
        }
        if (config.clientLogos) {
            setClientInputs(config.clientLogos);
        }
        setInitialLoad(false);
    }, [config]);

    // Auto-save Stats
    useEffect(() => {
        if (initialLoad) return;

        const timeoutId = setTimeout(async () => {
            setIsSaving(true);
            try {
                await updateHomeContent({ stats });
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 2000);
            } catch (error) {
                console.error("Auto-save failed", error);
                setUploadError("Auto-save failed");
            } finally {
                setIsSaving(false);
            }
        }, 1000); // 1 second debounce

        return () => clearTimeout(timeoutId);
    }, [stats, initialLoad]);

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
            // Keep existing favorite status if any, simply update URL
            newInputs[index] = { ...newInputs[index], url: base64String };
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
        try {
            const newInputs = [...clientInputs];
            // REMOVE the slot entirely
            newInputs.splice(index, 1);
            setClientInputs(newInputs);
            await updateClientLogos(newInputs); // Auto-Save
        } catch (error) {
            console.error("Failed to remove logo", error);
            setUploadError("Failed to save changes.");
        }
    };

    const toggleFavorite = async (index: number) => {
        try {
            const newInputs = [...clientInputs];
            const currentItem = newInputs[index];
            newInputs[index] = { ...currentItem, isFavorite: !currentItem.isFavorite };
            setClientInputs(newInputs);
            await updateClientLogos(newInputs);
        } catch (error) {
            console.error("Failed to toggle favorite", error);
        }
    };

    const addStat = () => {
        setStats([...stats, { value: '', label: '' }]);
    };

    const removeStat = (index: number) => {
        const newStats = stats.filter((_, i) => i !== index);
        setStats(newStats);
    };





    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Panel</h1>
                <p className={styles.subtitle}>Manage website content and settings.</p>
            </div>

            {/* Hero Section Card */}


            {/* Stats Section Card */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Key Statistics</h2>
                </div>

                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem} style={{ position: 'relative' }}>
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

                            {/* Remove Stat Button */}
                            <button
                                onClick={() => removeStat(index)}
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-10px',
                                    background: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}
                                title="Remove Statistic"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {/* Add Stat Button - Appended as the last item in the grid usually, or below */}
                    <button
                        onClick={addStat}
                        style={{
                            minHeight: '150px', // Match roughly with stat item height
                            border: '2px dashed #e5e7eb',
                            borderRadius: '12px',
                            background: '#f9fafb',
                            color: '#6b7280',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease'
                        }}
                        className={styles.statItem} // Re-use basic grid sizing if applicable, strict typing might complain if className is not perfectly matching
                    >
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>+</span>
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>Add Statistic</span>
                    </button>
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
                    Manage logos displayed in the 'Industries Served' marquee (Home) and 'Our Clients' grid (About).
                </p>

                <div className={styles.logoGrid}>
                    {clientInputs.map((item, index) => (
                        <div key={index} className={styles.logoSlot}>
                            <div className={`${styles.imageContainer} ${item.url ? styles.filled : ''}`}>
                                {item.url ? (
                                    <>
                                        <Image
                                            src={item.url}
                                            alt={`Slot ${index + 1}`}
                                            fill
                                            style={{ objectFit: 'contain', padding: '12px' }}
                                            unoptimized
                                            suppressHydrationWarning
                                        />
                                        {/* Favorite Toggle */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(index);
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '6px',
                                                left: '6px',
                                                zIndex: 10,
                                                background: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                fontSize: '1.2rem',
                                                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))'
                                            }}
                                            title={item.isFavorite ? "Remove from Industries Served" : "Add to Industries Served"}
                                        >
                                            {item.isFavorite ? '❤️' : '♡'}
                                        </button>

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

                                {/* Always show remove button to allow deleting empty slots */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeClientLogo(index);
                                    }}
                                    className={styles.removeButton}
                                    title="Remove Slot"
                                    style={{ display: 'block' }} // Ensure visibility
                                >
                                    ✕
                                </button>

                                {clientUploadingIndex === index && (
                                    <div className={styles.uploadOverlay}>
                                        Uploading...
                                    </div>
                                )}
                            </div>

                            <label className={styles.uploadLabel}>
                                {item.url ? 'Change Logo' : '+ Upload Logo'}
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

                    {/* Add New Slot Button */}
                    {/* Add New Logo Direct */}
                    <label
                        style={{
                            minHeight: '150px',
                            border: '2px dashed #ccc',
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.5)',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#666',
                            fontSize: '1rem',
                            gap: '8px',
                            position: 'relative' // for loading overlay
                        }}
                        title="Directly upload a new logo"
                    >
                        <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>+</span>
                        <span>Add Logo</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple // Allow multiple files
                            hidden
                            onChange={async (e) => {
                                const files = e.target.files;
                                if (!files || files.length === 0) return;

                                if (!auth.currentUser) {
                                    alert("You are not logged in!");
                                    return;
                                }

                                try {
                                    setClientUploadingIndex(-1);

                                    // Process all files
                                    const newLogos: ClientLogo[] = [];

                                    // Promise.all to convert all images in parallel
                                    const conversionPromises = Array.from(files).map(async (file) => {
                                        const base64String = await convertImageToBase64(file);
                                        return { url: base64String, isFavorite: false };
                                    });

                                    const convertedLogos = await Promise.all(conversionPromises);

                                    const newInputs = [...clientInputs, ...convertedLogos];
                                    setClientInputs(newInputs);

                                    await updateClientLogos(newInputs);

                                } catch (error: any) {
                                    alert(`Failed to add logos: ${error.message}`);
                                } finally {
                                    setClientUploadingIndex(null);
                                    e.target.value = '';
                                }
                            }}
                        />
                        {clientUploadingIndex === -1 && (
                            <div className={styles.uploadOverlay}>Uploading...</div>
                        )}
                    </label>
                </div>
            </div>



            {/* Floating Save Status */}
            <div className={styles.saveBar} style={{ pointerEvents: 'none', justifyContent: 'center' }}>
                {isSaving ? (
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>Saving...</span>
                ) : showSuccess ? (
                    <span className={styles.successMessage}>
                        ✓ Saved
                    </span>
                ) : null}
            </div>
        </div >
    );
}
