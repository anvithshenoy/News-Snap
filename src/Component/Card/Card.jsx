import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import ArticleLabel from '../Chip/ArticleLabel'
import PropTypes from 'prop-types'

const ArticleCard = ({ article, category, handleSlideClick }) => {
  return (
    <Card variant='elevation'>
      <CardActionArea
        onClick={() => handleSlideClick(article)}
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          justifyContent: 'space-between',
          height: '100%',
          width: '100%',
        }}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
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
              fontFamily={'var(--font-body)'}
            >
              {article.title}
            </Typography>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              gap={1}
              width={'100%'}
            >
              <ArticleLabel label={category} />
              <ArticleLabel label={article.author} />
              <ArticleLabel label={article.publishDate} />
              <ArticleLabel label={article.publishTime} />
            </Box>
          </CardContent>
        </Box>
        <CardMedia
          component='img'
          image={
            article.urlToImage ??
            '/assets/newspaper_jvk4ph/newspaper_jvk4ph_c_scale,w_640.webp'
          }
          srcSet='
          /assets/newspaper_jvk4ph/newspaper_jvk4ph_c_scale,w_200.webp 200w,
          /assets/newspaper_jvk4ph/newspaper_jvk4ph_c_scale,w_377.webp 377w,
          /assets/newspaper_jvk4ph/newspaper_jvk4ph_c_scale,w_514.webp 514w,
          /assets/newspaper_jvk4ph/newspaper_jvk4ph_c_scale,w_607.webp 607w,
          /assets/newspaper_jvk4ph/newspaper_jvk4ph_c_scale,w_640.webp 640w'
          alt={`Image for article: ${article.id}`}
          sx={{
            height: article.urlToImage ? '100%' : '35vh',
            maxHeight: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </CardActionArea>
    </Card>
  )
}

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

export default ArticleCard
