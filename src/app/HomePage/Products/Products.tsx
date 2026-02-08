import styles from './Products.module.css';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

export default function Products() {
    return (
        <section className={styles.productsSection}>
            <ScrollAnimation variant="fadeUp" className={styles.container}>
                <div className={styles.contentColumn}>
                    <SectionHeading
                        title="OUR"
                        highlight="PRODUCTS"
                        className={styles.customHeadingMargin}
                    />

                    <h3 className={styles.productTitle}>
                        PET POLYESTER STRAPPING ROLLS ( PET STRAP ) MANUFACTURER
                    </h3>

                    <p className={styles.description}>
                        High-Strength, Elastic, Shock-Absorbent Straps Made From 100%
                        Recycled Bottle Flakes And Shredded PET. Suitable For Lightweight To
                        Heavy Industrial Loads. Our PET Straps provide consistent performance and superior durability for all industrial packaging needs.
                    </p>

                    <div className={styles.featureGrid}>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>✓</span>
                            <span>High Breaking Strength</span>
                        </div>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>✓</span>
                            <span>Weather Resistant</span>
                        </div>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>✓</span>
                            <span>Cost Effective</span>
                        </div>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>✓</span>
                            <span>100% Recyclable</span>
                        </div>
                    </div>

                    <div className={styles.actionArea}>
                        <Button href="/contact" variant="primary" radius="full" className={styles.pricingBtn}>
                            Get PET Strap Pricing ↗
                        </Button>
                        <Button href="/products" variant="outline" radius="full" className={styles.allProductsBtn}>
                            View All Products
                        </Button>
                    </div>
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
                        <div className={styles.imageOverlay}></div>
                    </div>
                </div>
            </ScrollAnimation>
        </section>
    );
}
