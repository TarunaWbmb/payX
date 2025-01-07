import React, { useState } from 'react'
import {
  Paper,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
  IconButton,
  Modal,
  Tooltip,
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
import DeleteModal from '../../common/delete-modal'

const BusinessCategory = () => {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState()

  const [addBusinessCategory] = useAddKybTermsMutation()
  const [updateCompany] = useUpdateKybTermsMutation()
  const {
    data: getKybTerms,
    isLoading,
    refetch,
  } = useGetKybTermsQuery({
    kybTermsType: 'business',
  })

  const handleSendClick = async () => {
    const payload = {
      businessCategory: value,
      kybTermsType: 'business',
    }
    try {
      await addBusinessCategory(payload)
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

  const columns = [
    {
      field: 'businessCategory',
      headerName: 'Business Category',
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

  const paginationModel = { page: 0, pageSize: 10 }

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

  return (
    <Paper elevation={2} sx={{ padding: '20px', minHeight: '75vh' }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DeleteModal
          heading={'Delete Business Category'}
          name={modalData?.businessCategory}
          handleClose={handleClose}
          handleSaveClick={handleSaveClick}
        />
      </Modal>
      <Typography variant="body">Business Category</Typography>
      <Grid mt={3}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Add New Business Category"
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
      <Typography variant="body2" mt={4} mb={1}>
        Added Business Categories:-
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

export default BusinessCategory
