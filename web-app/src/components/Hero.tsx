import styles from './Hero.module.css';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className={styles.heroContainer}>
            <Image
                src="/hero-bg.png"
                alt="Industrial Factory"
                fill
                className={styles.backgroundImage}
                priority
            />

            <div className={styles.content}>
                <h1 className={styles.title}>
                    Manufacturer Of High-Precision<br />
                    [Product Type] For Industrial<br />
                    Applications
                </h1>
                <p className={styles.subtitle}>
                    Serving Automotive, Construction, And OEM Clients With ISO-Certified Manufacturing And Scalable Production.
                </p>
                <button className={styles.ctaButton}>
                    Request A Quotation ›
                </button>
            </div>

            <div className={styles.statsCard}>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>15+</span>
                    <span className={styles.statLabel}>Years<br />Experience</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>9001:2015</span>
                    <span className={styles.statLabel}>Iso</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>15+</span>
                    <span className={styles.statLabel}>Monthly<br />Capacity</span>
                </div>
            </div>
        </section>
    );
}
