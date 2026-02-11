
import axiosInstance from "./axiosConfig";

function textToSlug(text) {
  return text
    .toString()                      // Make sure it's a string
    .toLowerCase()                   // Convert to lowercase
    .normalize('NFD')                // Normalize to NFD form
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics/accents
    .replace(/[^a-z0-9]+/g, '-')     // Replace non-alphanumeric with dashes
    .replace(/^-+|-+$/g, '')         // Trim dashes from start and end
    .replace(/-+/g, '-');            // Replace multiple dashes with one
}


const uploadFile = async (file, folder, endpoint, userPrefix) => {
    try {
        userPrefix = textToSlug(userPrefix);
        if (!file) {
            return { success: false, error: "File upload failed" };
        }

        const formData = new FormData();
        formData.append("file", file);

        const uploadEndpoint = `${endpoint}?prefix=${encodeURIComponent(
            userPrefix
        )}&folder=${encodeURIComponent(folder)}`;

        const response = await axiosInstance.post(uploadEndpoint, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.data.success) {
            return { success: true, fileName: response.data.fileName };
        } else {
            return { success: false, error: "File upload failed" };
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        return { success: false, error: "An error occurred during file upload" };
    }
};

export default uploadFile;
