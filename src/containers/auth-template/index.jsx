import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const AuthTemplate = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#f7f7f7',
        background: `linear-gradient(87deg, #FF6B65 0%, #297EFF 100%)`,
        height: '100vh',
      }}
    >
      <Outlet />
    </Box>
  )
}

export default AuthTemplate
