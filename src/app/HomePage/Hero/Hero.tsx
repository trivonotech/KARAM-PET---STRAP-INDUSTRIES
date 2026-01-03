'use client';

import styles from './Hero.module.css';
import Image from 'next/image';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { useState, useEffect } from 'react';

import { SITE_CONTENT } from '@/lib/constants';
import Button from '@/components/ui/Button';

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
                <Image
                    src="/hero-bg.png"
                    alt="Industrial Factory"
                    fill
                    className={styles.backgroundImage}
                    priority
                    suppressHydrationWarning
                />

                <div className={styles.content}>
                    <h1 className={styles.title}>
                        {title}
                    </h1>
                    <p className={styles.subtitle}>
                        {subtitle}
                    </p>
                    <Button>
                        {cta}
                    </Button>
                </div>
            </div>

            <div className={styles.statsCard}>
                {mounted ? (
                    stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))
                ) : (
                    // Optional: Render placeholders or defaults to prevent layout shift if needed
                    // For now, rendering nothing or a skeleton would be fine.
                    // Given the design, an empty card might look collapsed.
                    // Let's render the structural divs but empty content for layout stability if stats exist in default
                    config.homeContent.stats.map((_, index) => (
                        <div key={index} className={styles.statItem}>
                            {/* Placeholder or empty to match server output if server renders defaults */}
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}