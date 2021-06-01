import React from 'react'
import { View } from 'react-native'
import globalStyles from '../Style'
import { Header, Text, ListItem, Avatar } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axios'
import * as UserActions from '../store/actions/user'
import CreditInformationScreen from './CreditInformationScreen'
const FavouritesScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()

  const favourites = useSelector((state) => state.user.user.favourites)
  //I want to retrieve also the image

  const email = route.params.email.email

  const products = useSelector((state) => state.products.availableProducts)
  let favouriteUpdate

  if (products) {
    favouriteUpdate = products.filter((prod) => favourites.includes(prod.title))
  }

  return (
    <View style={globalStyles.container}>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        centerComponent={
          <Text style={globalStyles.header_text}>PRODOTTI FAVORITI</Text>
        }
        leftComponent={
          <AntDesign
            name="arrowleft"
            size={30}
            color="white"
            onPress={() => navigation.popToTop()}
          />
        }
        backgroundColor="#3D6DCC"
        containerStyle={{ height: 120, borderRadius: 30, alignItems: 'center' }}
      />
      {products &&
        favouriteUpdate.map((favourite, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => {
              navigation.navigate('Dettagli', {
                itemId: favourite._id,
              })
            }}
          >
            <Avatar
              source={{
                uri: `${axios.defaults.baseURL}/${favourite.image}`,
              }}
            />
            <ListItem.Content
              style={{ justifyContent: 'space-between', flexDirection: 'row' }}
            >
              <ListItem.Title style={globalStyles.text}>
                {favourite.title}
              </ListItem.Title>
              <ListItem.Title
                style={globalStyles.cancel_label}
                onPress={() =>
                  dispatch(
                    UserActions.updateFavourite(email, favourite.title, 1),
                  )
                }
              >
                CANCELLA
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
    </View>
  )
}

export default FavouritesScreen
