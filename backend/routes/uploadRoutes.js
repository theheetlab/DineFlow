const express = require('express');
const { upload, uploadImage, deleteImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, upload.single('image'), uploadImage);
router.delete('/', protect, deleteImage);

module.exports = router;
