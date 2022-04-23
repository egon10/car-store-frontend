import React from 'react';

export const MAX_ITEMS_PER_PAGE = 9;

export const Pagination = ({ Page, setPage }) => {
  const { currentPage, totalPages, totalProducts } = Page;

  return (
    <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage === 1) return;
            setPage({ ...Page, currentPage: currentPage - 1 });
          }}>
          {' '}
          Previous{' '}
        </button>
        <button
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage === totalPages) return;
            setPage({ ...Page, currentPage: currentPage + 1 });
          }}>
          {' '}
          Next{' '}
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-semibold text-gray-800 ">
              {' '}
              {totalProducts ? currentPage * MAX_ITEMS_PER_PAGE - MAX_ITEMS_PER_PAGE + 1 : 0}{' '}
            </span>
            to
            <span className="font-semibold text-gray-800">
              {' '}
              {Math.min(currentPage * MAX_ITEMS_PER_PAGE, totalProducts)}{' '}
            </span>
            results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination">
            <button
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={(e) => {
                if (currentPage === 1) return;

                setPage({ ...Page, currentPage: currentPage > 1 ? currentPage - 1 : 0 });
              }}>
              <span className="sr-only">Previous</span>

              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`bg-white relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === index + 1
                    ? 'z-10 bg-indigo-50 border-indigo-400 text-indigo-500'
                    : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                } hover:bg-gray-50`}
                onClick={(e) => {
                  if (currentPage === index + 1) return;
                  setPage({ ...Page, currentPage: index + 1 });
                }}>
                {index + 1}
              </button>
            ))}

            <button
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={(e) => {
                if (currentPage === totalPages) return;

                setPage({ ...Page, currentPage: currentPage + 1 });
              }}>
              <span className="sr-only">Next</span>

              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
