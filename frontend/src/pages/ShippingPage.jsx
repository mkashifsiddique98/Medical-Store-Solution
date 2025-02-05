//* Imported Libraries / Frameworks
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

//* Imported Components
import FormContainer from '../components/FormContainer.component'
import CheckoutSteps from '../components/CheckoutSteps.component'

//* Imported Actions
import { saveShippingAddress } from '../actions/cartActions'

const ShippingPage = () => {
  //! select cart part of the state, because we want shipping address
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  //! Setting states
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  // ! Dispatch, (because we need to have a same shippingAddress)
  const dispatch = useDispatch()

  const history = useNavigate()
  // !  submitHandler
  const submitHandler = e => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        {/* For Address Field  */}
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address}
            required
            onChange={e => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* For City Field  */}
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter City'
            value={city}
            required
            onChange={e => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* For Postal Code Field  */}
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Postal Code'
            value={postalCode}
            required
            onChange={e => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {/* For Country Field  */}
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            required
            onChange={e => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* for Button */}
        <Button type='submit' variant='primary' id='button_special'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingPage
