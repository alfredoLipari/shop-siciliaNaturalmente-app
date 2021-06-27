const { db } = require('../models/user')
const User = require('../models/user')

async function postOrder(req, res) {
  const newOrder = []
  /* find the user by the email   */
  const user = await User.findOne({ email: req.body[0] })
  //delete the email (we don't need in the result)
  req.body.shift()

  /* create a new date with this options */
  const newDate = new Date()
  //create a unique ID with the date (in milliseconds)
  const id = new Date().valueOf()
  B_Options = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }
  const date = new Intl.DateTimeFormat('en-US', B_Options).format(newDate)
  /* I add the date in the data and push to the order array  */
  req.body.push(date)
  req.body.push(id)
  newOrder.push(req.body)

  /* return the user and add in orderHistory key the array  */
  const result = await User.findOneAndUpdate(
    { _id: user.id },
    { $addToSet: { ordersHistory: newOrder } },
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

async function getOrders(req, res) {
  console.log(req.body, ' in get orders')
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(404).send({ error: 'no email found' })
  }

  const result = await User.findOne(
    { _id: user.id },
    { ordersHistory: 1 },

    (error, data) => {
      if (error) {
        return res.status(404).send({ error: 'something went wrong' })
      } else {
        return data
      }
    },
  )
  res.send(result)
}

module.exports = {
  postOrder,
  getOrders,
}
