'use client';

import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'outline';
    radius?: 'full' | 'md';
    size?: 'md' | 'sm';
    href?: string;
    className?: string; // Allow custom classes for positioning/margins
    fullWidth?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    radius = 'full',
    size = 'md',
    href,
    className = '',
    fullWidth = false,
    ...props
}: ButtonProps) {
    const classNames = [
        styles.button,
        styles[variant],
        styles[`rounded${radius.charAt(0).toUpperCase() + radius.slice(1)}`],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        className
    ].filter(Boolean).join(' ');

    if (href) {
        return (
            <Link href={href} className={classNames}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classNames} {...props}>
            {children}
        </button>
    );
}
