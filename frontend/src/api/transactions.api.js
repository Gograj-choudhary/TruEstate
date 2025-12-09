import { axiosInstance } from "./client";

/**
 * Fetch transactions (we return server response directly)
 * queryParams is an object mapping to backend query string parameters.
 */
export const fetchTransactions = async (queryParams) => {
  // axios expects params object for querystring
  const resp = await axiosInstance.get("/transactions", { params: queryParams });
  return resp.data;
};

/**
 * Example of importing CSV via endpoint (for later).
 * file should be a File object from input type="file"
 */
export const importCsv = async (file) => {
  const fd = new FormData();
  fd.append("file", file);
  const resp = await axiosInstance.post("/transactions/import", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return resp.data;
};
