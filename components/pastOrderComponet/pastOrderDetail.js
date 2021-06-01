import React from 'react'
import { View, StyleSheet, StatusBar, Pressable } from 'react-native'
import { ListItem, Text, Header, Avatar } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import axios from '../../axios'
import * as CartActions from '../../store/actions/cart'

const PastOrderDetail = ({ route, navigation }) => {
  const dispatch = useDispatch()

  //fetch the id from the nav props
  const productId = route.params

  const pastOrders = useSelector(
    (state) => state.user.user.ordersHistory[productId.itemId],
  )

  //array destr
  const id = pastOrders[pastOrders.length - 1]

  const renderLeftComponent = () => {
    return (
      <AntDesign
        name="arrowleft"
        size={26}
        color="white"
        onPress={() => navigation.popToTop()}
      />
    )
  }

  const reorderHandle = () => {
    dispatch(
      CartActions.reorder(
        pastOrders[0],
        pastOrders.slice(1, pastOrders.length - 2),
      ),
    )
    navigation.navigate('Cart')
  }

  return (
    <View>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        leftComponent={renderLeftComponent}
        centerComponent={
          <Text style={{ color: 'white', fontFamily: 'Inter_600SemiBold' }}>
            Ordine n. {id}
          </Text>
        }
        backgroundColor="#3D6DCC"
        containerStyle={{
          paddingBottom: 30,
          alignItems: 'center',
        }}
      />
      {pastOrders.slice(1, pastOrders.length - 2).map((product, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar
            source={{
              uri: `${axios.defaults.baseURL}/${product.productImage}`,
            }}
          />
          <ListItem.Content>
            <ListItem.Title>{product.productTitle}</ListItem.Title>
            <ListItem.Subtitle>Qty. {product.quantity}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
      <Pressable onPress={reorderHandle} style={styles.button}>
        <Text style={styles.text}>RIORDINA</Text>
      </Pressable>
      <StatusBar barStyle="light-content" />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: '#ef4565',
    borderRadius: 25,
    width: '60%',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  text: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: 'white',
  },
})

export default PastOrderDetail
