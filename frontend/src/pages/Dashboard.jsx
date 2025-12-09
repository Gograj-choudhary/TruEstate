import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import FiltersPanel from "../components/FiltersPanel";
import SummaryCards from "../components/SummaryCards";
import TransactionsTable from "../components/TransactionsTable";
import Pagination from "../components/Pagination";
import { SummaryCardsSkeleton, TableSkeleton, PaginationSkeleton } from "../components/LoadingSkeleton";
import { useTransactionsMutation } from "../hooks/useTransactionsMutation";

export default function Dashboard() {
  const [queryParams, setQueryParams] = useState({ 
    page: 1, 
    pageSize: 10,
    sortBy: "date",
    sortOrder: "desc"
  });
  const mutation = useTransactionsMutation({
    onError: (err) => {
      console.error("Fetch error", err);
    },
  });

  // first load on mount
  useEffect(() => {
    mutation.mutate(queryParams);
    // eslint-disable-next-line
  }, []); // only on mount

  const handleSearch = (q) => {
    const qp = { ...queryParams, search: q, page: 1 };
    setQueryParams(qp);
    mutation.mutate(qp);
  };

  const handleFilterApply = (filters) => {
    // Create new query params, removing filter properties that are not in the new filters
    const qp = {
      page: 1,
      pageSize: queryParams.pageSize || 10,
      search: queryParams.search, // Keep search
      sortBy: queryParams.sortBy || "date", // Keep sort, default to date
      sortOrder: queryParams.sortOrder || "desc", // Keep sort, default to desc
    };

    // Only add filter properties if they have values
    if (filters.customerRegion) qp.customerRegion = filters.customerRegion;
    if (filters.gender) qp.gender = filters.gender;
    if (filters.productCategory) qp.productCategory = filters.productCategory;
    if (filters.tags) qp.tags = filters.tags;
    if (filters.paymentMethod) qp.paymentMethod = filters.paymentMethod;
    if (filters.minAge) qp.minAge = filters.minAge;
    if (filters.maxAge) qp.maxAge = filters.maxAge;
    if (filters.startDate) qp.startDate = filters.startDate;
    if (filters.endDate) qp.endDate = filters.endDate;

    setQueryParams(qp);
    mutation.mutate(qp);
  };

  const handleSortChange = (sortValue) => {
    let sortBy = "";
    let sortOrder = "";
    
    if (sortValue === "date-desc") {
      sortBy = "date";
      sortOrder = "desc";
    } else if (sortValue === "date-asc") {
      sortBy = "date";
      sortOrder = "asc";
    } else if (sortValue === "quantity-desc") {
      sortBy = "quantity";
      sortOrder = "desc";
    } else if (sortValue === "quantity-asc") {
      sortBy = "quantity";
      sortOrder = "asc";
    } else if (sortValue === "name-asc") {
      sortBy = "customerName";
      sortOrder = "asc";
    } else if (sortValue === "name-desc") {
      sortBy = "customerName";
      sortOrder = "desc";
    } else {
      // Default to date newest first
      sortBy = "date";
      sortOrder = "desc";
    }
    
    const qp = { ...queryParams, sortBy, sortOrder, page: 1 };
    setQueryParams(qp);
    mutation.mutate(qp);
  };

  const onPage = (p) => {
    const qp = { ...queryParams, page: p };
    setQueryParams(qp);
    mutation.mutate(qp);
  };

  const data = mutation.data?.data || [];
  const meta = mutation.data?.meta || null;
  const isLoading = mutation.isLoading || mutation.isPending;

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar onSearch={handleSearch} />
        <FiltersPanel 
          onApply={handleFilterApply} 
          filters={queryParams}
          onSortChange={handleSortChange}
          sortBy={queryParams.sortBy}
          sortOrder={queryParams.sortOrder}
        />
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-4">
            {isLoading ? (
              <SummaryCardsSkeleton />
            ) : (
              <SummaryCards data={data} meta={meta} />
            )}
            <div className="mt-4">
              {isLoading ? (
                <TableSkeleton />
              ) : (
                <TransactionsTable data={data} />
              )}
            </div>
            {isLoading ? (
              <PaginationSkeleton />
            ) : (
              <Pagination meta={meta} onPage={onPage} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
