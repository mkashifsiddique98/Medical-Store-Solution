//* Imported Libraries / Frameworks
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

//* Imported Components
import Message from '../components/Message.component'
import Loader from '../components/Loader.component'
import FormContainer from '../components/FormContainer.component'

//* Imported Constants
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

//* Imported Actions
import { listProductDetails, updateProduct } from '../actions/productActions'

const ProductEditPage = () => {
  // ! Getting Product Id
  const productId = useParams()
  console.log(productId.id)

  //! Setting states
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  //!   Dispatch
  const dispatch = useDispatch()

  //! get the productDetails from the state
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  //! get the productUpdate from the state
  const productUpdate = useSelector(state => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const history = useNavigate()

  //! Use Effect
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId.id) {
        dispatch(listProductDetails(productId.id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, productId, product, history, successUpdate])

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

  //! submitHandler Function
  const submitHandler = e => {
    e.preventDefault()
    //! Update Product
    dispatch(
      updateProduct({
        _id: productId.id,
        name,
        price,
        image,
        brand,
        category, 
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {/* Checking for loading Update and error update */}
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
            {/* For Price Field  */}
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* For Image Field  */}
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image Url'
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
            {/* For Brand Field  */}
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* For CountInStock Field  */}
            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter CountInStock'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* For category Field  */}
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* For Price Field  */}
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                row='3'
                placeholder='Enter Description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
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

export default ProductEditPage
