//* Default url of the backend

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://1fb5dfc0f912.ngrok.io',
})

export default instance
