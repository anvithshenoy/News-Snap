import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
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
import weatherCondition from '../../utils/fetchWeather'
import CloudQuestion from '/assets/cloud-question.svg'
import CloudSlash from '/assets/cloud-slash.svg'

const WeatherChip = () => {
  const [isCelsius, setIsCelsius] = useState(true)

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
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 275,
        maxWidth: 275,
        mixBlendMode: 'multiply',
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
      <CardContent>
        <Typography
          variant='h5'
          fontFamily='var(--font-title)'
          noWrap
          sx={{
            fontVariantNumeric: 'tabular-nums',
            paddingInlineStart: 0.15,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
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

export default WeatherChip
