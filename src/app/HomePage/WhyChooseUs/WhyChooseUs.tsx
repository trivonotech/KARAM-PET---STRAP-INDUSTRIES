import styles from './WhyChooseUs.module.css';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

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
                <SectionHeading title="WHY" highlight="CHOOSE US" />

                <div className={styles.featureGrid}>
                    {features.map((item, index) => (
                        <ScrollAnimation
                            key={index}
                            variant="fadeUp"
                            delay={index * 0.1}
                            className={styles.featureCard}
                        >
                            <Image
                                src={item.image}
                                alt="Feature"
                                fill
                                className={styles.cardImage}
                                suppressHydrationWarning
                            />
                            <div className={styles.textOverlay}>
                                {item.text}
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
}
