const fs = require('fs');
const csv = require('csv-parser');
const Transaction = require('../models/Transaction');

// batch size (1000 is safe for MongoDB)
const BATCH_SIZE = 1000;

const importCSVFromPath = (filePath) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath).pipe(csv());
    let batch = [];
    let totalImported = 0;

    stream.on('data', async (row) => {
      try {
        const doc = mapRow(row);
        batch.push(doc);

        if (batch.length >= BATCH_SIZE) {
          stream.pause(); // pause reading
          await Transaction.insertMany(batch, { ordered: false });
          totalImported += batch.length;
          batch = [];
          stream.resume(); // continue reading
        }
      } catch (err) {
        console.error("Row error:", err);
      }
    });

    stream.on('end', async () => {
      try {
        if (batch.length > 0) {
          await Transaction.insertMany(batch, { ordered: false });
          totalImported += batch.length;
        }
        resolve({ imported: totalImported });
      } catch (err) {
        reject(err);
      }
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};

// mapping CSV → Mongo model
function mapRow(row) {
  return {
    transactionId: row["Transaction ID"],
    date: parseDate(row["Date"]),
    customerId: row["Customer ID"],
    customerName: row["Customer Name"],
    phoneNumber: row["Phone Number"],
    gender: row["Gender"],
    age: Number(row["Age"]),
    customerRegion: row["Customer Region"],
    customerType: row["Customer Type"],
    productId: row["Product ID"],
    productName: row["Product Name"],
    brand: row["Brand"],
    productCategory: row["Product Category"],
    tags: parseTags(row["Tags"]),
    quantity: Number(row["Quantity"]),
    pricePerUnit: Number(row["Price per Unit"]),
    discountPercentage: Number(row["Discount Percentage"]),
    totalAmount: Number(row["Total Amount"]),
    finalAmount: Number(row["Final Amount"]),
    paymentMethod: row["Payment Method"],
    orderStatus: row["Order Status"],
    deliveryType: row["Delivery Type"],
    storeId: row["Store ID"],
    storeLocation: row["Store Location"],
    salespersonId: row["Salesperson ID"],
    employeeName: row["Employee Name"]
  };
}

function parseDate(value) {
  if (!value) return null;
  const [d, m, y] = value.split("-");
  return new Date(`${y}-${m}-${d}`);
}

function parseTags(val) {
  return val ? val.split(',').map(t => t.trim()) : [];
}

module.exports = { importCSVFromPath };
