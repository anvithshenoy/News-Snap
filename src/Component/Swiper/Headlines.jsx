import * as React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-cards'
import './Swiper.css'
import Typography from '@mui/material/Typography'
import { fetchNews } from '../../utils/fetchNews'
import logo from '/assets/newspaper.jpg'
import PropTypes from 'prop-types'

const Headlines = ({ handleSlideClick }) => {
  const [headlines, setHeadlines] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNews('headlines')
        setHeadlines(response.data.articles)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
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
              background: `#11111175 url(${article?.urlToImage || logo})`,
            }}
            onClick={() => handleSlideClick(article)}
          >
            <div className='slide'>
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
  )
}

Headlines.propTypes = {
  handleSlideClick: PropTypes.func.isRequired,
}

export default Headlines
