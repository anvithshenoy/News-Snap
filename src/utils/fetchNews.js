import AxiosInstance from '../api/AxiosInstance'

export const fetchNews = async (type) => {
  try {
    const res = await AxiosInstance.post(`/api/${type}`)
    return res
  } catch (error) {
    return console.error(`Error: ${error}`)
  }
}

export const searchNews = async (query) => {
  try {
    const res = await AxiosInstance.post(`/api/search?query=${query}`)
    return res
  } catch (error) {
    return console.error(`Error: ${error}`)
  }
}

export const subscribeNewsletter = async (email) => {
  const response = await AxiosInstance.post('/auth/subscribe', {
    userMail: email,
  })
  return response.data // Return the response data for handling in the component
}
