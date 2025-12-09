const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const os = require('os');

const {
  listTransactions,
  getTransaction,
  importTransactions
} = require('../controllers/transactionController');

// configure multer for CSV uploads
const uploadDir = process.env.CSV_UPLOAD_DIR || path.join(os.tmpdir(), 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const fname = `${Date.now()}-${file.originalname}`;
    cb(null, fname);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!/\.csv$/i.test(file.originalname)) return cb(new Error('Only CSV allowed'));
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

router.get('/', listTransactions);
router.get('/:id', getTransaction);
router.post('/import', upload.single('file'), importTransactions);

module.exports = router;
