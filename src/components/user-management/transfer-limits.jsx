import React, { useState, useEffect } from 'react'
import {
  Paper,
  Typography,
  TextField,
  Button,
  Slider,
  CircularProgress,
  InputAdornment,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import defaultTheme from '../../theme/default'
import {
  useGetAddedCurrenciesQuery,
  useGetTransferLimitsQuery,
  useEditTransferLimitMutation,
} from '../../services/serviceApi'
import PropTypes from 'prop-types'
import SearchIcon from '@mui/icons-material/Search'

const TransferLimits = ({ data }) => {
  const [value, setValue] = useState({})
  const [buttonShow, setButtonsShow] = useState({})
  const [searchText, setSearchText] = useState('')

  const handleChange = (item, timeFrame, newValue) => {
    setValue((prevState) => ({
      ...prevState,
      [item.currency]: {
        ...prevState[item.currency],
        [timeFrame]: newValue,
      },
    }))
    setButtonsShow((prevChanged) => ({
      ...prevChanged,
      [item.currency]: true,
    }))
  }
  const { data: addedCurrenciesList } = useGetAddedCurrenciesQuery({})
  const {
    data: getTransferLimits,
    isLoading,
    refetch,
  } = useGetTransferLimitsQuery({
    userId: data?._id,
    currency: searchText,
  })
  const [editTransferLimit] = useEditTransferLimitMutation({})

  const handleSaveClick = async (item) => {
    const payload = {
      userId: data?._id,
      currency: item?.currency,
      weeklyLimit: value[item?.currency]?.weekly,
      monthlyLimit: value[item?.currency]?.monthly,
      annuallyLimit: value[item?.currency]?.yearly,
    }
    try {
      await editTransferLimit(payload)
    } catch (error) {
      throw new Error(error)
    }
    refetch()
  }

  const setInitialValues = () => {
    const initialValues = {}
    getTransferLimits?.data?.forEach((dataItem) => {
      initialValues[dataItem.currency] = {
        weekly: dataItem.weeklyLimit || 0,
        monthly: dataItem.monthlyLimit || 0,
        yearly: dataItem.annuallyLimit || 0,
      }
    })
    setValue(initialValues)
  }

  useEffect(() => {
    setInitialValues()
  }, [getTransferLimits])

  return (
    <Paper
      elevation={2}
      sx={{ minHeight: '50vh', width: '75vw', padding: '30px' }}
    >
      <Grid container display={'flex'} mb={2} justifyContent={'space-between'}>
        <Grid>
          <Typography
            fontWeight={600}
            fontSize={'18px'}
            color={defaultTheme.palette.secondary.dark}
          >
            Transfer Limits
          </Typography>
        </Grid>
        <Grid>
          <TextField
            id="outlined-basic"
            label="Search Currency"
            variant="outlined"
            onChange={(e) => setSearchText(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
      </Grid>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={5}>
          {addedCurrenciesList?.data?.map((item) => (
            <>
              <Grid size={6} key={item?.currency}>
                <Grid>
                  <Typography variant="h6">{item?.currency}</Typography>
                </Grid>
                <Grid container spacing={6} mt={2}>
                  <Grid size={5}>
                    <Slider
                      aria-label="Volume"
                      value={value[item.currency]?.weekly || 0}
                      onChange={(event, newValue) =>
                        handleChange(item, 'weekly', newValue)
                      }
                    />
                  </Grid>
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      value={value[item.currency]?.weekly || 0}
                      id="outlined-basic"
                      label="Weekly Transfer Limit"
                      variant="outlined"
                      type="number"
                      onChange={(e) =>
                        handleChange(
                          item,
                          'weekly',
                          parseInt(e.target.value, 10),
                        )
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={6} mt={1.5}>
                  <Grid size={5}>
                    <Slider
                      aria-label="Volume"
                      value={value[item.currency]?.monthly || 0}
                      onChange={(event, newValue) =>
                        handleChange(item, 'monthly', newValue)
                      }
                    />
                  </Grid>
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      value={value[item.currency]?.monthly || 0}
                      id="outlined-basic"
                      label="Monthly Transfer Limit"
                      variant="outlined"
                      type="number"
                      onChange={(e) =>
                        handleChange(
                          item,
                          'monthly',
                          parseInt(e.target.value, 10),
                        )
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={6} mt={1.5}>
                  <Grid size={5}>
                    <Slider
                      aria-label="Volume"
                      value={value[item.currency]?.yearly || 0}
                      onChange={(event, newValue) =>
                        handleChange(item, 'yearly', newValue)
                      }
                    />
                  </Grid>
                  <Grid size={5}>
                    <TextField
                      value={value[item.currency]?.yearly || 0}
                      fullWidth
                      id="outlined-basic"
                      label="Yearly Transfer Limit"
                      variant="outlined"
                      type="number"
                      onChange={(e) =>
                        handleChange(
                          item,
                          'yearly',
                          parseInt(e.target.value, 10),
                        )
                      }
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  width={'80%'}
                  mt={2}
                  display={'flex'}
                  justifyContent={'space-between'}
                >
                  {buttonShow[item.currency] && (
                    <>
                      <Grid>
                        <Button onClick={() => setInitialValues()}>
                          Reset
                        </Button>
                      </Grid>
                      <Grid>
                        <Button
                          onClick={() => {
                            handleSaveClick(item)
                          }}
                        >
                          Save
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
              {/* <Grid container spacing={3} mt={3} key={item?.currency}>
            <Grid size={0.7}>{item?.currency}</Grid>

            <Grid container>
              <Grid size={4}>
                <Slider
                  sx={{ width: 100 }}
                  aria-label="Volume"
                  value={value}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={8}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Weekly Transfer Limit"
                  variant="outlined"
                  type="number"
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid size={4}>
                <Slider
                  sx={{ width: 100 }}
                  aria-label="Volume"
                  value={value}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={8}>
                <TextField
                  id="outlined-basic"
                  label="Monthly Transfer Limit"
                  variant="outlined"
                  type="number"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid size={4}>
                <Slider
                  sx={{ width: 100 }}
                  aria-label="Volume"
                  value={value}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={8}>
                <TextField
                  id="outlined-basic"
                  label="Annually Transfer Limit"
                  variant="outlined"
                  type="number"
                />
              </Grid>
            </Grid>
            <Grid size={0.3}>
              <Button variant="outlined">Save</Button>
            </Grid>
          </Grid> */}
            </>
          ))}
        </Grid>
      )}
    </Paper>
  )
}

export default TransferLimits

TransferLimits.propTypes = {
  data: PropTypes.object,
}
