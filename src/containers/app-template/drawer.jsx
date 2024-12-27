import React from 'react'
import {
  Box,
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import PropTypes from 'prop-types'
import LogoutIcon from '@mui/icons-material/Logout'
import { useLogoutAdminMutation } from '../../services/loginApi'
import BarChartIcon from '@mui/icons-material/BarChart'
import PeopleIcon from '@mui/icons-material/People'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PaymentIcon from '@mui/icons-material/Payment'
import defaultTheme from '../../theme/default'
import LanguageIcon from '@mui/icons-material/Language'
import SmsIcon from '@mui/icons-material/Sms'
import GradingIcon from '@mui/icons-material/Grading'
import logoImage from '../../assets/images/Logo.png'

const DrawerComponent = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

  const drawerWidth = 300
  const navigate = useNavigate()
  const location = useLocation()
  const [logout] = useLogoutAdminMutation()

  const { window } = props

  const container =
    window !== undefined ? () => window().document.body : undefined

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await logout()
      if (!response.error) {
        sessionStorage.clear('token')
        navigate('/')
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  const drawerItems = [
    {
      name: 'Analytics',
      route: '/dashboard',
      icon: <BarChartIcon />,
    },
    {
      name: 'User Management',
      route: '/user-management',
      icon: <PeopleIcon />,
    },
    {
      name: 'User Receipts',
      route: '/user-receipts',
    },
    {
      name: 'Payment Categories',
      route: '/payment-categories',
      icon: <PaymentIcon />,
    },
    {
      name: 'Currencies',
      route: '/currencies',
      icon: <AttachMoneyIcon />,
    },
    {
      name: 'Fee Management',
      route: '/fee-management',
    },
    {
      name: 'FX Exchange Management',
      route: '/fx-exchange-management',
    },
    {
      name: 'Transfer List Management',
      route: '/transfer-list',
    },
    {
      name: 'Service Fees Management',
      route: '/service-fees',
    },
    {
      name: 'Country Language Management',
      route: '/country-language',
      icon: <LanguageIcon />,
    },
    {
      name: 'Email Template Management',
      route: '/email-template-management',
      icon: <MailIcon />,
    },
    {
      name: 'Sms Template Management',
      route: '/sms-template-management',
      icon: <SmsIcon />,
    },
    {
      name: 'Terms and Conditions',
      route: '/terms-and-conditions',
      icon: <GradingIcon />,
    },
  ]

  const drawer = (
    <div>
      <Toolbar>
        <Box display={'flex'} justifyContent={'center'}>
          <img height={37} src={logoImage} />
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ marginTop: '12px' }}>
        {drawerItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{
                backgroundImage:
                  location.pathname === item.route
                    ? 'linear-gradient(87deg, #FF6B65 0%, #297EFF 100%)'
                    : 'transparent',
                color: location.pathname === item.route ? '#fff' : '#000',
                '&:hover': {
                  backgroundColor:
                    location.pathname === item.route
                      ? defaultTheme.palette.primary.main
                      : '#f4f4f4',
                  color: location.pathname === item.route ? '#fff' : '#000',
                },
                borderRadius: '10px',
                padding: '12px',
              }}
              onClick={() => navigate(item.route)}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.route && '#fff',
                }}
              >
                {item.icon || <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    style={{
                      fontWeight: location.pathname === item.route && 600,
                      color: location.pathname === item.route && '#fff',
                    }}
                  >
                    {item.name}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: defaultTheme.palette.primary.main,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color={defaultTheme.palette.background.default}
            noWrap
            component="div"
          >
            PayX-Admin
          </Typography>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => handleLogout()}
                sx={{ mr: 2 }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )
}

export default DrawerComponent

DrawerComponent.propTypes = {
  window: PropTypes.func,
}
