// * THE ENTRY POINT OF THE APP
// * here redux, Stripe and navigation logic are initialized

import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  useFonts,
  Inter_400Regular,
  OpenSans_400Regular,
  Inter_600SemiBold,
} from '@expo-google-fonts/dev'
import AppLoading from 'expo-app-loading'
import { StripeProvider } from '@stripe/stripe-react-native'
//pass the ref to your navigation container
import stripe from 'tipsi-stripe'

import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

import { Provider } from 'react-redux'

import { AppTab } from './Navigation'

const publishableKey = 'pk_test_dnoZ1HQ1qfNN5LLLHhItScMc'

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    OpenSans_400Regular,
    Inter_600SemiBold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StripeProvider publishableKey={publishableKey}>
            <AppTab />
          </StripeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
