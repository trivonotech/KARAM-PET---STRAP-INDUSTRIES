import React from 'react';
import styles from './VisionMission.module.css';

const VisionMission = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.headingWrapper}>
                    <h2 className={styles.heading}>
                        Our <span className={styles.orangeText}>Identity</span>
                    </h2>
                </div>

                <div className={styles.grid}>
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
            </div>
        </section>
    );
};

export default VisionMission;
