import React, { useState } from 'react'
import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Tooltip,
  Modal,
  Box,
  Button,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import SendIcon from '@mui/icons-material/Send'
import defaultTheme from '../../theme/default'
import {
  useAddKybTermsMutation,
  useGetKybTermsQuery,
  useUpdateKybTermsMutation,
} from '../../services/serviceApi'
import { DataGrid } from '@mui/x-data-grid'
import { formatDate } from '../../common/methods'
import DeleteIcon from '@mui/icons-material/Delete'

const CompanyTypes = () => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState()

  const [addCompanyType] = useAddKybTermsMutation()
  const [updateCompany] = useUpdateKybTermsMutation()
  const {
    data: getKybTerms,
    isLoading,
    refetch,
  } = useGetKybTermsQuery({
    kybTermsType: 'company',
  })

  const paginationModel = { page: 0, pageSize: 10 }

  const handleSendClick = async () => {
    const payload = {
      companyType: value,
      kybTermsType: 'company',
    }
    try {
      await addCompanyType(payload)
    } catch (error) {
      throw new Error(error)
    }
    setValue('')
    refetch()
  }

  const handleDeleteClick = (data) => {
    setOpen(true)
    setModalData(data)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSaveClick = async () => {
    try {
      const payload = {
        action: 'delete',
        id: modalData?._id,
      }
      await updateCompany(payload)
    } catch (error) {
      throw new Error(error)
    }
    refetch()
    handleClose()
  }

  const columns = [
    {
      field: 'companyType',
      headerName: 'Company Type',
      width: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Typography
          mt={2}
          color={
            params.row.status === 'Active'
              ? defaultTheme.palette.success.main
              : params?.row?.status === 'Deleted'
                ? defaultTheme.palette.error.main
                : defaultTheme.palette.secondary.main
          }
        >
          {params.row.status}
        </Typography>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      renderCell: (params) => formatDate(params.row.createdAt),
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

  return (
    <Paper elevation={2} sx={{ padding: '20px', minHeight: '75vh' }}>
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
            height: 210,
            bgcolor: 'background.paper',
            border: `3px solid ${defaultTheme.palette.secondary.main}`,
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
            overflow: 'auto',
          }}
        >
          <Typography variant="h6">Delete Company Type</Typography>
          <Typography variant="subtitle1" mt={2}>
            Are you sure you want to delete {modalData?.companyType}?
          </Typography>
          <Grid
            container
            mt={3}
            display={'flex'}
            justifyContent={'space-between'}
          >
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
      </Modal>
      <Typography variant="body">Company Type</Typography>
      <Grid mt={3}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Add New Company Type"
          variant="outlined"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SendIcon
                    onClick={() => {
                      handleSendClick()
                    }}
                    sx={{
                      cursor: 'pointer',
                      color: defaultTheme.palette.primary.main,
                    }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>
      <Typography variant="body2" mt={4}>
        Added Company Types:
      </Typography>
      <DataGrid
        rows={getKybTerms?.data || []}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15, 20]}
        sx={{ border: 0 }}
        getRowId={(row) => row._id}
        components={{
          LoadingOverlay: isLoading ? <CircularProgress /> : null,
        }}
        loading={isLoading}
      />
    </Paper>
  )
}

export default CompanyTypes
