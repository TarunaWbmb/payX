import React from 'react'
import './App.css'
import { CssBaseline } from '@mui/material'
import Routes from '../routes'
import { ThemeProvider } from '@mui/material/styles'
import defaultTheme from '../theme/default'
import Alerts from '../components/alerts'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Routes />
      <Alerts />
    </ThemeProvider>
  )
}

export default App
