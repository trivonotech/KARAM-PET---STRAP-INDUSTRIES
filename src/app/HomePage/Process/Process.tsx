'use client';

import styles from './Process.module.css';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

export default function ManufacturingProcess() {
    const steps = [
        {
            title: "Raw Material Processing",
            desc: "100% Recycled PET flakes are washed, dried, and crystallized in our decontamination units."
        },
        {
            title: "Precision Extrusion",
            desc: "Advanced extrusion lines melt and shape the resin into high-tensile straps with uniform thickness."
        },
        {
            title: "Embossing & Cooling",
            desc: "Straps undergo controlled stretching and embossing for maximum grip and shock absorption."
        },
        {
            title: "Quality Winding",
            desc: "Automated winding onto cores with strict tension control for jam-free application."
        }
    ];

    return (
        <section className={styles.processSection}>
            <ScrollAnimation variant="scaleIn" className={styles.container}>
                <SectionHeading title="MANUFACTURING" highlight="PROCESS" />

                <div className={styles.timeline}>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={styles.step}
                        >
                            <div className={styles.stepNumber}>0{index + 1}</div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDesc}>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </ScrollAnimation>
        </section>
    );
}
