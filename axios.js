import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ff5c5e4c8264.ngrok.io',
})

export default instance
