import { useState } from 'react'
import Container from '@mui/material/Container'
import Drawer from './Component/Drawer/Drawer'
import FullScreenDrawer from './Component/Drawer/FullscreenDrawer'
import Headlines from './Component/Swiper/Headlines'
import { fetchNews } from './utils/fetchNews'
import { useQuery } from '@tanstack/react-query'
import Spinner from './Component/Spinner/BookSpinner'

const categories = [
  'Business',
  'Entertainment',
  'General',
  'Health',
  'Science',
  'Technology',
]

const App = () => {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const {
    data: headlines = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['news'],
    queryFn: () => fetchNews('headlines'),
    keepPreviousData: true,
    staleTime: 60000,
    cacheTime: 300000,
  })

  const handleSlideClick = (article, category) => {
    setSelectedArticle({ article, category })
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedArticle(null)
  }

  return isLoading ? (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Spinner />
    </Container>
  ) : error ? (
    <pre>Error</pre>
  ) : (
    <Container
      disableGutters
      maxWidth='xl'
    >
      <>
        <Headlines
          headlines={headlines}
          handleSlideClick={handleSlideClick}
        />
        <Drawer
          categories={categories}
          handleSlideClick={handleSlideClick}
        />
      </>
      {selectedArticle && (
        <FullScreenDrawer
          category={selectedArticle.category}
          open={openDialog}
          handleClose={handleCloseDialog}
          article={selectedArticle.article}
        />
      )}
    </Container>
  )
}

export default App
