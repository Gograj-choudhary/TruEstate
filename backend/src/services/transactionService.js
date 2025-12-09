const Transaction = require('../models/Transaction');
const { buildQueryOptions } = require('../utils/queryBuilder');

const getTransactions = async (queryParams) => {
  const { mongoQuery, options, page, pageSize } = buildQueryOptions(queryParams);

  // total count for pagination (applies same filters/search)
  const total = await Transaction.countDocuments(mongoQuery);

  // fetch page
  const docs = await Transaction.find(mongoQuery)
    .sort(options.sort)
    .skip(options.skip)
    .limit(options.limit)
    .lean();

  const totalPages = Math.ceil(total / pageSize);

  return {
    data: docs,
    meta: {
      total,
      page,
      pageSize,
      totalPages
    }
  };
};

const getTransactionById = async (id) => {
  return Transaction.findById(id).lean();
};

const importCSVViaEndpoint = async (filePath) => {
  const { importCSVFromPath } = require('../utils/csvImport');
  return importCSVFromPath(filePath);
};

module.exports = {
  getTransactions,
  getTransactionById,
  importCSVViaEndpoint
};
