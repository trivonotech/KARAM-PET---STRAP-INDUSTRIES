import styles from './ContactUs.module.css';
import Image from 'next/image';

export default function ContactUs() {
    return (
        <section className={styles.contactSection}>
            <h2 className={styles.heading}>
                <span className={styles.blackText}>CONTACT</span>{' '}
                <span className={styles.orangeText}>US</span>
            </h2>

            <div className={styles.bannerWrapper}>
                <Image
                    src="/hero-bg.png" // Placeholder
                    alt="Factory Background"
                    fill
                    className={styles.bannerImage}
                />

                <div className={styles.formCard}>
                    <div className={styles.cardBackground}></div>
                    <form className={styles.formGrid}>
                        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Name *</label>
                            <input type="text" placeholder="Your Name" className={styles.input} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Number</label>
                            <input type="text" placeholder="Phone Number" className={styles.input} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Required strap specification</label>
                            <input type="text" placeholder="ABC" className={styles.input} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>E-mail *</label>
                            <input type="email" placeholder="you@company.com" className={styles.input} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Company name</label>
                            <input type="text" placeholder="Company name" className={styles.input} />
                        </div>
                    </form>

                    <button className={styles.submitButton}>
                        Get PET Strap Pricing ↗
                    </button>
                </div>
            </div>
        </section>
    );
}
