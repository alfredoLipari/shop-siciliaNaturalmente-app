const express = require('express')
const router = express.Router()
const Pasta = require('../models/Products')

/* we need multer to parse file type like png, jpg */
const multer = require('multer')

/* increasing storage capacity   */
const storage = multer.diskStorage({
  //how you want to store the file
  destination: function (req, file, cb) {
    cb(null, './upload/')
  },
  //executed every time multer receive a file
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

//filter file extensions and accept only jpeg, jpg and png files
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true)
  } else {
    //if the type is different dont insert in the upload dir
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //multer will refuse file bigger than 5mb
  },
  fileFilter: fileFilter,
})

//use multer multiple upload
const multipleUpload = upload.fields([{ name: 'image' }, { name: 'imageBack' }])

//gets back specific pasta with the title
router.get('/:pastaTitle', async (req, res) => {
  //need a regex to query, this means -> SELECT * FROM PASTA WHERE TITLE STARTS WITH req.body.title
  const regexp = new RegExp('^' + req.params.pastaTitle)
  try {
    const pasta = await Pasta.find({ title: regexp })
    res.json(pasta)
  } catch (err) {
    res.json({ message: err })
  }
})

/* gets back specific pasta based on fiter   */
router.get('/format/:format', async (req, res) => {
  // this means -> SELECT * FROM PASTA WHERE TITLE STARTS WITH req.body.title

  try {
    const pasta = await Pasta.find({ isShort: req.params.format })
    res.json(pasta)
  } catch (err) {
    res.json({ message: err })
  }
})

/* gets back specific pasta based on price   */
router.post('/price', async (req, res) => {
  // this means -> SELECT * FROM PASTA WHERE TITLE STARTS WITH req.body.title

  try {
    const pasta = await Pasta.find().sort({ prezzo: 1 })
    console.log(pasta, 'in qui!')
    res.json(pasta)
  } catch (err) {
    res.json({ message: err })
  }
})

//gets back all the pasta
router.get('/', async (req, res) => {
  try {
    const pasta = await Pasta.find()

    res.header('Content-Type', 'image/jpg')
    res.json(pasta)
  } catch (err) {
    res.json({ message: err })
  }
})

/* post a product pasta with multer middleware  */
router.post('/', multipleUpload, async (req, res) => {
  //access to body

  const dbPasta = req.body
  dbPasta.image = req.files.image[0].path
  //dbPasta.imageBack = req.files.imageBack[0].path

  Pasta.create(dbPasta, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})

//delete Pasta
router.delete('/:pastaId', async (req, res) => {
  try {
    const removedPasta = await Pasta.remove({ _id: req.params.pastaId })
    res.json(removedPasta)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
