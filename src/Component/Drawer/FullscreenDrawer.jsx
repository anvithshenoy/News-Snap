import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import ArrowLeftOutlined from '@mui/icons-material/ArrowLeftOutlined'
import { Box, Chip, Link } from '@mui/material'
import Background from '/assets/bg.jpg'
import IosShareOutlined from '@mui/icons-material/IosShareOutlined'

const FullScreenDrawer = ({ open, handleClose, article }) => {
  const altDescription = `This content was written by ${article?.author} and published on ${article?.publishDate} at ${article?.publishTime}. For the complete story, click the link to `

  return (
    <SwipeableDrawer
      anchor='bottom'
      open={open}
      onClose={handleClose}
      onOpen={handleClose}
      sx={{
        '& .MuiPaper-root': {
          height: '100vh',
          background: `url(${article?.urlToImage || Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'calc(100% - 2rem)'}
        padding={1}
      >
        <IconButton
          onClick={handleClose}
          aria-label='close'
          size='small'
          color='default'
          sx={{
            filter: 'invert()',
          }}
        >
          <ArrowLeftOutlined fontSize='large' />
        </IconButton>
        <IconButton
          onClick={handleClose}
          aria-label='close'
          size='large'
          color='default'
          sx={{
            filter: 'invert()',
          }}
        >
          <IosShareOutlined fontSize='small' />
        </IconButton>
      </Box>
      <Box
        width={'calc(100% - 5rem)'}
        borderRadius={'2rem 2rem 0 0'}
        padding={5}
        sx={{
          background: `var(--light)`,
          filter: 'drop-shadow(-4px -4px 4px #111)',
        }}
      >
        <Typography
          variant='h4'
          fontFamily={'var(--font-title)'}
          gutterBottom
        >
          {article?.title}
        </Typography>
        <Typography
          variant='body1'
          fontFamily={'var(--font-body)'}
        >
          {article?.description || altDescription}
          <Link
            href={article?.url}
            target='_blank'
          >
            read more
          </Link>
        </Typography>

        <Box
          paddingBlock={2}
          display={'flex'}
          flexWrap={'wrap'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          gap={1}
        >
          {['author', 'publishDate', 'publishTime'].map((text) => (
            <Chip
              key={text}
              label={
                <Typography
                  variant='h6'
                  fontFamily={'var(--font-title)'}
                >
                  {article && article[text]}
                </Typography>
              }
            />
          ))}
        </Box>
      </Box>
    </SwipeableDrawer>
  )
}

FullScreenDrawer.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  article: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,
    publishDate: PropTypes.string,
    publishTime: PropTypes.string,
  }),
}

export default FullScreenDrawer
