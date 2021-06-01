import React from 'react'
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

import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

import { Provider } from 'react-redux'

import { AppTab } from './Navigation'

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
          <AppTab />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
