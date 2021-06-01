import Pasta from '../../models/pasta'
import { SET_PASTA, IS_LOADING } from './types'
import axios from '../../axios'

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: IS_LOADING })
      console.log('getting products from the server..')
      const data = await axios.get('/pasta')

      const resData = await data.data
      const loadedPasta = []

      for (const key in resData) {
        loadedPasta.push(
          new Pasta(
            resData[key]._id,
            resData[key].categoria,
            resData[key].descrizione,
            resData[key].image,
            resData[key].title,
            resData[key].prezzo,
            resData[key].imageBack,
            resData[key].grano,
            resData[key].minutiPrep,
            resData[key].grammi,
            resData[key].quantita,
            resData[key].products,
          ),
        )
      }

      console.log(loadedPasta, ' quiii')

      dispatch({
        type: SET_PASTA,
        pasta: loadedPasta,
      })
    } catch (err) {
      //send to custom analytics server
      throw err
    }
  }
}
export const fetchOneProducts = (filterParam, filterType) => {
  return async (dispatch, getState) => {
    //perform the actions based on the filter
    dispatch({ type: IS_LOADING })
    switch (filterType) {
      case 'titolo':
        try {
          const data = await axios.get(`/pasta/${filterParam}`)

          const resData = await data.data

          return dispatch({
            type: SET_PASTA,
            pasta: resData,
          })
        } catch (err) {
          //send to custom analytics server
          console.log(err)
          throw err
        }

      case 'format':
        try {
          const data = await axios.get(`/pasta/format/${filterParam}`)

          const resData = await data.data

          return dispatch({
            type: SET_PASTA,
            pasta: resData,
          })
        } catch (err) {
          //send to custom analytics server
          console.log(err)
          throw err
        }
      case 'prezzo':
        try {
          const data = await axios.post('/pasta/price')

          const resData = await data.data

          return dispatch({
            type: SET_PASTA,
            pasta: resData,
          })
        } catch (err) {
          //send to custom analytics server
          console.log(err)
          throw err
        }
    }
  }
}
