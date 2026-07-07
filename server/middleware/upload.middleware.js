const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const multerUpload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const upload = {
  single: (fieldName) => [
    multerUpload.single(fieldName),
    async (req, res, next) => {
      if (!req.file) return next();

      try {
        const dir = path.join(__dirname, '../uploads/products');
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = 'prod-' + uniqueSuffix + '.webp';
        const outputPath = path.join(dir, filename);

        await sharp(req.file.buffer)
          .resize({ width: 1000, height: 1250, fit: 'cover', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);

        req.file.filename = filename;
        req.file.path = outputPath;
        req.file.mimetype = 'image/webp';

        next();
      } catch (error) {
        next(error);
      }
    }
  ]
};

module.exports = upload;
