const router = require('express').Router()
const order = require('../controller/orders.controller')
const auth = require('../controller/auth.controller')

//you can post a order only if you are auth
router.post('/postOrder', auth.authenticateJWT, order.postOrder)

router.post('/getOrders', order.getOrders)

module.exports = router
