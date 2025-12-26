'use client';

import Image from 'next/image';
import styles from './Industries.module.css';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Industries() {
    const { config } = useSiteConfig();

    // Filter out empty strings
    let validLogos = config.industryLogos.filter(url => url && url.length > 0);

    // If no logos, use placeholders
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
                            <div key={index} className={styles.logoItem} style={{
                                background: logoUrl ? 'white' : 'linear-gradient(180deg, #e6e6e6 0%, #cccccc 100%)',
                                position: 'relative' // For Image fill
                            }}>
                                {logoUrl && logoUrl.startsWith('http') ? (
                                    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                                        <Image
                                            src={logoUrl}
                                            alt={`Industry Partner ${index}`}
                                            fill
                                            style={{ objectFit: 'contain', padding: '8px' }}
                                            sizes="(max-width: 768px) 150px, 200px"
                                        />
                                    </div>
                                ) : (
                                    <span className={styles.logoText}>Logo</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
