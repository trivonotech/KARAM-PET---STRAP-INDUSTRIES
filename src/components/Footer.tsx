import styles from './Footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Column 1: Brand & Address */}
                <div className={styles.brandColumn}>
                    <div className={styles.logoContainer}>
                        <Image src="/logo.png" alt="KARAM PET Logo" fill className={styles.logoImage} objectFit="contain" />
                    </div>

                    <div className={styles.addressGroup}>
                        <h3 className={styles.columnTitle}>Address</h3>
                        <p className={styles.text}>
                            KARAM PET STRAP INDUSTRIES<br />
                            Survey No. 258, Plot No. 03, Captain Polyplast Gate,<br />
                            Near Precision Techno Cast Pvt. Ltd.,<br />
                            Shapar (Veraval), Rajkot — 360024,<br />
                            Gujarat, India.
                        </p>
                    </div>

                    <Link href="/contact">
                        <button className={styles.pricingButton}>
                            Get PET Strap Pricing
                        </button>
                    </Link>
                </div>

                {/* Column 2: Quick Links */}
                <div className={styles.linkColumn}>
                    <h3 className={styles.columnTitle}>Quick Links</h3>
                    <ul className={styles.linkList}>
                        <li><Link href="/" className={styles.linkItem}>Home</Link></li>
                        <li><Link href="/about" className={styles.linkItem}>About</Link></li>
                        <li><Link href="/products" className={styles.linkItem}>Products</Link></li>
                    </ul>
                </div>



                {/* Column 4: Follow On */}
                <div className={styles.linkColumn}>
                    <h3 className={styles.columnTitle}>Follow On</h3>
                    <div className={styles.socialIcons}>
                        {/* Facebook Icon */}
                        <a href="#" className={styles.iconLink} aria-label="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        {/* Instagram Icon */}
                        <a href="#" className={styles.iconLink} aria-label="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
