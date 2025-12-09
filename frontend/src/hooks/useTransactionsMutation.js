import { useMutation } from "@tanstack/react-query";
import { fetchTransactions } from "../api/transactions.api";

/**
 * useTransactionsMutation
 * - call mutate(queryParams) to fetch data
 * - backend returns { data: [...], meta: {...} }
 */
export const useTransactionsMutation = (options = {}) => {
  return useMutation({
    mutationFn: async (queryParams) => {
      // ensure page and pageSize defaults
      const qp = { page: 1, pageSize: 10, ...queryParams };
      const res = await fetchTransactions(qp);
      return res;
    },
    ...options,
  });
};
