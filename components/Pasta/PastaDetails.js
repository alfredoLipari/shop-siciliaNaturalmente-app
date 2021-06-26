import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PastaDetails = ({ selectedProduct }) => {
  return (
    <View style={styles.listContainer}>
      <Text style={{ fontFamily: 'Inter_400Regular' }}>
        🌾 grano utilizzato:{' '}
        <Text style={{ fontFamily: 'Inter_600SemiBold' }}>
          {selectedProduct.grano}
        </Text>
      </Text>
      <Text style={{ fontFamily: 'Inter_400Regular' }}>
        ⚖️ grammi:{' '}
        <Text style={{ fontFamily: 'Inter_600SemiBold' }}>
          {selectedProduct.grammi}
        </Text>
        <Text style={{ fontFamily: 'Inter_400Regular' }}> gm</Text>
      </Text>
      <Text style={{ fontFamily: 'Inter_400Regular' }}>
        ⏲️ tempo cottura:{' '}
        <Text style={{ fontFamily: 'Inter_600SemiBold' }}>
          {selectedProduct.minutiPrep}
        </Text>
        <Text style={{ fontFamily: 'Inter_400Regular' }}>min</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    height: 100,
    justifyContent: 'space-between',
    marginTop: 10,
  },
})

export default PastaDetails
