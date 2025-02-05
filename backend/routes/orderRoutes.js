//* Imported Libraries
import express from 'express'

//*  Imported Controller Files
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js'

//* Importing Middleware
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, admin, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDeliver)

export default router
