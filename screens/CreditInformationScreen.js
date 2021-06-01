import React, { useState } from 'react'
import {
  CardField,
  CardFieldInput,
  useStripe,
} from '@stripe/stripe-react-native'

import { StripeProvider } from '@stripe/stripe-react-native'

const CreditInformationScreen = () => {
  const [card, setCard] = (useState < CardFieldInput.Details) | (null > null)
  const { confirmPayment, handleCardAction } = useStripe()

  return (
    <CardField
      postalCodeEnabled={false}
      onCardChange={(cardDetails) => {
        console.log('card details', cardDetails)
        setCard(cardDetails)
      }}
      style={{ height: 50 }}
    />
  )
}

export default CreditInformationScreen
