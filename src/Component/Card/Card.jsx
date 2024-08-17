import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ArrowRight from '@mui/icons-material/ArrowRight'
import SendOutlined from '@mui/icons-material/IosShareOutlined'
import ArticleLabel from '../Chip/ArticleLabel'
import MediaDialog from '../Dialog/Dialog'
import PropTypes from 'prop-types'

const ArticleCard = ({ article, category = 'Headlines', handleSlideClick }) => {
  const altDescription = `This content was written by ${article?.author} and published on ${article?.publishDate} at ${article?.publishTime}. For the complete story, click the link to `
  const splitTitle = article.title.split('-')
  const articleSource = splitTitle.pop().trim()
  const articleTitle = splitTitle.join('-').trim()

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <>
      <Card sx={{ minWidth: '100%' }}>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          position='relative'
        >
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
            /assets/newspaper_jvk4ph/newspaper_jvk4ph_c_scale,w_640.webp 640w
          '
            alt={`Image for article: ${article.title}`}
            sx={{
              height: article.urlToImage ? '100%' : '35vh',
              mt: 1,
              paddingBlockEnd: 0,
              maxHeight: '100%',
              width: 'calc(100% - 1rem)',
              objectFit: 'cover',
              borderRadius: '0.75rem',
            }}
          />
          <Tooltip
            title='Share'
            arrow
            placement='right'
          >
            <IconButton
              onClick={handleDialogOpen}
              sx={{ position: 'absolute', bottom: 0, right: 10 }}
              disableRipple
            >
              <SendOutlined htmlColor='var(--light)' />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
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
              {`${articleTitle} `}
              {/* <span
              style={{
                background: 'var(--bg-paper)',
                backgroundBlendMode: 'multiply',
                paddingInline: 2,
              }}
            >
              {`- ${articleSource}`}
            </span> */}
            </Typography>
            <Box
              display='flex'
              flexWrap='wrap'
              gap={1}
              width='100%'
            >
              <ArticleLabel
                category='Publisher'
                label={article.author}
              />
              <ArticleLabel
                category='News Category'
                label={category}
              />
              <ArticleLabel
                category='Published Date'
                label={article.publishDate}
              />
              <ArticleLabel
                category='Published Time'
                label={article.publishTime}
              />
            </Box>
          </CardContent>
          <CardActions
            sx={{
              width: 'calc(100% - 1rem)',
              borderTop: '1px dashed #111',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              onClick={() => handleSlideClick(article)}
              endIcon={<ArrowRight />}
            >
              <Typography fontFamily={'var(--font-title)'}>
                View Article
              </Typography>
            </Button>
          </CardActions>
        </Box>
      </Card>
      <MediaDialog
        shareTitle={article.title}
        shareUrl={article.url}
        shareText={article.description ?? altDescription}
        open={dialogOpen}
        handleClose={handleDialogClose}
      />
    </>
  )
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
    publishDate: PropTypes.string,
    publishTime: PropTypes.string,
    url: PropTypes.string,
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
