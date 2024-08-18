import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import WeatherContext from './WeatherContext'
import { getUserLocation } from '../../utils/locationStorage'
import weatherCondition from '../../utils/fetchWeather'

const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchWeather = async () => {
    try {
      const location = await getUserLocation()
      if (location) {
        const weatherData = await weatherCondition(
          `${location.latitude},${location.longitude}`
        )
        setWeather(weatherData)
        setError(null)
      } else {
        throw new Error('Location access denied')
      }
    } catch (err) {
      if (err.message === 'Location access denied') {
        setError('Location access denied. Unable to fetch weather data.')
      } else {
        setError('An error occurred while fetching weather data.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
    const intervalId = setInterval(fetchWeather, 60000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <WeatherContext.Provider value={{ weather, loading, error }}>
      {children}
    </WeatherContext.Provider>
  )
}

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default WeatherProvider
