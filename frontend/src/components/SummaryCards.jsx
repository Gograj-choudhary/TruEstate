import React from "react";
import { formatCurrency } from "../utils/formatters";
import { FiInfo } from "react-icons/fi";

export default function SummaryCards({ data = [], meta = null }) {
  const totalUnits = data.reduce((s, r) => s + (Number(r.quantity) || 0), 0);
  const totalAmount = data.reduce((s, r) => s + (Number(r.totalAmount) || 0), 0);
  const totalDiscount = data.reduce((s, r) => s + ((Number(r.discountPercentage) || 0) * (Number(r.totalAmount) || 0) / 100), 0);

  // Calculate SRs (Sales Records) - using total count from meta if available, otherwise data length
  const totalSRs = meta?.total || data.length;
  const amountSRs = data.filter(r => Number(r.totalAmount) > 0).length;
  const discountSRs = data.filter(r => Number(r.discountPercentage) > 0).length;

  return (
    <div className="flex gap-3 p-4">
      <div className="bg-white p-3 rounded-lg border border-gray-200 w-48 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-xs text-gray-600">Total units sold</div>
          <FiInfo className="text-gray-400 text-xs cursor-help" />
        </div>
        <div className="text-xl font-semibold text-gray-900">{totalUnits}</div>
      </div>
      <div className="bg-white p-3 rounded-lg border border-gray-200 w-48 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-xs text-gray-600">Total Amount</div>
          <FiInfo className="text-gray-400 text-xs cursor-help" />
        </div>
        <div className="text-xl font-semibold text-gray-900">{formatCurrency(totalAmount)}</div>
        {amountSRs > 0 && (
          <div className="text-xs text-gray-500 mt-0.5">({amountSRs} SRs)</div>
        )}
      </div>
      <div className="bg-white p-3 rounded-lg border border-gray-200 w-48 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-xs text-gray-600">Total Discount</div>
          <FiInfo className="text-gray-400 text-xs cursor-help" />
        </div>
        <div className="text-xl font-semibold text-gray-900">{formatCurrency(totalDiscount)}</div>
        {discountSRs > 0 && (
          <div className="text-xs text-gray-500 mt-0.5">({discountSRs} SRs)</div>
        )}
      </div>
    </div>
  );
}
