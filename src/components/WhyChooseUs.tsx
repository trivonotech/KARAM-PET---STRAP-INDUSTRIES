import styles from './WhyChooseUs.module.css';
import Image from 'next/image';

export default function WhyChooseUs() {
    const features = [
        {
            text: "In-House Testing For Breaking Strength, Elongation & Load Stability",
            image: "/images/why-choose-us/testing.png"
        },
        {
            text: "High-Strength, Machine-Compatible Strapping",
            image: "/images/why-choose-us/strapping.png"
        },
        {
            text: "100% Recycled PET With Controlled Extrusion For Consistent Quality",
            image: "/images/why-choose-us/extrusion.png"
        },
        {
            text: "Reliable Bulk Supply With Full Product Range",
            image: "/images/why-choose-us/bulk.png"
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
