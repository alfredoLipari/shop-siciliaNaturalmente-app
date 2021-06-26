import { returnErrors, clearErrors } from './error'
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  FINISH_REGISTER,
  UPDATE_PAST_ORDERS,
  UPDATE_FAVOURITE,
  SAVE_PAYMENT_METHOD,
} from './types'

import axios from '../../axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const auth = () => async (dispatch) => {
  //dispatch(setLogoutTimer(expiryTime))
  const token = await AsyncStorage.getItem('token')
  let config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  }

  try {
    const auth = await axios.get('/user/auth', config)
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status))
    dispatch({
      type: AUTH_ERROR,
    })
  }

  dispatch({ type: USER_LOADED, payload: auth.data })
}

export const register = (values, isLogin) => {
  return async (dispatch, payload) => {
    dispatch({ type: USER_LOADING })
    const { name, ...dataLogin } = values

    /* l'utente vuole loggarsi */
    if (isLogin) {
      dispatch(clearErrors())
      try {
        const data = await axios.post('/user/signin', dataLogin, {
          withCredentials: true,
        })
        const resData = await data.data
        dispatch({ type: USER_LOADED })
        return dispatch({
          //dispatch di authenticate
          type: LOGIN_SUCCESS,
          payload: resData,
        })
      } catch (err) {
        console.log('errore')
        console.log(err.response.data, 'in data')

        dispatch(
          returnErrors(err.response.data, err.response.status, 'LOGIN FAILED'),
        )
        dispatch({ type: USER_LOADED })
        dispatch({
          type: LOGIN_FAIL,
        })
        return
      }
    }
    //l'utente vuole registrarsi
    console.log(values, 'in registrazione')
    try {
      data = await axios.post('/user/signup', values)
      const resData = await data.data
      dispatch({ type: USER_LOADED })
      setTimeout(
        () =>
          dispatch({
            type: FINISH_REGISTER,
          }),
        2000,
      )
      return dispatch({
        //dispatch di authenticate
        type: REGISTER_SUCCESS,
        payload: resData,
      })
      /* ERROR CASE  */
    } catch (err) {
      console.log('errore', err.response.data)
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER FAILED'),
      )
      dispatch({ type: USER_LOADED })
      dispatch({
        type: REGISTER_FAIL,
      })
      return
    }
  }
}

export const logout = (dispatch) => {
  AsyncStorage.removeItem('userData')
  //clearLogoutTimer()
  dispatch({ type: LOGOUT_SUCCESS })
}

/* action for load the orders based on the email   */
export const loadPastOrders = (email) => async (dispatch) => {
  dispatch({ type: USER_LOADING })
  try {
    const result = await axios.post('orders/getOrders', email)
    const data = await result.data

    dispatch({ type: USER_LOADED })
    dispatch({ type: LOAD_PAST_ORDERS, payload: data })
  } catch (e) {
    console.log(e.response.data, 'in loadPastOrders')
    dispatch({ type: USER_LOADED })
  }
}

/* action for add to the favourite based on the email */
export const updateFavourite = (email, title, isDelete) => async (dispatch) => {
  try {
    const body = {
      email: email,
      favourite: title,
    }
    if (isDelete) {
      const result = await axios.post('user/deleteFavourite', body)
      const data = await result.data

      return dispatch({ type: UPDATE_FAVOURITE, payload: data })
    }

    const result = await axios.post('user/favourite', body)
    const data = await result.data

    dispatch({ type: UPDATE_FAVOURITE, payload: data })
  } catch (e) {
    console.log(e, 'in updateFavourite')
  }
}

//Stripe api, create a paymentMethod and attach to a user
export const createPaymentMethod = (info) => {
  return { type: SAVE_PAYMENT_METHOD, payload: info }
}

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  )
}
