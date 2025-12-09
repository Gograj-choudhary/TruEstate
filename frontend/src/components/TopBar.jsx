import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function TopBar({ onSearch }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e?.preventDefault();
    onSearch(q.trim());
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold text-gray-900">Sales Management System</h1>
        <div className="flex items-center gap-4">
          <form onSubmit={submit} className="flex items-center">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name, Phone no."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
