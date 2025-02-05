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

// ? ================== 1) Cart Reducer (Add Items and Delete Items)  ==================
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    // *   Cart Add Item
    case CART_ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find(p => p.product === item.product)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(p =>
            p.product === existItem.product ? item : p
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    // *  Cart Remove Item
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(m => m.product !== action.payload),
      }
    //*   Cart Save Shipping Address Case
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    //* Save Payment Method Case
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }

    default:
      return state
  }
}
