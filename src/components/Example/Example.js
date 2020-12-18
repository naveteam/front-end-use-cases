import React from 'react'
import { oneOfType, string, number, node } from 'prop-types'

const Example = ({ children }) => <p>{children}</p>

Example.defaultProps = {
  children: 'Default children string'
}

Example.propTypes = {
  children: oneOfType([string, number, node]).isRequired
}

export default Example
