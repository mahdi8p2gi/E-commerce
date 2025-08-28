// components/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, primary }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded transition ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : `bg-${primary} text-white`
        }`}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 rounded transition ${
            num === currentPage
              ? `bg-${primary} text-white font-semibold`
              : "bg-gray-200"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded transition ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : `bg-${primary} text-white`
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
