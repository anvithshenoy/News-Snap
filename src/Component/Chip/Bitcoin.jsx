import { Chip, Icon, Tooltip, Typography } from '@mui/material'
import CurrencyBitcoinOutlined from '@mui/icons-material/CurrencyBitcoinOutlined'
import CloudSyncOutlined from '@mui/icons-material/CloudSyncOutlined'
import TrendingUpOutlined from '@mui/icons-material/TrendingUpOutlined'
import TrendingDownOutlined from '@mui/icons-material/TrendingDownOutlined'
import { useBitcoin } from '../../context/Bitcoin/BitcoinContext'

const BitcoinChip = () => {
  const { bitcoin, loading } = useBitcoin()

  if (loading) {
    return (
      <Tooltip
        title='Fetching Bitcoin data...'
        arrow
        placement='right'
        disableInteractive
      >
        <Chip
          label={
            <Typography
              variant='h6'
              fontFamily={'var(--font-title)'}
              sx={{ fontVariantNumeric: 'tabular-nums' }}
            >
              Loading...
            </Typography>
          }
          variant='outlined'
          icon={<CurrencyBitcoinOutlined color='primary' />}
          deleteIcon={<CloudSyncOutlined color='info' />}
          onDelete={() => ''}
        />
      </Tooltip>
    )
  }

  if (!bitcoin) {
    return (
      <Tooltip
        title='Error fetching Bitcoin data'
        arrow
        placement='right'
        disableInteractive
      >
        <Chip
          label={
            <Typography
              variant='h6'
              fontFamily={'var(--font-title)'}
              sx={{ fontVariantNumeric: 'tabular-nums' }}
            >
              Error
            </Typography>
          }
          variant='outlined'
          icon={<CurrencyBitcoinOutlined color='primary' />}
          deleteIcon={<Icon>⚠️</Icon>}
          onDelete={() => ''}
        />
      </Tooltip>
    )
  }

  return (
    <Tooltip
      title={`Bitcoin Current Price: ${bitcoin.increase ? 'Gain' : 'Loss'}`}
      arrow
      placement='right'
      disableInteractive
    >
      <Chip
        label={
          <Typography
            variant='h6'
            fontFamily={'var(--font-title)'}
            sx={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {`$ ${bitcoin.price.toFixed(2)}`}
          </Typography>
        }
        variant='outlined'
        icon={<CurrencyBitcoinOutlined color='primary' />}
        deleteIcon={
          <Icon>
            {bitcoin.increase ? (
              <TrendingUpOutlined color='success' />
            ) : (
              <TrendingDownOutlined color='error' />
            )}
          </Icon>
        }
        onDelete={() => ''}
      />
    </Tooltip>
  )
}

export default BitcoinChip
