'use client';

import styles from './Hero.module.css';
import Image from 'next/image';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { useState, useEffect } from 'react';

import { SITE_CONTENT } from '@/lib/constants';
import Button from '@/components/ui/Button';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

export default function Hero() {
    const { config } = useSiteConfig();
    const { stats } = config.homeContent;

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { title, subtitle, cta } = SITE_CONTENT.hero;

    return (
        <section className={styles.heroWrapper}>
            <div className={styles.imageContainer}>
                <div
                    className={styles.heroBgContainer}
                >
                    <Image
                        src="/hero-bg.png"
                        alt="Industrial Factory"
                        fill
                        className={styles.backgroundImage}
                        priority
                        suppressHydrationWarning
                    />
                </div>

                <div className={styles.heroOverlay} /> {/* Darken overlay for contrast */}

                <ScrollAnimation variant="fadeUp" className={styles.content}>
                    <h1 className={styles.title}>
                        {title}
                    </h1>
                    <p className={styles.subtitle}>
                        {subtitle}
                    </p>
                    <div className={styles.buttonGroup}>
                        <Button href="/products">
                            {cta}
                        </Button>
                        <Button href="/about" variant="outline" className={styles.secondaryButton}>
                            Learn More
                        </Button>
                    </div>
                </ScrollAnimation>
            </div>

            <div className={styles.statsCard}>
                {stats.length > 0 ? (
                    stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel} style={{ whiteSpace: 'pre-line' }}>{stat.label}</span>
                        </div>
                    ))
                ) : null}
            </div>
        </section>
    );
}