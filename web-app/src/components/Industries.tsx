import styles from './Industries.module.css';

export default function Industries() {
    // Placeholder for logos
    const logoCount = 7;
    const logos = Array.from({ length: logoCount });

    return (
        <section className={styles.industriesSection}>
            <div className={styles.container}>
                <h2 className={styles.heading}>
                    <span className={styles.blackText}>INDUSTRIES</span>{' '}
                    <span className={styles.orangeText}>SERVED</span>
                </h2>

                <div className={styles.marqueeContainer}>
                    <div className={styles.marqueeTrack}>
                        {/* Duplicate the logos to ensure seamless scrolling */}
                        {[...logos, ...logos].map((_, index) => (
                            <div key={index} className={styles.logoItem}>
                                <span className={styles.logoText}>Logo</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
