//* Imported Libraries
import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//* Imported Components
import FormContainer from '../components/FormContainer.component'
import CheckoutSteps from '../components/CheckoutSteps.component'

//* Imported Actions
import { savePaymentMethod } from '../actions/cartActions'

const PaymentMethodPage = () => {
  //! select cart part of the state, (because we want shipping address)
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  // !  Checking shippingAddress, to redirect if there is no shipping address
  const history = useNavigate()

  if (!shippingAddress) {
    history('/shipping')
  }

  //! Setting states
  const [paymentMethod, setPaymentMethod] = useState('COD')

  // ! Dispatch, (because we need to have a same shippingAddress)
  const dispatch = useDispatch()

  // !  submitHandler
  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        {/* For Payment Method (Select Method) */}
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Cash on Delivery'
              id='COD'
              name='paymentMethod'
              value='COD'
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
            {/* <Form.Check
              type='radio'
              label='EasyPaisa or JazzCash'
              id='EP_JC'
              name='paymentMethod'
              value='EP_JC'
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
        </Form.Group>
        {/* for Button */}
        <Button type='submit' variant='primary' id='button_special'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentMethodPage
