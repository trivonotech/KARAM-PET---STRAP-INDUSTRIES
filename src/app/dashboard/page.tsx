'use client';

import { useState, useEffect } from 'react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { storage } from '../../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { convertImageToWebP } from '../../lib/imageUtils';
import styles from './page.module.css';
import Image from 'next/image';

export default function DashboardPage() {
    const { config, updateHomeContent, updateIndustryLogos } = useSiteConfig();
    const [heroTitle, setHeroTitle] = useState('');
    const [heroSubtitle, setHeroSubtitle] = useState('');
    const [stats, setStats] = useState<{ value: string; label: string }[]>([]);
    const [industryInputs, setIndustryInputs] = useState<string[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

    useEffect(() => {
        if (config.homeContent) {
            setHeroTitle(config.homeContent.heroTitle);
            setHeroSubtitle(config.homeContent.heroSubtitle);
            setStats(config.homeContent.stats);
        }
        if (config.industryLogos) {
            setIndustryInputs(config.industryLogos);
        }
    }, [config]);

    const handleStatChange = (index: number, field: 'value' | 'label', text: string) => {
        const newStats = [...stats];
        newStats[index] = { ...newStats[index], [field]: text };
        setStats(newStats);
    };

    const handleImageUpload = async (index: number, file: File) => {
        if (!file) return;

        try {
            setUploadingIndex(index);
            // 1. Convert to WebP
            const webpBlob = await convertImageToWebP(file);

            // 2. Upload to Firebase Storage
            const filename = `industries/logo-${Date.now()}-${index}.webp`;
            const storageRef = ref(storage, filename);

            await uploadBytes(storageRef, webpBlob);
            const downloadURL = await getDownloadURL(storageRef);

            // 3. Update state
            const newInputs = [...industryInputs];
            newInputs[index] = downloadURL;
            setIndustryInputs(newInputs);
        } catch (error) {
            console.error("Upload failed", error);
            alert("Failed to upload image. Please check your Storage rules.");
        } finally {
            setUploadingIndex(null);
        }
    };

    const removeLogo = (index: number) => {
        const newInputs = industryInputs.filter((_, i) => i !== index);
        setIndustryInputs(newInputs);
    };

    const handleSave = () => {
        updateHomeContent({
            heroTitle,
            heroSubtitle,
            stats
        });
        updateIndustryLogos(industryInputs);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Home Page Manager</h1>
                <p className={styles.subtitle}>Edit the content of your website's landing page.</p>
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

                {/* Industries Section Card */}
                <div className={styles.card} style={{ marginTop: '24px' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <h2 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Industries Served & Partner Logos</h2>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '16px' }}>
                            Upload logos (JPG/PNG). They will be automatically converted to WebP.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {industryInputs.map((url, index) => (
                                <div key={index} style={{ marginBottom: '8px', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: 'white' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>
                                            Logo #{index + 1}
                                        </label>
                                        <button
                                            onClick={() => removeLogo(index)}
                                            style={{ color: '#ef4444', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {url ? (
                                        <div style={{ marginBottom: '12px', position: 'relative', height: '60px', width: '100%', backgroundColor: '#f3f4f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                src={url}
                                                alt={`Logo ${index + 1}`}
                                                width={100}
                                                height={50}
                                                style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                                                unoptimized
                                            />
                                        </div>
                                    ) : (
                                        <div style={{ height: '60px', backgroundColor: '#f9fafb', border: '1px dashed #d1d5db', borderRadius: '4px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#9ca3af' }}>
                                            No Image
                                        </div>
                                    )}

                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleImageUpload(index, file);
                                            }}
                                            disabled={uploadingIndex === index}
                                            style={{
                                                width: '100%',
                                                fontSize: '0.8rem',
                                                color: '#6b7280',
                                                fileSelectorButton: {
                                                    marginRight: '8px',
                                                    border: 'none',
                                                    background: '#e5e7eb',
                                                    padding: '6px 12px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }
                                            } as React.CSSProperties}
                                        />
                                        {uploadingIndex === index && (
                                            <div style={{ position: 'absolute', top: 0, right: 0, fontSize: '0.75rem', color: '#2563eb', fontWeight: 500 }}>
                                                Uploading...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setIndustryInputs([...industryInputs, ''])}
                            style={{
                                marginTop: '12px',
                                padding: '8px 16px',
                                background: '#f3f4f6',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                color: '#374151'
                            }}
                        >
                            + Add Another Logo
                        </button>
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
