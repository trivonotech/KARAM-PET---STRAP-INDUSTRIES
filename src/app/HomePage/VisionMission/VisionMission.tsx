"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from './VisionMission.module.css';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

const VisionMission = () => {
    const [activeCard, setActiveCard] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-swipe functionality
    useEffect(() => {
        const interval = setInterval(() => {
            // Only auto-swipe on mobile where grid is a flex container (overflowing)
            // We can check this by seeing if scrollWidth > clientWidth
            if (scrollRef.current && scrollRef.current.scrollWidth > scrollRef.current.clientWidth) {
                const nextCard = (activeCard + 1) % 3; // Cycle through 0, 1, 2
                scrollToCard(nextCard);
            }
        }, 3000); // Swipe every 3 seconds

        return () => clearInterval(interval);
    }, [activeCard]);


    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const cardWidth = scrollRef.current.clientWidth;
            const newActiveCard = Math.round(scrollLeft / cardWidth);
            if (newActiveCard !== activeCard) {
                setActiveCard(newActiveCard);
            }
        }
    };

    const scrollToCard = (index: number) => {
        if (scrollRef.current) {
            const cardWidth = scrollRef.current.clientWidth;
            scrollRef.current.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            setActiveCard(index);
        }
    };

    return (
        <section className={styles.section}>
            <ScrollAnimation variant="scaleIn" className={styles.container}>
                <div className={styles.headingWrapper}>
                    <h2 className={styles.heading}>
                        Our <span className={styles.orangeText}>Identity</span>
                    </h2>
                </div>

                <div
                    className={styles.grid}
                    ref={scrollRef}
                    onScroll={handleScroll}
                >
                    {/* Vision Card */}
                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>
                            {/* Eye Icon SVG */}
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </div>
                        <h3 className={styles.cardTitle}>Our Vision</h3>
                        <p className={styles.cardText}>
                            To be the global leader in sustainable strap manufacturing, delivering excellence through innovation while prioritizing environmental responsibility and customer satisfaction.
                        </p>
                    </div>

                    {/* Mission Card */}
                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>
                            {/* Target Icon SVG */}
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="6"></circle>
                                <circle cx="12" cy="12" r="2"></circle>
                            </svg>
                        </div>
                        <h3 className={styles.cardTitle}>Our Mission</h3>
                        <p className={styles.cardText}>
                            Empowering industries with high-quality, durable strapping solutions. We are dedicated to continuous improvement, technological advancement, and building lasting partnerships with our clients.
                        </p>
                    </div>

                    {/* Strength Card */}
                    <div className={styles.card}>
                        <div className={styles.iconWrapper}>
                            {/* Anchor/Strength Icon SVG */}
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                            </svg>
                        </div>
                        <h3 className={styles.cardTitle}>Our Strength</h3>
                        <p className={styles.cardText}>
                            Our strength lies in our robust infrastructure, skilled workforce, and unyielding commitment to quality control. We combine years of expertise with cutting-edge technology.
                        </p>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className={styles.dotsContainer}>
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className={`${styles.dot} ${activeCard === index ? styles.activeDot : ''}`}
                            onClick={() => scrollToCard(index)}
                        />
                    ))}
                </div>
            </ScrollAnimation>
        </section>
    );
};

export default VisionMission;
