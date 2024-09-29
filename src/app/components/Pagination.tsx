import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="mt-6 flex justify-center space-x-2">
      {currentPage > 3 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 rounded-lg bg-gray-300"
          >
            1
          </button>
          <span className="px-2">..</span>
        </>
      )}

      {Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;

        if (pageNumber < currentPage - 1 || pageNumber > currentPage + 1) {
          return null;
        }

        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {currentPage < totalPages - 2 && (
        <>
          <span className="px-2">..</span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-4 py-2 rounded-lg bg-gray-300"
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
