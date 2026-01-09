"use client";

import styles from './ContactUs.module.css';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

export default function ContactUs() {
    return (
        <section className={styles.contactSection}>
            <div className={styles.container}>
                <SectionHeading title="CONTACT" highlight="US" />

                <div className={styles.formSectionWrapper}>
                    {/* Background Image */}
                    <ScrollAnimation variant="scaleIn" className={styles.formBackground}>
                        <Image
                            src="/hero-bg.png"
                            alt="Factory Background"
                            fill
                            className={styles.formBgImage}
                            suppressHydrationWarning
                        />
                    </ScrollAnimation>

                    {/* Floating Form */}
                    <ScrollAnimation variant="fadeUp" delay={0.2} className={styles.formCard}>
                        {/* L-Shaped Background */}
                        <div className={styles.cardShape}></div>

                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <form id="contactForm" className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
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
                            </form>
                        </div>

                        {/* Button Positioned in Cutout (Relative to formCard) */}
                        <Button
                            type="submit"
                            form="contactForm"
                            className={styles.submitButton}
                            radius="md"
                        >
                            Get PET Strap Pricing ↗
                        </Button>
                    </ScrollAnimation>
                </div>
            </div>
        </section>
    );
}
