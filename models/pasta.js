class Pasta {
  constructor(
    _id,
    categoria,
    descrizione,
    image,
    title,
    prezzo,
    imageBack,
    grano,
    minutiPrep,
    grammi,
    quantita,
    products, //attr per il box
  ) {
    this._id = _id
    this.categoria = categoria
    this.image = image
    this.title = title
    this.prezzo = prezzo
    this.imageBack = imageBack
    this.grano = grano
    this.descrizione = descrizione
    this.minutiPrep = minutiPrep
    this.grammi = grammi
    this.quantita = quantita
    this.products = products
  }
}

export default Pasta
