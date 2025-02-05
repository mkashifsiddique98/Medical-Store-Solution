//* Imported Libraries
import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      {/* Step-1 */}
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
              Sign In
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      {/* Step-2 */}
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
              Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      {/* Step-3 */}
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
              Payment
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      {/* Step-4 */}
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
              Place Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
