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
                        ABOUT <span className={styles.orangeText}>COMPANY</span>
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

                {/* Cards Section */}
                <div className={styles.cardsSection}>
                    <div className={styles.cardsGrid}>
                        {/* Card 1 */}
                        <div className={styles.infoCard}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>WHO WE ARE</h3>
                            </div>
                            <div className={styles.cardContent}>
                                <p>
                                    We Are A Dedicated Manufacturing Unit Focused On Delivering Reliable, Durable, And Industry-Grade Strapping Solutions.
                                    With 15+ Years Of Technical And Market Experience, Our Director Leads The Company With Deep Product Knowledge And
                                    Operational Expertise.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className={styles.infoCard}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>WHAT WE MANUFACTURE</h3>
                            </div>
                            <div className={styles.cardContent}>
                                <p>We Produce A Complete Range Of Packaging And Strapping Products:</p>
                                <ul className={styles.cardList}>
                                    <li>PET Strap</li>
                                    <li>PP Strap (Semi-Automatic & Fully Automatic)</li>
                                    <li>Cord Strap</li>
                                    <li>Sealing Clips & Buckles</li>
                                    <li>Pneumatic Tools</li>
                                </ul>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className={styles.infoCard}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>WHO WE SERVE</h3>
                            </div>
                            <div className={styles.cardContent}>
                                <p>We Supply Strapping Solutions To:</p>
                                <ul className={styles.cardList}>
                                    <li>Manufacturing & Industrial Units</li>
                                    <li>Packaging And Logistics Companies</li>
                                    <li>Export-Oriented Industries</li>
                                    <li>Warehousing Facilities</li>
                                    <li>Heavy-Duty And High-Volume Production Setups</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leadership Section */}
                <div className={styles.leadershipSection}>
                    <h2 className={styles.sectionTitle}>
                        COMPANY <span className={styles.orangeText}>LEADERSHIP</span>
                    </h2>

                    {/* Leader 1 */}
                    <div className={styles.leaderCard}>
                        <div className={styles.leaderImageContainer}>
                            {/* Placeholder for Leader 1 Image */}
                            <div style={{ width: '100%', height: '100%', background: '#333' }}></div>
                        </div>
                        <div className={styles.leaderInfo}>
                            <h3 className={styles.leaderName}>NAME</h3>
                            <p className={styles.leaderTitle}>(Title / Position)</p>
                            <p className={styles.leaderBio}>
                                With Over 15 Years Of Experience In Strapping Solutions, KARAM PET STRAP INDUSTRIES Has Grown Into One Of India's Most Reliable Manufacturers Of PET And PP Strapping Products. Known For Consistent Quality And Dependable Service, We Have Earned A Trustworthy Reputation Across Domestic And International Markets. Our Focus Is Simple — Deliver Superior Straps Backed By Technical Expertise, Strong Manufacturing, And Customer-First Operations.
                            </p>
                        </div>
                    </div>

                    {/* Leader 2 */}
                    <div className={`${styles.leaderCard} ${styles.leaderCardReverse}`}>
                        <div className={styles.leaderImageContainer}>
                            {/* Placeholder for Leader 2 Image */}
                            <div style={{ width: '100%', height: '100%', background: '#333' }}></div>
                        </div>
                        <div className={styles.leaderInfo}>
                            <h3 className={styles.leaderName}>NAME</h3>
                            <p className={styles.leaderTitle}>(Title / Position)</p>
                            <p className={styles.leaderBio}>
                                With Over 15 Years Of Experience In Strapping Solutions, KARAM PET STRAP INDUSTRIES Has Grown Into One Of India's Most Reliable Manufacturers Of PET And PP Strapping Products. Known For Consistent Quality And Dependable Service, We Have Earned A Trustworthy Reputation Across Domestic And International Markets. Our Focus Is Simple — Deliver Superior Straps Backed By Technical Expertise, Strong Manufacturing, And Customer-First Operations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Consistency Section */}
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
                {/* Clients Section */}
                <div className={styles.clientsSection}>
                    <h2 className={styles.sectionTitle}>
                        OUR <span className={styles.orangeText}>CLIENTS</span>
                    </h2>
                    <div className={styles.clientsGrid}>
                        {/* Generating grid of client placeholders */}
                        {Array.from({ length: 14 }).map((_, index) => (
                            <div key={index} className={styles.clientPlaceholder}></div>
                        ))}
                    </div>
                </div>

                {/* Trust Section */}
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
                        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLeft}`} style={{ fontSize: '2.5rem' }}>
                            WHY CLIENTS <br /><span className={styles.orangeText}>TRUST US</span>
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
