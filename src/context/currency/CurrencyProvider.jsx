import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { exchangePrice } from '../../utils/fetchCurrency'
import CurrencyContext from './CurrencyContext'

const CurrencyProvider = ({ children }) => {
  const {
    data: rate = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['rate'],
    queryFn: exchangePrice,
    keepPreviousData: true,
    refetchInterval: 60000,
  })

  if (error) {
    console.error(error.message)
  }

  return (
    <CurrencyContext.Provider value={{ rate, loading: isLoading, error }}>
      {children}
    </CurrencyContext.Provider>
  )
}

CurrencyProvider.propTypes = {
  children: PropTypes.node,
}

export default CurrencyProvider
