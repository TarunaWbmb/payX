import React, { useState, useEffect } from 'react'
import {
  Paper,
  Box,
  Typography,
  CircularProgress,
  Divider,
  Autocomplete,
  Button,
  TextField,
  Switch,
  Tooltip,
  IconButton,
  Modal,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  useGetSelectedLangQuery,
  useUpdateLanguageMutation,
  useGetAllLangQuery,
  useAddLanguageMutation,
} from '../../services/serviceApi'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import defaultTheme from '../../theme/default'
import DeleteModal from '../../common/delete-modal'

const LanguageManagement = () => {
  const [selectedOptions, setSelectedOptions] = useState()
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState()

  const {
    data: selectedLanguages,
    refetch,
    isLoading,
  } = useGetSelectedLangQuery({})
  const [updateLanguage] = useUpdateLanguageMutation()
  const { data: allLanguages } = useGetAllLangQuery()
  const [addLanguage] = useAddLanguageMutation()

  const paginationModel = { page: 0, pageSize: 5 }

  const handleRemoveLanguage = async () => {
    try {
      const payload = { ...modalData, status: 'Deleted' }
      await updateLanguage(payload)
    } catch (error) {
      throw new Error(error)
    }
    refetch()
    handleClose()
  }

  const handleChange = (event, newValue) => {
    setSelectedOptions(newValue)
  }

  const handleApplyClicked = async () => {
    const payload = {
      languages: selectedOptions || [],
    }

    try {
      await addLanguage(payload)
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

  useEffect(() => {
    if (!selectedLanguages) refetch()
  }, [selectedLanguages])

  const handleDeleteClick = (data) => {
    setOpen(true)
    setModalData(data)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const columns = [
    {
      field: 'code',
      headerName: 'Language Code',
      width: 160,
    },
    {
      field: 'language',
      headerName: 'Language',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => (
        <>
          <Switch
            defaultChecked={params.row.status === 'Active' ? true : false}
            onChange={async () => {
              const payload = {
                code: params.row.code,
                language: params.row.language,
                status:
                  params?.row?.status === 'Active' ? 'Inactive' : 'Active',
              }
              try {
                await updateLanguage(payload)
              } catch (error) {
                throw new Error(error)
              }
              refetch()
            }}
          />
          <Typography
            color={
              params.row.status === 'Active'
                ? defaultTheme.palette.success.main
                : params.row.status === 'Deleted'
                  ? defaultTheme.palette.error.main
                  : defaultTheme.palette.secondary.main
            }
            display={'inline'}
          >
            {params.row.status}
          </Typography>
        </>
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
              <IconButton
                onClick={() => {
                  handleDeleteClick(params.row)
                }}
              >
                <DeleteIcon
                  sx={{
                    color: defaultTheme.palette.error.main,
                  }}
                />
              </IconButton>
            </Tooltip>
          )}
        </>
      ),
    },
  ]

  return (
    <Paper elevation={2} sx={{ padding: '20px', minHeight: '75vh' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <DeleteModal
            heading={'Delete Language'}
            name={modalData?.language}
            handleClose={handleClose}
            handleSaveClick={handleRemoveLanguage}
          />
        </>
      </Modal>
      <Box>
        <Typography variant="h6">Language Management</Typography>
      </Box>
      <Box mt={5}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={allLanguages?.data || []}
          getOptionLabel={(option) =>
            option?.language + ' ' + '(' + option?.code + ')'
          }
          filterSelectedOptions
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add New Language"
              placeholder="Search a language"
            />
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
        <Typography variant="body2">Selected Languages:</Typography>
        <Grid id="modal-modal-description" sx={{ mt: 2 }}>
          <Grid
            container
            spacing={3}
            display={'flex'}
            justifyContent={'center'}
          >
            {!isLoading ? (
              <DataGrid
                rows={selectedLanguages?.data || []}
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
          {selectedLanguages?.data?.length === 0 && (
            <Typography color="grey">Please select a language</Typography>
          )}
        </Grid>
      </Box>
    </Paper>
  )
}

export default LanguageManagement
