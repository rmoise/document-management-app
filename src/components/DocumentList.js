import React, { useEffect, useState } from 'react';
import { deleteDocument, generateShareLink } from '../services/api';
import DocumentTable from './DocumentTable';
import DocumentModals from './DocumentModals';

/**
 * DocumentList component displays a list of documents and provides functionality to interact with them.
 *
 * @param {function} fetchDocumentList - Function to fetch the list of documents.
 * @param {array} documents - List of documents.
 * @param {function} handleDownload - Function to handle document download.
 */
function DocumentList({ fetchDocumentList, documents, handleDownload }) {
  // State variables
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [shareLink, setShareLink] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [expirationTime, setExpirationTime] = useState(1);
  const [validForHours, setValidForHours] = useState(1);

  useEffect(() => {
    // Fetch the initial document list
    fetchDocumentList();
  }, []);

  // Handle document click event
  const handleDocumentClick = (document) => {
    // Handle document click
  };

  // Generate a share link for the selected document
  const handleGenerateShareLink = async (document) => {
    if (!document || !document.id) {
      console.error('Invalid document object or missing id property');
      return;
    }

    try {
      setSelectedDocument(document);
      const response = await generateShareLink(document.id, validForHours);
      setShareLink(response.shareLink);
      setExpirationTime(validForHours * 60 * 60 * 1000);
      setShowShareModal(true);
    } catch (error) {
      console.error('Error generating share link:', error);
    }
  };

  // Delete the selected document
  const handleDelete = async () => {
    if (selectedDocument) {
      await deleteDocument(selectedDocument.id);
      await fetchDocumentList();
      setShowDeleteModal(false);
      setSelectedDocument(null);
    }
  };

  // Set the number of pages for the document
  const handleDocumentLoadSuccess = ({ numPages }, document) => {
    document.numPages = numPages;
  };

  // Render information about the selected document
  const renderSelectedDocument = () => {
    if (selectedDocument) {
      const { name, imageUrl } = selectedDocument;
      return (
        <div className="mt-6 flex flex-col items-center">
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">{name}</h4>
          {imageUrl && <img src={imageUrl} alt={name} className="mt-2 rounded-lg" style={{ maxWidth: '100px' }} />}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Document Table */}
      <DocumentTable
        documents={documents}
        fetchDocumentList={fetchDocumentList}
        handleDocumentClick={handleDocumentClick}
        handleDownload={handleDownload}
        handleDelete={handleDelete}
        setShowDeleteModal={setShowDeleteModal}
        setShowShareModal={setShowShareModal}
        handleDocumentLoadSuccess={handleDocumentLoadSuccess}
        setSelectedDocument={setSelectedDocument}
        handleGenerateShareLink={handleGenerateShareLink}
      />
      {/* Document Modals */}
      <DocumentModals
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        selectedDocument={selectedDocument}
        setExpirationTime={setExpirationTime}
        expirationTime={expirationTime}
        validForHours={validForHours}
        setValidForHours={setValidForHours}
        shareLink={shareLink}
        handleDelete={handleDelete}
        handleDownload={handleDownload}
        renderSelectedDocument={renderSelectedDocument}
        handleGenerateShareLink={handleGenerateShareLink}
      />
    </div>
  );
}

export default DocumentList;
