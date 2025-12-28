'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Industries.module.css';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Industries() {
    const { config } = useSiteConfig();

    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // 1. Get all valid uploaded logos
    const allUploaded = config.clientLogos.filter(item => item.url && item.url.length > 0);

    // 2. Filter for favorites
    const favorites = allUploaded.filter(item => item.isFavorite);

    // 3. Smart Fallback: If user has favorites, show ONLY them. 
    //    If NO favorites are selected yet, show ALL uploaded logos (so the section isn't empty).
    const sourceLogos = favorites.length > 0 ? favorites : allUploaded;

    let validLogos = sourceLogos.map(item => item.url);

    // If still no logos (total empty), use placeholders
    // If we have logos but fewer than 7, repeat them to enough length for smooth scroll
    let displayLogos: string[] = [];

    if (validLogos.length === 0) {
        displayLogos = Array(7).fill('');
    } else {
        displayLogos = [...validLogos];
        while (displayLogos.length < 7) {
            displayLogos = [...displayLogos, ...validLogos];
        }
    }

    // Duplicate the final set for the seamless marquee loop
    const marqueeLogos = [...displayLogos, ...displayLogos];

    if (!mounted) {
        return (
            <section className={styles.industriesSection}>
                <div className={styles.container}>
                    <h2 className={styles.heading}>
                        <span className={styles.blackText}>INDUSTRIES</span>{' '}
                        <span className={styles.orangeText}>SERVED</span>
                    </h2>
                    <div className={styles.marqueeContainer}>
                        {/* Render empty track or loading state to match server if needed, 
                           or just empty to avoid mismatch. 
                           For now, rendering nothing inside marqueeContainer matches the initial "empty" expectation if we are careful.
                           Actually, to be safe, I'll render the header but keep the marquee empty until hydration.
                       */}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className={styles.industriesSection}>
            <div className={styles.container}>
                <h2 className={styles.heading}>
                    <span className={styles.blackText}>INDUSTRIES</span>{' '}
                    <span className={styles.orangeText}>SERVED</span>
                </h2>

                <div className={styles.marqueeContainer}>
                    <div className={styles.marqueeTrack}>
                        {marqueeLogos.map((logoUrl, index) => (
                            <div key={index} className={styles.logoItem}>
                                <div
                                    style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    {logoUrl ? (
                                        <Image
                                            src={logoUrl}
                                            alt={`Industry Partner ${index}`}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                            sizes="(max-width: 768px) 150px, 200px"
                                        />
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
