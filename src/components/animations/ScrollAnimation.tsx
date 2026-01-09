'use client';

import { motion } from 'framer-motion';

type AnimationVariant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn';

interface ScrollAnimationProps {
    children: React.ReactNode;
    variant?: AnimationVariant;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

export default function ScrollAnimation({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = 0.5,
    className = '',
    once = false
}: ScrollAnimationProps) {
    const variants = {
        fadeUp: {
            hidden: { opacity: 0, y: 40, transition: { duration: 0 } },
            visible: { opacity: 1, y: 0, transition: { duration, delay, ease: "easeOut" } },
        },
        fadeIn: {
            hidden: { opacity: 0, transition: { duration: 0 } },
            visible: { opacity: 1, transition: { duration, delay, ease: "easeOut" } },
        },
        slideLeft: {
            hidden: { opacity: 0, x: -50, transition: { duration: 0 } },
            visible: { opacity: 1, x: 0, transition: { duration, delay, ease: "easeOut" } },
        },
        slideRight: {
            hidden: { opacity: 0, x: 50, transition: { duration: 0 } },
            visible: { opacity: 1, x: 0, transition: { duration, delay, ease: "easeOut" } },
        },
        scaleIn: {
            hidden: { opacity: 0, scale: 0.8, transition: { duration: 0 } },
            visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: "easeOut" } },
        }
    };

    return (
        <motion.div
            variants={variants[variant]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-50px" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
