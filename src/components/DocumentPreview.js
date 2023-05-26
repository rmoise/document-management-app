import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { fetchDocumentPreview } from '../services/api';

const DocumentPreview = ({ documentId }) => {
  const [numPages, setNumPages] = useState(null);
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    // Function to load the document preview
    const loadDocumentPreview = async () => {
      try {
        const response = await fetchDocumentPreview(documentId);
        setPreviewData(response);
        console.log('Preview data:', response); 
      } catch (error) {
        console.error('Error fetching document preview:', error);
      }
    };

    // Load the document preview when the documentId changes
    loadDocumentPreview();
  }, [documentId]);

  console.log('PreviewData state:', previewData);

  return (
    <div>
      <h1>Document Preview</h1>
      {previewData ? (
        <Document
          file={previewData}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={index + 1} pageNumber={index + 1} />
          ))}
        </Document>
      ) : (
        <p>Loading preview...</p>
      )}
    </div>
  );
};

export default DocumentPreview;
