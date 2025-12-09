/**
 * Builds Mongo query, sort and pagination options from request query params.
 *
 * Supports:
 * - search (customerName, phoneNumber) - case-insensitive partial match
 * - filters: customerRegion, gender, productCategory, tags (multi-select)
 * - ageRange: minAge,maxAge
 * - dateRange: startDate,endDate (format: YYYY-MM-DD or any Date parsable)
 * - paymentMethod
 * - sortBy and sortOrder
 * - page (1-based) and pageSize
 */
const buildQueryOptions = (query) => {
  const {
    search,
    customerRegion,
    gender,
    productCategory,
    tags,
    paymentMethod,
    minAge,
    maxAge,
    startDate,
    endDate,
    sortBy,
    sortOrder,
    page = 1,
    pageSize = 10
  } = query;

  const mongoQuery = {};

  // Full-text-ish search on customerName or phoneNumber (case-insensitive)
  if (search && search.trim() !== '') {
    const s = search.trim();
    mongoQuery.$or = [
      { customerName: { $regex: s, $options: 'i' } },
      { phoneNumber: { $regex: s, $options: 'i' } }
    ];
  }

  // Multi-select filters (comma separated or array)
  const parseMulti = (val) => {
    if (!val) return null;
    if (Array.isArray(val)) return val;
    return String(val).split(',').map(v => v.trim()).filter(Boolean);
  };

  const regions = parseMulti(customerRegion);
  if (regions && regions.length) mongoQuery.customerRegion = { $in: regions };

  const genders = parseMulti(gender);
  if (genders && genders.length) mongoQuery.gender = { $in: genders };

  const categories = parseMulti(productCategory);
  if (categories && categories.length) mongoQuery.productCategory = { $in: categories };

  const tagList = parseMulti(tags);
  if (tagList && tagList.length) mongoQuery.tags = { $in: tagList };

  const payments = parseMulti(paymentMethod);
  if (payments && payments.length) mongoQuery.paymentMethod = { $in: payments };

  // Age range
  if (minAge || maxAge) {
    mongoQuery.age = {};
    if (minAge && !isNaN(Number(minAge))) mongoQuery.age.$gte = Number(minAge);
    if (maxAge && !isNaN(Number(maxAge))) mongoQuery.age.$lte = Number(maxAge);
    // if invalid range, remove age filter (controller/service will handle invalids)
    if (Object.keys(mongoQuery.age).length === 0) delete mongoQuery.age;
  }

  // Date range
  if (startDate || endDate) {
    mongoQuery.date = {};
    if (startDate) {
      const sd = new Date(startDate);
      if (!isNaN(sd)) mongoQuery.date.$gte = sd;
    }
    if (endDate) {
      const ed = new Date(endDate);
      if (!isNaN(ed)) {
        // include whole day by setting time to end of day
        ed.setHours(23,59,59,999);
        mongoQuery.date.$lte = ed;
      }
    }
    if (Object.keys(mongoQuery.date).length === 0) delete mongoQuery.date;
  }

  // Sorting
  let sort = {};
  if (sortBy) {
    const order = (sortOrder && sortOrder.toLowerCase() === 'asc') ? 1 : -1;
    // whitelist allowed sortBy fields
    const allowed = ['date', 'quantity', 'customerName'];
    if (allowed.includes(sortBy)) {
      // date newest first default (so sortOrder=desc => -1)
      sort[sortBy] = order;
    }
  } else {
    // default sort: date newest first
    sort = { date: -1 };
  }

  // Pagination
  const p = Math.max(1, parseInt(page, 10) || 1);
  const ps = Math.max(1, parseInt(pageSize, 10) || 10);

  return {
    mongoQuery,
    options: {
      sort,
      skip: (p - 1) * ps,
      limit: ps
    },
    page: p,
    pageSize: ps
  };
};

module.exports = { buildQueryOptions };
