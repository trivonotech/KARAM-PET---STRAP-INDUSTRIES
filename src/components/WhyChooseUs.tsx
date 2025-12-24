import styles from './WhyChooseUs.module.css';
import Image from 'next/image';

export default function WhyChooseUs() {
    const features = [
        "Lorem Ipsum Is Simply Dummy Text Of",
        "Lorem Ipsum Is Simply Dummy Text Of",
        "Lorem Ipsum Is Simply Dummy Text Of",
        "Lorem Ipsum Is Simply Dummy Text Of",
    ];

    return (
        <section className={styles.wcuSection}>
            <div className={styles.container}>
                <h2 className={styles.heading}>
                    <span className={styles.blackText}>WHY</span>{' '}
                    <span className={styles.orangeText}>CHOOSE US</span>
                </h2>

                <div className={styles.bannerWrapper}>
                    <div className={styles.imageContainer}>
                        <Image
                            src="/hero-bg.png" /* Placeholder for banner */
                            alt="Why Choose Us Banner"
                            fill
                            className={styles.bannerImage}
                        />
                    </div>
                    <div className={styles.cutoutWrapper}>
                        <button className={styles.moreButton}>
                            More ↗
                        </button>
                    </div>
                </div>

                <div className={styles.featureGrid}>
                    {features.map((text, index) => (
                        <div key={index} className={styles.featureItem}>
                            <div className={styles.iconCircle}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 3v5h5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 21h5v-5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className={styles.featureText}>{text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
