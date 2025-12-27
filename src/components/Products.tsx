import styles from './Products.module.css';
import Image from 'next/image';

export default function Products() {
    return (
        <section className={styles.productsSection}>
            <div className={styles.container}>
                <div className={styles.contentColumn}>
                    <h2 className={styles.heading}>
                        <span className={styles.blackText}>OUR</span>{' '}
                        <span className={styles.orangeMainText}>PRODUCTS</span>
                    </h2>

                    <h3 className={styles.subHeading}>PET Polyester Strap</h3>

                    <p className={styles.description}>
                        High-Strength, Elastic, Shock-Absorbent Straps Made From 100%
                        Recycled Bottle Flakes And Shredded PET. Suitable For Lightweight To
                        Heavy Industrial Loads.
                    </p>
                </div>

                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/hero-bg.png" /* Placeholder */
                            alt="PET Polyester Strap Rolls"
                            fill
                            className={styles.productImage}
                        />
                        <button className={styles.moreButton}>
                            More ↗
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
