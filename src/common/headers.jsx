export const getToken = (headers) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    headers.set('token', token)
  }
  return headers
}
