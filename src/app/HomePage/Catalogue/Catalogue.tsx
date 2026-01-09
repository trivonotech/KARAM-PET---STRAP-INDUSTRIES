'use client';

import { useState, useEffect } from 'react';

import styles from './Catalogue.module.css';
import Image from 'next/image';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

export default function Catalogue() {




    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by rendering a consistent server state (e.g., the 'unavailable' button)
    // or nothing, until mounted. Since the default config is 'unavailable', 
    // we can just wait for mount to show the 'Download' link if it exists.
    // However, simplest fix is to just not render the specific varying part until mount, 
    // OR render the 'unavailable' state by default server-side if that matches initialization.

    // Actually, looking at SiteConfigContext, the initial state is empty strings or defaults.
    // But localStorage might populate it immediately on client, causing mismatch.
    // So we should verify `mounted` before showing the 'real' config-based link if it differs from default.

    return (
        <section className={styles.catalogueSection}>
            <div className={styles.container}>
                <ScrollAnimation variant="slideRight" className={styles.contentColumn}>
                    <h2 className={styles.heading}>
                        <span className={styles.blackText}>GET</span>{' '}
                        <span className={styles.orangeText}>CATALOGUE</span>
                    </h2>

                    <p className={styles.description}>
                        With Over 13 Years Of Experience In Strapping Solutions, KARAM PET
                        STRAP INDUSTRIES Has Grown Into One Of India’s Most Reliable
                        Manufacturers Of PET And PP Strapping Products. Known For
                        Consistent Quality And Dependable Service, We Have Earned A
                        Trustworthy Reputation Across Domestic And International Markets.
                        Our Focus Is Simple — Deliver Superior Straps Backed By Technical
                        Expertise, Strong Manufacturing, And Customer-First Operations.
                    </p>

                    {/* Only show the "live" link if mounted. Otherwise (SSR), show fallback to match initial state. */}
                    <a
                        href="/KARAM-PET-Catalogue.pdf"
                        download="KARAM-PET-Catalogue.pdf"
                        className={styles.downloadButton}
                        style={{ textDecoration: 'none', display: 'inline-flex' }}
                        title="Click to download PDF"
                    >
                        Download Catalogue ⬇
                    </a>
                </ScrollAnimation>

                <ScrollAnimation variant="slideLeft" className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/hero-bg.png" /* Placeholder for the catalogue image */
                            alt="Catalogue Preview"
                            fill
                            className={styles.catalogueImage}
                            suppressHydrationWarning
                        />
                    </div>
                </ScrollAnimation>
            </div>
        </section>
    );
}
