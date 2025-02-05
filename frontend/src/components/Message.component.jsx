//* Imported Libraries or Frameworks
import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ children }) => {
  return <Alert>{children}</Alert>
}

// Message.defaultProps = {
//   variant: 'info',
// }

export default Message
