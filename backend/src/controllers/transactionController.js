const path = require('path');
const fs = require('fs');
const { getTransactions, getTransactionById, importCSVViaEndpoint } = require('../services/transactionService');

/**
 * GET /api/transactions
 * Query params: search, customerRegion, gender, productCategory, tags, paymentMethod,
 * minAge, maxAge, startDate, endDate, sortBy, sortOrder, page, pageSize
 */
const listTransactions = async (req, res) => {
  try {
    const result = await getTransactions(req.query);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getTransaction = async (req, res) => {
  try {
    const t = await getTransactionById(req.params.id);
    if (!t) return res.status(404).json({ error: 'Transaction not found' });
    return res.json(t);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/transactions/import
 * multipart/form-data -> file field: file
 * Accepts CSV and imports records into DB.
 */
const importTransactions = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'CSV file is required' });
  const filePath = req.file.path;
  try {
    const resImport = await importCSVViaEndpoint(filePath);
    // delete file after import
    fs.unlink(filePath, () => {});
    return res.json({ success: true, result: resImport });
  } catch (err) {
    console.error('Import error', err);
    fs.unlink(filePath, () => {});
    return res.status(500).json({ error: 'Import failed', details: err.message });
  }
};

module.exports = {
  listTransactions,
  getTransaction,
  importTransactions
};
