import { Container, Typography } from '@mui/material'
import Headlines from './Component/Swiper/Headlines'
import Drawer from './Component/Drawer/Drawer'
// import './App.css'

const App = () => {
  return (
    // <div id='homepage'></div>
    <Container
      disableGutters
      maxWidth='xl'
    >
      <Typography
        variant='h3'
        fontFamily={'var(--font-title)'}
        className='top-heading'
      >
        Top Headlines
      </Typography>
      <Headlines />
      <Container disableGutters>
        <Drawer />
      </Container>
    </Container>
  )
}

export default App
