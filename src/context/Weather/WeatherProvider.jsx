import PropTypes from 'prop-types'
import WeatherContext from './WeatherContext'
import weatherCondition from '../../utils/fetchWeather'
import { useQuery } from '@tanstack/react-query'

const WeatherProvider = ({ children }) => {
  const {
    data: weather,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['weather'],
    queryFn: weatherCondition,
    refetchInterval: 60000,
    retry: false,
  })

  return (
    <WeatherContext.Provider value={{ weather, isLoading, error, refetch }}>
      {children}
    </WeatherContext.Provider>
  )
}

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default WeatherProvider
