import { Tooltip } from '@mui/material'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

const ArticleLabel = ({
  label,
  category,
  chipColor = 'default',
  context = 'caption',
}) => {
  return (
    <Tooltip
      title={category}
      arrow
      enterDelay={3000}
    >
      <Chip
        color={chipColor}
        label={
          <Typography
            variant={context}
            color={chipColor === 'default' ? 'text.secondary' : 'inherit'}
            component='div'
            fontFamily={context !== 'caption' && 'var(--font-title)'}
          >
            {label}
          </Typography>
        }
        sx={{
          ...(chipColor === 'default' && {
            background: 'var(--bg-paper)',
            backgroundBlendMode: 'multiply',
          }),
        }}
      />
    </Tooltip>
  )
}

ArticleLabel.propTypes = {
  label: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  chipColor: PropTypes.string,
  context: PropTypes.string,
}

export default ArticleLabel
