import axios from 'axios';

// Define the base URL for the backend API
const BASE_URL = 'https://localhost:5000/api';

// Function to fetch the list of documents
export const fetchDocuments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/documents`);
    const documents = response.data;

    // Add the FileType property to each document
    const documentsWithFileType = documents.map((document) => ({
      ...document,
      FileType: document.fileType,
    }));

    // Modify the documents array to include the imageUrl and downloads properties
    const documentsWithImageUrlAndDownloads = await Promise.all(
      documentsWithFileType.map(async (document) => {
        const imageUrl = `${BASE_URL}/documents/${document.id}/preview`;
        const downloadCount = await fetchDownloadCount(document.id);

        return {
          ...document,
          imageUrl,
          downloads: downloadCount || 0,
        };
      })
    );

    return documentsWithImageUrlAndDownloads;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

// Function to fetch the download count for a document
export const fetchDownloadCount = async (documentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/documents/${documentId}/download-count`);
    return response.data.downloadCount;
  } catch (error) {
    console.error('Error fetching download count:', error);
    throw error;
  }
};

// Function to upload a document
export const uploadDocument = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/documents/upload`, formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    if (error.response) {
      // Server responded with an error
      const errorResponse = error.response.data;
      console.log('Validation errors:', errorResponse.errors);
      throw errorResponse;
    } else {
      // Request was not sent or no response received
      throw error.message;
    }
  }
};

// Function to delete a document
export const deleteDocument = async (documentId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/documents/${documentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// Function to generate a share link for a document
export const generateShareLink = async (documentId, validForHours, shareLinkExpiresInHours) => {
  try {
    const response = await axios.get(`${BASE_URL}/documents/${documentId}/share`, {
      params: {
        validForHours,
        shareLinkExpiresInHours,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error generating share link:', error);
    throw error;
  }
};


// Function to generate a download link for a document
export const generateDownloadLink = async (documentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/documents/${documentId}/download`, {
      responseType: 'blob',
    });

    const downloadLink = response.data;
    const url = URL.createObjectURL(downloadLink);

    return url;
  } catch (error) {
    console.error('Error generating download link:', error);
    throw error;
  }
};

// Function to fetch the document preview data
export const fetchDocumentPreview = async (documentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/documents/${documentId}/preview`, {
      responseType: 'blob',
    });

    const blob = response.data;
    const previewData = URL.createObjectURL(blob);

    return previewData;
  } catch (error) {
    console.error('Error fetching document preview:', error);
    throw error;
  }
};
