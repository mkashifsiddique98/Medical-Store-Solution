// * Importing Libraries
import express from 'express'
import path from 'path'
import morgan from 'morgan'

// * Importing dotenv package
import dotenv from 'dotenv'
// * Importing db.js file (which connects our application to DB)
import connectDB from './config/db.js'
// * importing colors to use different colors to show the console attractive
import colors from 'colors'
import cors from 'cors';
// * Importing Routes files
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import compoundingMedicineRoutes from './routes/compoundingMedicineRoutes.js'

// * Importing custom Error Handlers (Custom Middlewares)
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

// ! ==================================================
// *    initializing the express App
const app = express()

//* Using Morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// * config() the dotenv (.env) file
dotenv.config()
// * calling the connectDB function to connect with the DB
connectDB()

// !========================================================
// ? that will allows us to accept Json data in the body
// ? and it is mandotary to write it before Routes (sequence really matters here!)
app.use(express.json()) // ? that will allows us to accept Json data in the body

// * Routing in Express
app.get('/', (req, res) => {
  res.send('API is running..........')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/compounding-medicine', compoundingMedicineRoutes)

// * for making the upload folder Static
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

app.use(cors({
  origin: [ 'https://medical-store-solution-live.vercel.app/','http://localhost:3000'], // Add frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow cookies if needed
}));
// !========================================

// ! using environment variable i.e. PORT & NODE_ENV
const PORT = process.env.PORT || 5000
app.use(express.json());
// * Listening the App at the specific port
app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
  )
)
