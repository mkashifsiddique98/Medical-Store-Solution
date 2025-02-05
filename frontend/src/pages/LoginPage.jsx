//*  Imported Libraries
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

//*  Imported Components
import Message from '../components/Message.component'
import Loader from '../components/Loader.component'
import FormContainer from '../components/FormContainer.component'

//* Imported Actions
import { login } from '../actions/userActions'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //?   Dispatch
  const dispatch = useDispatch()

  //? get the userLogin from the state
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  // ?  Defining Redirect
  const searchParams = useLocation()
  const redirect =
    searchParams.pathname === '/login' && searchParams.search === ''
      ? '/'
      : searchParams.search.split('=')[1]
  console.log(searchParams)
  console.log(redirect)

  const history = useNavigate()
  //
  useEffect(() => {
    if (userInfo) {
      history(redirect, { replace: true })
    }
  }, [history, userInfo, redirect])

  //? submitHandler Function
  const submitHandler = e => {
    e.preventDefault()
    //! DISPATCH LOGIN
    dispatch(login(email, password))
  }

  return (
    <div className='center_div'>
      <div className='login_style'>
        <FormContainer>
          <h1 className='special_Heading' style={{ color: 'white' }}>
            Sign In
          </h1>
          {/* Checking for error */}
          {error && <Message variant='danger'>{error}</Message>}
          {/*  Checking for Loading */}
          {loading && <Loader />}

          {/* Form */}
          <Form onSubmit={submitHandler}>
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

            {/* Submit Button */}
            <Button id='button_special' type='submit' variant='primary'>
              Sign In
            </Button>
          </Form>

          {/* Link for Register Page */}
          <Row className='py-3'>
            <Col style={{ color: 'white' }}>
              New Customer?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                style={{ color: 'white' }}
              >
                <span style={{ marginLeft: '4px' }}>Register</span>
              </Link>
            </Col>
          </Row>
        </FormContainer>
      </div>
    </div>
  )
}

export default LoginPage
