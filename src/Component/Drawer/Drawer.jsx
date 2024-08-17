import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Box,
  Container,
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
      <Box
        sx={{
          paddingBlockStart: 2,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          background: 'var(--bg-paper)',
          backgroundBlendMode: 'multiply',
          filter: 'drop-shadow(0 0 0.5rem #111111cc)',
        }}
      >
        <Typography
          variant='h3'
          mt={2}
          fontFamily={'var(--font-title)'}
          align='center'
        >
          Top {categories[value]} Stories
        </Typography>
        <Box
          display={'flex'}
          flexDirection={isMobile ? 'column' : 'row'}
          paddingBlock={1}
          paddingInline={1}
          gap={1.5}
          marginInline={1}
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
                alignItems={'flex-start'}
                gap={1.5}
                width={isMobile ? '100%' : `calc(100%/${columns.length})`}
                sx={{
                  animation: `animateBg ${
                    (topIndex + 0.25) / columns.length
                  }s linear`,
                }}
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
      </Box>
      <Container
        disableGutters
        sx={{
          position: 'sticky',
          bottom: 10,
          background: '#f2f2f275',
          backgroundBlendMode: 'multiply',
          backdropFilter: 'blur(0.25rem)',
          zIndex: 999,
          width: { xs: '95%', sm: 'fit-content' },
          paddingInline: 1,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 0 8px #1976d2',
        }}
      >
        <Tabs
          selectionFollowsFocus
          value={value}
          onChange={handleChange}
          variant='scrollable'
          sx={{
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
                  variant='body1'
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
      </Container>
    </>
  )
}

Drawer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSlideClick: PropTypes.func.isRequired,
}

export default Drawer
