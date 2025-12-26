import styles from './WhyChooseUs.module.css';
import Image from 'next/image';

export default function WhyChooseUs() {
    const features = [
        {
            text: "In-House Testing For Breaking Strength, Elongation & Load Stability",
            image: "/hero-bg.png"
        },
        {
            text: "High-Strength, Machine-Compatible Strapping",
            image: "/hero-bg.png"
        },
        {
            text: "100% Recycled PET With Controlled Extrusion For Consistent Quality",
            image: "/hero-bg.png"
        },
        {
            text: "Reliable Bulk Supply With Full Product Range",
            image: "/hero-bg.png"
        },
    ];

    return (
        <section className={styles.wcuSection}>
            <div className={styles.container}>
                <h2 className={styles.heading}>
                    <span className={styles.blackText}>WHY</span>{' '}
                    <span className={styles.orangeText}>CHOOSE US</span>
                </h2>

                <div className={styles.featureGrid}>
                    {features.map((item, index) => (
                        <div key={index} className={styles.featureCard}>
                            <Image
                                src={item.image}
                                alt="Feature"
                                fill
                                className={styles.cardImage}
                            />
                            <div className={styles.textOverlay}>
                                {item.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
