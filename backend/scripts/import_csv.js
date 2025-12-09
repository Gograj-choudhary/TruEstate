/**
 * Command-line CSV importer script.
 * Usage: node scripts/import_csv.js path/to/sales.csv
 */
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const { importCSVFromPath } = require('../src/utils/csvImport');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URI_LOCAL;
const csvPath = process.argv[2];

if (!csvPath) {
  console.error('Please provide path to CSV file: node scripts/import_csv.js ./data/sales.csv');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    const abs = path.resolve(process.cwd(), csvPath);
    const res = await importCSVFromPath(abs);
    console.log('Import result:', res);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Import error', err);
    process.exit(2);
  }
})();
