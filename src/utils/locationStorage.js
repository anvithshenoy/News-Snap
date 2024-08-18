import { fetchUserLocation } from './fetchLocation'

const LOCATION_KEY = 'userLocation'
const LOCATION_TIMESTAMP_KEY = 'locationTimestamp'
const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000

export const getUserLocation = async () => {
  const storedLocation = JSON.parse(localStorage.getItem(LOCATION_KEY))
  const storedTimestamp = localStorage.getItem(LOCATION_TIMESTAMP_KEY)

  const now = new Date().getTime()

  if (
    storedLocation &&
    storedTimestamp &&
    now - storedTimestamp < ONE_WEEK_IN_MS
  ) {
    return storedLocation
  } else {
    try {
      const newLocation = await fetchUserLocation()
      localStorage.setItem(LOCATION_KEY, JSON.stringify(newLocation))
      localStorage.setItem(LOCATION_TIMESTAMP_KEY, now.toString())
      return newLocation
    } catch (error) {
      console.error('Error fetching user location:', error)
      return null
    }
  }
}
