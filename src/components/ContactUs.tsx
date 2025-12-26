"use client";

import styles from './ContactUs.module.css';
import Image from 'next/image';

export default function ContactUs() {
    return (
        <section className={styles.contactSection}>
            <div className={styles.container}>
                <h2 className={styles.heading}>
                    <span className={styles.blackText}>CONTACT</span>{' '}
                    <span className={styles.orangeText}>US</span>
                </h2>

                <div className={styles.formSectionWrapper}>
                    {/* Background Image */}
                    <div className={styles.formBackground}>
                        <Image
                            src="/hero-bg.png"
                            alt="Factory Background"
                            fill
                            className={styles.formBgImage}
                        />
                    </div>

                    {/* Floating Form */}
                    <div className={styles.formCard}>
                        <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Name *</label>
                                    <input type="text" className={styles.input} placeholder="Your Name" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>E-mail *</label>
                                    <input type="email" className={styles.input} placeholder="your@company.com" />
                                </div>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Number</label>
                                    <input type="tel" className={styles.input} placeholder="Phone Number" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Required strap specification</label>
                                    <input type="text" className={styles.input} placeholder="ABC" />
                                </div>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Company name</label>
                                    <input type="text" className={styles.input} placeholder="Company name" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Quantity</label>
                                    <input type="text" className={styles.input} placeholder="XYZ" />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Message</label>
                                <textarea className={styles.textarea} placeholder="Company name..."></textarea>
                            </div>

                            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <button type="submit" className={styles.submitButton}>
                                    Get PET Strap Pricing ↗
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
