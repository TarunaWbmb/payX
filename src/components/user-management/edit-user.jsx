import React from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import defaultTheme from '../../theme/default'
import PropTypes from 'prop-types'
import Grid from '@mui/material/Grid2'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useEditUserMutation } from '../../services/serviceApi'

const EditUser = ({ data, handleClose }) => {
  const [editUser] = useEditUserMutation()

  const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    country: yup.string().required('Country is required'),
    email: yup.string().required('Email is required'),
  })

  const defaultValues = {
    firstName: data?.firstName,
    lastName: data?.lastName,
    country: data?.country,
    email: data?.email,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
    mode: 'onBlur',
  })

  const onSubmitHandler = async (submitData) => {
    const payload = {
      userId: data?._id,
      action: 'edit',
      ...submitData,
    }
    try {
      await editUser(payload)
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
        width: 650,
        bgcolor: 'background.paper',
        border: `3px solid ${defaultTheme.palette.primary.main}`,
        boxShadow: 24,
        borderRadius: '15px',
        minHeight: 430,
        p: 4,
      }}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Edit User Details
      </Typography>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={2} mt={5}>
          <Grid size={6}>
            <TextField
              id="firstName"
              label="First Name"
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              autoComplete="firstName"
              autoFocus
              required
              fullWidth
              variant="outlined"
              {...register('firstName')}
              error={errors?.firstName}
              helperText={errors?.firstName?.message}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              id="lastName"
              label="Last Name"
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              autoComplete="lastName"
              autoFocus
              required
              fullWidth
              variant="outlined"
              {...register('lastName')}
              error={errors?.lastName}
              helperText={errors?.lastName?.message}
            />
          </Grid>
        </Grid>
        <Grid container mt={3} spacing={2}>
          <Grid size={12}>
            <TextField
              id="country"
              label="Country"
              type="text"
              name="country"
              placeholder="Enter your country"
              autoComplete="country"
              autoFocus
              required
              fullWidth
              variant="outlined"
              {...register('country')}
              error={errors?.country}
              helperText={errors?.country?.message}
            />
          </Grid>
        </Grid>
        <Grid container mt={3}>
          <Grid size={12}>
            <TextField
              id="email"
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your Email"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              {...register('email')}
              disabled={data?.email}
              error={errors?.email}
              helperText={errors?.email?.message}
            />
          </Grid>
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
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default EditUser

EditUser.propTypes = {
  data: PropTypes.object,
  handleClose: PropTypes.func,
}
