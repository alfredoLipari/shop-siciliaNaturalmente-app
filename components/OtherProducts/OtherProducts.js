import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useSelector } from 'react-redux'
import OtherProduct from './OtherProduct'

const OtherProducts = () => {
  const products = useSelector((state) =>
    state.products.availableProducts.filter(
      (pasta) => pasta.categoria === 'prodotto',
    ),
  )

  const navigation = useNavigation()
  const renderProducts = ({ item }) => {
    return (
      <OtherProduct
        id={item.id}
        title={item.title}
        image={item.image}
        price={item.prezzo}
        colore={item.colore}
        onSelect={() => {
          navigation.navigate('Dettagli', {
            itemId: item._id,
          })
        }}
      />
    )
  }

  return (
    <FlatList
      numColumns={2}
      key={2}
      data={products}
      renderItem={renderProducts}
      keyExtractor={(item, index) => item.id}
    />
  )
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default OtherProducts
