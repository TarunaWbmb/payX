import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import { Outlet } from 'react-router-dom'
import DrawerComponent from './drawer'

const drawerWidth = 240

function ResponsiveDrawer(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DrawerComponent props={props} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default ResponsiveDrawer
