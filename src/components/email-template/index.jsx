import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import {
  Typography,
  Paper,
  Modal,
  Box,
  Button,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import defaultTheme from '../../theme/default'
import CloseIcon from '@mui/icons-material/Close'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useAddEmailTemplateMutation,
  useGetEmailTemplatesQuery,
  useEditEmailTemplateMutation,
} from '../../services/serviceApi'
import EditIcon from '@mui/icons-material/Edit'
import { formatString } from '../../common/methods'

const EmailTemplateManagement = () => {
  const [open, setOpen] = useState(false)
  const [modalData, setModalData] = useState()
  const [modalType, setModalType] = useState('')
  const [name, setName] = useState('')
  const [quillValue, setQuillValue] = useState('')

  const [addEmailTemplate] = useAddEmailTemplateMutation()
  const [editEmailTemplate] = useEditEmailTemplateMutation()
  const {
    data: getEmailTemplates,
    isLoading,
    refetch,
  } = useGetEmailTemplatesQuery({
    templateType: 'email',
  })

  useEffect(() => {
    if (modalType === 'edit') {
      setQuillValue(modalData.body)
      setName(modalData?.templateName)
      setValue('templateName', modalData?.templateName)
      setValue('subject', modalData?.subject)
    } else {
      setQuillValue('')
      setValue('subject', '')
    }
  }, [modalData, modalType])

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

  const columns = [
    {
      field: 'templateName',
      headerName: 'Email Template Name',
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

  const handleChange = (event) => {
    setName(event.target.value)
    setValue('templateName', event.target.value)
  }

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ['link', 'image', 'video'],
    ['clean'],
  ]

  const onSubmitHandler = async (data) => {
    try {
      if (modalType === 'add') {
        const payload = { ...data, body: quillValue, templateType: 'email' }
        await addEmailTemplate(payload)
      } else if (modalType === 'edit') {
        const payload = {
          ...data,
          body: quillValue,
          action: 'edit',
          templateId: modalData?._id,
          templateType: 'email',
        }
        await editEmailTemplate(payload)
      }
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
                  E-Mail Template
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
                  E-Mail Template Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={name}
                  label="E-Mail Template Name"
                  onChange={handleChange}
                  defaultValue={modalData?.templateName}
                  disabled={modalType === 'edit'}
                >
                  <MenuItem value={'welcomeEmail'}>Welcome Email</MenuItem>
                  <MenuItem value={'kycRejection'}>KYC Rejection</MenuItem>
                  <MenuItem value={'kycApproved'}>KYC Approved</MenuItem>
                </Select>
              </FormControl>
              <TextField
                sx={{ mt: 2 }}
                id="outlined-basic"
                label="E-Mail Subject"
                variant="outlined"
                fullWidth
                value={watch('subject')}
                {...register('subject')}
                error={errors?.subject}
                helperText={errors?.subject?.message}
                defaultValue={modalData?.subject}
              />

              <Typography
                color={defaultTheme.palette.secondary.dark}
                fontWeight={400}
                fontSize={'14px'}
                mt={3}
              >
                Email Template Body:
              </Typography>
              <Grid
                mt={1}
                sx={{
                  '& .ql-editor': {
                    minHeight: '130px !important',
                  },
                }}
              >
                <ReactQuill
                  theme="snow"
                  value={quillValue}
                  modules={{ toolbar: toolbarOptions }}
                  onChange={setQuillValue}
                  placeholder="Enter your e-mail body here..."
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
          <Typography variant="h6">Email Template Management</Typography>
        </Grid>
        <Grid>
          <Button
            onClick={() => handleOpen('add')}
            variant="outlined"
            color="secondary"
          >
            <ControlPointIcon sx={{ margin: '5px' }} /> Create Email Template
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
            rows={getEmailTemplates?.data || []}
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

export default EmailTemplateManagement
