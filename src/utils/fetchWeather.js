import AxiosInstance from '../api/AxiosInstance'
import { fetchUserLocation } from './fetchLocation'

const weatherCondition = async () => {
  try {
    const location = await fetchUserLocation()
    if (!location) {
      throw new Error('Location access denied')
    }
    const city = `${location.latitude},${location.longitude}`
    const response = await AxiosInstance.post(`/api/weather/${city}`)
    return response?.data?.weather ?? []
  } catch (error) {
    console.error(`Error: ${error}`)
    throw error
  }
}

export default weatherCondition
