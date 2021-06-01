import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from '../../axios'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Inter_900Black,
  Inter_400Regular,
  Inter_600SemiBold,
} from '@expo-google-fonts/dev'

const Product = (props) => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_900Black,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    //x 0.5 e 1
    return (
      <View style={styles.screen}>
        <TouchableOpacity onPress={props.onSelect} style={{ flex: 1 }}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: `${axios.defaults.baseURL}/${props.image}` }}
              style={{
                width: 120,
                height: 120,
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                fontFamily: 'Inter_600SemiBold',
                fontSize: 18,
                color: '#094067',
              }}
            >
              {props.title}
            </Text>
            <View style={{ width: 50 }}>
              <Text
                style={{ fontFamily: 'Inter_600SemiBold', color: '#094067' }}
              >
                {props.price}€
                <View>
                  <Text
                    style={{
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 10,
                      color: '#94a1b2',
                    }}
                  >
                    Per 500gm
                  </Text>
                </View>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    maxWidth: '45%',
    marginHorizontal: 10,
    marginVertical: 10,
    height: 280,
    borderWidth: 0.4,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#d8eefe',
    borderColor: '#5f6c7b',
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 15,

    alignSelf: 'center',
    marginHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})

export default Product
