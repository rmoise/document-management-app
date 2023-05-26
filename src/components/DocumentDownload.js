import React from 'react';
import { generateDownloadLink, fetchDownloadCount } from '../services/api';

/**
 * DocumentDownload component handles the download functionality for a document.
 *
 * @param {string} documentId - The ID of the document to download.
 * @param {string} name - The name of the document.
 * @param {function} onDownload - Callback function to be called after the document is downloaded.
 */
const DocumentDownload = ({ documentId, name, onDownload }) => {
  /**
   * Handle the download of the document.
   */
  const handleDownload = async () => {
    try {
      // Generate the download link for the document
      const downloadLink = await generateDownloadLink(documentId);

      if (!downloadLink) {
        console.error('Invalid download link:', downloadLink);
        return;
      }

      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = name;
      link.click();

      // Fetch the updated download count after the download
      const updatedDownloadCount = await fetchDownloadCount(documentId);

      // Call the onDownload callback if it's a function
      if (typeof onDownload === 'function') {
        onDownload(documentId, updatedDownloadCount);
      }
    } catch (error) {
      console.error('Error generating download link:', error);
    }
  };

  return (
    <button className="text-blue-600 dark:text-blue-500 hover:underline mr-2" onClick={handleDownload}>
      Download
    </button>
  );
};

export default DocumentDownload;
