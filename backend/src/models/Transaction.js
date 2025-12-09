const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  transactionId: { type: String, index: true },
  date: { type: Date, index: true },
  customerId: String,
  customerName: { type: String, index: true },
  phoneNumber: { type: String, index: true },
  gender: String,
  age: Number,
  customerRegion: String,
  customerType: String,
  productId: String,
  productName: String,
  brand: String,
  productCategory: String,
  tags: [String],
  quantity: Number,
  pricePerUnit: Number,
  discountPercentage: Number,
  totalAmount: Number,
  finalAmount: Number,
  paymentMethod: String,
  orderStatus: String,
  deliveryType: String,
  storeId: String,
  storeLocation: String,
  salespersonId: String,
  employeeName: String
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
