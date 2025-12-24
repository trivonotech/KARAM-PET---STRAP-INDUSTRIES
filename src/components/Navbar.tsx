import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="KARAM PET Logo"
            fill
            className={styles.logoImage}
            priority
          />
        </div>
        <ul className={styles.navLinks}>
          <li><a href="/" className={`${styles.navLink} ${styles.active}`}>Home</a></li>
          <li><a href="#" className={styles.navLink}>About</a></li>
          <li><a href="/products" className={styles.navLink}>Products</a></li>
          <li><a href="#" className={styles.navLink}>Industries</a></li>
          <li><a href="#" className={styles.navLink}>Infrastructure</a></li>
        </ul>
        <a href="#" className={styles.contactButton}>
          <span>📞</span> Contact
        </a>
      </div>
    </nav>
  );
}
