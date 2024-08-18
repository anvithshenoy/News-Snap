import { createContext, useContext } from 'react'

const WeatherContext = createContext()

export const useWeather = () => useContext(WeatherContext)

export default WeatherContext
