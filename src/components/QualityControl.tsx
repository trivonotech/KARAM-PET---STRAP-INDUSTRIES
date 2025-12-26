import styles from './QualityControl.module.css';
import Image from 'next/image';

export default function QualityControl() {
    const images = [
        { src: "/hero-bg.png", alt: "Testing Machine 1" },
        { src: "/hero-bg.png", alt: "Testing Process" },
        { src: "/hero-bg.png", alt: "Strap Testing" },
        { src: "/hero-bg.png", alt: "Warehouse Stock" },
    ];

    return (
        <section className={styles.qcSection}>
            <div className={styles.container}>
                <h2 className={styles.heading}>
                    <span className={styles.blackText}>QUALITY CONTROL &</span><br />
                    <span className={styles.orangeText}>CERTIFICATIONS</span>
                </h2>

                <div className={styles.grid}>
                    {images.map((img, index) => (
                        <div key={index} className={styles.imageWrapper}>
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className={styles.qcImage}
                            />
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}
