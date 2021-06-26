// * CART SCREEN
// ? what can you do
// * checkout method when user is authenticated
// * add and delete product from the cart

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native'
import { Header, Button } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import * as cartActions from '../store/actions/cart'
import { useSelector, useDispatch } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import CustomModal from '../components/CustomModal'
import CartProduct from '../components/cartProduct'
import { images } from '../data/dummy-data'

const createAlert = (navigation) =>
  Alert.alert('Checkout forbidden', 'Devi autenticarti per continuare!', [
    {
      text: 'OK',
      onPress: () => navigation.navigate('Account'),
      style: 'cancel',
    },
  ])

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => {
    const transformedCartItems = []
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        productImage: state.cart.items[key].productImage,

        quantity: state.cart.items[key].quantity,
      })
    }
    return transformedCartItems
  })
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
  const isAuth = useSelector((state) => state.user.isAuthenticated)
  const checkoutSuccess = useSelector((state) => state.cart.checkoutSuccess)
  const emailUser = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const checkout = () => {
    if (!isAuth) {
      return createAlert(navigation)
    }

    dispatch(cartActions.checkout(cartItems, emailUser, cartTotalAmount))
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header
        backgroundImage={images.otherImages.cartBackgroundHeader}
        backgroundImageStyle={{ borderRadius: 30 }}
        statusBarProps={{ barStyle: 'light-content' }}
        backgroundColor="#F6F7FA"
        rightContainerStyle={{
          alignSelf: 'center',
        }}
        containerStyle={{
          height: 120,
        }}
      />

      <FlatList
        style={styles.container}
        ListHeaderComponent={
          <Text
            style={{
              fontSize: 23,
              fontFamily: 'Inter_600SemiBold',
              color: '#094067',
              marginBottom: 20,
            }}
          >
            I tuoi ordini
          </Text>
        }
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartProduct
            image={itemData.item.productImage}
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            product={itemData.item}
          />
        )}
        ListFooterComponent={
          <>
            <View style={styles.priceContainer}>
              {cartTotalAmount === 0 ? (
                <Text
                  style={{
                    fontFamily: 'Inter_400Regular',
                    textAlign: 'center',
                    color: '#5f6c7b',
                  }}
                >
                  Il tuo carrello è vuoto torna ad aggiungere dei prodotti!
                </Text>
              ) : (
                <Text style={styles.summaryText}>
                  Total: <Text style={styles.amount}>€{cartTotalAmount}</Text>
                </Text>
              )}
            </View>

            {/* button checkout   */}
            <View
              style={{
                marginTop: 30,
                width: '100%',
                overflow: 'hidden',
              }}
            >
              <Button
                onPress={() => checkout()}
                title="acquista!"
                disabled={cartTotalAmount === 0}
                raised
                icon={<AntDesign name="checkcircleo" size={24} color="white" />}
                iconRight
                titleStyle={{
                  fontFamily: 'Inter_400Regular',
                }}
                containerStyle={{
                  width: '95%',
                  alignSelf: 'center',
                }}
                buttonStyle={{
                  backgroundColor: '#3da9fc',

                  justifyContent: 'space-between',

                  padding: 15,
                }}
              />
            </View>
          </>
        }
      />

      <CustomModal
        showModal={checkoutSuccess}
        text="Checkout Effettuato!"
        theme="rgba(66, 135, 245, 1)"
      />
      <StatusBar style="light" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F6F7FA',
  },
  container: {
    marginVertical: 20,
    width: '85%',
    alignSelf: 'center',
  },
  product: {
    flexDirection: 'row',
    width: '100%',

    marginTop: 15,
  },

  priceContainer: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  amount: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#094067',
  },
  summaryText: {
    marginTop: 10,
    marginRight: 10,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    marginVertical: 3,
  },
})

export default CartScreen
