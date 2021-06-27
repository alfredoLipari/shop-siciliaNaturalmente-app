const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv/config')

async function signup(req, res, next) {
  //check email validity
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(req.body.email)) {
    return res
      .status(403)
      .send({ error: `${req.body.email} is not a valid email` })
  }

  //confirm Password
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(403).send({ error: 'passwords dont match each other' })
  }

  if (req.body.password.length < 5) {
    return res
      .status(403)
      .send({ error: 'passwords has to be longer than five characters' })
  }

  const salt = await bcrypt.genSalt(10)
  const hasedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hasedPassword,
    role: 'consumer',
    ordersHistory: [],
    favourites: [],
    creditCardInformation: {},
    addressInformation: {},
  })

  //see if email already exist
  try {
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist)
      return res.status(403).send({ error: 'Email already exist' })
  } catch (e) {
    return res.status(400).send({ error: e })
  }

  //TODO: FARE LA VALIDAZIONE

  const result = await user.save()

  const { password, ...data } = await result.toJSON() //I dont want that the password is show

  try {
    res.send(data)
  } catch (err) {
    res.status(400).send({ error: 'Error in register new user' })
  }
}

async function signin(req, res) {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(404).send({ error: 'no email found' })
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.sendStatus(403).send('incorrect password')
  }

  //Create and assign a token
  const token = jwt.sign(
    { _id: user.id, role: user.role },
    process.env.TOKEN_SECRET,
    {
      expiresIn: '100h',
    },
  )

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })

  res.send({
    message: 'success',
    user: user,
    token: token,
  })
}

//see if the user is auth
async function authentication(req, res) {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).send({ error: 'Auth failed' })

    const claims = jwt.verify(token, process.env.TOKEN_SECRET)

    if (!claims) {
      return res.sendStatus(403).send({ error: 'Auth failed' })
    }
    //claims will return the _id and the "iat"(time the token was created)
    const user = await User.findOne({ _id: claims._id })

    const { password, ...data } = await user.toJSON()

    res.send(data)
  } catch (err) {
    return res.sendStatus(403).send({ error: 'Auth failed' })
  }
}

function logout(req, res) {
  //remove the cookie
  res.cookie('jwt', '', {
    maxAge: 0, //will expire immediately and expire
  })

  //theres no need here but look at "Invalidate jwt token"

  res.send({
    message: 'success',
  })
}

//retrive paymenthMethod information
const billingInformation = async (req, res) => {
  const { paymentMethod } = req.body

  let user = ''

  try {
    user = await User.findOne({ email: req.body.email })
  } catch (e) {
    res.send(e)
    console.log(e, ' in billing')
  }

  //set for change a value
  //addToSet to push a value to an array
  try {
    const user = await User.findOneAndUpdate(
      { id: user.id },
      { $set: { creditCardInformation: paymentMethod } },
      { $addToSet: { addressInformation: address } },
    )

    console.log(user)
    res.json({ user })
  } catch (e) {
    console.log(e, 'in findandup')
  }
}

/*  JWT MIDDLEWARE */
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403).send({ error: 'auth failed' })
      }

      req.user = user

      next()
    })
  } else {
    res.status(403).send({ error: 'auth failed' })
  }
}

const favourite = async (req, res) => {
  /* find the user by the email   */
  const user = await User.findOne({ email: req.body.email })

  /* return the user and add in favourite key the new title  */
  const result = await User.findOneAndUpdate(
    { _id: user.id },
    { $addToSet: { favourites: req.body.favourite } },
    { new: true },
    (error, data) => {
      if (error) {
        console.log(error, 'in error')
      } else {
        return data
      }
    },
  )

  /* return the result updated (with new) */
  res.send(result)
}

const deleteFavourite = async (req, res) => {
  /* find the user by the email   */
  const user = await User.findOne({ email: req.body.email })
  console.log(req.body)
  try {
    /* return the user and add in favourite key the new title  */
    const result = await User.findOneAndUpdate(
      { _id: user.id },
      { $pull: { favourites: req.body.favourite } },
      { new: true },
      (error, data) => {
        if (error) {
          console.log(error, 'in error')
        } else {
          return data
        }
      },
    )
    res.send(result)
  } catch (err) {
    res.sendStatus(404).json(err)
  }
}

module.exports = {
  signup,
  signin,
  authentication,
  logout,
  authenticateJWT,
  favourite,
  deleteFavourite,
  billingInformation,
}
