require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const Testimonial = require('../models/Testimonial');

const menuItems = [
  {
    name: 'Grilled Salmon',
    description: 'Atlantic salmon fillet with lemon herb butter, seasonal vegetables, and wild rice pilaf.',
    price: 28.99,
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600',
    isFeatured: true,
    isBestSeller: true,
    isAvailable: true,
    rating: 4.8,
  },
  {
    name: 'Wagyu Beef Burger',
    description: 'Premium wagyu patty with aged cheddar, caramelized onions, truffle aioli, and brioche bun.',
    price: 24.99,
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
    isFeatured: true,
    isBestSeller: true,
    isAvailable: true,
    rating: 4.7,
  },
  {
    name: 'Truffle Mushroom Risotto',
    description: 'Arborio rice with wild mushrooms, black truffle oil, parmesan, and fresh thyme.',
    price: 22.99,
    category: 'main-course',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600',
    isFeatured: true,
    isBestSeller: false,
    isAvailable: true,
    rating: 4.6,
  },
  {
    name: 'Classic Caesar Salad',
    description: 'Romaine lettuce, house-made Caesar dressing, croutons, shaved parmesan, and anchovy.',
    price: 14.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600',
    isFeatured: false,
    isBestSeller: true,
    isAvailable: true,
    rating: 4.5,
  },
  {
    name: 'Crispy Calamari',
    description: 'Lightly battered calamari rings with marinara sauce and lemon aioli.',
    price: 13.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600',
    isFeatured: false,
    isBestSeller: false,
    isAvailable: true,
    rating: 4.4,
  },
  {
    name: 'Bruschetta Trio',
    description: 'Classic tomato basil, roasted pepper and goat cheese, and mushroom truffle bruschetta.',
    price: 12.99,
    category: 'appetizers',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600',
    isFeatured: true,
    isBestSeller: false,
    isAvailable: true,
    rating: 4.3,
  },
  {
    name: 'Tiramisu',
    description: 'Classic Italian tiramisu with mascarpone, espresso-soaked ladyfingers, and cocoa.',
    price: 10.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600',
    isFeatured: true,
    isBestSeller: true,
    isAvailable: true,
    rating: 4.9,
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, vanilla ice cream, and fresh berries.',
    price: 12.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600',
    isFeatured: false,
    isBestSeller: true,
    isAvailable: true,
    rating: 4.8,
  },
  {
    name: 'Crème Brûlée',
    description: 'Classic French vanilla custard with caramelized sugar top and fresh raspberries.',
    price: 9.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=600',
    isFeatured: false,
    isBestSeller: false,
    isAvailable: true,
    rating: 4.6,
  },
  {
    name: 'Artisan Lemonade',
    description: 'Fresh-squeezed lemons with mint, lavender, and a touch of honey.',
    price: 5.99,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600',
    isFeatured: false,
    isBestSeller: false,
    isAvailable: true,
    rating: 4.2,
  },
  {
    name: 'Craft Mocktail',
    description: 'Seasonal fruit blend with ginger, basil, soda water, and edible flowers.',
    price: 7.99,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600',
    isFeatured: true,
    isBestSeller: false,
    isAvailable: true,
    rating: 4.5,
  },
  {
    name: 'Truffle Fries',
    description: 'Hand-cut fries with truffle oil, parmesan, garlic aioli, and fresh herbs.',
    price: 9.99,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600',
    isFeatured: false,
    isBestSeller: true,
    isAvailable: true,
    rating: 4.6,
  },
  {
    name: 'Grilled Asparagus',
    description: 'Char-grilled asparagus with lemon zest, shaved almonds, and balsamic glaze.',
    price: 8.99,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1506355683710-ca700e81cf24?w=600',
    isFeatured: false,
    isBestSeller: false,
    isAvailable: true,
    rating: 4.3,
  },
  {
    name: 'Lobster Bisque',
    description: 'Creamy lobster bisque with sherry, crème fraîche, and chive oil.',
    price: 16.99,
    category: 'specials',
    image: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=600',
    isFeatured: true,
    isBestSeller: false,
    isAvailable: true,
    rating: 4.7,
  },
  {
    name: 'Pan-Seared Scallops',
    description: 'Day boat scallops with cauliflower purée, brown butter, and crispy capers.',
    price: 32.99,
    category: 'specials',
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=600',
    isFeatured: false,
    isBestSeller: false,
    isAvailable: true,
    rating: 4.8,
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Regular Customer',
    content: 'Absolutely incredible dining experience! The Wagyu Burger is the best I have ever had. The ambiance is perfect for a romantic dinner or family gathering.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    isActive: true,
  },
  {
    name: 'Michael Chen',
    role: 'Food Critic',
    content: 'DineFlow sets a new standard for fine dining. Every dish is crafted with precision and passion. The truffle risotto is a masterpiece.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    isActive: true,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Event Host',
    content: 'We hosted our anniversary dinner at DineFlow and it was flawless. The staff went above and beyond, and the tiramisu was to die for!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    isActive: true,
  },
  {
    name: 'David Thompson',
    role: 'Business Executive',
    content: 'Perfect venue for business dinners. Impeccable service, exquisite wine list, and the salmon is always cooked to perfection.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    isActive: true,
  },
  {
    name: 'Lisa Park',
    role: 'Food Blogger',
    content: 'The crème brûlée is the best I have had outside of Paris. DineFlow brings authentic fine dining to our city. Highly recommended!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    isActive: true,
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for data seeding...');

    const existingMenuCount = await MenuItem.countDocuments();
    if (existingMenuCount > 0) {
      console.log(`Menu items already exist (${existingMenuCount}). Skipping menu seed...`);
    } else {
      await MenuItem.insertMany(menuItems);
      console.log(`${menuItems.length} menu items seeded successfully!`);
    }

    const existingTestimonialCount = await Testimonial.countDocuments();
    if (existingTestimonialCount > 0) {
      console.log(`Testimonials already exist (${existingTestimonialCount}). Skipping testimonial seed...`);
    } else {
      await Testimonial.insertMany(testimonials);
      console.log(`${testimonials.length} testimonials seeded successfully!`);
    }

    await mongoose.connection.close();
    console.log('Data seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Data seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();
