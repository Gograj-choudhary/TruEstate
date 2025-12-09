import React, { useState, useEffect, useRef } from "react";
import { FiRefreshCw, FiChevronDown } from "react-icons/fi";

export default function FiltersPanel({ onApply, filters = {}, onSortChange, sortBy, sortOrder }) {
  const [region, setRegion] = useState(filters.customerRegion || "");
  const [gender, setGender] = useState(filters.gender || "");
  const [ageRange, setAgeRange] = useState("");
  const [category, setCategory] = useState(filters.productCategory || "");
  const [tags, setTags] = useState(filters.tags || "");
  const [paymentMethod, setPaymentMethod] = useState(filters.paymentMethod || "");
  const [date, setDate] = useState(filters.startDate || "");
  const timeoutRef = useRef(null);

  // Update local state when filters prop changes
  useEffect(() => {
    setRegion(filters.customerRegion || "");
    setGender(filters.gender || "");
    setCategory(filters.productCategory || "");
    setTags(filters.tags || "");
    setPaymentMethod(filters.paymentMethod || "");
    
    if (filters.minAge && filters.maxAge) {
      setAgeRange(`${filters.minAge}-${filters.maxAge}`);
    } else {
      setAgeRange("");
    }
    
    if (filters.startDate) {
      setDate(filters.startDate);
    } else {
      setDate("");
    }
  }, [filters]);

  // Build filter object from provided values or current state
  const buildFilters = (overrides = {}) => {
    const q = {};

    const currentRegion = overrides.region !== undefined ? overrides.region : region;
    const currentGender = overrides.gender !== undefined ? overrides.gender : gender;
    const currentAgeRange = overrides.ageRange !== undefined ? overrides.ageRange : ageRange;
    const currentCategory = overrides.category !== undefined ? overrides.category : category;
    const currentTags = overrides.tags !== undefined ? overrides.tags : tags;
    const currentPaymentMethod = overrides.paymentMethod !== undefined ? overrides.paymentMethod : paymentMethod;
    const currentDate = overrides.date !== undefined ? overrides.date : date;

    if (currentRegion) q.customerRegion = currentRegion;
    if (currentGender) q.gender = currentGender;

    if (currentAgeRange) {
      const [min, max] = currentAgeRange.split("-");
      q.minAge = min;
      q.maxAge = max;
    }

    if (currentCategory) q.productCategory = currentCategory;
    if (currentPaymentMethod) q.paymentMethod = currentPaymentMethod;
    if (currentTags) q.tags = currentTags;
    if (currentDate) {
      q.startDate = currentDate;
      q.endDate = currentDate;
    }

    return q;
  };

  // Apply filters with debounce
  const applyFilters = (overrides = {}) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onApply(buildFilters(overrides));
    }, 300);
  };

  // Reset all filters
  const resetFilters = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Clear all local state immediately
    setRegion("");
    setGender("");
    setAgeRange("");
    setCategory("");
    setTags("");
    setPaymentMethod("");
    setDate("");
    // Apply empty filters immediately (no debounce for reset)
    onApply({});
  };

  // Handle individual filter changes - pass new value directly
  const handleRegionChange = (e) => {
    const newValue = e.target.value;
    setRegion(newValue);
    applyFilters({ region: newValue });
  };

  const handleGenderChange = (e) => {
    const newValue = e.target.value;
    setGender(newValue);
    applyFilters({ gender: newValue });
  };

  const handleAgeRangeChange = (e) => {
    const newValue = e.target.value;
    setAgeRange(newValue);
    applyFilters({ ageRange: newValue });
  };

  const handleCategoryChange = (e) => {
    const newValue = e.target.value;
    setCategory(newValue);
    applyFilters({ category: newValue });
  };

  const handleTagsChange = (e) => {
    const newValue = e.target.value;
    setTags(newValue);
    applyFilters({ tags: newValue });
  };

  const handlePaymentMethodChange = (e) => {
    const newValue = e.target.value;
    setPaymentMethod(newValue);
    applyFilters({ paymentMethod: newValue });
  };

  const handleDateChange = (e) => {
    const newValue = e.target.value;
    setDate(newValue);
    applyFilters({ date: newValue });
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const box =
    "h-9 px-3 flex items-center bg-[#F5F5F7] border border-[#E5E7EB] rounded-md text-sm text-gray-700";

  const drop =
    "bg-transparent outline-none cursor-pointer w-full text-gray-700 appearance-none";

  return (
    <div className="flex items-center flex-wrap gap-3 py-2 px-4 bg-white border-b border-gray-200">
      {/* RESET BTN */}
      <button
        onClick={resetFilters}
        className="h-9 w-9 flex items-center justify-center bg-[#F5F5F7] border border-[#E5E7EB] rounded-md hover:bg-gray-200"
      >
        <FiRefreshCw className="text-gray-600" />
      </button>

      {/* REGION */}
      <div className={`${box} w-40 justify-between relative`}>
        <select value={region} onChange={handleRegionChange} className={drop}>
          <option value="">Customer Region</option>
          <option>North</option>
          <option>South</option>
          <option>East</option>
          <option>West</option>
        </select>
        <FiChevronDown className="text-gray-500 pointer-events-none absolute right-3" />
      </div>

      {/* GENDER */}
      <div className={`${box} w-28 justify-between relative`}>
        <select value={gender} onChange={handleGenderChange} className={drop}>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <FiChevronDown className="text-gray-500 pointer-events-none absolute right-3" />
      </div>

      {/* AGE RANGE */}
      <div className={`${box} w-40 justify-between relative`}>
        <select value={ageRange} onChange={handleAgeRangeChange} className={drop}>
          <option value="">Age Range</option>
          <option value="0-18">0 - 18</option>
          <option value="18-30">18 - 30</option>
          <option value="30-50">30 - 50</option>
          <option value="50-80">50 - 80</option>
        </select>
        <FiChevronDown className="text-gray-500 pointer-events-none absolute right-3" />
      </div>

      {/* CATEGORY */}
      <div className={`${box} w-40 justify-between relative`}>
        <select value={category} onChange={handleCategoryChange} className={drop}>
          <option value="">Product Category</option>
          <option>Clothing</option>
          <option>Beauty</option>
          <option>Electronics</option>
          <option>Groceries</option>
        </select>
        <FiChevronDown className="text-gray-500 pointer-events-none absolute right-3" />
      </div>

      {/* TAGS */}
      <div className={`${box} w-28 justify-between relative`}>
        <input
          value={tags}
          onChange={handleTagsChange}
          placeholder="Tags"
          className="bg-transparent outline-none text-gray-700 w-full"
        />
        <FiChevronDown className="text-gray-500 pointer-events-none absolute right-3" />
      </div>

      {/* PAYMENT */}
      <div className={`${box} w-40 justify-between relative`}>
        <select value={paymentMethod} onChange={handlePaymentMethodChange} className={drop}>
          <option value="">Payment Method</option>
          <option>UPI</option>
          <option>Cash</option>
          <option>Card</option>
        </select>
        <FiChevronDown className="text-gray-500 pointer-events-none absolute right-3" />
      </div>

      {/* DATE */}
      <div className={`${box} w-37 relative`}>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className="bg-transparent outline-none w-full text-gray-700"
        />
        <FiChevronDown className="text-gray-500 pointer-events-none absolute right-3" />
      </div>

      {/* SORT */}
      <div className={`${box} w-60 justify-between relative`}>
        <select
          value={
            sortBy === "date" && sortOrder === "desc" ? "date-desc" :
            sortBy === "date" && sortOrder === "asc" ? "date-asc" :
            sortBy === "quantity" && sortOrder === "desc" ? "quantity-desc" :
            sortBy === "quantity" && sortOrder === "asc" ? "quantity-asc" :
            sortBy === "customerName" && sortOrder === "asc" ? "name-asc" :
            sortBy === "customerName" && sortOrder === "desc" ? "name-desc" :
            "date-desc"
          }
          onChange={(e) => onSortChange && onSortChange(e.target.value)}
          className={drop}
        >
          <option value="date-desc">Sort by: Date (Newest First)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="quantity-desc">Quantity (High to Low)</option>
          <option value="quantity-asc">Quantity (Low to High)</option>
          <option value="name-asc">Customer Name (A-Z)</option>
          <option value="name-desc">Customer Name (Z-A)</option>
        </select>
        <FiChevronDown className="text-gray-500 pointer-events-none absolute right-3" />
      </div>
    </div>
  );
}
