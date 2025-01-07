import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import defaultTheme from '../theme/default'
import Grid from '@mui/material/Grid2'
import PropTypes from 'prop-types'

const DeleteModal = ({ heading, name, handleClose, handleSaveClick }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        height: 210,
        bgcolor: 'background.paper',
        border: `3px solid ${defaultTheme.palette.secondary.main}`,
        boxShadow: 24,
        p: 4,
        borderRadius: 4,
        overflow: 'auto',
      }}
    >
      <Typography variant="h6">{heading}</Typography>
      <Typography variant="subtitle1" mt={2}>
        Are you sure you want to delete {name}?
      </Typography>
      <Grid container mt={3} display={'flex'} justifyContent={'space-between'}>
        <Grid>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button variant="contained" onClick={handleSaveClick}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DeleteModal

DeleteModal.propTypes = {
  heading: PropTypes.string,
  name: PropTypes.string,
  handleClose: PropTypes.func,
  handleSaveClick: PropTypes.func,
}
