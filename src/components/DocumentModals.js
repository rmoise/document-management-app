import React from 'react';

/**
 * DocumentModals component displays modal dialogs for deleting and sharing documents.
 *
 * @param {boolean} showDeleteModal - Flag indicating whether the delete modal should be shown.
 * @param {function} setShowDeleteModal - Function to control the visibility of the delete modal.
 * @param {boolean} showShareModal - Flag indicating whether the share modal should be shown.
 * @param {function} setShowShareModal - Function to control the visibility of the share modal.
 * @param {object} selectedDocument - The selected document object.
 * @param {string} shareLink - The share link for the document.
 * @param {function} handleDelete - Function to handle the deletion of the document.
 * @param {function} handleGenerateShareLink - Function to generate the share link for the document.
 * @param {function} handleShareLink - Function to handle the sharing of the document.
 * @param {function} renderSelectedDocument - Function to render information about the selected document.
 * @param {number} expirationTime - The expiration time for the share link in milliseconds.
 * @param {function} setExpirationTime - Function to set the expiration time for the share link.
 * @param {number} validForHours - The validity period for the share link in hours.
 * @param {function} setValidForHours - Function to set the validity period for the share link.
 */
function DocumentModals({
  showDeleteModal,
  setShowDeleteModal,
  showShareModal,
  setShowShareModal,
  selectedDocument,
  shareLink,
  handleDelete,
  handleGenerateShareLink,
  handleShareLink,
  renderSelectedDocument,
  expirationTime,
  setExpirationTime,
  validForHours,
  setValidForHours,
}) {
  return (
    <>
      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto"
        >
          <div className="relative w-full max-w-md p-4 mx-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={() => setShowDeleteModal(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mx-auto mb-4 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Delete Document</h3>
                <p className="text-gray-600 dark:text-gray-400">Are you sure you want to delete this document?</p>
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="mr-2 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    data-modal-hide="popup-modal"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Share Modal */}
      {showShareModal && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto"
        >
          <div className="relative w-full max-w-md p-4 mx-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={() => setShowShareModal(false)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mx-auto mb-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Share Link</h3>
                <p className="text-gray-600 dark:text-gray-400">Copy the link below to share the document:</p>
                {renderSelectedDocument()}
                <div className="flex flex-col items-center mt-6">
                  <div className="flex items-center w-full p-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200">
                    <input
                      type="number"
                      value={validForHours}
                      onChange={(e) => setValidForHours(parseInt(e.target.value))}
                      className="w-full p-2 pr-6 text-sm text-gray-700 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                      placeholder="Set expiration time"
                    />
                    <span className="ml-2 text-gray-500">hours</span>
                  </div>
                  <button
                    type="button"
                    className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => handleGenerateShareLink(selectedDocument)}
                  >
                    Generate Share Link
                  </button>
                  {shareLink && (
                    <>
                      <input
                        type="text"
                        value={shareLink}
                        className="w-full mt-4 p-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        readOnly
                      />
                      <button
                        type="button"
                        className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => navigator.clipboard.writeText(shareLink)}
                      >
                        Copy Link
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DocumentModals;
