import React, { useState, useEffect } from 'react'
import {
  Paper,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Divider,
  Autocomplete,
  Button,
  TextField,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import defaultTheme from '../../theme/default'
import {
  useGetSelectedLangQuery,
  useDeleteLanguageMutation,
  useGetAllLangQuery,
  useAddLanguageMutation,
} from '../../services/serviceApi'
import CancelIcon from '@mui/icons-material/Cancel'

const LanguageManagement = () => {
  const [selectedOptions, setSelectedOptions] = useState()

  const {
    data: selectedLanguages,
    refetch,
    isLoading,
  } = useGetSelectedLangQuery({})
  const [deleteLanguage] = useDeleteLanguageMutation()
  const { data: allLanguages } = useGetAllLangQuery()
  const [addLanguage] = useAddLanguageMutation()

  const handleRemoveLanguage = async (item) => {
    try {
      await deleteLanguage(item)
    } catch (error) {
      throw new Error(error)
    }
    refetch()
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

  return (
    <Paper elevation={2} sx={{ padding: '20px', minHeight: '75vh' }}>
      <Box>
        <Typography variant="h6">Language Management</Typography>
      </Box>
      <Box mt={3} mb={5}>
        <Typography
          color={defaultTheme.palette.secondary.dark}
          fontWeight={600}
        >
          Selected Languages:
        </Typography>
        <Grid id="modal-modal-description" sx={{ mt: 2 }}>
          <Grid
            container
            spacing={3}
            display={'flex'}
            justifyContent={'center'}
          >
            {!isLoading ? (
              selectedLanguages?.data?.map((item) => (
                <Grid
                  size={3}
                  padding={1}
                  borderRadius={1}
                  key={item?.code}
                  sx={{
                    backgroundColor: defaultTheme.palette.primary.light,
                  }}
                  display={'flex'}
                  justifyContent={'space-between'}
                >
                  <Typography
                    display={'flex'}
                    justifyContent={'center'}
                    fontWeight={600}
                    color={defaultTheme.palette.secondary.dark}
                  >
                    {item?.language} ({item?.code})
                  </Typography>
                  <Typography>
                    <IconButton
                      style={{
                        margin: '0px',
                        padding: '0px',
                      }}
                      onClick={() => handleRemoveLanguage(item)}
                    >
                      <CancelIcon
                        style={{
                          fontSize: '17px',
                        }}
                      />
                    </IconButton>
                  </Typography>
                </Grid>
              ))
            ) : (
              <CircularProgress />
            )}
          </Grid>
          {selectedLanguages?.data?.length === 0 && (
            <Typography color="grey">Please select a language</Typography>
          )}
        </Grid>
      </Box>
      <Divider />
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
        <Box mt={4}>
          <Button variant="contained" onClick={handleApplyClicked}>
            Apply Changes
          </Button>
        </Box>
      )}
    </Paper>
  )
}

export default LanguageManagement
