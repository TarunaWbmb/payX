import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { removeAlert } from '../redux/reducers/appSlice'

const Alerts = () => {
  const alerts = useSelector((state) => state.app.alerts)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(removeAlert())
  }
  return (
    <Stack spacing={7} sx={{ width: '100%', zIndex: 99 }}>
      {alerts.map((alert) => (
        <Snackbar
          key={alert.key}
          open
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MuiAlert
            sx={{ width: '330px', overflow: 'hidden', wordWrap: 'break-word' }}
            elevation={6}
            variant="filled"
            severity={alert.severity}
            onClose={handleClose}
          >
            {alert.title && <strong>{alert.title}</strong>} : {alert.message}
          </MuiAlert>
        </Snackbar>
      ))}
    </Stack>
  )
}

export default Alerts
