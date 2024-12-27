import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import {
  Typography,
  Button,
  Paper,
  CircularProgress,
  IconButton,
  Modal,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import {
  useGetEmailTemplatesQuery,
  useAddEmailTemplateMutation,
  useEditEmailTemplateMutation,
} from '../../services/serviceApi'
import defaultTheme from '../../theme/default'
import CloseIcon from '@mui/icons-material/Close'
import 'react-quill/dist/quill.snow.css'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formatString } from '../../common/methods'

const SmsTemplateManagement = () => {
  const [open, setOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [modalData, setModalData] = useState()
  const [name, setName] = useState('')

  const {
    data: getSmsTemplates,
    isLoading,
    refetch,
  } = useGetEmailTemplatesQuery({
    templateType: 'sms',
  })
  const [addEmailTemplate] = useAddEmailTemplateMutation()
  const [editEmailTemplate] = useEditEmailTemplateMutation()

  const columns = [
    {
      field: 'templateName',
      headerName: 'SMS Template Name',
      width: 300,
      renderCell: (params) => {
        return formatString(params.row.templateName)
      },
    },
    {
      field: 'subject',
      headerName: 'Subject',
      width: 300,
    },
    {
      field: 'createdAt',
      headerName: 'Created Date',
      width: 250,
      renderCell: (params) => {
        const date = params.row.createdAt.split('T')[0]
        return date
      },
    },
    {
      field: 'createdTime',
      headerName: 'Created Time',
      width: 250,
      renderCell: (params) => {
        const time = params.row.createdAt.split('T')[1].slice(0, 8)
        return time
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 300,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              handleOpen('edit')
              setModalData(params?.row)
            }}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ]

  const paginationModel = { page: 0, pageSize: 10 }

  const handleOpen = (modalType) => {
    setOpen(true)
    setModalType(modalType)
  }

  const handleClose = () => {
    setOpen(false)
    setModalData('')
    setModalType('')
    setName('')
    refetch()
  }

  const onSubmitHandler = async (data) => {
    try {
      if (modalType === 'add') {
        const payload = { ...data, templateType: 'sms' }
        await addEmailTemplate(payload)
      } else if (modalType === 'edit') {
        const payload = {
          ...data,
          action: 'edit',
          templateId: modalData?._id,
          templateType: 'sms',
        }
        await editEmailTemplate(payload)
      }
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
    handleClose()
  }

  const defaultValues = {
    subject: modalData?.subject,
  }

  const schema = yup.object().shape({
    templateName: yup.string().required('Name is required'),
    subject: yup.string().required('Subject is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: defaultValues,
  })

  const handleChange = (event) => {
    setName(event.target.value)
    setValue('templateName', event.target.value)
  }

  useEffect(() => {
    if (modalType === 'edit') {
      setName(modalData?.templateName)
      setValue('templateName', modalData?.templateName)
      setValue('subject', modalData?.subject)
      setValue('body', modalData?.body)
    } else {
      setValue('subject', '')
      setValue('body', '')
    }
  }, [modalData, modalType])

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
            width: 950,
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
                  SMS Template
                </Typography>
              </Grid>
              <Grid>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Box mt={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  SMS Template Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={name}
                  label="SMS Template Name"
                  onChange={handleChange}
                  defaultValue={modalData?.templateName}
                  disabled={modalType === 'edit'}
                >
                  <MenuItem value={'welcomeSms'}>Welcome SMS</MenuItem>
                </Select>
              </FormControl>
              <TextField
                sx={{ mt: 2 }}
                id="outlined-basic"
                label="SMS Subject"
                variant="outlined"
                fullWidth
                value={watch('subject')}
                {...register('subject')}
                error={errors?.subject}
                helperText={errors?.subject?.message}
                defaultValue={modalData?.subject}
              />
              <Grid>
                <TextField
                  sx={{ mt: 2 }}
                  id="outlined-basic"
                  label="SMS Body"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={watch('body')}
                  {...register('body')}
                  error={errors?.body}
                  helperText={errors?.body?.message}
                  defaultValue={modalData?.body}
                />
              </Grid>
            </Box>
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
          <Typography variant="h6">SMS Template Management</Typography>
        </Grid>
        <Grid>
          <Button
            onClick={() => handleOpen('add')}
            variant="outlined"
            color="secondary"
          >
            <ControlPointIcon sx={{ margin: '5px' }} /> Create SMS Template
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
            rows={getSmsTemplates?.data || []}
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
      </Grid>
    </>
  )
}

export default SmsTemplateManagement
