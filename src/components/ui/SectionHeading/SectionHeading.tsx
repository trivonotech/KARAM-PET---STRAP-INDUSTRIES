import styles from './SectionHeading.module.css';

import ScrollAnimation from '@/components/animations/ScrollAnimation';

interface SectionHeadingProps {
    title: string;
    highlight: string;
    className?: string;
}

export default function SectionHeading({ title, highlight, className = '' }: SectionHeadingProps) {
    return (
        <ScrollAnimation variant="fadeUp" className={`${styles.heading} ${className}`}>
            <span className={styles.blackText}>{title}</span>{' '}
            <span className={styles.orangeText}>{highlight}</span>
        </ScrollAnimation>
    );
}
