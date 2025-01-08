import React, { useState } from 'react'
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useLoginAdminMutation } from '../../../services/loginApi'
import { useNavigate } from 'react-router-dom'
import LockIcon from '@mui/icons-material/Lock'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import logoImage from '../../../assets/images/Logo.png'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../redux/reducers/loginSlice'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  const schema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const [login] = useLoginAdminMutation()
  const navigate = useNavigate()

  const onSubmitHandler = async (data) => {
    try {
      const response = await login(data)
      if (response?.data?.token) {
        sessionStorage.setItem('token', response?.data?.token)
        dispatch(setToken(response?.data?.token))
        navigate('/dashboard')
      }
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
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
            Admin Login
          </Typography>
          <Grid container mb={3} mt={2} spacing={3}>
            <Grid size={12}>
              <TextField
                error={!!errors?.email}
                helperText={errors?.email?.message}
                id="email"
                label="Email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
                {...register('email')}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                error={!!errors?.password}
                helperText={errors?.password?.message}
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="password"
                required
                fullWidth
                variant="outlined"
                {...register('password')}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Typography
              variant="p"
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('forgot-password')}
            >
              Forgot Password?
            </Typography>
          </Grid>

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            fullWidth
            sx={{
              marginTop: 2,
              padding: 1.5,
              backgroundColor: 'rgba(0, 76, 211, 1)',
              borderRadius: '10px',
            }}
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default Login
