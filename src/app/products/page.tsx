import Image from 'next/image';
import React from 'react';
import styles from './page.module.css';
import DownloadCatalogueButton from '@/components/ui/DownloadCatalogueButton';
import ScrollAnimation from '@/components/animations/ScrollAnimation';

// Type definitions for product data
interface Spec {
    label: string;
    value: string | React.ReactNode;
}

interface Product {
    id: string;
    title: string;
    specs: Spec[];
    imageSrc: string;
}

// Data extracted from user images
const products: Product[] = [
    {
        id: 'pet-strap',
        title: 'PET POLYESTER STRAPPING ROLLS ( PET STRAP ) MANUFACTURER',
        imageSrc: '/hero-bg.png', // Placeholder
        specs: [
            { label: 'Material :', value: 'PET-Polyester' },
            { label: 'Available Widths :', value: '12mm to 19mm In Width Options Available' },
            { label: 'Thickness Range :', value: '0.6mm to 1.27mm' },
            { label: 'Core Diameter :', value: '406mm (OD), 152mm (Width) & 203mm (OD), 165mm (Width)' },
            { label: 'Core Weight :', value: '1.0 Kg' },
            { label: 'Standard Packing :', value: '20 kg, 25 kg Net Weight' },
            { label: 'Breaking Strength :', value: '250kg - 950kg' },
            { label: 'Printing :', value: 'Sterio Printing Available' },
        ]
    },
    {
        id: 'pp-strap',
        title: 'POLY PROPYLENE STRAPPING ( PP STRAP ) MANUFACTURER',
        imageSrc: '/hero-bg.png', // Placeholder
        specs: [
            { label: 'Material :', value: 'PP - (Polypropylene)' },
            { label: 'Available Widths :', value: '9mm to 19mm In Width Options Available' },
            { label: 'Thickness Range :', value: '0.6mm to 1.0mm' },
            { label: 'Breaking Strength :', value: '50kg to 200kg' },
            { label: 'Printing :', value: 'Sterio Printing Available' },
            { label: 'Automatic All Grade :', value: 'Core: 203mm (OD), 187mm (Width) | Weight: 700gm | Packing: 8kg' },
            { label: 'Semi Automatic All Grade :', value: 'Core: 203mm/76mm (OD), 165mm (Width) | Weight: 150/600/700gms | Packing: 3kg' },
        ]
    },
    {
        id: 'cord-strap',
        title: 'CORDED POLYESTER STRAPPING ( CORD STRAP ) SUPLLIER',
        imageSrc: '/hero-bg.png', // Placeholder
        specs: [
            { label: 'Material :', value: 'Polyester Filaments' },
            { label: 'Available Widths :', value: '13mm, 16mm, 19mm, 25mm, 32mm' },
            { label: 'Available Lengths :', value: '100m up to 1100m' },
            { label: 'Breaking Strain :', value: '375kg to 2000kg' },
            { label: 'Description :', value: 'Innovative material for securing heavy pallets and bulky industrial loads.' },
        ]
    },
    {
        id: 'buckles-seals',
        title: 'BUCKLES AND SEALS FOR STRAPPING SUPPLIER',
        imageSrc: '/hero-bg.png', // Placeholder
        specs: [
            { label: 'Galvanized Buckles :', value: 'Sizes: 13mm, 16mm, 19mm, 25mm, 32mm | Material: Galvanized Steel' },
            { label: 'Buckle Quantity :', value: '250, 500 or 1000 per box' },
            { label: 'Strapping Seals :', value: 'Grippers with teeth for increased grip | Sizes: 13mm or 19mm' },
            { label: 'Seals Strength :', value: 'Up to 660kg breaking strength' },
            { label: 'Seals Quantity :', value: '2000, 2500 per pack' },
        ]
    },
    {
        id: 'tools',
        title: 'PNEUMATIC STRAPPING TOOL SUPPLIER',
        imageSrc: '/hero-bg.png', // Placeholder
        specs: [
            { label: 'Pneumatic PET Tool :', value: 'AQD 19 | Simple operation, high capacity' },
            { label: 'Battery Operated Tool :', value: 'ITA 20 | Manufactured by ITA using latest technology' },
            { label: 'Key Features :', value: 'User-friendly, high performance, less power consumption' },
        ]
    }
];

export default function ProductsPage() {
    return (
        <main>
            <div className={styles.mainWrapper}>
                <div className={styles.headerSection}>
                    <ScrollAnimation variant="fadeUp" className={styles.headerContent}>
                        <div className={styles.textContent}>
                            <h1 className={styles.title}>OUR <span>PRODUCTS</span></h1>
                            <p className={styles.description}>
                                Explore our comprehensive range of ISO-certified strapping solutions designed for durability, shock absorption, and industrial-grade performance. From PET to PP and Cord straps, we deliver consistent quality for all your packaging needs.
                            </p>
                        </div>
                        <div className={styles.downloadWrapper}>
                            <span className={styles.downloadLabel}>Get Full Product List</span>
                            <DownloadCatalogueButton />
                        </div>
                    </ScrollAnimation>
                </div>

                {products.map((product, index) => (
                    <React.Fragment key={product.id}>
                        <ScrollAnimation
                            variant={index % 2 === 0 ? "slideRight" : "slideLeft"}
                            className={`${styles.productSection} ${index % 2 !== 0 ? styles.reversed : ''}`}
                        >
                            <div className={styles.productInfo}>
                                <h2 className={styles.productTitle}>{product.title}</h2>
                                <table className={styles.specsTable}>
                                    <tbody>
                                        {product.specs.map((spec, i) => (
                                            <tr key={i}>
                                                <td className={styles.specLabel}>{spec.label}</td>
                                                <td className={styles.specValue}>{spec.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles.productImageContainer}>
                                <Image
                                    src={product.imageSrc}
                                    alt={product.title}
                                    fill
                                    className={styles.productImage}
                                    suppressHydrationWarning
                                />
                            </div>
                        </ScrollAnimation>
                        {index < products.length - 1 && <hr className={styles.separator} />}
                    </React.Fragment>
                ))}
            </div>
        </main>
    );
}
