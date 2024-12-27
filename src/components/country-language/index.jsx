import React from 'react'
import Grid from '@mui/material/Grid2'
import LanguageManagement from './language-management'
import CountryManagement from './country-management'

const CountryLanguage = () => {
  return (
    <>
      <Grid container spacing={6} mt={3}>
        <Grid size={6}>
          <CountryManagement />
        </Grid>
        <Grid size={6}>
          <LanguageManagement />
        </Grid>
      </Grid>
    </>
  )
}

export default CountryLanguage
