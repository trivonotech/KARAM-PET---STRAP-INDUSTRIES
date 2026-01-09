'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import ContactUs from '@/components/sections/ContactUs/ContactUs';
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
                <ContactUs />

            </div>
            <Footer />
        </main>
    );
}
