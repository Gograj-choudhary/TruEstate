import React from "react";

export function SummaryCardsSkeleton() {
  return (
    <div className="flex gap-4 p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 flex-1 shadow-sm animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
          </div>
          <div className="h-8 w-24 bg-gray-200 rounded mt-2"></div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <div className="animate-pulse" style={{ minWidth: '1400px' }}>
        {/* Table Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="flex gap-4 px-4 py-3">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-28"></div>
          </div>
        </div>
        {/* Table Rows */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => (
          <div key={row} className="border-b border-gray-200">
            <div className="flex gap-4 px-4 py-3">
              <div className="h-4 bg-gray-100 rounded w-24"></div>
              <div className="h-4 bg-gray-100 rounded w-20"></div>
              <div className="h-4 bg-gray-100 rounded w-24"></div>
              <div className="h-4 bg-gray-100 rounded w-28"></div>
              <div className="h-4 bg-gray-100 rounded w-32"></div>
              <div className="h-4 bg-gray-100 rounded w-16"></div>
              <div className="h-4 bg-gray-100 rounded w-12"></div>
              <div className="h-4 bg-gray-100 rounded w-28"></div>
              <div className="h-4 bg-gray-100 rounded w-16"></div>
              <div className="h-4 bg-gray-100 rounded w-24"></div>
              <div className="h-4 bg-gray-100 rounded w-28"></div>
              <div className="h-4 bg-gray-100 rounded w-24"></div>
              <div className="h-4 bg-gray-100 rounded w-28"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-1 p-4 bg-white">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  );
}

