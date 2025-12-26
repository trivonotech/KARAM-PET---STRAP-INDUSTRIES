import styles from './Catalogue.module.css';
import Image from 'next/image';

export default function Catalogue() {
    return (
        <section className={styles.catalogueSection}>
            <div className={styles.container}>
                <div className={styles.contentColumn}>
                    <h2 className={styles.heading}>
                        <span className={styles.blackText}>GET</span>{' '}
                        <span className={styles.orangeText}>CATALOGUE</span>
                    </h2>

                    <p className={styles.description}>
                        With Over 13 Years Of Experience In Strapping Solutions, KARAM PET
                        STRAP INDUSTRIES Has Grown Into One Of India’s Most Reliable
                        Manufacturers Of PET And PP Strapping Products. Known For
                        Consistent Quality And Dependable Service, We Have Earned A
                        Trustworthy Reputation Across Domestic And International Markets.
                        Our Focus Is Simple — Deliver Superior Straps Backed By Technical
                        Expertise, Strong Manufacturing, And Customer-First Operations.
                    </p>

                    <button className={styles.downloadButton}>
                        Download Catalogue ↗
                    </button>
                </div>

                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/hero-bg.png" /* Placeholder for the catalogue image */
                            alt="Catalogue Preview"
                            fill
                            className={styles.catalogueImage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
