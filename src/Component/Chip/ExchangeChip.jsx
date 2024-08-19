import { Chip, Typography } from '@mui/material'
import { useCurrency } from '../../context/currency/CurrencyContext'

const ExchangeChip = () => {
  const { rate, loading, error } = useCurrency()

  return (
    <Chip
      variant='outlined'
      label={
        <Typography
          variant='h6'
          fontFamily={'var(--font-title)'}
          sx={{
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {loading ? 'Loading...' : error ? 'Error' : `₹ ${rate}`}
        </Typography>
      }
    />
  )
}

export default ExchangeChip
