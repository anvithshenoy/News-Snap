import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-cards'
import './Swiper.css'
import Typography from '@mui/material/Typography'
import logo from '/assets/newspaper.webp'
import PropTypes from 'prop-types'

const Headlines = ({ headlines, handleSlideClick }) => {
  return (
    <>
      <Typography
        variant='h3'
        fontFamily={'var(--font-title)'}
        className='top-heading'
      >
        Today&apos;s Top {headlines.length} Headlines
      </Typography>
      <div id='slide-container'>
        <Swiper
          autoplay={{
            delay: 7000,
            pauseOnMouseEnter: true,
          }}
          centeredSlides={true}
          cardsEffect={{
            perSlideOffset: 75,
            perSlideRotate: 3,
            rotate: false,
            slideShadows: true,
          }}
          effect='cards'
          grabCursor={true}
          modules={[Autoplay, EffectCards]}
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
                Read more details
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
                    // background: 'var(--bg-paper)',
                    // backgroundBlendMode: 'multiply',
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
