import styles from './About.module.css';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

export default function About() {
    return (
        <section className={styles.aboutSection}>
            <ScrollAnimation variant="fadeUp" className={styles.container}>
                <div className={styles.contentColumn}>
                    <SectionHeading
                        title="ABOUT"
                        highlight="KARAM PET - STRAP INDUSTRIES"
                    />

                    <p className={styles.description}>
                        “With over 13 years of operation, KARAM PET STRAP INDUSTRIES is an essential player in Strapping Solutions one of the leading manufacturers of industry with excellent quality products, and dedicated to serve you better.”
                    </p>


                    <Button href="/about">
                        More About The Company ›
                    </Button>
                </div>
                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/hero-bg.png"
                            alt="Factory Machine"
                            fill
                            className={styles.aboutImage}
                            priority
                            suppressHydrationWarning
                        />
                    </div>
                </div>
            </ScrollAnimation>
        </section>
    );
}
