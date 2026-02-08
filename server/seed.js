require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@shoestore.com',
    password: 'admin123',
    role: 'admin',
    phoneNumber: '+1-555-0100',
    address: {
      street: '123 Admin Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    name: 'Seller User',
    email: 'seller@shoestore.com',
    password: 'seller123',
    role: 'seller',
    phoneNumber: '+1-555-0105',
    address: {
      street: '789 Seller Lane',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    }
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    phoneNumber: '+1-555-0101',
    address: {
      street: '456 User Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    }
  }
];

const products = [
  {
    name: 'Air Max 270',
    description: 'The Nike Air Max 270 delivers visible cushioning under every step. Featuring a large Max Air unit in the heel for unrivaled comfort.',
    brand: 'Nike',
    category: 'Running',
    price: 150,
    discountPercentage: 10,
    mainImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    gender: 'Men',
    isFeatured: true,
    tags: ['comfortable', 'cushioned', 'running'],
    colors: [
      {
        name: 'Black',
        hexCode: '#000000',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        sizes: [
          { size: '8', stock: 15 },
          { size: '9', stock: 20 },
          { size: '10', stock: 18 },
          { size: '11', stock: 12 }
        ]
      }
    ]
  },
  {
    name: 'Ultraboost 22',
    description: 'Experience energy return like never before. The adidas Ultraboost 22 features responsive Boost cushioning.',
    brand: 'Adidas',
    category: 'Running',
    price: 180,
    discountPercentage: 15,
    mainImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
    gender: 'Unisex',
    isFeatured: true,
    tags: ['performance', 'boost', 'energy'],
    colors: [
      {
        name: 'Blue',
        hexCode: '#0000FF',
        imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
        sizes: [
          { size: '7', stock: 12 },
          { size: '8', stock: 15 }
        ]
      }
    ]
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = await User.create(users);
    const adminUser = createdUsers.find(u => u.role === 'admin');
    const sellerUser = createdUsers.find(u => u.role === 'seller');
    const johnUser = createdUsers.find(u => u.email === 'john@example.com');

    // Create products and link to seller
    console.log('👟 Creating products...');
    const productsWithSeller = products.map((p, index) => ({
      ...p,
      seller: index === 0 ? sellerUser._id : adminUser._id // First product belongs to seller, second to admin
    }));
    const createdProducts = await Product.create(productsWithSeller);

    // Create sample order for seller's product
    console.log('📦 Creating sample order...');
    const sellerProduct = createdProducts.find(p => p.seller.toString() === sellerUser._id.toString());
    
    const orderItems = [
      {
        product: sellerProduct._id,
        productName: sellerProduct.name,
        productImage: sellerProduct.mainImage,
        brand: sellerProduct.brand,
        color: sellerProduct.colors[0].name,
        size: '9',
        priceAtPurchase: sellerProduct.price,
        quantity: 1,
        subtotal: sellerProduct.price
      }
    ];

    await Order.create({
      user: johnUser._id,
      userEmail: johnUser.email,
      userName: johnUser.name,
      items: orderItems,
      subtotal: sellerProduct.price,
      totalAmount: sellerProduct.price,
      shippingAddress: {
        street: '456 User Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'USA',
        phoneNumber: '+1-555-0101'
      },
      paymentMethod: 'Credit Card',
      orderStatus: 'Pending'
    });

    console.log('\n║    Database seeded successfully!                    ║');
    console.log('║   🔐 Test Credentials:                                ║');
    console.log('║   Admin:  admin@shoestore.com / admin123             ║');
    console.log('║   Seller: seller@shoestore.com / seller123           ║');
    console.log('║   User:   john@example.com / password123             ║\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
