import React from 'react'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import CompanyTypes from './company-types'
import BusinessCategory from './business-category'

const KYBTerms = () => {
  return (
    <>
      <Box>
        <Typography variant="h6">KYB Terms</Typography>
      </Box>
      <Grid container mt={3} spacing={5}>
        <Grid size={6}>
          <CompanyTypes />
        </Grid>
        <Grid size={6}>
          <BusinessCategory />
        </Grid>
      </Grid>
    </>
  )
}

export default KYBTerms
