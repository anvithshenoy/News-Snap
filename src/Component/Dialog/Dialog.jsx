import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import PropTypes from 'prop-types'
import { Box, IconButton, Snackbar } from '@mui/material'
import {
  WhatsApp,
  Twitter,
  Facebook,
  Email,
  ContentCopy,
} from '@mui/icons-material'

const AlertDialog = ({
  shareTitle,
  shareUrl,
  shareText,
  open,
  handleClose,
}) => {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`
  const emailUrl = `mailto:?subject=${encodeURIComponent(
    shareTitle
  )}&body=${encodeURIComponent(shareText)}`

  const [isOpen, setIsOpen] = useState(open)
  const [copySuccess, setCopySuccess] = useState('')

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const onClose = () => {
    setIsOpen(false)
    handleClose()
  }

  const shareButtons = [
    { icon: <WhatsApp />, url: whatsappUrl },
    { icon: <Facebook />, url: facebookUrl },
    { icon: <Twitter />, url: twitterUrl },
    { icon: <Email />, url: emailUrl },
  ]

  const copyLinkToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => setCopySuccess('Link copied!'))
      .catch(() => setCopySuccess('Failed to copy link'))
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 10,
        }}
      >
        <DialogTitle id='alert-dialog-title'>Share This Article</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Share this article via your preferred platform:
          </DialogContentText>
          <Box
            display='flex'
            gap={1}
            justifyContent={'center'}
            alignItems={'center'}
            mt={2}
          >
            {shareButtons.map((button, index) => (
              <IconButton
                key={index}
                color='primary'
                onClick={() => window.open(button.url, '_blank')}
              >
                {button.icon}
              </IconButton>
            ))}
            <IconButton
              color='primary'
              onClick={copyLinkToClipboard}
            >
              <ContentCopy />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!copySuccess}
        autoHideDuration={3000}
        onClose={() => setCopySuccess('')}
        message={copySuccess}
      />
    </>
  )
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  shareTitle: PropTypes.string.isRequired,
  shareUrl: PropTypes.string.isRequired,
  shareText: PropTypes.string.isRequired,
}

export default AlertDialog
