import styles from './About.module.css';
import Image from 'next/image';

export default function About() {
    return (
        <section className={styles.aboutSection}>
            <div className={styles.container}>
                <div className={styles.contentColumn}>
                    <h2 className={styles.heading}>
                        <span className={styles.blackText}>ABOUT</span>{' '}
                        <span className={styles.orangeText}>THE COMPANY</span>
                    </h2>
                    <p className={styles.description}>
                        "Founded In 2009, KP Strap Industries Is A [Location]-Based Manufacturing
                        Company Specializing In [Exact Process/Product]. We Serve Both
                        Domestic And Export Clients With A Focus On Consistency,
                        Compliance, And Long-Term Partnerships."
                    </p>
                    <button className={styles.moreButton}>
                        More About The Company ›
                    </button>
                </div>
                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/hero-bg.png" /* Using hero-bg as placeholder if no specific image provided, or I can try to generate one or let user valid. Actually the prompt implied I can use generic. I'll use hero-bg but cropped or maybe a color block if no image suitable. Let's stick to hero-bg for now as placeholder. */
                            alt="Factory Machine"
                            fill
                            className={styles.aboutImage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
