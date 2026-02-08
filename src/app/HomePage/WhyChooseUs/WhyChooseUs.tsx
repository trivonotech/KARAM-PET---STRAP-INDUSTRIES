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
            <ScrollAnimation variant="fadeUp" className={styles.container}>
                <SectionHeading title="INDUSTRIAL" highlight="CAPABILITY" />

                <div className={styles.featureGrid}>
                    <div className={styles.featureCard}>
                        <Image
                            src="/images/why-choose-us/extrusion.png"
                            alt="Extrusion"
                            fill
                            className={styles.cardImage}
                            suppressHydrationWarning
                        />
                        <div className={styles.textOverlay}>
                            Advanced Extrusion Technology<br />Micro-Precision Control
                        </div>
                    </div>

                    <div className={styles.featureCard}>
                        <Image
                            src="/images/why-choose-us/testing.png"
                            alt="Testing"
                            fill
                            className={styles.cardImage}
                            suppressHydrationWarning
                        />
                        <div className={styles.textOverlay}>
                            In-House Load Testing Lab<br />Certified Breaking Strength
                        </div>
                    </div>

                    <div className={styles.featureCard}>
                        <Image
                            src="/images/why-choose-us/strapping.png"
                            alt="Production"
                            fill
                            className={styles.cardImage}
                            suppressHydrationWarning
                        />
                        <div className={styles.textOverlay}>
                            High-Volume Production<br />500+ Tons Monthly Capacity
                        </div>
                    </div>

                    <div className={styles.featureCard}>
                        <Image
                            src="/images/why-choose-us/bulk.png"
                            alt="Logistics"
                            fill
                            className={styles.cardImage}
                            suppressHydrationWarning
                        />
                        <div className={styles.textOverlay}>
                            Global Export Logistics<br />Shock-Proof Packaging
                        </div>
                    </div>
                </div>
            </ScrollAnimation>
        </section>
    );
}
