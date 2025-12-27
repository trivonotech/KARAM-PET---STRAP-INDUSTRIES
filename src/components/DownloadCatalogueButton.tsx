'use client';

import { useSiteConfig } from '../context/SiteConfigContext';
import styles from './DownloadCatalogueButton.module.css';

export default function DownloadCatalogueButton() {
    const { config } = useSiteConfig();

    if (config.catalogueUrl) {
        return (
            <a
                href={config.catalogueUrl}
                download="KARAM-PET-STRAP-INDUSTRIES--Catalogue.pdf"
                className={styles.downloadButton}
                style={{ textDecoration: 'none', display: 'inline-flex' }}
                title="Click to download PDF"
            >
                Download Catalogue ⬇
            </a>
        );
    }

    return (
        <button
            className={styles.downloadButton}
            onClick={() => alert('The catalogue is currently being updated. Please check back soon!')}
            title="Catalogue unavailable"
        >
            Download Catalogue ⬇
        </button>
    );
}
