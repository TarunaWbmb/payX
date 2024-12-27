import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

const Public = ({ children }) => {
  const token = sessionStorage.getItem('token')

  if (token) {
    return <Navigate to="/dashboard" />
  }

  return children
}

Public.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Public
