import { CardActionArea, Chip } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import logo from '/assets/newspaper.webp'
import PropTypes from 'prop-types'

const ArticleCard = ({ article, category, handleSlideClick }) => {
  return (
    <Card variant='elevation'>
      <CardActionArea
        onClick={() => handleSlideClick(article)}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%',
          width: '100%',
        }}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          sx={{ maxWidth: '75%' }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flex: '1 0 auto',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <Typography
              component='div'
              variant='body1'
            >
              {article.title}
            </Typography>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              gap={1}
            >
              <Chip
                label={
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    component='div'
                  >
                    {category}
                  </Typography>
                }
              />
              <Chip
                label={
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    component='div'
                  >
                    {article.author}
                  </Typography>
                }
              />
              <Chip
                label={
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    component='div'
                  >
                    {article.publishDate}
                  </Typography>
                }
              />
              <Chip
                label={
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    component='div'
                  >
                    {article.publishTime}
                  </Typography>
                }
              />
            </Box>
          </CardContent>
        </Box>
        <CardMedia
          component='img'
          image={article.urlToImage || logo}
          alt={article.id}
          sx={{
            minHeight: { xs: 225, sm: '25vh' },
            height: '100%',
            maxHeight: '100%',
            maxWidth: '25%',
            objectFit: 'cover',
          }}
        />
      </CardActionArea>
    </Card>
  )
}

export default ArticleCard

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    publishDate: PropTypes.string,
    publishTime: PropTypes.string,
    urlToImage: PropTypes.string,
  }).isRequired,
  category: PropTypes.oneOf([
    'Business',
    'Entertainment',
    'General',
    'Health',
    'Science',
    'Technology',
  ]).isRequired,
  handleSlideClick: PropTypes.func.isRequired,
}
