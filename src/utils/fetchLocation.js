export const fetchUserLocation = () => {
  return new Promise((resolve, reject) => {
    // Check if location is already stored in session
    const storedLocation = sessionStorage.getItem('userLocation')
    if (storedLocation) {
      resolve(JSON.parse(storedLocation))
      return
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const location = { latitude, longitude }
          // Store location in session storage
          sessionStorage.setItem('userLocation', JSON.stringify(location))
          resolve(location)
        },
        (error) => {
          reject(error)
        }
      )
    } else {
      reject(new Error('Geolocation is not supported by this browser.'))
    }
  })
}
