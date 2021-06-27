const express = require('express')
const router = express.Router()
const auth = require('../controller/auth.controller')
require('dotenv/config')

const stripe = require('stripe')(process.env.SECRET_KEY_STRIPE)

/* CREATE A PaymentMethod OBJECT   */
router.post('/payment-method', async (req, res) => {
  try {
    const { last4, exp_month, exp_year } = req.body
    console.log(req.body)

    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: '314',
      },
    })
    console.log(paymentMethod)
    res.json(paymentMethod)
  } catch (e) {
    console.log(e)
    res.json(e)
  }
})

router.post('/payment', async (req, res) => {
  //retry the customer by customer ID
  let customer = ''
  try {
    customer = await stripe.customers.retrieve('cus_Jb82ON7HhuTUij')
  } catch (e) {
    res.json(e, 'doesnt exist')
  }
  //Payment methods attached to other Customers cannot be used with this PaymentIntent.
  // Here, we're getting latest customer only for example purposes.
  console.log(customer)

  //pass the client secret to the client side //stripe.confirmCardPayment on the client side
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 50, //equals to 50cent
    currency: 'eur',
    customer: customer.id,
  })
  res.json({
    paymentIntent: paymentIntent,
    client_secret: paymentIntent.client_secret,
  })
})

router.post('/paymentMethod', auth.authenticateJWT, (req, res) => {
  console.log(req.body, ' daiii')
  try {
    const paymentMethod = stripe.paymentMethod.retrieve(req.body.paymentMethod)
    res.send(paymentMethod)
  } catch (e) {
    console.log(e, ' qui')
  }
})

router.post('/payment-sheet', async (req, res) => {
  // Here, we're getting latest customer only for example purposes.

  //First retrieve the paymentMethod

  console.log(req.body)

  const paymentMethod = await stripe.paymentMethods.retrieve(req.body.id)

  console.log(paymentMethod)

  if (!paymentMethod) {
    res.send({
      error: 'You have no payment Meth created',
    })
  }

  /* study this better #todo
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2020-08-27' },
  )
  */
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    payment_method: paymentMethod.id,
  })
  console.log(paymentIntent, 'qui')
  res.json({
    paymentIntent: paymentIntent.client_secret,
  })
})

module.exports = router
