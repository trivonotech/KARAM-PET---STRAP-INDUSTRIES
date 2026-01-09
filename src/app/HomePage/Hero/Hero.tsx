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
                <Image
                    src="/hero-bg.png"
                    alt="Industrial Factory"
                    fill
                    className={styles.backgroundImage}
                    priority
                    suppressHydrationWarning
                />

                <div className={styles.content}>
                    <ScrollAnimation variant="fadeUp" delay={0.2}>
                        <h1 className={styles.title}>
                            {title}
                        </h1>
                    </ScrollAnimation>
                    <ScrollAnimation variant="fadeUp" delay={0.4}>
                        <p className={styles.subtitle}>
                            {subtitle}
                        </p>
                    </ScrollAnimation>
                    <ScrollAnimation variant="scaleIn" delay={0.6}>
                        <Button>
                            {cta}
                        </Button>
                    </ScrollAnimation>
                </div>
            </div>

            <div className={styles.statsCard}>
                {mounted ? (
                    stats.map((stat, index) => (
                        <ScrollAnimation
                            key={index}
                            variant="fadeUp"
                            delay={0.8 + (index * 0.1)}
                            className={styles.statItem}
                        >
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </ScrollAnimation>
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