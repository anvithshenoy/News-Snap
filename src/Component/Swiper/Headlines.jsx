import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCards, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-cards'
import './Swiper.css'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import logo from '/assets/newspaper.webp'
import PropTypes from 'prop-types'

const Headlines = ({ headlines, handleSlideClick }) => {
  return (
    <>
      <div id='slide-container'>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignContent={'center'}
          justifyContent={'center'}
          paddingInlineStart={{ sm: 15 }}
        >
          <Typography
            variant='h1'
            fontFamily={'var(--font-title)'}
            align='center'
            color={'var(--light)'}
            sx={{ filter: 'drop-shadow(0 0 0.15rem var(--dark))' }}
          >
            Top Headlines
          </Typography>
          <Typography
            variant='h6'
            color={'#1976d2'}
            fontFamily={'var(--font-body)'}
            textTransform={'uppercase'}
            align='center'
            sx={{
              background: 'var(--bg-paper)',
              backgroundBlendMode: 'multiply',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            Snap into the world&apos;s stories.
          </Typography>
        </Box>

        <Swiper
          autoplay={{
            delay: 11000,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: {
              cardsEffect: {
                perSlideOffset: 100,
                rotate: false,
              },
            },
            768: {
              cardsEffect: {
                perSlideOffset: 25,
              },
              slideToClickedSlide: true,
              mousewheel: {
                enabled: true,
              },
            },
          }}
          centeredSlides={true}
          effect='cards'
          grabCursor={true}
          modules={[Autoplay, EffectCards, Mousewheel]}
          mousewheel={true}
          rewind={true}
        >
          {headlines.map((article) => (
            <SwiperSlide
              key={article?.id}
              style={{
                backgroundImage: `url(${article?.urlToImage ?? logo})`,
              }}
              onClick={() => handleSlideClick(article)}
            >
              <Typography
                variant='h5'
                align='center'
                className='read-me'
                fontFamily={'var(--font-title)'}
              >
                View Article
              </Typography>
              <div className='slide'>
                <Typography
                  variant='body1'
                  fontFamily={'var(--font-title)'}
                  sx={{
                    position: 'absolute',
                    top: 10,
                    paddingInline: 1,
                    borderRadius: 5,
                    color: 'var(--light)',
                    textShadow: '2px 2px 2px #111',
                  }}
                >
                  {article.publishTime}
                </Typography>
                <Typography
                  variant='h6'
                  fontFamily={'var(--font-body)'}
                  sx={{
                    textShadow: '2px 2px 2px #111',
                  }}
                >
                  {article.title}
                </Typography>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

Headlines.propTypes = {
  headlines: PropTypes.array.isRequired,
  handleSlideClick: PropTypes.func.isRequired,
}

export default Headlines
