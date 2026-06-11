const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { logActivity } = require('./activityController');

const createContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = await Contact.create({ ...req.body, status: 'unread' });
    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'all') query.status = status;
    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['unread', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, isRead: status !== 'unread' },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    await logActivity({
      action: `Message ${status}`,
      resource: 'contact',
      description: `Contact message from ${contact.name} marked as ${status}`,
      admin: req.admin?._id,
      metadata: { contactId: contact._id, status },
    });

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    await logActivity({
      action: 'Message deleted',
      resource: 'contact',
      description: `Contact message from ${contact.name} deleted`,
      admin: req.admin?._id,
      metadata: { contactId: contact._id },
    });

    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactStats = async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const unread = await Contact.countDocuments({ status: 'unread' });
    const read = await Contact.countDocuments({ status: 'read' });
    const replied = await Contact.countDocuments({ status: 'replied' });
    const archived = await Contact.countDocuments({ status: 'archived' });
    res.json({ total, unread, read, replied, archived });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createContact, getContacts, updateContactStatus, deleteContact, getContactStats };
