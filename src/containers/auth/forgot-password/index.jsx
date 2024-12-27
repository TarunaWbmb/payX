import React from 'react'
import { Card, CardContent, TextField, Button, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import logoImage from '../../../assets/images/Logo.png'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const schema = yup.object().shape({
    email: yup.string().required('Email is required'),
    phoneNo: yup.string().required('Phone Number is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const onSubmitHandler = async (data) => {
    try {
      console.log('response', data)
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  return (
    <Card
      sx={{
        maxWidth: 500,
        minHeight: 450,
        padding: 4,
        width: '100%',
        borderRadius: '20px',
        boxShadow:
          'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Grid display={'flex'} mb={2} justifyContent={'center'}>
          <img height={30} src={logoImage} />
        </Grid>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Typography variant="h2" display={'flex'} justifyContent={'center'}>
            Forgot Password
          </Typography>
          <Grid container mb={3} mt={2} spacing={3}>
            <Grid size={12}>
              <TextField
                id="email"
                label="Email"
                type="email"
                name="Email"
                autoComplete="email"
                placeholder="Enter your email"
                fullWidth
                variant="outlined"
                {...register('email')}
                error={errors?.email}
                helperText={errors?.email?.message}
                // {...trigger('email')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                id="phoneNo"
                label="Phone Number"
                type="number"
                name="Phone Number"
                autoComplete="phone"
                placeholder="Enter your phone number"
                fullWidth
                variant="outlined"
                {...register('phoneNo')}
                error={errors?.phoneNo}
                helperText={errors?.phoneNo?.message}
                // {...trigger('phoneNo')}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
            sx={{
              marginTop: 2,
              padding: 1.5,
              borderRadius: '10px',
            }}
          >
            Submit
          </Button>
          <Grid container mt={3} spacing={2}>
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              <Typography variant="p" fontSize={15}>
                Back to Login
              </Typography>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default ForgotPassword
