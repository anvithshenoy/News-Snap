import { Tab, Tabs, Typography } from '@mui/material'
import { useState } from 'react'

const categories = [
  'Business',
  'Entertainment',
  'General',
  'Health',
  'Science',
  'Technology',
]

const Drawer = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant='scrollable'
    >
      {categories.map((category, index) => (
        <Tab
          key={index}
          label={
            <Typography
              variant='h6'
              fontFamily={'var(--font-title)'}
            >
              {category}
            </Typography>
          }
        />
      ))}
    </Tabs>
  )
}

export default Drawer
