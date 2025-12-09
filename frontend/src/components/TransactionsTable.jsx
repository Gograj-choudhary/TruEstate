import React, { useState } from "react";
import { formatDate, formatCurrency } from "../utils/formatters";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function TransactionsTable({ data = [] }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (phoneNumber, rowId) => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopiedId(rowId);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Category</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer region</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee name</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan="13" className="px-4 py-8 text-center text-gray-500">
                No transactions found
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.transactionId}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatDate(row.date)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.customerId}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.customerName}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <span>{row.phoneNumber}</span>
                    <button
                      onClick={() => handleCopy(row.phoneNumber, row._id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-0.5"
                      title="Copy phone number"
                    >
                      {copiedId === row._id ? (
                        <FiCheck className="text-green-500 text-sm" />
                      ) : (
                        <FiCopy className="text-sm" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.gender}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.age}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.productCategory}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">{String(row.quantity).padStart(2, '0')}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(row.totalAmount)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.customerRegion || "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.productId || "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.employeeName || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
