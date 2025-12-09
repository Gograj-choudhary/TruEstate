const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Upload dir
const uploadDir = process.env.CSV_UPLOAD_DIR || "/tmp/uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Routes
app.use("/api/transactions", require("./routes/transactionRoutes"));

// Health
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Global error
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(500).json({ error: err.message });
});

// ------------
// Mongo Connect (safe for Vercel)
// ------------
let isConnected = false;
async function connectDB() {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = conn.connections[0].readyState;
    console.log("MongoDB connected:", conn.connection.host);
  } catch (err) {
    console.error("Mongo error:", err);
  }
}

connectDB();

// *** NO app.listen() here — Vercel handles it ***

module.exports = app;
