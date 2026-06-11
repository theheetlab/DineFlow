const express = require('express');
const { body } = require('express-validator');
const {
  createContact, getContacts, updateContactStatus,
  deleteContact, getContactStats,
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/stats')
  .get(protect, getContactStats);

router.route('/')
  .post(
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('email').isEmail().withMessage('Valid email is required'),
      body('subject').notEmpty().withMessage('Subject is required'),
      body('message').notEmpty().withMessage('Message is required'),
    ],
    createContact
  )
  .get(protect, getContacts);

router.route('/:id/status')
  .put(protect, updateContactStatus);

router.route('/:id')
  .delete(protect, deleteContact);

module.exports = router;
