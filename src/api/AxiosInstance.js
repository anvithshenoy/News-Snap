import axios from 'axios'

const url = import.meta.env.VITE_BACKEND_URL

const AxiosInstance = axios.create({
  baseURL: `${url}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default AxiosInstance
