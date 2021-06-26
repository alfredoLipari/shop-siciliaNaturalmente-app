import React, { useEffect, useCallback, useRef, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as productsActions from '../../store/actions/products'
import Product from './Products'

import { useDispatch, useSelector } from 'react-redux'

const PastaProducts = () => {
  //I want to retrieve only the pasta category

  const products = useSelector((state) => state.products.availableProducts)
  console.log(products, 'qui')

  const dispatch = useDispatch()

  const isLoading = useSelector((state) => state.products.isLoading)

  let productsComplete = []

  if (products) {
    productsComplete = products.filter((p) => p.categoria === 'pasta')
  }

  // mountedRef indicate if the component is still mounted, if so continue the async to update the component, otherwise, skip them
  const mountedRef = useRef(true)

  const loadPasta = useCallback(async () => {
    try {
      if (!mountedRef.current) {
        await dispatch(productsActions.fetchProducts())
      }
    } catch (err) {
      //do something
    }
  }, [dispatch])

  useEffect(() => {
    loadPasta()
      .then(() => {})
      .catch((err) => {
        console.log(err)
      })

    //cleanup function
    return () => (mountedRef.current = false)
  }, [dispatch, loadPasta])

  const navigation = useNavigation()
  const renderProducts = ({ item }) => {
    return (
      <Product
        title={item.title}
        image={item.image}
        id={item._id}
        price={item.prezzo}
        onSelect={() => {
          navigation.navigate('Dettagli', {
            itemId: item._id,
          })
        }}
      />
    )
  }

  return (
    <>
      <FlatList
        onRefresh={() => dispatch(productsActions.fetchProducts())}
        refreshing={isLoading}
        data={productsComplete}
        renderItem={renderProducts}
        keyExtractor={(item, index) => item.title}
        numColumns={2}
        key={2}
      />
    </>
  )
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default PastaProducts
