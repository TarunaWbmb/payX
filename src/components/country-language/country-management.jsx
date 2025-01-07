import React, { useState } from 'react'
import {
  Paper,
  Typography,
  Box,
  Divider,
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
  Tooltip,
  IconButton,
  Switch,
  Modal,
} from '@mui/material'
import defaultTheme from '../../theme/default'
import Grid from '@mui/material/Grid2'
import {
  useGetAllCountriesQuery,
  useAddCountryMutation,
  useGetSelectedCountriesQuery,
  useDeleteCountryMutation,
} from '../../services/serviceApi'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteModal from '../../common/delete-modal'

const CountryManagement = () => {
  const [selectedOptions, setSelectedOptions] = useState()
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState()

  const { data: allCountries } = useGetAllCountriesQuery()
  const {
    data: selectedCountries,
    isLoading,
    refetch,
  } = useGetSelectedCountriesQuery()
  const [addCountry] = useAddCountryMutation()
  const [deleteCountry] = useDeleteCountryMutation({})

  const handleChange = (event, newValue) => {
    setSelectedOptions(newValue)
  }

  const handleApplyClicked = async () => {
    const payload = {
      countries: selectedOptions || [],
    }

    try {
      await addCountry(payload)
    } catch (error) {
      throw new Error(error)
    }
    setSelectedOptions([])

    var classes = document.getElementsByClassName(
      'MuiAutocomplete-clearIndicator',
    )
    var Rate = classes[0]
    Rate.click()
    refetch()
  }

  const handleRemoveCountry = async () => {
    try {
      await deleteCountry(modalData)
    } catch (error) {
      throw new Error(error)
    }
    refetch()
    setOpen(false)
  }

  const handleDeleteClick = (data) => {
    setOpen(true)
    setModalData(data)
  }

  const columns = [
    {
      field: 'telePhoneCode',
      headerName: 'Telephone Code',
      width: 140,
    },
    {
      field: 'code',
      headerName: 'Country Code',
      width: 120,
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Switch
          defaultChecked={params.row.status === 'Active' ? true : false}
          onChange={async () => {
            const payload = {
              code: params.row.code,
              status: !params.row.status,
            }
            try {
              await console.log(payload)
              // await updateCurrency(payload)
            } catch (error) {
              throw new Error(error)
            }
            refetch()
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <>
          {params.row.status !== 'Deleted' && (
            <Tooltip title="delete">
              <IconButton>
                <DeleteIcon
                  sx={{
                    color: defaultTheme.palette.error.main,
                  }}
                  onClick={() => {
                    handleDeleteClick(params.row)
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ]

  const paginationModel = { page: 0, pageSize: 5 }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Paper elevation={2} sx={{ padding: '20px', minHeight: '75vh' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DeleteModal
          heading={'Delete Country'}
          name={modalData?.telePhoneCode + ' ' + modalData?.country}
          handleClose={handleClose}
          handleSaveClick={handleRemoveCountry}
        />
      </Modal>
      <Box>
        <Typography variant="h6">Country Management</Typography>
      </Box>
      <Box mt={5}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={allCountries?.data || []}
          getOptionLabel={(option) =>
            option?.country + ' (' + option?.code + ')'
          }
          filterSelectedOptions
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add New Country"
              placeholder="Search a language"
            />
          )}
          renderOption={(props, option) => (
            <li {...props}>
              <img
                loading="lazy"
                width="30"
                srcSet={`https://flagcdn.com/w40/${option.code?.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.code?.toLowerCase()}.png`}
                alt={option?.country}
                style={{ border: '1px solid #67676757', marginRight: '8px' }}
              />
              ({option?.telePhoneCode}) {option?.country} ({option?.code})
            </li>
          )}
        />
      </Box>
      {selectedOptions?.length > 0 && (
        <Box mt={4} mb={2}>
          <Button variant="contained" onClick={handleApplyClicked}>
            Apply Changes
          </Button>
        </Box>
      )}
      <Divider />
      <Box mt={3} mb={5}>
        <Typography variant="body2">Selected Countries:</Typography>
        <Grid id="modal-modal-description" sx={{ mt: 2 }}>
          <Grid
            container
            spacing={1.2}
            display={'flex'}
            justifyContent={'center'}
          >
            {!isLoading ? (
              <DataGrid
                rows={selectedCountries?.data || []}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10, 15]}
                sx={{ border: 0 }}
                getRowId={(row) => row.code}
                components={{
                  LoadingOverlay: isLoading ? <CircularProgress /> : null,
                }}
                loading={isLoading}
              />
            ) : (
              <CircularProgress />
            )}
          </Grid>
          {selectedCountries?.data?.length === 0 && (
            <Typography color="grey">Please select a Country</Typography>
          )}
        </Grid>
      </Box>
    </Paper>
  )
}

export default CountryManagement
