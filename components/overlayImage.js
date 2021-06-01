import React from 'react'
import { Overlay, Text } from 'react-native-elements'
import { FlatList, View, StyleSheet, Image, Dimensions } from 'react-native'
import axios from '../axios'
import GallerySwiper from 'react-native-gallery-swiper'

const OverlayImage = (props) => {
  const images = [
    { source: { uri: `${axios.defaults.baseURL}/${props.images[0]}` } },
    { source: { uri: `${axios.defaults.baseURL}/${props.images[1]}` } },
  ]

  if (props.images[1] == undefined) {
    images.pop()
  }
  return (
    <Overlay
      isVisible={props.visible}
      onBackdropPress={() => props.setIsVisible()}
      overlayStyle={styles.container}
    >
      <GallerySwiper
        style={{ padding: 10 }}
        images={images}
        scrollViewStyle={{ backgroundColor: 'white' }}
      />
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '70%',
    width: '80%',
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
  },
  h2: {
    marginLeft: 10,
    color: '#094067',
    marginBottom: 5,
    fontFamily: 'Inter_400Regular',
  },
  text: {
    marginLeft: 10,
    color: '#5f6c7b',
    fontFamily: 'Inter_400Regular',
  },
  bg: {
    backgroundColor: '#d8eefe',
  },
  bg1: {
    backgroundColor: 'white',
  },
})

export default OverlayImage
