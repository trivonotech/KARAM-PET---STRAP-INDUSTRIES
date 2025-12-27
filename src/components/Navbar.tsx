'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

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
          <li>
            <Link
              href="/"
              className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}
            >
              About
            </Link>
          </li>
          <li className={styles.dropdownItem}>
            <Link
              href="/products"
              className={`${styles.navLink} ${pathname.startsWith('/products') ? styles.active : ''}`}
            >
              Products ▾
            </Link>
            <div className={styles.dropdownContent}>
              <Link href="/products/pet-strap">PET Strap</Link>
              <Link href="/products/pp-strap">PP Strap</Link>
              <Link href="/products/cord-strap">Cord Strap</Link>
              <Link href="/products/tools">Tools & Accessories</Link>
            </div>
          </li>
          <li>
            <Link
              href="/infrastructure"
              className={`${styles.navLink} ${pathname === '/infrastructure' ? styles.active : ''}`}
            >
              Infrastructure
            </Link>
          </li>

        </ul>
        <Link href="/contact" className={styles.contactButton}>
          <span>📞</span> Contact
        </Link>
      </div>
    </nav>
  );
}
