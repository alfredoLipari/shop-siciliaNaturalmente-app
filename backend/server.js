const express = require('express')

//create express app
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const bodyParser = require('body-parser')
const cors = require('cors')

//configure public options
const publicOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  },
  methods: 'GET',
}

app.use('/public', cors)

require('dotenv/config')

const router = express.Router()

/* middlewares */

//call the route pasta specifically for increase limit size of body-parser
router.use('./routes/pasta', express.json({ limit: '10MB' }))

/* bodyparser is deprecated, use this instead: */
app.use(express.json({ limit: '2MB' }))
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  }),
)

app.get('/', (req, res) => {
  res.send('server online')
})

const pastaRoute = require('./routes/pasta')
const userRoute = require('./routes/user')
const ordersRoute = require('./routes/orders')
const stripeRoute = require('./routes/stripe')

//middlewares on route
app.use('/pasta', pastaRoute) //use /pasta on pastaRoute
app.use('/user', userRoute) //use /user on userRoute
app.use('/orders', ordersRoute) //use /orders on ordersRoute
app.use('/stripe', stripeRoute)

//make dir upload available to everyone
app.use('/upload', express.static(path.join('upload')))

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => console.log('connect'),
)

//listen at port 8000
app.listen(process.env.PORT || 8000)
