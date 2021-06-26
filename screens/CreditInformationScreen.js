// * CREDIT INFORMATION SCREEN
// ? what should it do
// * save billing and spedition information

import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View, Keyboard } from 'react-native'
import {
  useStripe,
  CardField,
  CardFieldInput,
  useConfirmPayment,
} from '@stripe/stripe-react-native'
import { Input } from 'react-native-elements'
import { Formik } from 'formik'
import axios from '../axios'

import * as userActions from '../store/actions/user'
import { useDispatch, useSelector } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'
import { Header, Text, Button } from 'react-native-elements'
import globalStyle, { colors } from '../Style'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function PaymentsUICompleteScreen({ navigation, route }) {
  const email = route.params.email.email

  const creditCardInformation = useSelector(
    (state) => state.user.user.creditCardInformation,
  )
  console.log(creditCardInformation, ' ecooooo')

  useEffect(() => {
    async function retrievePaymentInfo() {
      const response = await axios.post('/stripe/paymentMethod', {
        creditCardInformation,
      })
      const data = await response.data
      console.log(data, ' tipo ok')
    }
    creditCardInformation && retrievePaymentInfo()
    return () => {
      console.log('cleanup')
    }
  }, [creditCardInformation])

  const dispatch = useDispatch()

  const { createPaymentMethod } = useStripe()

  const [clientSecret, setClientSecret] = useState('')
  const [card, setCard] = useState({
    complete: false,
  })

  const [cardInformation, setCardInformation] = useState({
    completed: false,
  })

  //here I will take all customer's utilities

  //here I will attach a payment method to a customer
  const createPaymentMeth = async (values) => {
    //first create payment Method and attach to the customer

    try {
      const { paymentMethod, errorPayment } = await createPaymentMethod({
        Card: card,
        type: 'Card',
        billingDetails: {
          addressCity: values.city,
          addressState: values.state,

          addressPostalCode: values.postalCode,
          addressLine1: values.indirizzo,
          email: email,
        },
      })

      if (errorPayment) {
        console.log('Payment Method error', error)
      }

      const id = paymentMethod.id

      dispatch(userActions.createPaymentMethod(id))

      //tyme to dispatch paymentMethod!

      /*
      const response = await axios.post('/stripe/payment-sheet', { id })
      const data = await response.data
      console.log(data, ' qui')

      //this will confirm the payment
      const { paymentIntent, error } = await confirmPayment(
        data.paymentIntent,
        {
          type: 'Card',

          billingDetails,
        },
      )

      if (error) {
        console.log('Payment confirmation error', error)
      } else if (paymentIntent) {
        console.log('Success from promise', paymentIntent)
      }

      /*
    


      //this you will use to create confirm..
     
      */
      //maybe here retrieve customId
      /*
      const cardDetails = await createPaymentMethod(card, {
        address: { city: 'Palermo' },

        customerId: 'cus_Jb82ON7HhuTUij',
      })

      console.log(cardDetails, 'CARD DETAILS')

    
     
      console.log(payment, 'er pago')

      console.log(cardDetails, ' sempre er pago')

      */
    } catch (e) {
      console.log(e, ' in errrore')
    }
  }

  const placeholder = {
    label: 'Select a color...',
    value: null,
  }

  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      onPress={() => {
        Keyboard.dismiss()
      }}
      style={styles.screen}
    >
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        centerComponent={<Text style={globalStyle.header_text}>PAGAMENTO</Text>}
        leftComponent={
          <AntDesign
            name="arrowleft"
            size={30}
            color="white"
            onPress={() => navigation.popToTop()}
          />
        }
        backgroundColor={colors.blue.blue1}
        containerStyle={{
          height: 100,
          borderRadius: 30,
          alignItems: 'center',
        }}
        elevated={10}
      />
      <View style={styles.container}>
        {/* if shipping & billing properties exist show the form  */}
        <Text style={globalStyle.boldSubText}>INFORMAZIONI SU PAGAMENTO</Text>
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: 'Numero Carta',
          }}
          cardStyle={{
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 20,
          }}
          onCardChange={(cardDetails) => {
            cardDetails.complete && setCard(cardDetails)
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField)
          }}
        />
        <Text style={globalStyle.boldSubText}>INFORMAZIONI SU SPEDIZIONI</Text>
        <Formik
          initialValues={{
            state: '',
            city: '',
            indirizzo: '',
            postalCode: '',
          }}
          onSubmit={(values) => createPaymentMeth(values)}
          onPress={Keyboard.dismiss}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            touched,
          }) => (
            <>
              <View style={styles.formContainer}>
                <Input
                  testId="stato"
                  placeholder="Stato"
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  value={values.state}
                  inputStyle={{ color: '#172c66', marginLeft: 5 }}
                  placeholderTextColor="#172c66"
                />
                <Input
                  testId="city"
                  placeholder="Città"
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                  inputStyle={{ color: '#172c66', marginLeft: 5 }}
                  placeholderTextColor="#172c66"
                />
                <Input
                  testId="indirizzo"
                  placeholder="indirizzo"
                  onChangeText={handleChange('indirizzo')}
                  onBlur={handleBlur('indirizzo')}
                  value={values.indirizzo}
                  inputStyle={{ color: '#172c66', marginLeft: 5 }}
                  placeholderTextColor="#172c66"
                />
                <Input
                  testId="postalCode"
                  placeholder="codice Postale"
                  keyboardType="decimal-pad"
                  onChangeText={handleChange('postalCode')}
                  onBlur={handleBlur('postalCode')}
                  keyboardAppearance="light"
                  value={values.postalCode}
                  inputStyle={{ color: '#172c66', marginLeft: 5 }}
                  placeholderTextColor="#172c66"
                />
              </View>

              <Button
                title="Save or update"
                color={colors.blue.blue1}
                buttonStyle={globalStyle.button}
                raised={20}
                disabled={!card.complete}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
  },
  formContainer: {
    marginTop: 10,
  },
})
