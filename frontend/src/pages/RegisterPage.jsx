//* Imported Libraries
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

//* Imported Components
import Message from '../components/Message.component'
import Loader from '../components/Loader.component'
import FormContainer from '../components/FormContainer.component'

//* Imported Actions
import { register } from '../actions/userActions'

const RegisterPage = () => {
  //! Setting states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  // !  Dispatch
  const dispatch = useDispatch()

  //! get the userInfo from the state
  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

  // ?  Defining Redirect
  const { searchParams } = useLocation()
  const redirect = searchParams ? searchParams.split('=')[1] : '/'

  const history = useNavigate()

  useEffect(() => {
    if (userInfo) {
      history(redirect)
    }
  }, [history, userInfo, redirect])

  // ! submitHandler Function
  const submitHandler = e => {
    e.preventDefault()
    //* Checking/confirming the passwords
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      // DISPATCH REGISTER
      dispatch(register(name, email, password))
    }
  }

  return (
    <div className='center_div'>
      <div className='register_style'>
        <FormContainer>
          <h1 className='special_Heading' style={{ color: 'white' }}>
            Sign Up
          </h1>
          {/* Checking for message */}
          {message && <Message variant='danger'>{message}</Message>}
          {/* Checking for error */}
          {error && <Message variant='danger'>{error}</Message>}
          {/*  Checking for Loading */}
          {loading && <Loader />}

          {/* Form */}
          <Form onSubmit={submitHandler}>
            {/* For Name Field  */}
            <Form.Group controlId='name'>
              <Form.Label style={{ color: 'white' }}>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* For Email Field  */}
            <Form.Group controlId='email'>
              <Form.Label style={{ color: 'white' }}>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* For Password Field  */}
            <Form.Group controlId='password'>
              <Form.Label style={{ color: 'white' }}>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* For Confirm Password Field  */}
            <Form.Group controlId='confirmPassword'>
              <Form.Label style={{ color: 'white' }}>
                Confrim Password
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* Submit Button */}
            <Button type='submit' variant='primary' id='button_special'>
              Register
            </Button>
          </Form>

          {/* Link for Register Page */}
          <Row className='py-3'>
            <Col style={{ color: 'white' }}>
              Have an Account?
              <Link
                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                style={{ color: 'white' }}
              >
                <span style={{ marginLeft: '4px' }}>Login</span>
              </Link>
            </Col>
          </Row>
        </FormContainer>
      </div>
    </div>
  )
}

export default RegisterPage
