import {
  ADD_ONE_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  ADD_TO_CART,
  AUTH_ERROR,
  CHECKOUT_FINISHED,
  REORDER,
  CLEAR_CART_AFTER_CHECKOUT,
  UPDATE_PAST_ORDERS,
} from './types'

import axios from '../../axios'
import { auth } from './user'
export const addToCart = (product, quantity) => async (dispatch) => {
  return dispatch({
    type: ADD_TO_CART,
    product: product,
    quantity: quantity,
  })
}

export const removeFromCart = (product) => {
  return { type: REMOVE_FROM_CART, product: product }
}
export const addOneToCart = (product) => {
  return { type: ADD_ONE_TO_CART, product: product }
}

export const reorder = (price, products) => async (dispatch) => {
  dispatch({ type: CLEAR_CART })

  return setTimeout(
    () =>
      dispatch({
        type: REORDER,
        price: price,
        products: products,
      }),
    500,
  )
}

export const checkout = (product, user, totalAmount) => async (dispatch) => {
  dispatch(auth)
  if (!user.isAuthenticated) {
    dispatch({
      type: AUTH_ERROR,
    })
    return false
  }

  const { isAuthenticated, isLoading, token, ...dataLogin } = user
  const { email, ...dataUser } = dataLogin

  product.unshift(totalAmount)
  product.unshift(dataLogin.user.email)

  //do the call at server, passing the user and the product and jwt token
  try {
    const data = await axios.post(
      'http://8e4411c312e8.ngrok.io/orders/postOrder',
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const resData = await data.data

    dispatch({ type: UPDATE_PAST_ORDERS, payload: resData.ordersHistory })
    setTimeout(() => dispatch({ type: CHECKOUT_FINISHED }), 3000)
    dispatch({ type: CLEAR_CART_AFTER_CHECKOUT })
  } catch (e) {
    console.log(e, 'in cart')
  }
}
