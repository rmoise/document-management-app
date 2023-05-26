  import React, { useState, useEffect } from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import DocumentUpload from './components/DocumentUpload';
  import DocumentPreview from './components/DocumentPreview';
  import DocumentList from './components/DocumentList';
  import { fetchDocuments, uploadDocument } from './services/api';

  function App() {
    const [documents, setDocuments] = useState([]);
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);

    // Fetch the list of documents from the API
    const fetchDocumentList = async () => {
      try {
        const data = await fetchDocuments();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching document list:', error);
      }
    };

    // Fetch the document list when the component mounts
    useEffect(() => {
      fetchDocumentList();
    }, []);

    // Handle the upload of documents
    const handleUpload = async (formData) => {
      try {
        await uploadDocument(formData);
        fetchDocumentList(); // Fetch the updated documents list after successful upload
      } catch (error) {
        console.error('Error uploading documents:', error);
      }
    };

    // Handle the click on a document
    const handleDocumentClick = (document) => {
      setSelectedDocumentId(document.id);
    };

    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mx-auto p-4">
                <DocumentUpload
                  onUpload={handleUpload}
                  fetchDocumentList={fetchDocumentList}
                  documents={documents}
                  pageSize={10}
                  setCurrentPageIndex={(index) => {
                    console.log('setCurrentPageIndex:', index);
                  }}
                />
                <DocumentList
                  documents={documents}
                  fetchDocumentList={fetchDocumentList}
                  onDocumentClick={handleDocumentClick}
                />
              </div>
            }
          />
          <Route path="/document/:id" element={<DocumentPreview />} />
        </Routes>
      </Router>
    );
  }

  export default App;
