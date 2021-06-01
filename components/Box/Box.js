import React from 'react'
import { StyleSheet, FlatList, ImageBackground } from 'react-native'
import { Text } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import OneBox from './oneBox'

const Box = () => {
  const products = useSelector((state) =>
    state.products.availableProducts.filter(
      (pasta) => pasta.categoria === 'box',
    ),
  )

  console.log(products)

  const renderBox = ({ item }) => {
    return (
      <OneBox
        title={item.title}
        image={item.image}
        price={item.prezzo}
        products={item.products}
        descrizione={item.description}
        onSelect={() => {
          navigation.navigate('Dettagli', {
            itemId: item._id,
          })
        }}
      />
    )
  }

  const navigation = useNavigation()

  return (
    <ImageBackground style={styles.container}>
      <Text style={styles.text}>La scelta migliore per un regalo ! </Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderBox}
        key={2}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    height: 600,
  },
  text: {
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#094067',
  },
})

export default Box
