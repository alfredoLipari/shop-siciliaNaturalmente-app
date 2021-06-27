const router = require('express').Router()
const auth = require('../controller/auth.controller')
const User = require('../models/user')

router.post('/signup', auth.signup)

router.post('/signin', auth.signin)

router.get('/auth', auth.authentication)

router.post('/logout', auth.logout)

router.post('/favourite', auth.favourite)

router.post(
  '/billingInformation',
  auth.authenticateJWT,
  auth.billingInformation,
)

router.post('/deleteFavourite', auth.deleteFavourite)

//only the admin can retrieve all the user!
router.get('/users', auth.authenticateJWT, async (req, res) => {
  const { role } = req.user

  if (role === 'consumer') {
    return res.sendStatus(403)
  }

  try {
    const users = await User.find()
    res.json(users)
  } catch (e) {
    res.json({ message: 'error' })
  }
})

module.exports = router
