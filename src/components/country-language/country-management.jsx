import React, { useState } from 'react'
import {
  Paper,
  Typography,
  Box,
  Divider,
  Autocomplete,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material'
import defaultTheme from '../../theme/default'
import Grid from '@mui/material/Grid2'
import {
  useGetAllCountriesQuery,
  useAddCountryMutation,
  useGetSelectedCountriesQuery,
  useDeleteCountryMutation,
} from '../../services/serviceApi'
import CancelIcon from '@mui/icons-material/Cancel'

const CountryManagement = () => {
  const [selectedOptions, setSelectedOptions] = useState()

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

  const handleRemoveCountry = async (item) => {
    try {
      await deleteCountry(item)
    } catch (error) {
      throw new Error(error)
    }
    refetch()
  }

  return (
    <Paper elevation={2} sx={{ padding: '20px', minHeight: '75vh' }}>
      <Box>
        <Typography variant="h6">Country Management</Typography>
      </Box>
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
              selectedCountries?.data?.map((item) => (
                <Grid
                  size={3.5}
                  padding={1}
                  key={item?.code}
                  borderRadius={1}
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
                    ({item?.telePhoneCode}) {item?.country} ({item?.code})
                  </Typography>
                  <Typography>
                    <IconButton
                      style={{
                        margin: '0px',
                        padding: '0px',
                      }}
                      onClick={() => handleRemoveCountry(item)}
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
          {selectedCountries?.data?.length === 0 && (
            <Typography color="grey">Please select a Country</Typography>
          )}
        </Grid>
      </Box>
      <Divider />
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
        <Box mt={4}>
          <Button variant="contained" onClick={handleApplyClicked}>
            Apply Changes
          </Button>
        </Box>
      )}
    </Paper>
  )
}

export default CountryManagement
