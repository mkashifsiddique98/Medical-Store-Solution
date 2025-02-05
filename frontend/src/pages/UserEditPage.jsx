//* Imported Libraries / Frameworks
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

//* Imported Components
import Message from '../components/Message.component'
import Loader from '../components/Loader.component'
import FormContainer from '../components/FormContainer.component'

//* Imported Constants
import { USER_UPDATE_RESET } from '../constants/userConstants'

//* Imported Actions
import { getUserDetails, updateUser } from '../actions/userActions'

const UserEditPage = () => {
  //! getting user Id
  const userId = useParams()

  //! Setting states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  //!  Dispatch
  const dispatch = useDispatch()

  //! get the userDetails from the state
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  //! get the userUpdate from the state
  const userUpdate = useSelector(state => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  const history = useNavigate()

  //! useEffect
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId.id) {
        dispatch(getUserDetails(userId.id))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId.id, user, successUpdate])

  //! submitHandler Function
  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId.id, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {/* Checking for the loading update and error update */}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
            {/* For isAdmin Field  */}
            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            {/* Submit Button */}
            <Button type='submit' variant='primary' id='button_special'>
              UPDATE
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditPage
