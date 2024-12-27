import React, { useState } from 'react'
import Grid from '@mui/material/Grid2'
import {
  Typography,
  Paper,
  Switch,
  Button,
  Modal,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Autocomplete,
  TextField,
  IconButton,
} from '@mui/material'
import defaultTheme from '../../theme/default'
import { DataGrid } from '@mui/x-data-grid'
import {
  useGetAllCurrenciesQuery,
  useAddCurrencyMutation,
  useGetAddedCurrenciesQuery,
  useUpdateCurrencyMutation,
} from '../../services/serviceApi'
import CloseIcon from '@mui/icons-material/Close'

const Currencies = () => {
  const [open, setOpen] = useState(false)
  const [alignment, setAlignment] = useState('Active')
  const [currency, setCurrency] = useState()

  const { data: allCurrenciesList } = useGetAllCurrenciesQuery({})
  const { data: addedCurrenciesList, refetch } = useGetAddedCurrenciesQuery({})
  const [addCurrency] = useAddCurrencyMutation()
  const [updateCurrency] = useUpdateCurrencyMutation()

  const columns = [
    {
      field: 'currency',
      headerName: 'Currency',
      width: 500,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 500,
      renderCell: (params) => (
        <Switch
          defaultChecked={params.row.status === 'Active' ? true : false}
          onChange={async () => {
            const payload = {
              currency: params.row.currency,
              status: alignment === 'Active' ? 'Inactive' : 'Active',
            }
            try {
              await updateCurrency(payload)
            } catch (error) {
              throw new Error(error)
            }
            refetch()
          }}
        />
      ),
    },
  ]

  const paginationModel = { page: 0, pageSize: 10 }

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    refetch()
  }

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  const handleConfirmClicked = async () => {
    const payload = {
      currency,
      status: alignment,
    }
    try {
      await addCurrency(payload)
    } catch (error) {
      throw new Error(error)
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
            width: 550,
            minheight: 320,
            height: 340,
            bgcolor: 'background.paper',
            border: `3px solid ${defaultTheme.palette.secondary.main}`,
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
            overflow: 'auto',
          }}
        >
          <Grid container display={'flex'} justifyContent={'space-between'}>
            <Grid>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Currency
              </Typography>
            </Grid>
            <Grid>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Box mt={2}>
            <Autocomplete
              disablePortal
              options={allCurrenciesList?.data || []}
              fullWidth
              onChange={(e, newValue) => {
                setCurrency(newValue)
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Currency" />
              )}
              slotProps={{
                listbox: {
                  style: {
                    maxHeight: '150px',
                  },
                },
              }}
            />
          </Box>
          <Box mt={2}>
            <Typography color={defaultTheme.palette.primary.main}>
              Set Status:
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              fullWidth
            >
              <ToggleButton value="Active">Active</ToggleButton>
              <ToggleButton value="Inactive">Inactive</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Grid
            container
            display={'flex'}
            mt={4}
            justifyContent={'space-between'}
          >
            <Grid>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
            <Grid>
              <Button variant="contained" onClick={handleConfirmClicked}>
                Confirm
              </Button>
            </Grid>
          </Grid>
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
          <Typography variant="h6">Currency Management</Typography>
        </Grid>
        <Grid>
          <Button variant="outlined" color="primary" onClick={handleOpen}>
            Add Currency
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
            rows={addedCurrenciesList?.data || []}
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

export default Currencies
