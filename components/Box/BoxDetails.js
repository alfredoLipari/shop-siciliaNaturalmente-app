import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import axios from '../../axios'
import { Avatar, Divider } from 'react-native-elements'
const BoxDetails = ({ selectedProduct, boxLayout }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.text}>{selectedProduct.descrizione}</Text>
      {/* render the box Layout */}
      {boxLayout && (
        <>
          <Divider
            style={{
              backgroundColor: '#3da9fc',
              height: 0.5,
              marginVertical: 5,
            }}
          />
          <Text style={styles.text}>Cosa contiene: </Text>
          <View style={styles.boxLayout}>
            {boxLayout.map((product, i) => (
              <Pressable
                style={{ alignItems: 'center' }}
                key={product._id}
                onPress={() => {
                  navigation.navigate('Dettagli', {
                    itemId: product._id,
                  })
                }}
              >
                <Avatar
                  rounded
                  source={{
                    uri: `${axios.defaults.baseURL}/${product.image}`,
                  }}
                ></Avatar>
                <Text>x {selectedProduct.products[i].qty}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    height: 100,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  boxLayout: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4,
  },
  text: {
    color: '#094067',
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
})

export default BoxDetails
