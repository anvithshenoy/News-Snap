import { useQuery } from '@tanstack/react-query'
import BitcoinContext from './BitcoinContext'
import PropTypes from 'prop-types'
import bitCoinPrice from '../../utils/fetchCurrency'

const fetchBitcoinPrice = async () => {
  try {
    const { price, increase } = await bitCoinPrice()
    return { price, increase }
  } catch (error) {
    throw new Error('Error fetching bitcoin price: ' + error.message)
  }
}

const BitcoinProvider = ({ children }) => {
  const {
    data: bitcoin,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bitcoinPrice'],
    queryFn: fetchBitcoinPrice,
    refetchInterval: 60000, // Refetch every 60 seconds
    retry: false, // Disable automatic retries
  })

  if (error) {
    console.error(error.message)
  }

  return (
    <BitcoinContext.Provider value={{ bitcoin, loading: isLoading }}>
      {children}
    </BitcoinContext.Provider>
  )
}

BitcoinProvider.propTypes = {
  children: PropTypes.node,
}

export default BitcoinProvider
