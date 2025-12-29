'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            suppressHydrationWarning
          />
        </div>

        {/* Desktop Navigation */}
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
          <li>
            <Link
              href="/products"
              className={`${styles.navLink} ${pathname.startsWith('/products') ? styles.active : ''}`}
            >
              Products
            </Link>
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

        {/* Desktop Contact Button */}
        <Link href="/contact" className={`${styles.contactButton} ${styles.desktopOnly}`}>
          <span>📞</span> Contact
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className={styles.hamburgerButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen1 : ''}`}></span>
          <span className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen2 : ''}`}></span>
          <span className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen3 : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li>
            <Link
              href="/"
              className={`${styles.mobileNavLink} ${pathname === '/' ? styles.active : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`${styles.mobileNavLink} ${pathname === '/about' ? styles.active : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className={`${styles.mobileNavLink} ${pathname.startsWith('/products') ? styles.active : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/infrastructure"
              className={`${styles.mobileNavLink} ${pathname === '/infrastructure' ? styles.active : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Infrastructure
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`${styles.mobileNavLink} ${pathname === '/contact' ? styles.active : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
