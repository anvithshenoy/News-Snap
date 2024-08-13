import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

const ArticleLabel = ({ label, context = 'caption', color = 'default' }) => {
  return (
    <Chip
      color={color}
      label={
        <Typography
          variant={context}
          color={color === 'default' ? 'text.secondary' : 'inherit'}
          component='div'
          fontFamily={context !== 'caption' && 'var(--font-title)'}
        >
          {label}
        </Typography>
      }
      sx={{ background: 'var(--bg-paper)', backgroundBlendMode: 'multiply' }}
    />
  )
}

ArticleLabel.propTypes = {
  label: PropTypes.string.isRequired,
  context: PropTypes.string,
  color: PropTypes.string,
}

export default ArticleLabel
