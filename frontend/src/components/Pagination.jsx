import React from "react";

export default function Pagination({ meta, onPage }) {
  if (!meta) return null;
  const { page, totalPages } = meta;
  
  // Show up to 6 page numbers
  const maxVisible = 6;
  const pages = [];
  
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (page <= 3) {
      for (let i = 1; i <= maxVisible; i++) pages.push(i);
    } else if (page >= totalPages - 2) {
      for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = page - 2; i <= page + 3; i++) pages.push(i);
    }
  }

  return (
    <div className="flex items-center justify-center gap-1 p-4 bg-white">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`w-8 h-8 rounded text-sm font-medium ${
            p === page
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
