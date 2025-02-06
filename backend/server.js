// * Importing Libraries
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';

// * Importing DB Connection and Routes
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import compoundingMedicineRoutes from './routes/compoundingMedicineRoutes.js';

// * Importing Custom Error Handlers
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// * Load environment variables and connect to DB
dotenv.config();
connectDB();

// * Initialize the Express App
const app = express();

// * Enable CORS before defining any routes
app.use(cors({
  origin: ['https://medical-store-solution-live.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// If needed, handle preflight requests
app.options('*', cors());

// * Middleware to parse JSON bodies (only one call is needed)
app.use(express.json());

// * Morgan Logging for Development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// * Routes
app.get('/', (req, res) => {
  res.send('API is running..........');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/compounding-medicine', compoundingMedicineRoutes);

// * Serve static files from the uploads folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// * Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// * Start the Server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold)
);
