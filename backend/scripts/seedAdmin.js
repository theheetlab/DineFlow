require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for admin seeding...');

    const existingAdmin = await Admin.findOne({ email: 'admin@dineflow.com' });
    if (existingAdmin) {
      console.log('Admin account already exists. Skipping...');
      console.log('Email: admin@dineflow.com');
      console.log('Password: Admin@123');
    } else {
      await Admin.create({
        name: 'DineFlow Admin',
        email: 'admin@dineflow.com',
        password: 'Admin@123',
        role: 'superadmin',
      });
      console.log('Admin account created successfully!');
      console.log('Email: admin@dineflow.com');
      console.log('Password: Admin@123');
    }

    await mongoose.connection.close();
    console.log('Admin seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Admin seeding failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();
