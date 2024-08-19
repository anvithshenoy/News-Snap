import AxiosInstance from '../api/AxiosInstance'

const bitCoinPrice = async () => {
  try {
    const response = await AxiosInstance.post(`/api/bitcoin`)
    return response?.data?.price ?? 0.0
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

export default bitCoinPrice
