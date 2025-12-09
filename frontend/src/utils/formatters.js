export const formatCurrency = (v) =>
  typeof v === "number" ? `₹${v.toLocaleString("en-IN")}` : v ?? "-";

export const formatDate = (d) => {
  if (!d) return "-";
  const dt = new Date(d);
  return dt.toLocaleDateString();
};
