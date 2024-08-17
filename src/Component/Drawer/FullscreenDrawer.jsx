import { useState } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ArrowLeftOutlined from '@mui/icons-material/ArrowLeftOutlined'
import ShareOutlined from '@mui/icons-material/IosShareOutlined'

import './FSD.css'
import Background from '/assets/bg.webp'
import ArticleLabel from '../Chip/ArticleLabel'
import MediaDialog from '../Dialog/Dialog'
import PropTypes from 'prop-types'

const FullScreenDrawer = ({
  category = 'headlines',
  open,
  handleClose,
  article,
}) => {
  const altDescription = `This content was written by ${article?.author} and published on ${article?.publishDate} at ${article?.publishTime}. For the complete story, click the link to `
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <>
      <SwipeableDrawer
        anchor='bottom'
        open={open}
        onClose={handleClose}
        onOpen={handleClose}
        className='swipeable-drawer'
        sx={{
          '& .MuiPaper-root': {
            height: '100vh',
            background: `url(${article?.urlToImage ?? Background})`,
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
          <Tooltip
            title={'Back to Homepage'}
            arrow
            enterDelay={3000}
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
              <ArrowLeftOutlined
                fontSize='large'
                sx={{
                  transform: 'rotate(0)',
                  transition: 'transform 0.3s ease-in-out',
                  [`&:hover`]: {
                    transform: 'rotate(-90deg)',
                  },
                }}
              />
            </IconButton>
          </Tooltip>
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
          <Tooltip
            title={'Share'}
            arrow
            enterDelay={3000}
          >
            <IconButton
              onClick={handleDialogOpen}
              aria-label='share'
              size='large'
              sx={{
                position: 'absolute',
                top: -25,
                right: 25,
                background: '#1976d2',
                [`&:hover`]: {
                  background: '#1976d2ef',
                },
              }}
            >
              <ShareOutlined
                htmlColor='var(--light)'
                fontSize='small'
              />
            </IconButton>
          </Tooltip>
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
            <ArticleLabel
              label={category}
              category='Category'
              chipColor={'primary'}
              context='h6'
            />

            {[
              { text: 'author', categoryLabel: 'Publisher' },
              { text: 'publishDate', categoryLabel: 'Published Date' },
              { text: 'publishTime', categoryLabel: 'Published Time' },
            ].map(({ text, categoryLabel }, index) => (
              <ArticleLabel
                key={index}
                category={categoryLabel}
                context='h6'
                label={article[text]}
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
            maxWidth={{ xs: '90%', sm: '75%' }}
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
              {article?.description ?? altDescription}
              <Link
                href={article?.url}
                target='_blank'
                noWrap
              >
                read more
              </Link>
            </Typography>
          </Box>
        </Box>
      </SwipeableDrawer>

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

FullScreenDrawer.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,
    publishDate: PropTypes.string,
    publishTime: PropTypes.string,
  }),
  handleClose: PropTypes.func.isRequired,
  category: PropTypes.string,
  open: PropTypes.bool.isRequired,
}

export default FullScreenDrawer
