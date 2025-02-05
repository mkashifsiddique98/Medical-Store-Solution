// * Importing to handle the errors
import asyncHandler from 'express-async-handler'
// * Importing for coins
// import { STORE_COIN_CONFIG } from '../config/coin.js'
// * Importing Model File
import Order from '../models/orderModel.js'
// import StoreCoin from '../models/storeCoinModel.js'
import User from '../models/userModel.js'

const calculateCoinsUsage = async coinsCalculations => {
  // const oneCoinValue = await StoreCoin.findOne({
  //   key: STORE_COIN_CONFIG.ONE_STORE_COINT_VALUE,
  // })
  const coinsToUse = Math.ceil(coinsCalculations.grandTotal / 0.02)
  const remainingCoins = req.user.coins - coinsToUse
  req.user.coins = remainingCoins
  if (remainingCoins >= 0) coinsCalculations.storeCoinsUsed = coinsToUse
  else coinsCalculations.storeCoinsUsed = coinsToUse - req.user.coins
  coinsCalculations.discount = 10000 * 0.02
  coinsCalculations.grandTotal -= coinsCalculations.discount
  return coinsCalculations
}

// !================================
// * @desc   Create New Order
// * @route  POST /api/orders
// * @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    useCoins,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error(' No Order Items')
    return
  } else {
    const coinsCalculations = {
      storeCoinsUsed: 0,
      discount: 0,
      grandTotal: totalPrice,
    }
    if (useCoins) {
      await calculateCoinsUsage(coinsCalculations)
    }
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      ...coinsCalculations,
    })

    req.user.coins -= coinsCalculations.storeCoinsUsed

    const createdOrder = await order.save()
    await req.user.save()

    res.status(201).json(createdOrder)
  }
})

// !================================

// *    @desc     Get Order By ID
//*     @ route   GET /api/orders/:id
//*     @access   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
})

// !================================

//* @desc     Update order to delivered
//* @ route   GET /api/orders/:id/deliver
//* @access   Private/Admin
const updateOrderToDeliver = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order Not Found')
  }
  order.isDelivered = true
  order.deliveredAt = Date.now()

  const updatedOrder = await order.save()
  const user = await User.findById(order.user)
  // const registerStoreCoin = await StoreCoin.findOne({
  //   key: STORE_COIN_CONFIG.ORDER_COMPLETED_PER_HUNDRED,
  // })

  let coinsToAdd = user.coins + 100 * Math.ceil(order.totalPrice / 100)
  user.coins = coinsToAdd
  await user.save()
  res.json(updatedOrder)
})

// !================================
//* @desc     Update order to paid
//* @ route   GET /api/orders/:id/pay
//* @access   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order Not Found')
  }
  order.isPaid = true
  order.paidAt = Date.now()

  const updatedOrder = await order.save()
  res.json(updatedOrder)
})

// !================================
//* @desc      Get Logged In user orders
//* @ route   GET /api/orders/myorders
//* @access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// !================================

//* @desc      Get All Orders
//* @ route   GET /api/orders
//* @access   Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

// !================================

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDeliver,
}
