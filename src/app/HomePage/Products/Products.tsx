import styles from './Products.module.css';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Products() {
    return (
        <section className={styles.productsSection}>
            <div className={styles.container}>
                <div className={styles.contentColumn}>
                    <SectionHeading
                        title="OUR"
                        highlight="PRODUCTS"
                        className={styles.customHeadingMargin}
                    />

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
                            suppressHydrationWarning
                        />
                        <div className={styles.cornerDecoration}>
                            <Button href="/products" variant="primary" radius="md" className={styles.moreButton}>
                                More ↗
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
