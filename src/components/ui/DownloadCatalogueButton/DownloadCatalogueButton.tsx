'use client';

import styles from './DownloadCatalogueButton.module.css';

export default function DownloadCatalogueButton() {
    return (
        <a
            href="/KARAM-PET-Catalogue.pdf"
            download="KARAM-PET-Catalogue.pdf"
            className={styles.downloadButton}
            style={{ textDecoration: 'none', display: 'inline-flex' }}
            title="Click to download PDF"
        >
            Download Catalogue ⬇
        </a>
    );
}
