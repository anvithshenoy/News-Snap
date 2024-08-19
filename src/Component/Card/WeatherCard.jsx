import { useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from '@mui/material'
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined'
import LocationOffOutlined from '@mui/icons-material/LocationOffOutlined'
import { SyncOutlined, SwapVertOutlined } from '@mui/icons-material'
import CloudQuestion from '/assets/cloud-question.svg'
import CloudSlash from '/assets/cloud-slash.svg'
import { useWeather } from '../../context/Weather/WeatherContext'

const WeatherCard = () => {
  const [isCelsius, setIsCelsius] = useState(true)
  const { weather, isLoading, error, refetch } = useWeather()

  const handleToggle = () => {
    setIsCelsius(!isCelsius)
  }

  const handleChipClick = () => {
    refetch()
  }

  let weatherLabel = 'Loading...'

  if (isLoading) {
    weatherLabel = 'Loading...'
  } else if (error) {
    weatherLabel = error.message.includes('Location access denied')
      ? 'Location access denied'
      : 'Error fetching weather'
  } else if (weather) {
    weatherLabel = `${
      isCelsius
        ? weather.temperature.tempCelsius
        : weather.temperature.tempFahrenheit
    }°${isCelsius ? 'C' : 'F'} ${weather.condition}`
  }

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        mixBlendMode: 'multiply',
        paddingInline: 1,
      }}
    >
      <CardMedia
        component='img'
        image={isLoading ? CloudQuestion : error ? CloudSlash : weather?.icon}
        alt={weather?.condition ?? 'Weather icon'}
        sx={{
          width: 50,
          height: 50,
          maxWidth: 50,
          maxHeight: 50,
          aspectRatio: 1 / 1,
          objectFit: 'contain',
        }}
      />
      <CardContent
        sx={{
          paddingInline: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h5'
          fontFamily='var(--font-title)'
          noWrap
          sx={{
            fontVariantNumeric: 'tabular-nums',
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            padding: 0,
          }}
        >
          {weatherLabel}
          {weather?.city && (
            <IconButton
              aria-label='toggle temperature unit'
              onClick={handleToggle}
              size='small'
              color='primary'
            >
              <SwapVertOutlined />
            </IconButton>
          )}
        </Typography>
        <Chip
          clickable
          deleteIcon={<SyncOutlined />}
          onDelete={handleChipClick}
          variant={weather?.city ? 'outlined' : 'filled'}
          color={weather?.city && 'primary'}
          size='small'
          icon={
            weather?.city ? (
              <LocationOnOutlined
                color='primary'
                fontSize='small'
              />
            ) : (
              <LocationOffOutlined fontSize='small' />
            )
          }
          label={
            <Typography
              variant='body2'
              fontFamily={'var(--font-title)'}
              color={weather?.city ? '#1976d2' : 'text.secondary'}
            >
              {weather?.city ?? 'Error fetching city'}
            </Typography>
          }
        />
      </CardContent>
    </Card>
  )
}

export default WeatherCard
