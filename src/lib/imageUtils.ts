// Converts file to a specialized small WebP Base64 string for Firestore storage
export const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                // Strict size limit for Firestore (Max 150px width)
                const MAX_WIDTH = 150;
                let width = img.width;
                let height = img.height;

                if (width > MAX_WIDTH) {
                    height = height * (MAX_WIDTH / width);
                    width = MAX_WIDTH;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                // Convert to Base64 String (WebP, 0.7 quality)
                const dataUrl = canvas.toDataURL('image/webp', 0.7);
                resolve(dataUrl);
            };

            img.onerror = (error) => reject(error);
        };

        reader.onerror = (error) => reject(error);
    });
};
// Keeping original for backward compatibility if needed, but we will use the above.
export const convertImageToWebP = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        // ... strict legacy implementation or just reuse logic ...
        // For now, let's just make the above the primary tool.
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800; // Legacy larger size
                let width = img.width;
                let height = img.height;
                if (width > MAX_WIDTH) {
                    height = height * (MAX_WIDTH / width);
                    width = MAX_WIDTH;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob(blob => normalizeBlob(blob, resolve, reject), 'image/webp', 0.8);
                }
            }
        }
    });
};

function normalizeBlob(blob: Blob | null, resolve: Function, reject: Function) {
    if (blob) resolve(blob);
    else reject(new Error('Canvas to Blob failed'));
}
