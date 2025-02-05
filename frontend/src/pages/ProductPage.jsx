// * Imported Libraries
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
// * Imported Components (Files)
import Rating from '../components/Rating.component'
import Message from '../components/Message.component'
import Loader from '../components/Loader.component'
// * Importing Actions
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'

// * Imported Constants
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  //? ======== useDispatch & useSelector (Redux)
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  // ! fetching the required product id from URL parameter
  const { id } = useParams()
  console.log(id)

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted !!!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    dispatch(listProductDetails(id))
  }, [dispatch, id, successProductReview])

  // ! instead of history, use this one to redirect(switch between the screens)
  const history = useNavigate()

  // ! defining addToCartHandler()
  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`, { replace: true })
  }

  //! submitHandler
  const submitHandler = e => {
    e.preventDefault()

    dispatch(createProductReview(id, { rating, comment }))
  }

  return (
    <>
      {/* Back Button */}
      <Link className='btn btn-light my-3' to='/'>
        <strong>GO BACK</strong>
      </Link>
      {/* Details portion starts now */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {/* Col => for product Image */}
            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                style={{
                  maxHeight: '670px',
                  // backgroundAttachment: 'fixed',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'noRepeat',
                  padding: '20px',
                  width: '100%',
                }}
              />
            </Col>
            {/*  Col => Title, Reviews, Description */}
            <Col md={3}>
              <ListGroup variant='flush'>
                {/* Product Title (name) */}
                <ListGroup.Item>
                  <h3 style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
                    {product.name}
                  </h3>
                </ListGroup.Item>
                {/* Product Reviews */}
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                {/* Product Details */}
                <ListGroup.Item>
                  <strong>Description:</strong>
                  <br /> {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            {/* Col */}
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  {/* Product Price */}
                  <ListGroup.Item>
                    <Row>
                      <Col> Price : </Col>
                      <Col>
                        RS <strong> {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* Product Status */}
                  <ListGroup.Item>
                    <Row>
                      <Col> Status : </Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* Product Qty */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col> Qty : </Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  {/* Add to Cart Button */}
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      onClick={addToCartHandler}
                      type='button'
                      disabled={product.countInStock === 0}
                      id='button_special'
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2 className='special_Heading'>Reviews</h2>
              {product.reviews.length === 0 && <Message> NO REVIEWS</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2 style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
                    Write A Customer Review{' '}
                  </h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={e => setRating(parseInt(e.target.value))}
                        >
                          <option value={parseInt('0')}> Select .... </option>
                          <option value={parseInt('1')}> Poor </option>
                          <option value={parseInt('2')}> Fair </option>
                          <option value={parseInt('3')}> Good </option>
                          <option value={parseInt('4')}> Very Good </option>
                          <option value={parseInt('5')}> Excellent </option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                        id='button_special'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please
                      <span style={{ paddingLeft: '6px', paddingRight: '2px' }}>
                        <Link to='/login'>Sign In</Link>
                      </span>
                      to Write a Review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
