let upload, uploadImage, deleteImage;

const hasCloudinary = process.env.CLOUDINARY_CLOUD_NAME
  && process.env.CLOUDINARY_API_KEY
  && process.env.CLOUDINARY_API_SECRET;

if (hasCloudinary) {
  const cloudinary = require('cloudinary').v2;
  const { CloudinaryStorage } = require('multer-storage-cloudinary');
  const multer = require('multer');

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'dineflow',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }],
    },
  });

  const multerUpload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (allowed.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed'), false);
      }
    },
  });

  upload = multerUpload;

  uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }
      res.json({
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteImage = async (req, res) => {
    try {
      const { publicId } = req.body;
      if (!publicId) {
        return res.status(400).json({ message: 'Public ID is required' });
      }
      await cloudinary.uploader.destroy(publicId);
      res.json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
} else {
  const multer = require('multer');
  const path = require('path');
  const fs = require('fs');

  const uploadDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const diskStorage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  upload = multer({
    storage: diskStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (allowed.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed'), false);
      }
    },
  });

  uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image file provided' });
      }
      res.json({
        url: `/uploads/${req.file.filename}`,
        publicId: req.file.filename,
        originalName: req.file.originalname,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteImage = async (req, res) => {
    try {
      const { publicId } = req.body;
      if (!publicId) return res.status(400).json({ message: 'Public ID is required' });
      const filePath = path.join(uploadDir, publicId);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      res.json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = { upload, uploadImage, deleteImage };
