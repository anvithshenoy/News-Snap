import { useState, useCallback, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import BitcoinChip from '../Chip/Bitcoin'
import WeatherCard from '../Card/WeatherCard'
import ExchangeChip from '../Chip/ExchangeChip'
import ListItemButton from '@mui/material/ListItemButton'
import { useNavigate } from 'react-router-dom'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  fontFamily: 'var(--font-body)',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const debouncedSearchQuery = debounce((value, setSearchQuery) => {
  setSearchQuery(value)
  // Update URL
  const newUrl = value
    ? `/search?query=${encodeURIComponent(value.toLowerCase())}`
    : `/`
  window.history.pushState({}, '', newUrl)
}, 300)

const SearchAppBar = ({ setSearchQuery, children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleSearchChange = useCallback(
    (e) => {
      setValue(e.target.value)
      debouncedSearchQuery(e.target.value, setSearchQuery)
    },
    [setSearchQuery]
  )

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open)
  }

  useEffect(() => {
    // Extract query from URL
    const params = new URLSearchParams(window.location.search)
    const query = params.get('query')
    if (query) {
      setSearchQuery(query)
      setValue(query)
    }
  }, [setSearchQuery])

  const drawerContent = (
    <List
      sx={{
        height: '100%',
        background: 'var(--bg-paper)',
        backgroundBlendMode: 'multiply',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ListItem>
        <ListItemButton onClick={() => navigate('/')}>
          <Typography
            variant='h3'
            align='center'
            width={'100%'}
            fontFamily={'var(--font-title)'}
            gutterBottom
          >
            News Snap
          </Typography>
        </ListItemButton>
      </ListItem>
      <Divider />

      <ListItem
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <WeatherCard />
        <ListItem
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <BitcoinChip />
          <ExchangeChip />
        </ListItem>
      </ListItem>

      {/* <ListItemButton>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant='body1'
              fontFamily={'var(--font-title)'}
            >
              Home
            </Typography>
          }
        />
      </ListItemButton> */}

      <Divider />
    </List>
  )

  return (
    <Box width={'100%'}>
      <Box
        flexGrow={1}
        width={'100%'}
      >
        <AppBar
          position='static'
          sx={{
            background: 'var(--bg-paper)',
            backgroundBlendMode: 'multiply',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            color: '#1976d2',
          }}
        >
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant='h4'
              fontFamily={'var(--font-title)'}
              noWrap
              flex={1}
            >
              News Snap
            </Typography>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={value}
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
                onFocus={(e) => e.target.select()}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleSearchChange(event)
                  }
                }}
              />
            </Search>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor='left'
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawerContent}
        </Drawer>
      </Box>
      {children}
    </Box>
  )
}

SearchAppBar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default SearchAppBar
