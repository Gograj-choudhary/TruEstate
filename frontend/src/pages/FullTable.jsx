import React, { useEffect, useState } from "react";
import { useTransactionsMutation } from "../hooks/useTransactionsMutation";
import TransactionsTable from "../components/TransactionsTable";
import Pagination from "../components/Pagination";

export default function FullTable() {
  const [qp, setQp] = useState({ page: 1, pageSize: 50 });
  const mutation = useTransactionsMutation();

  useEffect(() => {
    mutation.mutate(qp);
  }, [qp]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl mb-4">All Transactions</h2>
      {mutation.isLoading ? <div>Loading...</div> : <TransactionsTable data={mutation.data?.data || []} />}
      <Pagination meta={mutation.data?.meta} onPage={(p) => setQp({ ...qp, page: p })} />
    </div>
  );
}
