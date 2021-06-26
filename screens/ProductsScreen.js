// * PRODUCTS SCREEN, the first screen to be visualized
// ? What should it do?
// * View all available products, filter them and select one

import React, { useState, useCallback, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  ImageBackground,
} from 'react-native'
import { SearchBar, Header, Button } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { images } from '../data/dummy-data'
import { useDispatch, useSelector } from 'react-redux'

import Pasta from '../components/Pasta/pasta'
import OtherProducts from '../components/OtherProducts/OtherProducts'
import Box from '../components/Box/Box'
import axios from '../axios'

import Category from '../components/category'
import * as PastaProdcuctActions from '../store/actions/products'
import FilterOverlayPasta from '../components/filterComponent/pastaFilter'
import FilterIcon from '../assets/filter'

//this is the shop screen.

//const for the SiciliaLogo

export const customLeftHeaderComponent = () => {
  return (
    <ImageBackground
      source={images.category.logo}
      style={{
        width: 135,
        height: 41,
        justifyContent: 'center',
      }}
    />
  )
}

const ProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  const [selectedCategoryPasta, setSelectedCategoryPasta] = useState(true) //the selected category
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState(
    false,
  ) //the selected category
  const [selectedCategoryBox, setSelectedCategoryBox] = useState(false) //the selected category
  const [renderedComponent, setRenderComponent] = useState(<Pasta />)

  const [overlayIsVisible, setIsVisible] = useState(false)

  //function to select the current category
  const selectedCategory = (category) => {
    switch (category) {
      case 'pasta':
        setSelectedCategoryPasta(true)
        setSelectedCategoryProducts(false)
        setSelectedCategoryBox(false)
        return setRenderComponent(<Pasta />)
      case 'prodotti':
        setSelectedCategoryPasta(false)
        setSelectedCategoryProducts(true)
        setSelectedCategoryBox(false)
        return setRenderComponent(<OtherProducts />)
      case 'box':
        setSelectedCategoryPasta(false)
        setSelectedCategoryProducts(false)
        setSelectedCategoryBox(true)
        return setRenderComponent(<Box />)
    }
  }
  //logic for the SearchBar3

  const searchFilterFunction = (text) => {
    setSearch(text)
    let newText = text
    if (text.length !== 0) {
      newText = text[0].toUpperCase()
    }
    //perform a filter function
    dispatch(PastaProdcuctActions.fetchOneProducts(newText, 'titolo'))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
      onClick={() => Keyboard.dismiss()}
    >
      <Header
        backgroundImage={images.otherImages.cartBackgroundHeader}
        backgroundImageStyle={{
          resizeMode: 'repeat',
          backgroundColor: '#F6F7FA',
        }}
        statusBarProps={{ barStyle: 'light-content' }}
        leftContainerStyle={{
          marginLeft: 10,
        }}
        centerComponent={<Text style={styles.logoText}>SICILIA SHOP</Text>}
        backgroundColor="#F6F7FA"
        containerStyle={{
          height: 100,
        }}
      />

      <View style={styles.searchContainer}>
        {selectedCategoryPasta && (
          <FilterOverlayPasta
            visible={overlayIsVisible}
            setIsVisible={() => setIsVisible(!overlayIsVisible)}
          />
        )}
        <SearchBar
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputStyle}
          placeholder="search products"
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
        />
        <Pressable
          onPress={() => setIsVisible(true)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={styles.text}>FILTER</Text>
          <FilterIcon />
        </Pressable>
      </View>

      <View style={styles.categories}>
        <View style={styles.category}>
          <Category
            image={
              images.category[
                selectedCategoryPasta === true ? 'pastaOffset' : 'pasta'
              ]
            }
            title="pasta"
            onSelect={selectedCategory}
            color={selectedCategoryPasta}
          />
          <Text
            style={{
              marginTop: 7,
              fontFamily: selectedCategoryPasta
                ? 'Inter_600SemiBold'
                : 'Inter_400Regular',
              color: selectedCategoryPasta ? '#094067' : 'rgb(135, 137, 141)',
            }}
          >
            Pasta
          </Text>
        </View>
        <View style={styles.category}>
          <Category
            image={
              images.category[
                selectedCategoryProducts === true
                  ? 'prodottiOffset'
                  : 'prodotti'
              ]
            }
            onSelect={selectedCategory}
            title="prodotti"
            color={selectedCategoryProducts}
          />
          <Text
            style={{
              marginTop: 7,
              fontFamily: selectedCategoryProducts
                ? 'Inter_600SemiBold'
                : 'Inter_400Regular',
              color: selectedCategoryProducts
                ? '#094067'
                : 'rgb(135, 137, 141)',
            }}
          >
            Prodotti
          </Text>
        </View>

        <View style={styles.category}>
          <Category
            image={
              images.category[
                selectedCategoryBox === true ? 'scatolaOffset' : 'scatola'
              ]
            }
            title="box"
            onSelect={selectedCategory}
            color={selectedCategoryBox}
          />
          <Text
            style={{
              color: selectedCategoryBox ? '#094067' : 'rgb(135, 137, 141)',
              marginTop: 7,
              fontFamily: selectedCategoryBox
                ? 'Inter_600SemiBold'
                : 'Inter_400Regular',
            }}
          >
            Scatole
          </Text>
        </View>
      </View>

      {renderedComponent}

      <StatusBar style="light" />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fffffe',
  },
  logoText: {
    backgroundColor: 'white',
    width: '60%',
    textAlign: 'center',
    padding: 10,
    borderRadius: 20,
    color: '#094067',
    fontFamily: 'Inter_600SemiBold',
  },
  categories: {
    marginTop: 10,
    width: '85%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  category: {
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },

  inputContainer: {
    backgroundColor: '#fffffe',
    justifyContent: 'center',
    width: '65%',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 5,
  },
  inputStyle: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'rgb(0, 122, 255)',
    borderBottomWidth: 2,
    height: 39,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    marginHorizontal: 5,
    letterSpacing: 3,
    color: '#094067',
    fontFamily: 'Inter_600SemiBold',
  },
})

export default ProductsScreen
