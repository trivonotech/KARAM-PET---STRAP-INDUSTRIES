import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
    title: string;
    highlight: string;
    className?: string;
}

export default function SectionHeading({ title, highlight, className = '' }: SectionHeadingProps) {
    return (
        <h2 className={`${styles.heading} ${className}`}>
            <span className={styles.blackText}>{title}</span>{' '}
            <span className={styles.orangeText}>{highlight}</span>
        </h2>
    );
}
