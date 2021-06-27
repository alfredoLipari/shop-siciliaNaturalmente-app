const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  ordersHistory: {
    type: [Object],
    required: false,
  },
  favourites: {
    type: [Object],
    required: false,
  },
  creditCardInformation: {
    type: [Object],
    required: false,
  },
  addressInformation: {
    type: Object,
    required: false,
  },
})

module.exports = mongoose.model('User', UserSchema)
