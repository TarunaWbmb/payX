import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2'
import { Typography, Paper, Button, CircularProgress } from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {
  useEditTermsMutation,
  useGetTermsQuery,
} from '../../services/serviceApi'

const TermsAndConditions = () => {
  const [quillValue, setQuillValue] = useState('')

  const [editTerms] = useEditTermsMutation()
  const { data, isLoading } = useGetTermsQuery({})

  useEffect(() => {
    if (data?.data?.content) {
      setQuillValue(data?.data?.content)
    }
  }, [data])

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

  const handleSaveClicked = async () => {
    try {
      const payload = {
        content: quillValue,
      }
      await editTerms(payload)
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleResetClicked = () => {
    window.location.reload()
  }

  return (
    <>
      <Grid container mb={2} mt={2}>
        <Grid>
          <Typography variant="h6">Terms and Conditions Management</Typography>
        </Grid>
      </Grid>
      <Paper
        elevation={2}
        sx={{
          padding: '20px',
          minHeight: '75vh',
          overflow: 'auto',
          '& .ql-editor': {
            height: '55vh !important',
          },
        }}
      >
        {isLoading ? (
          <Grid display={'flex'} justifyContent={'center'}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <ReactQuill
              theme="snow"
              value={quillValue}
              modules={{ toolbar: toolbarOptions }}
              onChange={setQuillValue}
              placeholder="Enter here..."
            />
            <Grid
              container
              display={'flex'}
              mt={4}
              justifyContent={'space-between'}
            >
              <Grid>
                <Button variant="outlined" onClick={handleResetClicked}>
                  Reset
                </Button>
              </Grid>
              <Grid>
                <Button variant="contained" onClick={handleSaveClicked}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </>
  )
}

export default TermsAndConditions
