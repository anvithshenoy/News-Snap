import AxiosInstance from '../api/AxiosInstance'

export const bitCoinPrice = async () => {
  try {
    const response = await AxiosInstance.post(`/api/bitcoin`)
    return response?.data?.price ?? 0.0
  } catch (error) {
    console.error(`Error: ${error}`)
    throw error
  }
}

export const exchangePrice = async () => {
  try {
    const response = await AxiosInstance.post(`/api/exchange/INR`)
    return response?.data?.rate ?? 0.0
  } catch (error) {
    console.error(`Error: ${error}`)
    throw error
  }
}
