import { Box, Typography } from '@mui/material'
import './BookSpinner.css'

const Spinner = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <span className='loader'></span>
      <Typography
        variant='h5'
        fontFamily={'var(--font-title)'}
        className='typewriter'
      >
        Snap into the world&apos;s stories
      </Typography>
    </Box>
  )
}

export default Spinner
