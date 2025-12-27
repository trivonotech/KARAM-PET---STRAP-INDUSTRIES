'use client';

import { useSiteConfig } from '../context/SiteConfigContext';
import styles from './Catalogue.module.css';
import Image from 'next/image';

export default function Catalogue() {
    const { config } = useSiteConfig();

    const handleDownload = () => {
        if (config.catalogueUrl) {
            window.open(config.catalogueUrl, '_blank');
        } else {
            alert('The catalogue is currently being updated. Please check back soon!');
        }
    };

    return (
        <section className={styles.catalogueSection}>
            <div className={styles.container}>
                <div className={styles.contentColumn}>
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

                    <button
                        className={styles.downloadButton}
                        onClick={handleDownload}
                        title={config.catalogueUrl ? "Click to download" : "Catalogue unavailable"}
                    >
                        Download Catalogue ↗
                    </button>
                    {!config.catalogueUrl && (
                        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '8px' }}>
                            * Catalogue update in progress
                        </p>
                    )}
                </div>

                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/hero-bg.png" /* Placeholder for the catalogue image */
                            alt="Catalogue Preview"
                            fill
                            className={styles.catalogueImage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
