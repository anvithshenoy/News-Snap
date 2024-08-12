import { Container, Typography } from '@mui/material'
import Headlines from './Component/Swiper/Headlines'
import Drawer from './Component/Drawer/Drawer'
import FullScreenDrawer from './Component/Drawer/FullscreenDrawer'
import React from 'react'
import './App.css'

const categories = [
  'Business',
  'Entertainment',
  'General',
  'Health',
  'Science',
  'Technology',
]

const App = () => {
  const [selectedArticle, setSelectedArticle] = React.useState(null)
  const [openDialog, setOpenDialog] = React.useState(false)

  const handleSlideClick = (article) => {
    setSelectedArticle(article)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedArticle(null)
  }

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
      <Headlines handleSlideClick={handleSlideClick} />
      <Drawer
        categories={categories}
        handleSlideClick={handleSlideClick}
      />

      <FullScreenDrawer
        category=''
        open={openDialog}
        handleClose={handleCloseDialog}
        article={selectedArticle}
      />
    </Container>
  )
}

export default App
