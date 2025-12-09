const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Upload folder
const uploadDir =
  process.env.CSV_UPLOAD_DIR || path.join(require("os").tmpdir(), "uploads");
if (!fs.existsSync(uploadDir))
  fs.mkdirSync(uploadDir, { recursive: true });

// Routes
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions", transactionRoutes);

// Health route
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

// ----------------------
// MONGODB CONNECTION (Vercel-safe)
// ----------------------
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const MONGO_URI = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = conn.connections[0].readyState;
    console.log("MongoDB Connected:", conn.connection.host);
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
}

connectDB();

// IMPORTANT: no app.listen()
// Export app for Vercel serverless
module.exports = app;
