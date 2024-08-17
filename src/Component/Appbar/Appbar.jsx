import { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
} from '@mui/material'
import {
  Home,
  Person as About,
  ContactEmergency as Contact,
  BusinessCenterOutlined,
  CategoryOutlined,
  ComputerOutlined,
  ExpandLess,
  ExpandMore,
  HealthAndSafetyOutlined,
  LocalActivity,
  LocationCityRounded,
  ScienceOutlined,
  SportsScore,
} from '@mui/icons-material'

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

const SearchAppBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [open, setOpen] = useState(true)

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open)
  }

  const handleClick = () => {
    setOpen(!open)
  }

  const drawerContent = (
    <Box
      width={250}
      role='presentation'
    >
      <List>
        <ListItem>
          <ListItemText
            primary={
              <Typography
                variant='h3'
                align='center'
                fontFamily={'var(--font-title)'}
              >
                News Snap
              </Typography>
            }
          />
        </ListItem>
        <Divider />
        <ListItemButton>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant='body1'
                fontFamily={'var(--font-body)'}
                textTransform={'uppercase'}
              >
                Home
              </Typography>
            }
          />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <About />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant='body1'
                fontFamily={'var(--font-body)'}
                textTransform={'uppercase'}
              >
                About
              </Typography>
            }
          />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <Contact />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant='body1'
                fontFamily={'var(--font-body)'}
                textTransform={'uppercase'}
              >
                Contact
              </Typography>
            }
          />
        </ListItemButton>
        <Divider />
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <CategoryOutlined />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant='body1'
                fontFamily={'var(--font-body)'}
                textTransform={'uppercase'}
              >
                Category
              </Typography>
            }
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={open}
          timeout='auto'
          unmountOnExit
        >
          <List
            component='div'
            disablePadding
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <BusinessCenterOutlined />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant='body2'
                    fontFamily={'var(--font-body)'}
                    textTransform={'uppercase'}
                  >
                    Business
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LocalActivity />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant='body2'
                    fontFamily={'var(--font-body)'}
                    textTransform={'uppercase'}
                  >
                    Entertainment
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <LocationCityRounded />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant='body2'
                    fontFamily={'var(--font-body)'}
                    textTransform={'uppercase'}
                  >
                    General
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <HealthAndSafetyOutlined />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant='body2'
                    fontFamily={'var(--font-body)'}
                    textTransform={'uppercase'}
                  >
                    Health
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ScienceOutlined />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant='body2'
                    fontFamily={'var(--font-body)'}
                    textTransform={'uppercase'}
                  >
                    Science
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <SportsScore />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant='body2'
                    fontFamily={'var(--font-body)'}
                    textTransform={'uppercase'}
                  >
                    Sports
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ComputerOutlined />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant='body2'
                    fontFamily={'var(--font-body)'}
                    textTransform={'uppercase'}
                  >
                    Technology
                  </Typography>
                }
              />
            </ListItemButton>
            <Divider />
          </List>
        </Collapse>
      </List>
    </Box>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            noWrap
            component='div'
            fontFamily={'var(--font-title)'}
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            News Snap
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
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
  )
}

export default SearchAppBar
