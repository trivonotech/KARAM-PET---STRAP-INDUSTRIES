import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
    return (
        <main className={styles.main}>
            <Navbar />

            <section className={styles.container}>
                <div className={styles.headerSection}>
                    <h1 className={styles.mainTitle}>
                        ABOUT <span className={styles.orangeText}>US</span>
                    </h1>
                    <p className={styles.introText}>
                        With over 15 years of experience in strapping solutions, KARAM PET STRAP INDUSTRIES has grown into one of India's most
                        reliable manufacturers of PET and PP strapping products. Known for consistent quality and dependable service, we have
                        earned a trustworthy reputation across domestic and international markets. Our focus is simple — deliver superior straps
                        backed by technical expertise, strong manufacturing, and customer-first operations.
                    </p>
                    <div className={styles.heroImageContainer}>
                        <Image
                            src="/hero-bg.png" /* Placeholder: Use existing hero image */
                            alt="Factory Operations"
                            fill
                            className={styles.heroImage}
                        />
                    </div>
                </div>

                <div className={styles.overviewSection}>
                    <h2 className={styles.sectionTitle}>
                        COMPANY <span className={styles.orangeText}>OVERVIEW</span>
                    </h2>
                    <p className={styles.overviewDescription}>
                        KARAM PET STRAP INDUSTRIES Is A Manufacturer, Exporter, And Trading Company Specializing In PET Strap, PP Strap (Semi-
                        Automatic & Fully Automatic), Cord Strap, Sealing Clips & Buckles, And Pneumatic Tools.
                        Our Manufacturing Plant Is Located At NH-27, Shapar (Rajkot), Equipped With Modern Machinery And An In-House
                        Laboratory To Ensure Strict Quality Control At Every Stage.
                    </p>

                    <div className={styles.subSection}>
                        <h3 className={styles.subTitle}>1. WHO WE ARE</h3>
                        <p className={styles.textBlock}>
                            We Are A Dedicated Manufacturing Unit Focused On Delivering Reliable, Durable, And Industry-Grade Strapping Solutions.
                            With 15+ Years Of Technical And Market Experience, Our Director Leads The Company With Deep Product Knowledge And
                            Operational Expertise.
                        </p>
                    </div>

                    <div className={styles.subSection}>
                        <h3 className={styles.subTitle}>2. WHAT WE MANUFACTURE</h3>
                        <p className={styles.textBlock} style={{ marginBottom: '1rem' }}>
                            We Produce A Complete Range Of Packaging And Strapping Products:
                        </p>
                        <ul className={styles.list}>
                            <li>PET Strap</li>
                            <li>PP Strap (Semi-Automatic & Fully Automatic)</li>
                            <li>Cord Strap</li>
                            <li>Sealing Clips & Buckles</li>
                            <li>Pneumatic Tools</li>
                        </ul>
                    </div>

                    <div className={styles.subSection}>
                        <h3 className={styles.subTitle}>3. WHO WE SERVE</h3>
                        <p className={styles.textBlock} style={{ marginBottom: '1rem' }}>
                            We Supply Strapping Solutions To:
                        </p>
                        <ul className={styles.list}>
                            <li>Manufacturing & Industrial Units</li>
                            <li>Packaging And Logistics Companies</li>
                            <li>Export-Oriented Industries</li>
                            <li>Warehousing Facilities</li>
                            <li>Heavy-Duty And High-Volume Production Setups</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={styles.consistencySection}>
                <h2 className={styles.consistencyTitle}>
                    HOW WE <span className={styles.orangeText}>ENSURE CONSISTENCY</span>
                </h2>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <Image src="/icons/1.svg" alt="Uniform Dimensions" width={50} height={50} />
                        </div>
                        <p className={styles.featureText}>
                            Ensures Uniform<br />Dimensions And<br />Strength
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <Image src="/icons/2.svg" alt="Approved Inputs" width={50} height={50} />
                        </div>
                        <p className={styles.featureText}>
                            Only Approved And<br />Tested Raw Inputs
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <Image src="/icons/3.svg" alt="Lab Tested" width={50} height={50} />
                        </div>
                        <p className={styles.featureText}>
                            Lab-Tested For Break<br />Strength & Elongation
                        </p>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.iconWrapper}>
                            <Image src="/icons/4.svg" alt="Reliable Production" width={50} height={50} />
                        </div>
                        <p className={styles.featureText}>
                            Reliable Production<br />For Heavy Industrial<br />Demand
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.container}>
                <div className={`${styles.trustSection} ${styles.trustContent}`}>
                    <div className={styles.trustImageContainer}>
                        <Image
                            src="/hero-bg.png" /* Placeholder */
                            alt="Trust Us"
                            fill
                            className={styles.heroImage}
                        />
                    </div>
                    <div className={styles.trustTextContent}>
                        <h2 className={styles.sectionTitle} style={{ fontSize: '2.5rem' }}>
                            WHY CLIENTS <span className={styles.orangeText}>TRUST US</span>
                        </h2>
                        <ul className={styles.trustList}>
                            <li>Machine-Compatible Straps Trusted Across Industries</li>
                            <li>Stable Bulk Supply With Consistent Lead Times</li>
                            <li>Competitive Industrial Pricing</li>
                            <li>Fast Communication & Responsive Support</li>
                            <li>15+ Years Of Technical Expertise Backing Every Shipment</li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
