import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Box,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ArticleCard from '../Card/Card'
import Spinner from '../Spinner/BookSpinner'
import { fetchNews } from '../../utils/fetchNews'
import PropTypes from 'prop-types'

const Drawer = ({ categories, handleSlideClick }) => {
  const [value, setValue] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

  const columns = isMobile ? [0] : isTablet ? [0, 1] : [0, 1, 2]

  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['news', categories[value]],
    queryFn: () => fetchNews(categories[value]),
    keepPreviousData: true,
    staleTime: 60000,
    cacheTime: 300000,
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Tabs
        selectionFollowsFocus
        value={value}
        onChange={handleChange}
        variant='standard'
        sx={{
          position: 'sticky',
          top: 0,
          background: 'var(--bg-paper)',
          backgroundBlendMode: 'multiply',
          zIndex: 999,
          paddingInline: { sm: 3, xs: 3 },
          '& .MuiTabs-indicator': {
            background: '#1976d2',
            height: '75%',
            bottom: '12.5%',
            borderRadius: '5rem',
          },
        }}
      >
        {categories.map((category, index) => (
          <Tab
            disableRipple
            key={index}
            label={
              <Typography
                variant='h6'
                fontFamily={'var(--font-title)'}
                sx={{
                  color: value === index ? 'var(--light)' : 'inherit',
                  textShadow: value === index && '0 0 4px var(--dark)',
                  zIndex: 10000,
                }}
              >
                {category}
              </Typography>
            }
          />
        ))}
      </Tabs>

      <Box
        display={'flex'}
        flexDirection={isMobile ? 'column' : 'row'}
        paddingBlock={1}
        paddingInline={2}
        gap={2}
        marginInline={2}
      >
        {isLoading ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            minHeight={300}
            height={'100%'}
          >
            <Spinner />
          </Box>
        ) : error ? (
          <div>Error loading news: {error.message}</div>
        ) : (
          columns.map((topIndex) => (
            <Box
              key={topIndex}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              gap={2}
              marginTop={`calc(columns.length * 2)`}
              width={isMobile ? '100%' : `calc(100%/${columns.length})`}
              sx={{ animation: 'animateBg 0.5s linear' }}
            >
              {articles
                .filter((_, index) => index % columns.length === topIndex)
                .map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    category={categories[value]}
                    handleSlideClick={() =>
                      handleSlideClick(article, categories[value])
                    }
                  />
                ))}
            </Box>
          ))
        )}
      </Box>
    </>
  )
}

Drawer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSlideClick: PropTypes.func.isRequired,
}

export default Drawer
