import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Pressable,
} from 'react-native'
import { Divider } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import OrderHistoryScreen from '../../screens/OrdersHistoryScreen'
import * as userActions from '../../store/actions/user'
import { Fontisto } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import Heart from '../../assets/heart'
const win = Dimensions.get('window')
const ratio = win.width / 541 //541 is actual image width

const userLogged = ({ payload }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const email = payload.user.email

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/photo/userBackground.jpeg')}
        style={styles.image}
      >
        <View style={styles.userImage}>
          <Text style={styles.heading}>{payload.user.name}</Text>
        </View>
      </ImageBackground>
      <View style={styles.ViewContainer}>
        <Text style={[styles.heading, styles.viewHeading]}>Account</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('HistoryOrders', {
              email: { email },
            })
          }
          style={{
            alignSelf: 'center',
            width: '90%',

            marginVertical: 20,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Fontisto name="shopping-bag-1" size={24} color="#094067" />
            <Text style={{ fontFamily: 'Inter_400Regular', color: '#094067' }}>
              ORDINI EFFETTUATI
            </Text>
            <AntDesign name="right" size={24} color="#094067" />
          </View>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate('Favourites', {
              email: { email },
            })
          }
          style={{
            alignSelf: 'center',
            width: '90%',
            marginVertical: 20,
          }}
        >
          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}
          >
            <Heart color="#094067" secondColor="#094067" />

            <Text style={{ fontFamily: 'Inter_400Regular', color: '#094067' }}>
              FAVOURITES
            </Text>
            <AntDesign name="right" size={24} color="#094067" />
          </View>
        </Pressable>
        <Divider
          style={{
            backgroundColor: '#094067',
            width: '85%',
            alignSelf: 'center',
            marginBottom: 10,
          }}
        />
        <Pressable
          onPress={() => dispatch(userActions.logout)}
          style={{
            alignSelf: 'center',
            width: '90%',
            marginVertical: 20,
          }}
        >
          <View
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}
          >
            <MaterialIcons name="logout" size={24} color="#094067" />

            <Text style={{ fontFamily: 'Inter_400Regular', color: '#094067' }}>
              LOGOUT
            </Text>
            <AntDesign name="right" size={24} color="#094067" />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
    borderRadius: 50,
    width: win.width,
    height: ratio * 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    zIndex: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    alignSelf: 'center',
    color: '#094067',
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
  },
  ViewContainer: {
    flex: 1,
    marginTop: 20,
  },

  viewHeading: {
    alignSelf: 'flex-start',
    fontSize: 23,
    marginBottom: 30,
    textTransform: 'none',
    marginHorizontal: 20,
  },
})

export default userLogged
