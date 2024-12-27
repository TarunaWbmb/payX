import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import defaultTheme from '../../theme/default'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid2'
import { useEditUserMutation } from '../../services/serviceApi'

const DeleteUser = ({ data, handleClose }) => {
  const [deleteUser] = useEditUserMutation()

  const handleDelete = async () => {
    const { _id, ...dataWithoutId } = data || {}
    const payload = {
      ...dataWithoutId,
      userId: _id,
      action: 'delete',
    }
    try {
      await deleteUser(payload)
    } catch (error) {
      throw new Error(error)
    }
    handleClose()
  }
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'background.paper',
        border: `3px solid ${defaultTheme.palette.primary.main}`,
        boxShadow: 24,
        borderRadius: '15px',
        minHeight: 230,
        p: 4,
      }}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Delete User
      </Typography>

      <Grid container mt={3} spacing={2}>
        <Typography>
          Are you sure you want to delete {data?.firstName} {data?.lastName}?
        </Typography>
      </Grid>
      <Grid container mt={4} justifyContent={'space-between'}>
        <Grid>
          <Button
            variant="outlined"
            sx={{ paddingLeft: 3, paddingRight: 3, border: '1.9px solid' }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button
            sx={{ paddingLeft: 3, paddingRight: 3 }}
            onClick={() => handleDelete()}
            variant="contained"
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DeleteUser

DeleteUser.propTypes = {
  data: PropTypes.object,
  handleClose: PropTypes.func,
}
