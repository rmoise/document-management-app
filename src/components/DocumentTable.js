import React from 'react';
import { useTable, usePagination } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileImage, faFileWord, faFileExcel, faFilePowerpoint, faFile } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO, isValid } from 'date-fns';
import { Document, Page, pdfjs } from 'react-pdf';
import DocumentDownload from './DocumentDownload';
import DocumentModals from './DocumentModals';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function DocumentTable({
  documents,
  selectedDocument,
  setSelectedDocument,
  handleDocumentLoadSuccess,
  handleDocumentClick,
  handleDownload,
  handleShareLink,
  handleDelete,
  shareLink,
  showShareModal,
  setShowShareModal,
  showDeleteModal,
  setShowDeleteModal,
  setExpirationTime,
  expirationTime
}) {
  // Define the table columns using useMemo
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row }) => {
          const document = row.original;
          const fileNameWithoutExtension = document.name.replace(/\.[^/.]+$/, '');
          return <span>{fileNameWithoutExtension}</span>;
        }
      },
      {
        Header: 'Type',
        accessor: 'FileType',
        Cell: ({ row }) => {
          const document = row.original;
          let icon;

          // Determine the appropriate icon based on the file type
          switch (document.FileType) {
            case 'application/pdf':
              icon = faFilePdf;
              break;
            case 'image/png':
            case 'image/jpeg':
              icon = faFileImage;
              break;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
              icon = faFileWord;
              break;
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
              icon = faFileExcel;
              break;
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
              icon = faFilePowerpoint;
              break;
            default:
              icon = faFile;
              break;
          }

          return (
            <div className="flex items-center">
              <div className="mr-2">
                <FontAwesomeIcon icon={icon} size="2x" />
              </div>
            </div>
          );
        }
      },
      {
        Header: 'Preview',
        accessor: 'preview',
        Cell: ({ row }) => {
          const document = row.original;
          return (
            <>
              {/* Render the appropriate preview based on the file type */}
              {document.FileType === 'application/pdf' && document.numPages > 0 ? (
                <Document
                  file={document.filePath}
                  onLoadSuccess={({ numPages }) => handleDocumentLoadSuccess({ numPages }, document)}
                >
                  <Page pageNumber={1} />
                </Document>
              ) : (
                <img src={document.imageUrl} alt={document.name} className="rounded-lg" style={{ maxWidth: '200px' }} />
              )}
            </>
          );
        }
      },
      {
        Header: 'Upload Date',
        accessor: 'uploadDateTime',
        Cell: ({ value }) => {
          const date = parseISO(value);
          const formattedDate = isValid(date) ? format(date, 'yyyy-MM-dd HH:mm:ss') : 'Invalid Date';
          return <span>{formattedDate}</span>;
        }
      },
      {
        Header: 'Downloads',
        accessor: 'downloads',
        Cell: ({ row }) => {
          const downloads = row.values.downloads;
          return <span>{downloads}</span>;
        }
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => {
          const document = row.original;
          return (
            <>
              <button
                className="text-blue-600 dark:text-blue-500 hover:underline mr-2"
                onClick={() => {
                  setSelectedDocument(document);
                  setShowShareModal(true);
                }}
              >
                Share
              </button>
              <DocumentDownload
                onClick={() => handleDownload(document)}
                documentId={document.id}
                name={document.name}
              />
              <button
                className="text-red-600 dark:text-red-500 hover:underline"
                onClick={() => {
                  setSelectedDocument(document);
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
            </>
          );
        }
      }
    ],
    []
  );

  // Create the table instance using useTable and usePagination
  const tableInstance = useTable(
    {
      columns,
      data: documents,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    usePagination
  );

  // Extract the necessary properties and functions from the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setPageSize
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  // Render the document list
  const renderDocumentList = () => {
    return page.map((row, i) => {
      tableInstance.prepareRow(row);
      const document = row.original;

      return (
        <tr
          {...row.getRowProps()}
          key={i}
          onClick={() => handleDocumentClick(document)}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
        >
          {row.cells.map((cell) => {
            return (
              <td {...cell.getCellProps()} className="px-6 py-4">
                {cell.render('Cell')}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  return (
    <div className="mt-6 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...getTableProps()}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-6 py-3">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>{renderDocumentList()}</tbody>
      </table>
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900">
        <div className="flex items-center">
          <button
            disabled={!canPreviousPage}
            onClick={() => {
              previousPage();
            }}
            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
          <button
            disabled={!canNextPage}
            onClick={() => {
              nextPage();
            }}
            className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
        <div className="pg hidden-sm hidden-xs">
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              value={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                tableInstance.gotoPage(pageNumber);
              }}
              style={{ width: '50px' }}
              className="border-gray-300 rounded-lg ml-2 px-2 py-1 text-sm"
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="border-gray-300 rounded-lg ml-2 px-2 py-1 text-sm"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      <DocumentModals
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        selectedDocument={selectedDocument}
        setExpirationTime={setExpirationTime}
        expirationTime={expirationTime}
        shareLink={shareLink}
        handleDelete={handleDelete}
        handleShareLink={handleShareLink}
        handleDownload={handleDownload}
      />
    </div>
  );
}

export default DocumentTable;
