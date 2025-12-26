import Link from 'next/link';
import styles from './DashboardSidebar.module.css';

const DashboardSidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoContainer}>
                {/* Placeholder for Logo - possibly an SVG or Image */}
                <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)', borderRadius: 8 }}></div>
                <span className={styles.logoText}>KARAM ADMIN</span>
            </div>

            <nav className={styles.nav}>
                <Link href="/dashboard" className={`${styles.navItem} ${styles.active}`}>
                    <span>🏠</span>
                    <span>Home Page</span>
                </Link>
            </nav>

            <div className={styles.userSection}>
                <div className={styles.avatar}>YA</div>
                <div className={styles.userInfo}>
                    <span className={styles.userName}>Yash Admin</span>
                    <span className={styles.userRole}>Administrator</span>
                </div>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
