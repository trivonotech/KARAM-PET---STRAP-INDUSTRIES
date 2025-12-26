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

interface SiteConfig {
    industryLogos: string[];
    clientLogos: string[];
    homeContent: HomeContent;
}

interface SiteConfigContextType {
    config: SiteConfig;
    updateIndustryLogos: (urls: string[]) => void;
    updateClientLogos: (urls: string[]) => void;
    updateHomeContent: (content: HomeContent) => void;
}

const defaultLogos = Array(7).fill('');
const defaultClientLogos = Array(18).fill('');

const defaultHomeContent: HomeContent = {
    heroTitle: 'Manufacturer Of High-Precision\n[Product Type] For Industrial\nApplications',
    heroSubtitle: 'Serving Automotive, Construction, And OEM Clients With ISO-Certified Manufacturing And Scalable Production.',
    stats: [
        { value: '15+', label: 'Years\nExperience' },
        { value: '9001:2015', label: 'Iso' },
        { value: '15+', label: 'Monthly\nCapacity' },
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
                    const data = docSnap.data() as Partial<SiteConfig>;
                    setConfig(prev => ({
                        ...prev,
                        ...data,
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

    const updateClientLogos = async (urls: string[]) => {
        const docRef = doc(db, 'settings', 'global');
        await setDoc(docRef, { clientLogos: urls }, { merge: true });
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
