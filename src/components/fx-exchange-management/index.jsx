import React, { useState } from 'react'
import Grid from '@mui/material/Grid2'
import {
  Typography,
  Paper,
  Button,
  Modal,
  Box,
  IconButton,
  Autocomplete,
  TextField,
} from '@mui/material'
import defaultTheme from '../../theme/default'
import { DataGrid } from '@mui/x-data-grid'
import CloseIcon from '@mui/icons-material/Close'
import {
  useGetAllCurrenciesQuery,
  useAddFxExchangeMutation,
  useGetFxExchangeQuery,
} from '../../services/serviceApi'
import EastIcon from '@mui/icons-material/East'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const FXExchangeManagement = () => {
  const [open, setOpen] = useState(false)

  const { data: allCurrenciesList } = useGetAllCurrenciesQuery({})
  const { data: fxExchangeList, refetch } = useGetFxExchangeQuery({})
  const [addFxExchange] = useAddFxExchangeMutation()

  console.log('fxExchangeList', fxExchangeList)

  const columns = [
    {
      field: 'fromCurrency',
      headerName: 'From Currency',
      width: 300,
    },
    {
      field: 'toCurrency',
      headerName: 'To Currency',
      width: 300,
    },
    {
      field: 'fxRate',
      headerName: 'FX Rate',
      width: 200,
    },
    {
      field: 'marginRate',
      headerName: 'Margin Rate',
      width: 200,
    },
  ]

  const paginationModel = { page: 0, pageSize: 10 }

  const handleClose = () => {
    setOpen(false)
    setValue('fxRate', '')
    setValue('marginRate', '')
    refetch()
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const schema = yup.object().shape({
    fxRate: yup.number().required('FX Rate is required'),
    marginRate: yup.number().required('Margin Rate is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const onSubmitHandler = async (data) => {
    try {
      console.log('data', data)
      addFxExchange(data)
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
    handleClose()
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            minheight: 520,
            maxHeight: 800,
            bgcolor: 'background.paper',
            border: `3px solid ${defaultTheme.palette.secondary.main}`,
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
            overflow: 'auto',
          }}
        >
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid container display={'flex'} justifyContent={'space-between'}>
              <Grid>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add FX Exchange
                </Typography>
              </Grid>
              <Grid>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Grid container mt={2} display={'flex'} justifyContent={'center'}>
              <Grid size={5.5}>
                <Autocomplete
                  disablePortal
                  options={allCurrenciesList?.data || []}
                  fullWidth
                  onChange={(e, newValue) => {
                    setValue('fromCurrency', newValue)
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select From Currency" />
                  )}
                  slotProps={{
                    listbox: {
                      style: {
                        maxHeight: '150px',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs="auto">
                <IconButton>
                  <EastIcon />
                </IconButton>
              </Grid>
              <Grid size={5.5}>
                <Autocomplete
                  disablePortal
                  options={allCurrenciesList?.data || []}
                  fullWidth
                  onChange={(e, newValue) => {
                    setValue('toCurrency', newValue)
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select To Currency" />
                  )}
                  slotProps={{
                    listbox: {
                      style: {
                        maxHeight: '150px',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Grid container mt={2} display={'flex'} justifyContent={'center'}>
              <TextField
                fullWidth
                {...register('fxRate')}
                label="Set FX Rate"
                type="number"
                name="fxRate"
                error={errors?.fxRate}
                helperText={errors?.fxRate?.message}
              />
            </Grid>
            <Grid mt={2}>
              <TextField
                fullWidth
                {...register('marginRate')}
                label="Set Margin Rate"
                type="number"
                name="marginRate"
                error={errors?.marginRate}
                helperText={errors?.marginRate?.message}
              />
            </Grid>

            <Grid
              container
              display={'flex'}
              justifyContent={'space-between'}
              mt={4}
            >
              <Grid>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid>
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <Grid
        container
        mb={2}
        mt={2}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Grid>
          <Typography variant="h6">FX Exchange Management</Typography>
        </Grid>
        <Grid>
          <Button
            onClick={() => handleOpen()}
            variant="outlined"
            color="secondary"
          >
            Add FX Exchange
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper sx={{ height: '100%', width: '96%' }}>
          <DataGrid
            rows={fxExchangeList?.data || []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 15, 20]}
            sx={{ border: 0 }}
            getRowId={(row) => row._id}
            // components={{
            //   LoadingOverlay: isLoading ? <CircularProgress /> : null,
            // }}
            // loading={isLoading}
          />
        </Paper>
      </Grid>
    </>
  )
}

export default FXExchangeManagement
