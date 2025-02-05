// * Imported Libraries
import axios from 'axios'

//* Imported Constants
import {
  // * Add to Cart Item Constant
  CART_ADD_ITEM,
  // * Remove to Cart Item Constant
  CART_REMOVE_ITEM,
  // * Save Shipping Address Constant
  CART_SAVE_SHIPPING_ADDRESS,
  // * Save Payment Method Constant
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

// ? ================== 1) Action for Add items to cart   ==================
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// ? ================== 2) Action for Remove items to cart   ==================
export const removeFromCart = id => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

//? ============== 3) Action for save shipping address Action =========================
export const saveShippingAddress = data => dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

//? ============== 4) Action for Save Payment Mehtod =========================
export const savePaymentMethod = data => dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
