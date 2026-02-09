'use client';
import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { useSiteConfig } from '@/context/SiteConfigContext';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

export default function AboutPage() {
    const { config } = useSiteConfig();
    const clientLogos = config.clientLogos || Array(18).fill({ url: '', isFavorite: false });

    const renderClientLogo = (index: number, key: string | number) => {
        const item = clientLogos[index];
        const url = item ? item.url : '';
        return (
            <div key={key} className={styles.clientPlaceholder} style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {url ? (
                    <Image
                        src={url}
                        alt={`Client ${index + 1}`}
                        fill
                        style={{ objectFit: 'contain', padding: '15px' }}
                        suppressHydrationWarning
                    />
                ) : null}
            </div>
        );
    };

    return (
        <main className={styles.main}>
            {/* ... header ... */}

            <section className={styles.container}>
                <div className={styles.headerSection}>
                    <ScrollAnimation variant="fadeUp">
                        <h1 className={styles.mainTitle}>
                            ABOUT <span className={styles.orangeText}>COMPANY</span>
                        </h1>
                    </ScrollAnimation>
                    {/* ... rest of header ... */}
                    <ScrollAnimation variant="fadeUp" delay={0.2}>
                        <p className={styles.introText}>
                            With over 13 years of operation, KARAM PET STRAP INDUSTRIES is an essential player in Strapping Solutions one of the leading manufacturers of industry with excellent quality products, and dedicated to serve you better; KARAM PET STRAP INDUSTRIES has registered its position as a reputed brand in the market.
                        </p>
                    </ScrollAnimation>
                    <ScrollAnimation variant="scaleIn" delay={0.3} className={styles.heroImageContainer}>
                        <Image
                            src="/hero-bg.png" /* Placeholder: Use existing hero image */
                            alt="Factory Operations"
                            fill
                            className={styles.heroImage}
                            suppressHydrationWarning
                        />
                    </ScrollAnimation>
                </div>

                {/* Cards Section */}
                <div className={styles.cardsSection}>
                    <div className={styles.cardsGrid}>
                        {/* Card 1 */}
                        <ScrollAnimation variant="fadeUp" className={styles.infoCard} delay={0.1}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>WHO WE ARE</h3>
                            </div>
                            <div className={styles.cardContent}>
                                <p>
                                    We Are A Dedicated Manufacturing Unit Focused On Delivering Reliable, Durable, And Industry-Grade Strapping Solutions.
                                    With 13+ Years Of Technical And Market Experience, Our Director Leads The Company With Deep Product Knowledge And
                                    Operational Expertise.
                                </p>
                            </div>
                        </ScrollAnimation>

                        {/* Card 2 */}
                        <ScrollAnimation variant="fadeUp" className={styles.infoCard} delay={0.2}>
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
                        </ScrollAnimation>

                        {/* Card 3 */}
                        <ScrollAnimation variant="fadeUp" className={styles.infoCard} delay={0.3}>
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
                        </ScrollAnimation>
                    </div>
                </div>

                {/* Leadership Section */}
                <div className={styles.leadershipSection}>
                    <ScrollAnimation variant="fadeUp">
                        <h2 className={styles.sectionTitle}>
                            COMPANY <span className={styles.orangeText}>LEADERSHIP</span>
                        </h2>
                    </ScrollAnimation>

                    {/* Leader 1: Nishant Patel */}
                    <ScrollAnimation variant="slideRight" className={styles.leaderCard}>
                        <div className={styles.leaderImageContainer}>
                            <div style={{ width: '100%', height: '100%', background: '#333' }} suppressHydrationWarning={true}></div>
                        </div>
                        <div className={styles.leaderInfo}>
                            <h3 className={styles.leaderName}>DIRECTOR : Nishant Patel</h3>
                            <p className={styles.leaderBio}>
                                Our vision is to ensure consistent and reliable quality in every PET strap we manufacture. Through disciplined production practices, careful material selection, and strict quality checks at each stage, we are committed to delivering products that meet defined standards of strength, durability, and performance.
                            </p>
                        </div>
                    </ScrollAnimation>

                    {/* Leader 2: Denish Patel */}
                    <ScrollAnimation variant="slideLeft" className={`${styles.leaderCard} ${styles.leaderCardReverse}`}>
                        <div className={styles.leaderImageContainer}>
                            <div style={{ width: '100%', height: '100%', background: '#333' }} suppressHydrationWarning={true}></div>
                        </div>
                        <div className={styles.leaderInfo}>
                            <h3 className={styles.leaderName}>DIRECTOR : Denish Patel</h3>
                            <p className={styles.leaderBio}>
                                Our vision is to become a trusted name in PET strap manufacturing by delivering uncompromising quality in every product we create. We believe that long-term relationships are built on consistency, reliability, and transparency. By focusing on innovation, precision manufacturing, and customer satisfaction, we aim to provide packaging solutions that add real value to our customers’ operations.
                            </p>
                        </div>
                    </ScrollAnimation>
                </div>
            </section>

            {/* Consistency Section */}
            <section className={styles.consistencySection}>
                <div className={styles.container}>
                    <ScrollAnimation variant="fadeUp">
                        <h2 className={styles.consistencyTitle}>
                            HOW WE <span className={styles.orangeText}>ENSURE CONSISTENCY</span>
                        </h2>
                    </ScrollAnimation>
                    <div className={styles.featuresGrid}>
                        <ScrollAnimation variant="fadeUp" delay={0.1} className={styles.featureCard}>
                            <div className={styles.iconWrapper}>
                                <Image src="/icons/1.svg" alt="Uniform Dimensions" width={50} height={50} suppressHydrationWarning />
                            </div>
                            <p className={styles.featureText}>
                                Ensures Uniform<br />Dimensions And<br />Strength
                            </p>
                        </ScrollAnimation>
                        <ScrollAnimation variant="fadeUp" delay={0.2} className={styles.featureCard}>
                            <div className={styles.iconWrapper}>
                                <Image src="/icons/2.svg" alt="Approved Inputs" width={50} height={50} suppressHydrationWarning />
                            </div>
                            <p className={styles.featureText}>
                                Only Approved And<br />Tested Raw Inputs
                            </p>
                        </ScrollAnimation>
                        <ScrollAnimation variant="fadeUp" delay={0.3} className={styles.featureCard}>
                            <div className={styles.iconWrapper}>
                                <Image src="/icons/3.svg" alt="Lab Tested" width={50} height={50} suppressHydrationWarning />
                            </div>
                            <p className={styles.featureText}>
                                Lab-Tested For Break<br />Strength & Elongation
                            </p>
                        </ScrollAnimation>
                        <ScrollAnimation variant="fadeUp" delay={0.4} className={styles.featureCard}>
                            <div className={styles.iconWrapper}>
                                <Image src="/icons/4.svg" alt="Reliable Production" width={50} height={50} suppressHydrationWarning />
                            </div>
                            <p className={styles.featureText}>
                                Reliable Production<br />For Heavy Industrial<br />Demand
                            </p>
                        </ScrollAnimation>
                    </div>
                </div>
            </section>

            <section className={styles.container}>
                {/* Clients Section */}
                <div className={styles.clientsSection}>
                    <ScrollAnimation variant="fadeUp">
                        <h2 className={styles.sectionTitle}>
                            OUR <span className={styles.orangeText}>CLIENTS</span>
                        </h2>
                    </ScrollAnimation>
                    <ScrollAnimation variant="fadeIn" delay={0.2} className={styles.clientsContainer}>
                        <div className={styles.clientsMarquee}>
                            {[0, 1].map((copyIndex) => (
                                <div key={copyIndex} className={styles.clientsGridBlock}>
                                    {(() => {
                                        const pattern = [4, 3];
                                        const patternSum = 7;

                                        // If no logos, show nothing
                                        if (!clientLogos || clientLogos.length === 0) return null;

                                        // We want to fill a certain amount of rows to ensure scroll works.
                                        // Let's say we want at least 42 items (6 cycles of 7) to be safe for height.
                                        const totalItemsToRender = Math.max(clientLogos.length, 42);

                                        // Adjust total items to be a multiple of 7 so the pattern joins seamlessly
                                        const adjustedTotal = totalItemsToRender + (totalItemsToRender % patternSum === 0 ? 0 : (patternSum - (totalItemsToRender % patternSum)));

                                        const rows = [];
                                        let currentIndex = 0;
                                        let patternIndex = 0;

                                        while (currentIndex < adjustedTotal) {
                                            const size = pattern[patternIndex % pattern.length];
                                            const rowItems = [];
                                            for (let i = 0; i < size; i++) {
                                                // REPETITIVE LOGIC: Modulus ensures we loop through available logos
                                                // This satisfies "repetitive logo" request
                                                const logoIndex = (currentIndex + i) % clientLogos.length;
                                                // Ensure we use renderClientLogo but we might need to bypass it if it doesn't handle explicit item passing well,
                                                // or just trust it uses clientLogos[index]. 
                                                // However, renderClientLogo(index) likely looks up clientLogos[index]. 
                                                // If we pass an index < length, it's fine.
                                                rowItems.push(renderClientLogo(logoIndex, i));
                                            }
                                            rows.push(
                                                <div key={currentIndex} className={styles.clientsRow}>
                                                    {rowItems}
                                                </div>
                                            );
                                            currentIndex += size;
                                            patternIndex++;
                                        }
                                        return rows;
                                    })()}
                                </div>
                            ))}
                        </div>
                    </ScrollAnimation>
                </div>

                {/* Trust Section */}
                <div className={`${styles.trustSection} ${styles.trustContent}`}>
                    <ScrollAnimation variant="slideRight" className={styles.trustImageContainer}>
                        <Image
                            src="/hero-bg.png" /* Placeholder */
                            alt="Trust Us"
                            fill
                            className={styles.heroImage}
                            suppressHydrationWarning
                        />
                    </ScrollAnimation>
                    <ScrollAnimation variant="slideLeft" className={styles.trustTextContent}>
                        <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLeft}`} style={{ fontSize: '2.5rem' }}>
                            WHY CLIENTS <br /><span className={styles.orangeText}>TRUST US</span>
                        </h2>
                        <ul className={styles.trustList}>
                            <li>Machine-Compatible Straps Trusted Across Industries</li>
                            <li>Stable Bulk Supply With Consistent Lead Times</li>
                            <li>Competitive Industrial Pricing</li>
                            <li>Fast Communication & Responsive Support</li>
                            <li>13+ Years Of Technical Expertise Backing Every Shipment</li>
                        </ul>
                    </ScrollAnimation>
                </div>
            </section>

        </main>
    );
}
