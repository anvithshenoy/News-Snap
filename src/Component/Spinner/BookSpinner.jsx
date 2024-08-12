import { Typography } from '@mui/material'
import './BookSpinner.css'

const Spinner = () => {
  return (
    <>
      <section id='loader'>
        <div className='book'>
          <div className='inner'>
            <div className='left'></div>
            <div className='middle'></div>
            <div className='right'></div>
          </div>
          <ul>
            {Array.from({ length: 17 }).map((_, index) => (
              <li key={index}></li>
            ))}
          </ul>
        </div>
        <Typography
          variant='h4'
          align='center'
          fontFamily={'var(--font-title)'}
        >
          Snap into the World&apos;s Stories
        </Typography>
      </section>
    </>
  )
}

export default Spinner
