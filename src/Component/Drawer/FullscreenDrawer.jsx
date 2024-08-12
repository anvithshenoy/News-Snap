import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Typography from '@mui/material/Typography'
import ArrowLeftOutlined from '@mui/icons-material/ArrowLeftOutlined'
import IosShareOutlined from '@mui/icons-material/IosShareOutlined'
import Background from '/assets/bg.jpg'
import PropTypes from 'prop-types'

const FullScreenDrawer = ({
  category = 'headlines',
  open,
  handleClose,
  article,
}) => {
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
        width={'calc(100% - 2.5rem)'}
        borderRadius={'2rem 2rem 0 0'}
        display={'flex'}
        paddingBlock={5}
        paddingInline={2.5}
        gap={1}
        sx={{
          background: `var(--light)`,
          filter: 'drop-shadow(-4px -4px 4px #111)',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          justifyContent={'flex-start'}
          alignItems={'flex-end'}
          gap={1}
          sx={{
            width: { sm: '15%' },
            flexDirection: { xs: 'row', sm: 'column' },
          }}
        >
          <Chip
            color='primary'
            label={
              <Typography
                variant='h6'
                fontFamily={'var(--font-title)'}
              >
                {category}
              </Typography>
            }
          />
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
        <Divider
          flexItem
          orientation='vertical'
        />

        <Box
          display={'flex'}
          flexDirection={'column'}
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
        </Box>
      </Box>
    </SwipeableDrawer>
  )
}

FullScreenDrawer.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,
    publishDate: PropTypes.string,
    publishTime: PropTypes.string,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  category: PropTypes.string,
  open: PropTypes.bool,
}

export default FullScreenDrawer
