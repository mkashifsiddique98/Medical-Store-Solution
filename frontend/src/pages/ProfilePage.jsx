//* Imported Libraries / Frameworks
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

//* Imported Components
import Message from '../components/Message.component'
import Loader from '../components/Loader.component'

//* Imported Actions
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

const ProfilePage = () => {
  //! Setting states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  // !  Dispatch
  const dispatch = useDispatch()

  // !  get the userDetails from the state
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  // !get the userLogin from the state
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // ! get the success value from the state
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  // !  get the My Order List Details from the state
  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  //
  const history = useNavigate()

  // ! checkProfileHandler
  const checkProfileHandler = () => {
    history('/completeProfile')
  }

  useEffect(() => {
    if (!userInfo) {
      history('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  // ?  submitHandler Function
  const submitHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      // ! DISPATCH UPDATE PROFILE
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2 className='special_Heading'> User Profile </h2>
        {/* Checking for message */}
        {message && <Message variant='danger'>{message}</Message>}
        {/* Checking for error */}
        {error && <Message variant='danger'>{error}</Message>}
        {/* Checking for success */}
        {success && <Message variant='success'>Profile Updated</Message>}
        {/*  Checking for Loading */}
        {loading && <Loader />}

        {/* Form */}
        <Form onSubmit={submitHandler}>
          {/* For Name Field  */}
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* For Email Field  */}
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* For Password Field  */}
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* For Confirm Password Field  */}
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confrim Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Update Button */}
          <Button type='submit' variant='primary' id='button_special'>
            Update
          </Button>
        </Form>
        {/* Check Profile  */}
        <Button
          type='button'
          variant='primary'
          id='button_special'
          onClick={checkProfileHandler}
        >
          Check & Complete Profile
        </Button>
      </Col>
      <Col md={9} className='profile_order_style'>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfilePage
