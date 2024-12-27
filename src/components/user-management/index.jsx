import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid2'
import { Typography, IconButton, CircularProgress } from '@mui/material'
import { useGetUsersQuery } from '../../services/serviceApi'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ViewUser from './view-user'
import defaultTheme from '../../theme/default'

const UserManagement = () => {
  const [viewUser, setViewUser] = useState(false)
  const [userData, setUserData] = useState('')

  const { data: userDetails, isLoading } = useGetUsersQuery({})

  const columns = [
    {
      field: 'uniqueName',
      headerName: 'Customer ID',
      width: 200,
      renderCell: (params) => <>{params?.row?.uniqueName || '-'}</>,
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 200,
      renderCell: (params) => (
        <>{params?.row?.firstName + ' ' + params?.row?.lastName || '-'}</>
      ),
    },
    {
      field: 'userType',
      headerName: 'User Type',
      width: 200,
      renderCell: (params) => <>{params?.row?.registerAs || '-'}</>,
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 200,
      renderCell: (params) => <>{params?.row?.country || '-'}</>,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => (
        <>
          <Typography
            color={
              params?.row?.status === 'Active'
                ? defaultTheme.palette.success.main
                : params?.row?.status === 'Deleted'
                  ? defaultTheme.palette.error.main
                  : defaultTheme.palette.warning.main
            }
            mt={2}
          >
            {params?.row?.status || '-'}
          </Typography>
        </>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              setViewUser(true)
              setUserData(params?.row)
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </>
      ),
    },
  ]

  const paginationModel = { page: 0, pageSize: 10 }

  return (
    <>
      <Grid container mb={2} mt={2}>
        <Grid>
          <Typography variant="h6">User Management</Typography>
        </Grid>
      </Grid>

      {viewUser ? (
        <ViewUser data={userData} />
      ) : (
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
              rows={userDetails?.data || []}
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
      )}
    </>
  )
}

export default UserManagement
