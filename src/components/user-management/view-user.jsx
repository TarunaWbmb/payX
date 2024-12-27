import { Box, IconButton, Typography, Tabs, Tab, Paper } from '@mui/material'
import React from 'react'
import Grid from '@mui/material/Grid2'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import defaultTheme from '../../theme/default'
import PropTypes from 'prop-types'
import AdjustIcon from '@mui/icons-material/Adjust'
import TransferLimits from './transfer-limits'

const GridItem = ({ label, value }) => {
  return (
    <Grid container mt={2} display={'flex'} spacing={1}>
      <Grid>
        <Typography color="textSecondary">{label}:</Typography>
      </Grid>
      <Grid>
        <Typography color="textSecondary" fontWeight={600}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const ViewUser = ({ data }) => {
  const [value, setValue] = React.useState('basicInfo')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Grid
        container
        sx={{
          display: 'flex',
        }}
      >
        <Grid
          onClick={() => {
            window.location.reload()
          }}
          sx={{ cursor: 'pointer' }}
        >
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid
          mt={1}
          onClick={() => {
            window.location.reload()
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography
            fontSize={'14px'}
            fontWeight={600}
            textTransform={'uppercase'}
            color={defaultTheme.palette.secondary.dark}
          >
            Back
          </Typography>
        </Grid>
      </Grid>
      <Box>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab value="basicInfo" label="Basic Info" />
          {data?.userType === 'Business' && (
            <Tab value="companyInfo" label="Company Info" />
          )}
          <Tab value="beneficiaryInfo" label="Beneficiary Info" />
          <Tab value="kycDocs" label="KYC Docs" />
          <Tab value="transferLimits" label="Transfer Limits" />
        </Tabs>
      </Box>

      <Box paddingLeft={3} paddingRight={3} maxWidth={'97%'}>
        <Grid container display={'flex'} justifyContent={'space-between'}>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography color={defaultTheme.palette.secondary.dark}>
              Customer ID:
            </Typography>
            <Typography
              ml={1}
              fontSize={'16px'}
              color={defaultTheme.palette.secondary.dark}
              fontWeight={600}
            >
              {data?.uniqueName || ''}
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography color={defaultTheme.palette.secondary.dark}>
              User Type:
            </Typography>
            <Typography
              ml={1}
              fontSize={'16px'}
              color={defaultTheme.palette.secondary.dark}
              fontWeight={600}
            >
              {data?.registerAs || ''}
            </Typography>
          </Grid>
        </Grid>
        <TabPanel value={value} index="basicInfo">
          <Paper
            elevation={2}
            sx={{ minHeight: '50vh', width: '75vw', padding: '30px' }}
          >
            <Grid
              container
              display={'flex'}
              mt={3}
              justifyContent={'space-between'}
            >
              <Grid>
                <Grid container spacing={2}>
                  <Grid>
                    <img
                      width={50}
                      height={50}
                      style={{
                        boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.2)',
                      }}
                      // href={data?.profilePic}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9WuG9WOoa3eJ5cyDljhCvQzkybI_Rm82UUQ&s"
                    />
                  </Grid>
                  <Grid>
                    <Typography color={defaultTheme.palette.secondary.dark}>
                      Name:
                    </Typography>
                    <Typography
                      fontWeight={600}
                      color={defaultTheme.palette.secondary.dark}
                    >
                      {data?.firstName} {data?.lastName}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Grid container>
                  <Grid>
                    <Typography color={defaultTheme.palette.secondary.dark}>
                      Status:
                    </Typography>
                    <Typography
                      ml={-2}
                      fontWeight={600}
                      sx={{
                        color:
                          data?.status === 'Active'
                            ? defaultTheme.palette.success.main
                            : defaultTheme.palette.secondary.dark,
                      }}
                    >
                      <IconButton
                        sx={{
                          color:
                            data?.status === 'Active'
                              ? defaultTheme.palette.success.main
                              : defaultTheme.palette.secondary.dark,
                        }}
                      >
                        <AdjustIcon />
                      </IconButton>
                      {data?.status}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid size={6}>
                <GridItem label="First Name" value={data?.firstName} />
                <GridItem label="Last Name" value={data?.lastName} />
                <GridItem label="Customer ID" value={data?.uniqueName} />
                <GridItem label="Date of Birth" value={data?.dob} />
                <GridItem label="Phone Number" value={data?.phoneNo} />
                <GridItem label="Registered As" value={data?.registerAs} />
              </Grid>
              <Grid size={6}>
                <GridItem label="Email" value={data?.email} />
                <GridItem label="State" value={data?.state} />
                <GridItem label="Country" value={data?.country} />
                <GridItem label="Address" value={data?.address} />
                <GridItem label="Pin Code" value={data?.pincode} />
                <GridItem label="Language" value={data?.language} />
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
        <TabPanel value={value} index="companyInfo">
          <Paper
            elevation={2}
            sx={{ minHeight: '50vh', width: '75vw', padding: '30px' }}
          >
            <Grid container>
              <Grid size={6}>
                <GridItem
                  label="Business Description"
                  value={data?.businessDescription}
                />
                <GridItem label="Business Size" value={data?.businessSize} />
                <GridItem
                  label="Business Tax No."
                  value={data?.businessTaxNo}
                />
                <GridItem label="Category" value={data?.category} />
                <GridItem label="Company Type" value={data?.companyType} />
              </Grid>
              <Grid size={6}>
                <GridItem
                  label="Registered Business Name"
                  value={data?.registeredBusinessName}
                />
                <GridItem label="SSN or ITIN" value={data?.ssnOrItin} />
                <GridItem label="Tin Number" value={data?.tinNumber} />
                <GridItem label="Purpose of PayX" value={data?.purposeOfPayX} />
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
        <TabPanel value={value} index="transferLimits">
          <TransferLimits />
        </TabPanel>
      </Box>
    </>
  )
}

export default ViewUser

ViewUser.propTypes = {
  data: PropTypes.object,
}

GridItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}
