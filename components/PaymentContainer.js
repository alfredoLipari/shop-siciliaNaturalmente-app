import { initStripe, StripeContainer } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native'

const PaymentScreen = ({ paymentMethod, children }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initialize() {
      await initStripe({
        publishableKey: 'pk_live_L4zEu37Als6ZyW6W3wWtHhGc',

        urlScheme: 'stripe-example',
        setUrlSchemeOnAndroid: true,
      })
      setLoading(false)
    }

    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? (
    <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
  ) : (
    <ScrollView
      accessibilityLabel="payment-screen"
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {children}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ opacity: 0 }}>appium fix</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 20,
    paddingHorizontal: 16,
  },
})

export default PaymentScreen
