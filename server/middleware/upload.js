const multer = require('multer');
const path = require('path');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Set uploads folder
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // Prepend timestamp to avoid name collisions
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png)'));
  }
};

// Export multer middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;
