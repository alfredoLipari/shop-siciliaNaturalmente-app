const mongoose = require('mongoose')

const Pasta = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  descrizione: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  imageBack: {
    type: String,
    required: false,
  },
  prezzo: {
    type: Number,
    required: true,
  },
  /* attributi per la pasta  */
  grano: {
    type: String,
    required: false,
  },
  minutiPrep: {
    type: Number,
    required: false,
  },
  grammi: {
    type: Number,
    required: false,
  },
  quantita: {
    type: Number,
    default: 1,
  },
  isShort: {
    type: Number, //0 is very short, 1 is short, 2 is long
    required: false,
  },
  /* attributi per il box   */
  products: {
    type: Array,
    required: false,
  },
})

module.exports = mongoose.model('Pasta', Pasta)
