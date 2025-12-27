'use client';

import { useState, useEffect } from 'react';
import { useSiteConfig, ClientLogo } from '../../context/SiteConfigContext';
import { auth } from '../../lib/firebase';
import { convertImageToBase64 } from '../../lib/imageUtils';
import { uploadFile } from '../../lib/fileUpload';
import styles from './page.module.css';
import Image from 'next/image';

export default function DashboardPage() {
    const { config, updateHomeContent, updateClientLogos, updateCatalogueUrl } = useSiteConfig();
    const [heroTitle, setHeroTitle] = useState('');
    const [heroSubtitle, setHeroSubtitle] = useState('');
    const [stats, setStats] = useState<{ value: string; label: string }[]>([]);

    // Client Logos Logic
    const [clientInputs, setClientInputs] = useState<ClientLogo[]>([]);
    const [clientUploadingIndex, setClientUploadingIndex] = useState<number | null>(null);
    const [uploadingCatalogue, setUploadingCatalogue] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);

    const [uploadError, setUploadError] = useState<string | null>(null);

    useEffect(() => {
        if (config.homeContent) {
            setHeroTitle(config.homeContent.heroTitle);
            setHeroSubtitle(config.homeContent.heroSubtitle);
            setStats(config.homeContent.stats);
        }
        if (config.clientLogos) {
            // Load exact logos from DB, do not pad or slice
            setClientInputs(config.clientLogos);
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

    const handleCatalogueUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!auth.currentUser) {
            setUploadError("You are not logged in!");
            return;
        }

        try {
            setUploadingCatalogue(true);
            setUploadError(null);

            // Upload to Firestore Storage
            // Using a constant path so it overwrites the old one (optional strategy, or use unique names)
            const downloadUrl = await uploadFile(file, `catalogue/catalogue_${Date.now()}.pdf`);

            // Update Context/DB
            await updateCatalogueUrl(downloadUrl);

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);

        } catch (error: any) {
            console.error("Catalogue upload failed:", error);
            setUploadError(`Catalogue upload failed: ${error.message}`);
        } finally {
            setUploadingCatalogue(false);
            e.target.value = ''; // Reset input
        }
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
                                            {item.isFavorite ? '⭐' : '☆'}
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

            {/* Catalogue Management Card */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Catalogue Management</h2>
                </div>
                <div style={{ padding: '0 0 16px 0' }}>
                    <p className={styles.subtitle} style={{ marginBottom: '16px' }}>
                        Upload a PDF catalogue to allow users to download it from the website.
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        {config.catalogueUrl ? (
                            <div style={{
                                padding: '12px 16px',
                                backgroundColor: '#ecfdf5',
                                border: '1px solid #10b981',
                                borderRadius: '8px',
                                color: '#065f46',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '0.9rem'
                            }}>
                                <span>📄 Current Catalogue Active</span>
                                <a
                                    href={config.catalogueUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'underline', color: '#059669', fontWeight: 600 }}
                                >
                                    View File
                                </a>
                            </div>
                        ) : (
                            <div style={{
                                padding: '12px 16px',
                                backgroundColor: '#fef2f2',
                                border: '1px solid #ef4444',
                                borderRadius: '8px',
                                color: '#991b1b',
                                fontSize: '0.9rem'
                            }}>
                                ⚠️ No catalogue uploaded yet.
                            </div>
                        )}

                        <label className={styles.saveButton} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#3b82f6' }}>
                            {uploadingCatalogue ? 'Uploading...' : 'Upload New PDF'}
                            <input
                                type="file"
                                accept="application/pdf"
                                style={{ display: 'none' }}
                                disabled={uploadingCatalogue}
                                onChange={handleCatalogueUpload}
                            />
                        </label>
                    </div>
                    {uploadingCatalogue && <p style={{ marginTop: '8px', fontSize: '0.875rem', color: '#6b7280' }}>Please wait, uploading large files may take a moment...</p>}
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
        </div >
    );
}
