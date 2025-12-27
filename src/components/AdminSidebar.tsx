import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import styles from './AdminSidebar.module.css';

const AdminSidebar = () => {
    const { user, logout } = useAuth();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoContainer}>
                {/* Placeholder for Logo - possibly an SVG or Image */}
                <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)', borderRadius: 8 }}></div>
                <span className={styles.logoText}>KARAM ADMIN</span>
            </div>

            <nav className={styles.nav}>
                <Link href="/admin" className={`${styles.navItem} ${styles.active}`}>
                    <span>🏠</span>
                    <span>Home Page</span>
                </Link>
            </nav>

            <div className={styles.userSection}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div className={styles.avatar}>
                        {user?.email ? user.email[0].toUpperCase() : 'A'}
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>
                            {user?.displayName || 'Admin'}
                        </span>
                        <span className={styles.userRole}>Administrator</span>
                    </div>
                </div>
                <button onClick={logout} className={styles.logoutBtn}>
                    Log Out
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
