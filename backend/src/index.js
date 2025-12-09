const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// create upload dir if not exists
const uploadDir = process.env.CSV_UPLOAD_DIR || path.join(require('os').tmpdir(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// routes
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

// health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// connect and start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URI_LOCAL;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });
