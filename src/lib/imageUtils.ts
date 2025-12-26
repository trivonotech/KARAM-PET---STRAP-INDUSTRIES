export const convertImageToWebP = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                // Calculate new dimensions (optional: max width 800px)
                const MAX_WIDTH = 800;
                const scaleSize = MAX_WIDTH / img.width;
                // Only scale down if width > 800
                const width = (img.width > MAX_WIDTH) ? MAX_WIDTH : img.width;
                const height = (img.width > MAX_WIDTH) ? (img.height * scaleSize) : img.height;

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Conversion to WebP failed'));
                    }
                }, 'image/webp', 0.8); // 0.8 quality
            };

            img.onerror = (error) => reject(error);
        };

        reader.onerror = (error) => reject(error);
    });
};
