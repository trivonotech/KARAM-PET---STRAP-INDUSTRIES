'use client';

import { useState, useEffect } from 'react';
import { useSiteConfig } from '../../../context/SiteConfigContext';
import styles from '../page.module.css'; // Reusing dashboard styles for consistency

export default function SettingsPage() {
    const { config, updateIndustryLogos } = useSiteConfig();
    const [industryInputs, setIndustryInputs] = useState<string[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        setIndustryInputs(config.industryLogos);
    }, [config]);

    const handleIndustryChange = (index: number, value: string) => {
        const newInputs = [...industryInputs];
        newInputs[index] = value;
        setIndustryInputs(newInputs);
    };

    const handleSave = () => {
        updateIndustryLogos(industryInputs);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Site Settings</h1>
                <p className={styles.subtitle}>Manage your website's global configuration.</p>
            </div>

            <div className={styles.card} style={{ maxWidth: '800px' }}>

                <div style={{ marginBottom: '32px' }}>
                    <h2 className={styles.cardTitle} style={{ marginBottom: '16px' }}>Industries Served Logos</h2>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '16px' }}>
                        Enter URLs for the partner/industry logos displayed in the scrolling marquee.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {industryInputs.map((url, index) => (
                            <div key={index} style={{ marginBottom: '8px' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '4px' }}>
                                    Logo #{index + 1}
                                </label>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => handleIndustryChange(index, e.target.value)}
                                    placeholder="https://..."
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        border: '1px solid #d1d5db',
                                        fontSize: '0.9rem'
                                    }}
                                />
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid #f3f4f6', paddingTop: '24px' }}>
                    <button
                        onClick={handleSave}
                        style={{
                            padding: '10px 24px',
                            backgroundColor: '#e11d48',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            boxShadow: '0 2px 4px rgba(225, 29, 72, 0.2)'
                        }}
                    >
                        Save Changes
                    </button>

                    {showSuccess && (
                        <span style={{ color: '#059669', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            ✓ Settings saved successfully!
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
