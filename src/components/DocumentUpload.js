import React, { useState, useRef } from 'react';
import { Button } from 'flowbite-react';

const DocumentUpload = ({ onUpload, fetchDocumentList, documents, pageSize, setCurrentPageIndex }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const files = event.target.files;
    const newSelectedFiles = Array.from(files);
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...newSelectedFiles]);
  };

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...event.dataTransfer.files]);
  };

  // Handle upload of selected files
  const handleUpload = async () => {
    try {
      setIsUploading(true);

      for (let i = 0; i < selectedFiles.length; i++) {
        const formData = new FormData();
        formData.append('File', selectedFiles[i]);
        formData.append('Name', selectedFiles[i].name);
        formData.append('FileType', selectedFiles[i].type);

        console.log('Uploading file:', selectedFiles[i].name);

        await onUpload(formData);

        console.log('File uploaded:', selectedFiles[i].name);
      }

      setIsUploading(false);
      setUploadSuccess(true);

      setSelectedFiles([]);

      // Reset file input to default state
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Clear success message after 2 seconds
      setTimeout(() => {
        setUploadSuccess(false);
      }, 2000);

      // Fetch the updated document list
      fetchDocumentList().then(() => {
        const totalPages = Math.ceil((documents.length + selectedFiles.length) / pageSize);
        setCurrentPageIndex(totalPages - 1);
      });
    } catch (error) {
      console.error('Error uploading documents:', error);
    }
  };

  // Handle canceling the upload and resetting state
  const handleCancel = () => {
    setSelectedFiles([]);
    setUploadSuccess(false);
  };

  return (
    <div>
      <h2 className="text-xl mt-6 font-bold mb-4">Document List</h2>
      <div
        className="flex items-center justify-center w-full"
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={handleDrop}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Uploading...</p>
              </div>
            ) : uploadSuccess ? (
              <div className="flex flex-col items-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Upload successful!</p>
              </div>
            ) : (
              <>
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                {selectedFiles.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedFiles.length} file(s) selected
                    </p>
                    <ul className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedFiles.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
            disabled={isUploading || uploadSuccess}
          />
          {!isUploading && !uploadSuccess && selectedFiles.length > 0 && (
            <div className="flex justify-center space-x-4 mb-6">
              <Button variant="secondary" onClick={handleUpload}>
                Upload
              </Button>
              <Button className="bg-gray-400 hover:bg-gray-300 text-gray-800" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default DocumentUpload;
