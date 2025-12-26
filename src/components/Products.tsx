import styles from './Products.module.css';
import Image from 'next/image';

export default function Products() {
    return (
        <section className={styles.productsSection}>
            <div className={styles.container}>
                <div className={styles.contentColumn}>
                    <h2 className={styles.heading}>
                        <span className={styles.blackText}>OUR</span>{' '}
                        <span className={styles.orangeText}>PRODUCTS</span>
                    </h2>
                    <p className={styles.description}>
                        "High-strength, elastic, shock-absorbent straps made from 100% recycled bottle flakes and shredded PET. Suitable for lightweight to heavy industrial loads (200–1090 kg)."
                    </p>
                </div>
                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/hero-bg.png" /* Placeholder, reusing hero since we don't have a specific product image yet */
                            alt="Our Products"
                            fill
                            className={styles.productImage}
                        />
                    </div>
                    <div className={styles.cutoutWrapper}>
                        <button className={styles.floatingButton}>
                            More ↗
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
