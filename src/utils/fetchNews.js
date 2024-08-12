import AxiosInstance from '../api/AxiosInstance'

export const fetchNews = async (type) => {
  try {
    const res = await AxiosInstance.post(`/api/${type}`)
    return res.data.articles || [] // Ensure you return articles or an empty array
  } catch (error) {
    console.error(`Error: ${error}`)
    throw error // Rethrow error to be handled by useQuery
  }
}

export const searchNews = async (query) => {
  try {
    const res = await AxiosInstance.post(`/api/search?query=${query}`)
    return res.data // Ensure correct return
  } catch (error) {
    console.error(`Error: ${error}`)
    throw error // Rethrow error
  }
}

export const subscribeNewsletter = async (email) => {
  try {
    const response = await AxiosInstance.post('/auth/subscribe', {
      userMail: email,
    })
    return response.data // Return the response data for handling in the component
  } catch (error) {
    console.error(`Error: ${error}`)
    throw error // Rethrow error
  }
}
