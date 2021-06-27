//* Default url of the backend

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://2f568d9023cd.ngrok.io',
})

export default instance
