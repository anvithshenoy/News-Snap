import * as React from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-cards'
import './Swiper.css'
import { Typography } from '@mui/material'
import logo from '/assets/newspaper.jpg'
import FullScreenDrawer from '../Drawer/FullscreenDrawer'

const Headlines = () => {
  const [headlines, setHeadlines] = React.useState([])
  const [selectedArticle, setSelectedArticle] = React.useState(null)
  const [openDialog, setOpenDialog] = React.useState(false)
  const URL = import.meta.env.VITE_BACKEND_URL

  const fetchData = async () => {
    try {
      const response = await axios.post(`${URL}/api/headlines`)
      console.log(response.data.articles)
      setHeadlines(response.data.articles)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const handleSlideClick = (article) => {
    setSelectedArticle(article)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedArticle(null)
  }

  return (
    <div id='slide-container'>
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
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

      <FullScreenDrawer
        open={openDialog}
        handleClose={handleCloseDialog}
        article={selectedArticle}
      />
    </div>
  )
}

export default Headlines
