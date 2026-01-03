import styles from './About.module.css';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';


export default function About() {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.container}>
                <div className={styles.contentColumn}>
                    <SectionHeading
                        title="ABOUT"
                        highlight="KARAM PET - STRAP INDUSTRIES"
                    />
                    <p className={styles.description}>
                        "With over 13 years of experience in strapping solutions, KARAM PET STRAP INDUSTRIES has grown into one of India’s most reliable manufacturers of PET and PP strapping products. Known for consistent quality and dependable service, we have earned a trustworthy reputation across domestic and international markets. Our focus is simple — deliver superior straps backed by technical expertise, strong manufacturing, and customer-first operations."
                    </p>
                    <Button>
                        More About The Company ›
                    </Button>
                </div>
                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/hero-bg.png" /* Using hero-bg as placeholder if no specific image provided, or I can try to generate one or let user valid. Actually the prompt implied I can use generic. I'll use hero-bg but cropped or maybe a color block if no image suitable. Let's stick to hero-bg for now as placeholder. */
                            alt="Factory Machine"
                            fill
                            className={styles.aboutImage}
                            suppressHydrationWarning
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
