import Image from 'next/image';
import React from 'react';
import styles from './page.module.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DownloadCatalogueButton from '@/components/DownloadCatalogueButton';

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
            { label: 'Material :', value: 'PET-Polyester (100% Polyethylene Terephthalate)' },
            { label: 'Available Widths :', value: '11mm-25mm In Width Option Available' },
            { label: 'Thickness Range :', value: '0.6mm-1.3mm' },
            { label: 'Core Diameter :', value: '406mm (OD), 152mm (Width) As 1.0 Kg' },
            { label: 'Core Weight :', value: '203mm (OD), 165mm (Width) As 0.5 Kg' },
            {
                label: 'Color Options :',
                value: (
                    <div className={styles.colorOptions}>
                        <div className={styles.colorSwatch} style={{ backgroundColor: '#2e7d32' }}></div> {/* Dark Green */}
                        <div className={styles.colorSwatch} style={{ backgroundColor: '#4caf50' }}></div> {/* Green */}
                        <div className={styles.colorSwatch} style={{ backgroundColor: '#8bc34a' }}></div> {/* Light Green */}
                        <div className={styles.colorSwatch} style={{ backgroundColor: '#cddc39' }}></div> {/* Lime */}
                        <div className={styles.colorSwatch} style={{ backgroundColor: '#3f51b5' }}></div> {/* Indigo */}
                        <div className={styles.colorSwatch} style={{ backgroundColor: '#03a9f4' }}></div> {/* Light Blue */}
                        <div className={styles.colorSwatch} style={{ backgroundColor: '#9e9e9e' }}></div> {/* Grey */}
                        <div className={styles.colorSwatch} style={{ backgroundColor: '#ffffff' }}></div> {/* White */}
                        <div className={styles.colorSwatch} style={{ backgroundColor: '#e0e0e0' }}></div> {/* Light Grey */}
                        <div className={styles.colorSwatch} style={{ backgroundColor: '#ffeb3b' }}></div> {/* Yellow */}
                        <div className={styles.colorSwatch} style={{ backgroundColor: '#f44336' }}></div> {/* Red */}
                        <div className={styles.colorSwatch} style={{ backgroundColor: '#ff9800' }}></div> {/* Orange */}
                    </div>
                )
            },
            { label: 'Breaking Strength :', value: 'Up to 200kg-1090kg' },
        ]
    },
    {
        id: 'pp-strap',
        title: 'POLY PROPYLENE STRAPPING ( PP STRAP ) MANUFACTURER',
        imageSrc: '/hero-bg.png', // Placeholder
        specs: [
            { label: 'Material :', value: 'PP - (Polypropylene)' },
            { label: 'Available Widths :', value: '9mm-19mm In Width Options Available' },
            { label: 'Thickness Range :', value: '0.6mm-1.0mm' },
            { label: 'Printing :', value: 'Rubber Stereo Printing Available' },
            { label: 'Color Options :', value: 'Green/Black/Custom' },
            { label: 'Breaking Strength :', value: '50kg-200kg' },
        ]
    },
    {
        id: 'cord-strap',
        title: 'CORDED POLYESTER STRAPPING ( CORD STRAP ) SUPLLIER',
        imageSrc: '/hero-bg.png', // Placeholder
        specs: [
            { label: 'Material :', value: 'Polyester Filaments' },
            { label: 'Available Widths :', value: '13mm | 16mm | 19mm | 25mm | 32mm' },
            { label: 'Meters Per Roll :', value: '1100 | 850 | 600 | 500 | 300' },
            { label: 'Break Load (KgF) :', value: '215 Kg | 300 Kg | 360 Kg | 730 Kg | 1270 Kg' },
            { label: 'Thickness Range :', value: '0.5 mm-1.3mm' },
            { label: 'Rolls Per Box :', value: '2' },
            { label: 'Pack / Box :', value: '1' },
        ]
    },
    {
        id: 'buckles-seals',
        title: 'BUCKLES AND SEALS FOR STRAPPING SUPPLIER',
        imageSrc: '/hero-bg.png', // Placeholder
        specs: [
            { label: 'Buckle Size :', value: '13mm | 16mm | 19mm | 25mm | 32mm' },
            { label: 'Pieces Per Box :', value: '2000 | 1500 | 1000 | 500 | 250' },
            { label: 'Pack / Box :', value: '1' },
        ]
    },
    {
        id: 'tools',
        title: 'PNEUMATIC STRAPPING TOOL SUPPLIER',
        imageSrc: '/hero-bg.png', // Placeholder
        specs: [
            { label: 'Material :', value: 'Pet' },
            { label: 'Available Widths :', value: '9mm/12mm/16mm (Adjustable)' },
            { label: 'Thickness Range :', value: '0.5 mm-1.3mm' },
            { label: 'Finish :', value: 'Embossed/Smooth' },
            { label: 'Color Options :', value: 'Green/Black/Custom' },
            { label: 'Core Size :', value: '203 mm' },
            { label: 'Breaking Strength :', value: 'Up to 600 Kg' },
        ]
    }
];

export default function ProductsPage() {
    return (
        <main>
            <Navbar />
            <div className={styles.mainWrapper}>
                <div className={styles.headerSection}>
                    <div className={styles.headerContent}>
                        <div className={styles.textContent}>
                            <h1 className={styles.title}>OUR <span>PRODUCTS</span></h1>
                            <p className={styles.description}>
                                Explore our comprehensive range of ISO-certified strapping solutions designed for durability, shock absorption, and industrial-grade performance. From PET to PP and Cord straps, we deliver consistent quality for all your packaging needs.
                            </p>
                        </div>
                        <DownloadCatalogueButton />
                    </div>
                </div>

                {products.map((product, index) => (
                    <React.Fragment key={product.id}>
                        <section
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
                                />
                            </div>
                        </section>
                        {index < products.length - 1 && <hr className={styles.separator} />}
                    </React.Fragment>
                ))}
            </div>
            <Footer />
        </main>
    );
}
