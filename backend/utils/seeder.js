const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/ProductModel');
const Category = require('../models/categoryModel');

// Load env vars
dotenv.config({ path: './config.env' });

// Connect to DB
mongoose.connect(process.env.DATA_URL).then(() => {
    console.log('Database Connected for Seeding');
}).catch(err => {
    console.log('DB Connection Error:', err);
});

// Sample Categories
const categories = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Clothing', slug: 'clothing' }
];

// Seed Data Function
const seedData = async () => {
    try {
        await Category.deleteMany();
        await Product.deleteMany();

        console.log('Old Data Destroyed...');

        const createdCategories = await Category.insertMany(categories);
        const category1Id = createdCategories[0]._id;
        const category2Id = createdCategories[1]._id;

        const products = [
            {
                title: 'iPhone 15 Pro Max',
                slug: 'iphone-15-pro-max',
                description: 'The latest iPhone with amazing features and powerful A17 Pro chip.',
                quantity: 10,
                price: 1200,
                colors: ['Black', 'White', 'Titanium'],
                imageCover: 'iphone15.jpg',
                category: category1Id
            },
            {
                title: 'MacBook Pro M3',
                slug: 'macbook-pro-m3',
                description: 'Supercharged by M3 chip, perfect for professionals.',
                quantity: 5,
                price: 2500,
                colors: ['Silver', 'Space Gray'],
                imageCover: 'macbook.jpg',
                category: category1Id
            },
            {
                title: 'Cotton T-Shirt',
                slug: 'cotton-t-shirt',
                description: 'Comfortable and breathable cotton t-shirt for daily wear.',
                quantity: 50,
                price: 25,
                colors: ['Red', 'Blue', 'White'],
                imageCover: 'tshirt.jpg',
                category: category2Id
            }
        ];

        await Product.insertMany(products);
        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error with data import', error);
        process.exit(1);
    }
};

// Destroy Data Function
const destroyData = async () => {
    try {
        await Category.deleteMany();
        await Product.deleteMany();

        console.log('Data Destroyed...');
        process.exit();
    } catch (error) {
        console.error('Error with data destroy', error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    seedData();
}
