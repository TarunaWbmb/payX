import React from 'react'
import { Paper, Typography, TextField, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import defaultTheme from '../../theme/default'

const TransferLimits = () => {
  return (
    <Paper
      elevation={2}
      sx={{ minHeight: '50vh', width: '75vw', padding: '30px' }}
    >
      <Grid container display={'flex'} justifyContent={'space-between'}>
        <Typography
          fontWeight={600}
          fontSize={'18px'}
          color={defaultTheme.palette.secondary.dark}
        >
          Transfer Limits
        </Typography>
      </Grid>
      <Grid container spacing={5} mt={4}>
        <Grid size={4}>
          <Typography
            fontWeight={600}
            color={defaultTheme.palette.secondary.dark}
            display={'flex'}
            justifyContent={'center'}
            mb={3}
          >
            Weekly
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Weekly Transfer Limit"
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid size={4}>
          <Typography
            fontWeight={600}
            color={defaultTheme.palette.secondary.dark}
            display={'flex'}
            justifyContent={'center'}
            mb={3}
          >
            Monthly
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Monthly Transfer Limit"
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid size={4}>
          <Typography
            fontWeight={600}
            color={defaultTheme.palette.secondary.dark}
            display={'flex'}
            justifyContent={'center'}
            mb={3}
          >
            Annually
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Annual Transfer Limit"
            variant="outlined"
            type="number"
          />
        </Grid>
      </Grid>
      <Grid container mt={5} display={'flex'} justifyContent={'space-between'}>
        <Grid>
          <Button variant="outlined">Cancel</Button>
        </Grid>
        <Grid>
          <Button variant="contained">Save</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TransferLimits
