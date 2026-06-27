const fs = require('fs')
const dotenv = require('dotenv')
const Product = require('../../models/ProductModel')
const dbConnection = require('../../config/database')



dotenv.config({path : './config.env'})

dbConnection()

// Read data
const products = JSON.parse(fs.readFileSync('./utils/dummyData/product.json'));


// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);
    console.log('Data Inserted');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};


if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
}

