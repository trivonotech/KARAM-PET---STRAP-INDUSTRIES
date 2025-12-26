'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface StatItem {
    value: string;
    label: string;
}

interface HomeContent {
    heroTitle: string;
    heroSubtitle: string;
    stats: StatItem[];
}

export interface ClientLogo {
    url: string;
    isFavorite: boolean;
}

interface SiteConfig {
    industryLogos: string[]; // Keeping for legacy/compatibility if needed
    clientLogos: ClientLogo[];
    homeContent: HomeContent;
}

interface SiteConfigContextType {
    config: SiteConfig;
    updateIndustryLogos: (urls: string[]) => void;
    updateClientLogos: (logos: ClientLogo[]) => void;
    updateHomeContent: (content: HomeContent) => void;
}

const defaultLogos = Array(7).fill('');
const defaultClientLogos: ClientLogo[] = [];

const defaultHomeContent: HomeContent = {
    heroTitle: 'Manufacturer Of High-Performance\nPET, PP & Cord Strapping Solutions',
    heroSubtitle: 'Serving Steel, Aluminium, Packaging And Export Industries With Durable, Shock-Absorbent And Machine-Compatible Strapping Made Using 100% Recycled Raw Materials.',
    stats: [
        { value: '14+', label: 'Years\nExperience' },
        { value: '9001:2015', label: 'Iso' },
        { value: '11 T', label: 'Monthly\nCapacity' },
    ]
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<SiteConfig>({
        industryLogos: defaultLogos,
        clientLogos: defaultClientLogos,
        homeContent: defaultHomeContent,
    });

    useEffect(() => {
        // Real-time listener for configuration changes
        const docRef = doc(db, 'settings', 'global');
        const unsubscribe = onSnapshot(
            docRef,
            (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();

                    // Normalize clientLogos for backward compatibility (string[] -> ClientLogo[])
                    let normalizedClientLogos: ClientLogo[] = [];
                    if (data.clientLogos) {
                        normalizedClientLogos = data.clientLogos.map((item: any) => {
                            if (typeof item === 'string') {
                                return { url: item, isFavorite: false };
                            }
                            return item;
                        });
                    }

                    setConfig(prev => ({
                        ...prev,
                        ...data,
                        clientLogos: normalizedClientLogos,
                        homeContent: { ...prev.homeContent, ...(data.homeContent || {}) }
                    }));
                }
            },
            (error) => {
                console.error("Firestore Listener Error:", error);
                // This prevents the "Uncaught Error" meant for the user
            }
        );

        return () => unsubscribe();
    }, []);

    const updateIndustryLogos = async (urls: string[]) => {
        const docRef = doc(db, 'settings', 'global');
        await setDoc(docRef, { industryLogos: urls }, { merge: true });
    };

    const updateClientLogos = async (logos: ClientLogo[]) => {
        const docRef = doc(db, 'settings', 'global');
        await setDoc(docRef, { clientLogos: logos }, { merge: true });
    };

    const updateHomeContent = async (content: HomeContent) => {
        const docRef = doc(db, 'settings', 'global');
        await setDoc(docRef, { homeContent: content }, { merge: true });
    };

    return (
        <SiteConfigContext.Provider value={{ config, updateIndustryLogos, updateClientLogos, updateHomeContent }}>
            {children}
        </SiteConfigContext.Provider>
    );
}

export function useSiteConfig() {
    const context = useContext(SiteConfigContext);
    if (context === undefined) {
        throw new Error('useSiteConfig must be used within a SiteConfigProvider');
    }
    return context;
}
