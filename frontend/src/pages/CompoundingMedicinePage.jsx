//* Imported Libraries / Frameworks
import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

//* Imported Components
import FormContainer from '../components/FormContainer.component'
import FAQ from '../components/FAQ.component'
import Message from '../components/Message.component'
import Loader from '../components/Loader.component'

// * Imported Actions
import { saveCompoundingMedicineAction } from '../actions/CompoundingMedicineActions'

// * Imported Api
import { questions } from '../apis/compMedApi'

const CompoundingMedicinePage = () => {
  //! Setting states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [image, setImage] = useState('')
  const [address, setAddress] = useState('')
  const [uploading, setUploading] = useState(false)

  //!  uploadFileHandler Function
  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/from-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  // ! Dispatch
  const dispatch = useDispatch()

  // !  get the compoundingMedicine from the state
  const saveCompoundingMedicine = useSelector(
    state => state.saveCompoundingMedicine
  )
  const { loading, compoundingMedicine, success, error } =
    saveCompoundingMedicine

  // !  get the userDetails from the state
  const userDetails = useSelector(state => state.userDetails)
  const { user } = userDetails

  // !get the userLogin from the state
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // !
  const history = useNavigate()

  //! Use Effect
  useEffect(() => {
    if (!userInfo) {
      history('/login')
    } else {
      setName(user.name)
      setEmail(user.email)
      setAddress(user.address)
    }
  }, [history, userInfo, user])

  //! submitHandler Function
  const submitHandler = e => {
    e.preventDefault()
    console.log(user.name)
    console.log(user.email)
    console.log(user.address)
    console.log(compoundingMedicine.name)
    console.log(compoundingMedicine.email)
    console.log(compoundingMedicine.address)
    // ! DISPATCH Save Compounding Medicine
    dispatch(
      saveCompoundingMedicineAction({
        id: user._id,
        name,
        email,
        address,
        image,
        message,
      })
    )
  }

  return (
    <>
      <div className='comp_med_style'>
        <h1 className='special_Heading'>Compounding Medicine</h1>
        <p>
          In Compounding Medicine Service, you can upload the prescription and
          get the medicines at the door. Fill the form COrrectly, Upload the
          prescription and send it. We will update you through the email that
          you will provide us, so fill the form Correctly. Later on, we will not
          be responsible for your mistake. Thank you!
        </p>

        <br />
        <b style={{ fontSize: '1.7rem', color: 'rgb(78, 187, 234)' }}>
          Please Note it down, Free Home Delivery is only for the citizens of
          Jalalpur Jattan!
        </b>
      </div>
      <br />

      {/* Checking for error */}
      {error && <Message variant='danger'>{error}</Message>}
      {/* Checking for success */}
      {success && <Message variant='success'>Data Sent!!!</Message>}
      {/*  Checking for Loading */}
      {loading && <Loader />}
      {/*  */}

      <h1 className='special_Heading'>Fill the Form!</h1>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          {/* For Name Field  */}
          <Form.Group controlId='name'>
            <Form.Label style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
              Full Name
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* For Address Field  */}
          <Form.Group controlId='address'>
            <Form.Label style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
              Address
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Address ......'
              value={address}
              onChange={e => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* For Image Field  */}
          <Form.Group controlId='image'>
            <Form.Label style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
              Image
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Image URL'
              value={image}
              onChange={e => setImage(e.target.value)}
            ></Form.Control>
            <input
              type='file'
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFileHandler}
            />
            {uploading && <Loader />}
          </Form.Group>
          {/* For Email Field  */}
          <Form.Group controlId='email'>
            <Form.Label style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
              Email
            </Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* For Message Field  */}
          <Form.Group controlId='message'>
            <Form.Label style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
              Message
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Add text ......'
              value={message}
              onChange={e => setMessage(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* Send Button */}
          <Button type='submit' variant='primary' id='button_special'>
            Send
          </Button>
        </Form>
      </FormContainer>

      {/* FAQ ( Frequently Asked Questions ) */}
      <h1 style={{ textAlign: 'center', margin: '3rem' }}>FAQ</h1>
      {/* Maping */}
      {questions.map(curElement => {
        return (
          <FAQ
            key={curElement.id}
            id={curElement.id}
            question={curElement.question}
            answer={curElement.answer}
          />
        )
      })}
    </>
  )
}

export default CompoundingMedicinePage
