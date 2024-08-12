import { useEffect, useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import { fetchNews } from '../../utils/fetchNews'
import MediaControlCard from '../Card/Card'
import PropTypes from 'prop-types'

const Drawer = ({ categories, handleSlideClick }) => {
  const [value, setValue] = useState(0)
  const [results, setResults] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNews(categories[value])
        setResults(response?.data?.articles)
      } catch (error) {
        console.error(`Error: ${error}`)
      }
    }
    fetchData()
  }, [categories, value])

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        variant='scrollable'
        sx={{
          position: 'sticky',
          top: 0,
          background: 'var(--bg-paper)',
          backgroundBlendMode: 'multiply',
          zIndex: 999,
          paddingInline: 1,
        }}
      >
        {categories.map((category, index) => (
          <Tab
            key={index}
            label={
              <Typography
                variant='h6'
                fontFamily={'var(--font-title)'}
              >
                {category}
              </Typography>
            }
          />
        ))}
      </Tabs>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={1}
        padding={2}
      >
        {results.map((article) => (
          <MediaControlCard
            key={article.id}
            article={article}
            category={categories[value]}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </Box>
    </>
  )
}

Drawer.propTypes = {
  categories: PropTypes.array.isRequired,
  handleSlideClick: PropTypes.func.isRequired,
}

export default Drawer
