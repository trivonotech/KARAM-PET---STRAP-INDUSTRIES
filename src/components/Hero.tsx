'use client';

import styles from './Hero.module.css';
import Image from 'next/image';
import { useSiteConfig } from '../context/SiteConfigContext';

export default function Hero() {
    const { config } = useSiteConfig();
    const { stats } = config.homeContent;

    const heroTitle = 'Manufacturer Of High-Performance\nPET, PP & Cord Strapping Solutions';
    const heroSubtitle = 'Serving Steel, Aluminium, Packaging And Export Industries With Durable, Shock-Absorbent And Machine-Compatible Strapping Made Using 100% Recycled Raw Materials.';



    return (
        <section className={styles.heroWrapper}>
            <div className={styles.imageContainer}>
                <Image
                    src="/hero-bg.png"
                    alt="Industrial Factory"
                    fill
                    className={styles.backgroundImage}
                    priority
                />

                <div className={styles.content}>
                    <h1 className={styles.title} style={{ whiteSpace: 'pre-line' }}>
                        {heroTitle}
                    </h1>
                    <p className={styles.subtitle}>
                        {heroSubtitle}
                    </p>
                    <button className={styles.ctaButton}>
                        Request A Quotation ›
                    </button>
                </div>
            </div>

            <div className={styles.statsCard} suppressHydrationWarning>
                {stats.map((stat, index) => (
                    <div key={index} className={styles.statItem}>
                        <span className={styles.statValue} suppressHydrationWarning>{stat.value}</span>
                        <span className={styles.statLabel} style={{ whiteSpace: 'pre-line' }} suppressHydrationWarning>{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}