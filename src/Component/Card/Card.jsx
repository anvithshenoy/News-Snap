import { CardActionArea, Chip } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import logo from '/assets/newspaper.jpg'
import PropTypes from 'prop-types'

const MediaControlCard = ({ article, category, handleSlideClick }) => {
  return (
    <Card>
      <CardActionArea
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        onClick={() => handleSlideClick(article)}
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
              variant='h6'
            >
              {article.title}
            </Typography>
            <Box
              display={'flex'}
              gap={1}
            >
              <Chip
                label={
                  <Typography
                    variant='subtitle2'
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
                    variant='subtitle2'
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
                    variant='subtitle2'
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
                    variant='subtitle2'
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
          sx={{ width: 151, objectFit: 'cover', aspectRatio: 1 / 1 }}
          image={article.urlToImage || logo}
          alt={article.id}
        />
      </CardActionArea>
    </Card>
  )
}

export default MediaControlCard

MediaControlCard.propTypes = {
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
