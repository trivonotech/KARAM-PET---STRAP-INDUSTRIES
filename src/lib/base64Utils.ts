/**
 * Converts a file to a Base64 string (Data URI).
 * @param file The file to convert.
 * @returns Promise resolving to the Base64 string.
 */
export const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};
