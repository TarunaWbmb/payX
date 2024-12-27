import {
  errorAlert,
  loadingComplete,
  loadingStarted,
  successAlert,
} from '../redux/reducers/appSlice'

export const onQueryStartedDefault = async (
  id,
  { dispatch, queryFulfilled },
) => {
  dispatch(loadingStarted())
  try {
    await queryFulfilled
    // `onSuccess` side-effect
    dispatch(loadingComplete())
  } catch (err) {
    // `onError` side-effect
    dispatch(loadingComplete())
    if (err?.error?.status === 401) {
      // if unauthorization error,logout user.
      // dispatch(signOut())
      dispatch(
        errorAlert({
          message: err?.error?.data?.message
            ? err.error.data.message
            : 'Session expired, please sign in again!',
        }),
      )
    } else {
      dispatch(
        errorAlert({
          message: err?.error?.data?.message || 'Error loading data.',
        }),
      )
    }
  }
}

export const onQueryStarted = async (id, { dispatch, queryFulfilled }) => {
  try {
    await queryFulfilled
  } catch (err) {
    if (err?.error?.status === 401) {
      // if unauthorization error,logout user.
      // dispatch(signOut())
      dispatch(
        errorAlert({
          message: err?.error?.data?.message
            ? err.error.data.message
            : 'Session expired, please sign in again!',
        }),
      )
    }
  }
}
export const onMutationStartedDefault = async (
  id,
  { dispatch, queryFulfilled },
) => {
  dispatch(loadingStarted())
  try {
    const res = await queryFulfilled
    // `onSuccess` side-effect
    dispatch(loadingComplete())
    if (res.data.message) {
      dispatch(successAlert(res.data))
    }
  } catch (err) {
    dispatch(loadingComplete())
    if (err?.error?.status === 401) {
      // if unauthorization error,logout user.
      // dispatch(signOut());
      dispatch(
        errorAlert({
          message: err?.error?.data?.message
            ? err.error.data.message
            : 'Session expired, please sign in again!',
        }),
      )
    } else {
      dispatch(
        errorAlert({
          message: err?.error?.data?.message || 'Error completing request.',
        }),
      )
    }
  }
}

export const onMutationStarted = async (id, { dispatch, queryFulfilled }) => {
  try {
    await queryFulfilled
  } catch (err) {
    if (err?.error?.status === 401) {
      // if unauthorization error,logout user.
      // dispatch(signOut());
      dispatch(
        errorAlert({
          message: err?.error?.data?.message
            ? err.error.data.message
            : 'Session expired, please sign in again!',
        }),
      )
    }
  }
}
