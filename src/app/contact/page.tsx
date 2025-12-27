'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function ContactPage() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div className={styles.container}>

                {/* Header Section */}
                <section className={styles.headerSection}>
                    <h1 className={styles.title}>GET IN <span>TOUCH</span></h1>
                    <p className={styles.subtitle}>
                        For pricing, technical support, bulk orders, or custom specifications — reach us directly using the details below.
                    </p>
                </section>

                {/* Info Cards Grid */}
                <section className={styles.infoGrid}>
                    {/* Card 1: Address */}
                    <div className={styles.infoCard}>
                        <div className={styles.cardHeader}>COMPANY ADDRESS</div>
                        <div className={styles.cardBody}>
                            <p>
                                KARAM PET STRAP INDUSTRIES<br />
                                Survey No. 258, Plot No. 03, Captain Polyplast Gate,<br />
                                Near Precision Techno Cast Pvt. Ltd.,<br />
                                Shapar (Veraval), Rajkot — 360024,<br />
                                Gujarat, India.
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Contact */}
                    <div className={styles.infoCard}>
                        <div className={styles.cardHeader}>CONTACT & EMAIL</div>
                        <div className={styles.cardBody}>
                            <p>
                                Sales & Support: +91 94082 13514<br />
                                Office: +91 94298 72378
                            </p>
                            <br />
                            <p>
                                General Enquiries:<br />
                                Karampetstrapind@Gmail.Com
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Hours */}
                    <div className={styles.infoCard}>
                        <div className={styles.cardHeader}>BUSINESS HOURS</div>
                        <div className={styles.cardBody}>
                            <p>
                                Monday To Saturday:<br />
                                9:00 AM – 7:00 PM
                            </p>
                            <br />
                            <p>
                                Sunday: Closed
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Hero Form Section */}
                <section>
                    <h2 className={styles.formSectionTitle}>CONTACT <span className={styles.titleHighlight}>US</span></h2>

                    <div className={styles.formSectionWrapper}>
                        {/* Background Image */}
                        <div className={styles.formBackground}>
                            <Image
                                src="/hero-bg.png"
                                alt="Factory Background"
                                fill
                                className={styles.formBgImage}
                                priority
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
                </section>

            </div>
            <Footer />
        </main>
    );
}
