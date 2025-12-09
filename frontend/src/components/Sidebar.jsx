import React, { useState } from "react";
import { 
  FiChevronUp, 
  FiChevronDown, 
  FiBarChart2, 
  FiUsers, 
  FiPlay, 
  FiFileText, 
  FiPause, 
  FiXCircle, 
  FiCheckCircle,
  FiCircle
} from "react-icons/fi";

export default function Sidebar() {
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const [invoicesExpanded, setInvoicesExpanded] = useState(true);

  return (
    <div className="w-64 bg-gray-100 min-h-screen flex flex-col">
      {/* Logo and User Header */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Vault Logo */}
              <div className="w-10 h-10 bg-black rounded flex items-center justify-center flex-shrink-0">
                <div className="text-white font-bold text-xl">V</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">Vault</div>
                <div className="text-xs text-gray-500">Anurag Yadav</div>
              </div>
            </div>
            <FiChevronDown className="text-gray-400 text-sm" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {/* Dashboard */}
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <FiBarChart2 className="text-gray-600 text-lg" />
          <span className="text-gray-700 font-medium">Dashboard</span>
        </a>

        {/* Nexus */}
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <FiUsers className="text-gray-600 text-lg" />
          <span className="text-gray-700 font-medium">Nexus</span>
        </a>

        {/* Intake */}
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <FiPlay className="text-gray-600 text-lg" />
          <span className="text-gray-700 font-medium">Intake</span>
        </a>

        {/* Services with sub-items */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setServicesExpanded(!servicesExpanded)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FiFileText className="text-gray-600 text-lg" />
              <span className="text-gray-700 font-medium">Services</span>
            </div>
            {servicesExpanded ? (
              <FiChevronUp className="text-gray-400 text-sm" />
            ) : (
              <FiChevronDown className="text-gray-400 text-sm" />
            )}
          </button>
          {servicesExpanded && (
            <div className="pb-2">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 ml-8 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <FiPlay className="text-gray-500 text-sm" />
                <span className="text-sm">Pre-active</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 ml-8 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <FiPause className="text-gray-500 text-sm" />
                <span className="text-sm">Active</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 ml-8 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <FiXCircle className="text-gray-500 text-sm" />
                <span className="text-sm">Blocked</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 ml-8 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <FiCheckCircle className="text-gray-500 text-sm" />
                <span className="text-sm">Closed</span>
              </a>
            </div>
          )}
        </div>

        {/* Invoices with sub-items */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setInvoicesExpanded(!invoicesExpanded)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FiFileText className="text-gray-600 text-lg" />
              <span className="text-gray-700 font-medium">Invoices</span>
            </div>
            {invoicesExpanded ? (
              <FiChevronUp className="text-gray-400 text-sm" />
            ) : (
              <FiChevronDown className="text-gray-400 text-sm" />
            )}
          </button>
          {invoicesExpanded && (
            <div className="pb-2">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 ml-8 text-gray-900 hover:bg-gray-50 transition-colors font-semibold"
              >
                <FiCircle className="text-gray-500 text-sm" />
                <span className="text-sm">Proforma Invoices</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 ml-8 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <FiCircle className="text-gray-500 text-sm" />
                <span className="text-sm">Final Invoices</span>
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

