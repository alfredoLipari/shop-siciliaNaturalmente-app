import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native'
import { Header, Avatar, Divider } from 'react-native-elements'
import axios from '../axios'
import { AntDesign } from '@expo/vector-icons'
import Heart from '../assets/heart'
import { useDispatch, useSelector } from 'react-redux'
import * as cartActions from '../store/actions/cart'
import * as userActions from '../store/actions/user'
import OverlayImage from '../components/overlayImage'
import globalStyles from '../Style'
import CustomModal from '../components/CustomModal'
import LottieView from 'lottie-react-native'

const PastaDetails = ({ route, navigation }) => {
  /* I had to be carefull here */

  let selectedProduct = {}
  let isFavourite = false

  const products = useSelector((state) => state.products.availableProducts)

  const isAuth = useSelector((state) => state.user.isAuthenticated)

  const favourites = useSelector((state) => state.user.user.favourites)

  const email = useSelector((state) => state.user.user.email)

  const productId = route.params
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(1)

  //overlay image state
  const [isVisible, setIsVisible] = useState(false)

  const [showModal, setShowModal] = useState(false)

  //to be sure is insert a number
  const numberInputHandler = (inputText) => {
    setQuantity(inputText.replace(/[^0-9]/g, ''))
  }

  //cerca il prodotto esatto
  if (products) {
    selectedProduct = products.find(
      (product) => product._id === productId.itemId,
    )
  }

  if (products && isAuth) {
    /* logic for the favourite */
    // search if this product is user's favourite
    isFavourite =
      favourites.filter((product) => product === selectedProduct.title).length >
      0
  }

  let boxLayout = null
  //if the category is a box change the layout (again)
  if (selectedProduct.categoria === 'box') {
    //I have to find first the products based on the id
    boxLayout = selectedProduct.products.map((prod, i) =>
      products.find(
        (product) => selectedProduct.products[i].id === product._id,
      ),
    )
  }

  const addTofavourite = async (email, title, isDelete) => {
    if (!isAuth) {
      return Alert.alert(
        'Funzione non accessibile',
        'Devi autenticarti per accedere a questa funzione!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Account'),
            style: 'cancel',
          },
        ],
      )
    }
    await dispatch(userActions.updateFavourite(email, title, isDelete))
  }
  /* end of the favourite logic */

  let itsHealthy = false
  selectedProduct.categoria === 'pasta' &&
    (itsHealthy = selectedProduct.grano === 'Perciasacchi' ? true : false)

  //redux dispatch
  const onAddTocart = () => {
    //validate again user input
    if (
      quantity.length === 0 ||
      parseInt(quantity) > 40 ||
      parseInt(quantity) === 0
    ) {
      return Alert.alert('Quantità non accettabile!', 'minimo 1 massimo 39!', [
        {
          text: 'OK',
          onPress: () => setQuantity(1),
          style: 'cancel',
        },
      ])
    }
    setShowModal(true)
    dispatch(cartActions.addToCart(selectedProduct, quantity))
    setTimeout(() => setShowModal(false), 2000)
  }

  //render the arrow key
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

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <ScrollView>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={renderLeftComponent}
          backgroundColor="#3D6DCC"
          containerStyle={{
            paddingBottom: 200,
          }}
        />

        <View style={styles.productImage}>
          {isFavourite ? (
            <Pressable
              style={{ alignSelf: 'flex-end' }}
              onPress={() => addTofavourite(email, selectedProduct.title, 1)}
            >
              <Heart color="#ef4565" secondColor="#ef4565" />
            </Pressable>
          ) : (
            <Pressable
              style={{ alignSelf: 'flex-end' }}
              onPress={() => addTofavourite(email, selectedProduct.title, 0)}
            >
              <Heart color="#3da9fc" secondColor="none" />
            </Pressable>
          )}
          <OverlayImage
            visible={isVisible}
            setIsVisible={() => setIsVisible(!isVisible)}
            images={[selectedProduct.image, selectedProduct.imageBack]}
          />
          <Pressable
            onPress={() => setIsVisible(true)}
            style={styles.imageContainer}
          >
            <Image
              source={{
                uri: `${axios.defaults.baseURL}/${selectedProduct.image}`,
              }}
              style={{
                width: 150,
                height: 150,
              }}
            />
          </Pressable>
          <Text style={globalStyles.heading_regular}>
            {selectedProduct.title}
          </Text>

          {/*  render conditionally based on the category */}
          {selectedProduct.categoria === 'pasta' ? (
            <View style={styles.listContainer}>
              <Text style={{ fontFamily: 'Inter_400Regular' }}>
                🌾 grano utilizzato:
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
                </Text>{' '}
                <Text style={{ fontFamily: 'Inter_400Regular' }}>min</Text>
              </Text>
            </View>
          ) : (
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
              {/* end box Layout */}
            </View>
          )}
        </View>
        <View style={styles.cover}>
          {itsHealthy ? (
            <Text style={styles.healthy}>
              Questo grano è consigliato per le diete sane!
            </Text>
          ) : (
            <View></View>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text>Inserisci quantità desiderata</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={numberInputHandler}
            value={quantity.toString()}
            blurOnSubmit
            style={styles.input}
            maxLength={2}
          />
        </View>
        <Pressable style={styles.buttonContainer} onPress={() => onAddTocart()}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontFamily: 'Inter_400Regular',
            }}
          >
            Aggiungi al Carrello{' '}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: 'white',
              fontFamily: 'Inter_600SemiBold',
            }}
          >
            {selectedProduct.prezzo * quantity}€
          </Text>
        </Pressable>
        <CustomModal
          showModal={showModal}
          text="Prodotto aggiunto!"
          theme="rgba(44, 182, 125, 1)"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  productImage: {
    position: 'absolute',
    width: '80%',
    height: 400,
    top: 130,
    left: 40,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 5,
    alignItems: 'center',
    padding: 15,
  },
  imageContainer: {
    borderRadius: 75,
    overflow: 'hidden',
    marginVertical: 10,
  },
  listContainer: {
    height: 100,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cover: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  healthy: {
    color: 'white',
    backgroundColor: '#90b4ce',
    padding: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 20,
    width: '80%',
    flexDirection: 'row',
    backgroundColor: '#3da9fc',
    paddingHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '80%',
    alignSelf: 'center',
    borderBottomColor: '#3da9fc',
    borderBottomWidth: 2,
    alignItems: 'center',
    paddingBottom: 3,
  },
  input: {
    backgroundColor: '#ef4565',
    color: 'white',
    borderRadius: 15,
    width: 30,
    height: 30,
    textAlign: 'center',
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

export default PastaDetails
