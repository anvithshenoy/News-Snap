import { useState } from 'react'
import { Box } from '@mui/material'
import Drawer from './Component/Drawer/Drawer'
import FullScreenDrawer from './Component/Drawer/FullscreenDrawer'
import Headlines from './Component/Swiper/Headlines'
import { fetchNews } from './utils/fetchNews'
import { useQuery } from '@tanstack/react-query'
import Spinner from './Component/Spinner/BookSpinner'
import SearchAppBar from './Component/Appbar/Appbar'

const categories = [
  'Business',
  'Entertainment',
  'General',
  'Health',
  'Science',
  'Sports',
  'Technology',
]

const App = () => {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'100%'}
    >
      <Spinner />
    </Box>
  ) : error ? (
    <pre>Error</pre>
  ) : (
    <SearchAppBar setSearchQuery={setSearchQuery}>
      <Headlines
        headlines={headlines}
        handleSlideClick={handleSlideClick}
      />
      <Drawer
        categories={categories}
        searchQuery={searchQuery}
        handleSlideClick={handleSlideClick}
      />
      {selectedArticle && (
        <FullScreenDrawer
          category={selectedArticle.category}
          open={openDialog}
          handleClose={handleCloseDialog}
          article={selectedArticle.article}
        />
      )}
    </SearchAppBar>
  )
}

export default App
