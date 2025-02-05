//* Imported Libraries / Frameworks
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

//* Imported Components
import Loader from '../components/Loader.component'
import Message from '../components/Message.component'
import FormContainer from '../components/FormContainer.component'

//* Imported Actions
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const CheckUpdateProfilePage = () => {
  //! Setting states
  const [name, setName] = useState('')
  const [coins, setCoins] = useState('')
  const [city, setCity] = useState('')
  const [profilePicture, setProfilePicture] = useState(
    '../../../uploads/user.png'
  )
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [qualification, setQualification] = useState('')
  const [uploading, setUploading] = useState(false)

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

  // ! Image Handler
  const imageHandler = async e => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfilePicture(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])

    //=============
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

      setProfilePicture(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
    // ====================
  }

  // ! history
  const history = useNavigate()

  //! Use Effect
  useEffect(() => {
    if (!userInfo) {
      history('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
        setCity(user.city)
        setAddress(user.address)
        setPhoneNumber(user.phoneNumber)
        setQualification(user.qualification)
        setCoins(user.coins)

        if (!user.profilePicture) {
          setProfilePicture('../../../uploads/user.png')
        } else {
          setProfilePicture(user.profilePicture)
          {
            loading && <Loader />
          }
        }
      }
    }
  }, [dispatch, history, userInfo, user])

  //! submitHandler Function
  const submitHandler = e => {
    e.preventDefault()
    if (
      name &&
      email &&
      city &&
      address &&
      phoneNumber &&
      qualification &&
      profilePicture
    ) {
      // * Updating Points
      if (
        user.city == city ||
        user.address == address ||
        user.qualification == qualification ||
        user.phoneNumber == phoneNumber ||
        user.profilePicture == profilePicture
      ) {
        alert('Updated Successfully!!! ')
        user.coins = user.coins
        {
          loading && <Loader />
        }
      } else {
        user.coins = user.coins + 500
        alert('Updated Successfully!!!❤')
        {
          loading && <Loader />
        }
      }
    } else {
      alert('Please Complete the Profile Properly to get Coins!!!')
    }
    // ! DISPATCH UPDATE PROFILE
    dispatch(
      updateUserProfile({
        id: user._id,
        name,
        email,
        coins,
        city,
        profilePicture,
        address,
        phoneNumber,
        qualification,
      })
    )
  }

  return (
    <>
      <Link to='/profile' className='btn btn-light my-3'>
        Go Back
      </Link>
      {/* Checking for error */}
      {error && <Message variant='danger'>{error}</Message>}
      {/* Checking for success */}
      {success && <Message variant='success'>Profile Updated</Message>}
      {/*  Checking for Loading */}
      {loading && <Loader />}

      {/* Start======== */}
      <h1 className='special_Heading'>Complete Your Profile & Get Coins</h1>

      <div className='profile_Update_style'>
        <FormContainer>
          {
            <Form onSubmit={submitHandler}>
              {/* Upload file */}
              <Form.Group controlId='profilePicture'>
                <div>
                  <h6 className='heading' style={{ color: 'white' }}>
                    Add your Image
                  </h6>
                  <div className='img-holder'>
                    <img src={profilePicture} alt='' id='img' className='img' />
                  </div>
                  <input
                    type='file'
                    accept='image/*'
                    name='image-upload'
                    id='input'
                    onChange={imageHandler}
                  />
                  <div className='label'>
                    <label className='image-upload' htmlFor='input'>
                      <i className='material-icons'>add_photo_alternate</i>
                      Choose your Photo
                    </label>
                  </div>
                </div>
                {uploading && <Loader />}
              </Form.Group>
              {/* Full Name Field  */}
              <Form.Group controlId='name'>
                <Form.Label style={{ color: 'white' }}>Full Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* Coins Field  */}
              <Form.Group controlId='coins'>
                <Form.Label style={{ color: 'white' }}>Total Points</Form.Label>
                <Form.Control
                  type='number'
                  value={coins}
                  disabled
                  onChange={e => setCoins(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* City Field  */}
              <Form.Group controlId='city'>
                <Form.Label style={{ color: 'white' }}>City</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter City'
                  value={city}
                  onChange={e => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* Address Field  */}
              <Form.Group controlId='address'>
                <Form.Label style={{ color: 'white' }}>
                  Enter Address
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Address'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* Phone Number Field  */}
              <Form.Group controlId='phoneNumber'>
                <Form.Label style={{ color: 'white' }}>Contact</Form.Label>
                <Form.Control
                  type='tel'
                  placeholder='Enter Phone Number'
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* Email Field  */}
              <Form.Group controlId='email'>
                <Form.Label style={{ color: 'white' }}>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* Qualification Field  */}
              <Form.Group controlId='qualification'>
                <Form.Label style={{ color: 'white' }}>
                  Qualification
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Qualification'
                  value={qualification}
                  onChange={e => setQualification(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* Submit Button */}
              <Button type='submit' variant='primary' id='button_special'>
                UPDATE
              </Button>
            </Form>
          }
        </FormContainer>
      </div>
    </>
  )
}

export default CheckUpdateProfilePage
