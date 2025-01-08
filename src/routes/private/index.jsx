import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Private = ({ children }) => {
  const token = sessionStorage.getItem('token')
  const loginToken = useSelector((state) => state.login.token)

  const redirectToLogin = () => {
    return <Navigate to="/" />
  }

  if (!loginToken && !token) {
    return redirectToLogin()
  }

  return children
}

Private.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Private
