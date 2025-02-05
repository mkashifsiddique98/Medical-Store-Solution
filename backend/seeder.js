// * Importing everthing again, as this file is separate and we have
// * created it just to import data to database

// ! =============================
// * Importing Mongoose
import mongoose from 'mongoose'
// * Importing dotenv package to use environment variables form .end file
import dotenv from 'dotenv'
// * Importing that function to connect with the database
import connectDB from './config/db.js'
// * Importing colors to make the console attractive
import colors from 'colors'
// * Importing the Random data of users and products
import users from './data/users.js'
import products from './data/products.js'
// * Importing the models
import User from './models/userModel.js'
import Product from './models/ProductModel.js'
import Order from './models/OrderModel.js'
import StoreCoin from './models/storeCoinModel.js'
import { storeCoins } from './data/storeCoins.js'

// !===============================
dotenv.config()

connectDB()

// ! ===============================

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await StoreCoin.deleteMany()

    const createdUsers = await User.insertMany(users)
    await StoreCoin.insertMany(storeCoins)
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)
    console.log('Data Imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
