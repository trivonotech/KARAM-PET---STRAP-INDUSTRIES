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

                <div className={styles.wrapper}>
                    <Image
                        src="/hero-bg.png" /* Placeholder bg */
                        alt="Factory Background"
                        fill
                        className={styles.backgroundImage}
                    />

                    <div className={styles.formCard}>
                        {/* Composite Shape Background */}
                        <div className={styles.cardShape}>
                            <div className={styles.shapeTop}></div>
                            <div className={styles.shapeBottom}></div>
                            <div className={styles.shapeConnector}></div>
                        </div>

                        <div className={styles.formInner}>
                            <div className={styles.inputGroup} style={{ marginBottom: '1.5rem' }}>
                                <label className={`${styles.label} ${styles.required}`}>Name</label>
                                <input type="text" placeholder="Your Name" className={styles.input} />
                            </div>

                            <div className={styles.inputRow}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Number</label>
                                    <input type="text" placeholder="Phone Number" className={styles.input} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Required strap specification</label>
                                    <input type="text" placeholder="ABC" className={styles.input} />
                                </div>
                            </div>

                            <div className={styles.inputRow}>
                                <div className={styles.inputGroup}>
                                    <label className={`${styles.label} ${styles.required}`}>E-mail</label>
                                    <input type="email" placeholder="you@company.com" className={styles.input} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Company name</label>
                                    <input type="text" placeholder="Company name" className={styles.input} />
                                </div>
                            </div>
                        </div>

                        <button className={styles.submitButton}>
                            Get PET Strap Pricing ↗
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
