const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const MenuItem = require('../models/MenuItem');
const Testimonial = require('../models/Testimonial');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/all', protect, async (req, res) => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(10);
      await Admin.create({
        name: 'Admin',
        email: 'admin@dineflow.com',
        password: await bcrypt.hash('Admin@123', salt),
      });
    }

    const menuCount = await MenuItem.countDocuments();
    if (menuCount === 0) {
      await MenuItem.insertMany([
        { name: 'Grilled Atlantic Salmon', description: 'Fresh Atlantic salmon fillet, lemon herb butter, seasonal vegetables', price: 28.99, category: 'main-course', image: 'https://images.pexels.com/photos/4051007/pexels-photo-4051007.jpeg?auto=compress&cs=tinysrgb&w=600', isFeatured: true, isBestSeller: true, isAvailable: true },
        { name: 'Wagyu Beef Burger', description: 'Premium wagyu patty, aged cheddar, caramelized onions, truffle fries', price: 24.99, category: 'main-course', image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600', isFeatured: true, isBestSeller: true, isAvailable: true },
        { name: 'Margherita Pizza', description: 'San Marzano tomatoes, fresh mozzarella, basil, extra virgin olive oil', price: 18.99, category: 'main-course', image: 'https://images.pexels.com/photos/6605213/pexels-photo-6605213.jpeg?auto=compress&cs=tinysrgb&w=600', isFeatured: false, isBestSeller: true, isAvailable: true },
        { name: 'Truffle Risotto', description: 'Arborio rice, wild mushrooms, truffle oil, parmesan', price: 22.99, category: 'main-course', image: 'https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=600', isFeatured: true, isBestSeller: false, isAvailable: true },
        { name: 'Bruschetta Trio', description: 'Tomato basil, mushroom truffle, roasted pepper — on artisan crostini', price: 14.99, category: 'appetizers', image: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=600', isFeatured: false, isBestSeller: false, isAvailable: true },
        { name: 'Calamari Fritti', description: 'Crispy calamari, spicy marinara, lemon aioli', price: 15.99, category: 'appetizers', image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600', isFeatured: false, isBestSeller: true, isAvailable: true },
        { name: 'Tiramisu', description: 'Classic Italian espresso-soaked ladyfingers, mascarpone cream', price: 11.99, category: 'desserts', image: 'https://images.pexels.com/photos/2144113/pexels-photo-2144113.jpeg?auto=compress&cs=tinysrgb&w=600', isFeatured: true, isBestSeller: true, isAvailable: true },
        { name: 'Chocolate Lava Cake', description: 'Warm molten center, vanilla bean ice cream, berry coulis', price: 13.99, category: 'desserts', image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600', isFeatured: false, isBestSeller: true, isAvailable: true },
        { name: 'Berry Lemonade', description: 'Fresh-squeezed lemonade, mixed berry puree, mint', price: 6.99, category: 'beverages', image: '', isFeatured: false, isBestSeller: false, isAvailable: true },
        { name: 'Espresso Martini', description: 'Vodka, Kahlua, fresh espresso, vanilla syrup', price: 14.99, category: 'beverages', image: '', isFeatured: false, isBestSeller: false, isAvailable: true },
        { name: 'Truffle Fries', description: 'Hand-cut fries, truffle oil, parmesan, fresh herbs', price: 9.99, category: 'sides', image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600', isFeatured: false, isBestSeller: true, isAvailable: true },
        { name: 'Grilled Asparagus', description: 'Charred asparagus, lemon zest, shaved parmesan', price: 8.99, category: 'sides', image: 'https://images.pexels.com/photos/4051007/pexels-photo-4051007.jpeg?auto=compress&cs=tinysrgb&w=600', isFeatured: false, isBestSeller: false, isAvailable: true },
        { name: 'Lobster Linguine', description: 'Fresh Maine lobster, cherry tomatoes, white wine garlic sauce', price: 34.99, category: 'specials', image: 'https://images.pexels.com/photos/725997/pexels-photo-725997.jpeg?auto=compress&cs=tinysrgb&w=600', isFeatured: true, isBestSeller: true, isAvailable: true },
        { name: 'Chef\'s Tasting Menu', description: 'Six-course chef-curated experience with wine pairings', price: 89.99, category: 'specials', image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600', isFeatured: true, isBestSeller: false, isAvailable: true },
      ]);
    }

    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany([
        { name: 'Sarah Johnson', role: 'Food Critic', content: 'An extraordinary dining experience. The Wagyu Burger is without question the best I\'ve ever had. The atmosphere perfectly complements the exquisite menu.', rating: 5, isActive: true },
        { name: 'Michael Chen', role: 'Regular Guest', content: 'We\'ve been coming here for years and it never disappoints. The service is impeccable and the seasonal specials keep us coming back for more.', rating: 5, isActive: true },
        { name: 'Emily Rodriguez', role: 'Event Planner', content: 'Hosted our company gala here and it was flawless. The staff went above and beyond, and the Chef\'s Tasting Menu was a huge hit with everyone.', rating: 5, isActive: true },
        { name: 'David Kim', role: 'Travel Blogger', content: 'DineFlow is a hidden gem. The truffle risotto is life-changing, and the dessert selection rivals any Michelin-starred restaurant I\'ve visited.', rating: 4, isActive: true },
      ]);
    }

    res.json({
      message: 'Database seeded successfully',
      admin: adminCount === 0 ? 'created' : 'already exists',
      menu: menuCount === 0 ? '14 items added' : 'already exists',
      testimonials: testimonialCount === 0 ? '4 testimonials added' : 'already exists',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
