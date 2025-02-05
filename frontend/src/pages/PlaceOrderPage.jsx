//*  Imported Libraries
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

//* Imported Components
import Message from '../components/Message.component'
import CheckoutSteps from '../components/CheckoutSteps.component'

//* Imported Actions
import { createOrder } from '../actions/orderActions'

const PlaceOrderPage = () => {
  //! Setting state for checkbox
  const [useCoins, setUseCoins] = useState(false)
  const [userCoins, setuserCoins] = useState(0)

  const dispatch = useDispatch()

  // ! Fetching All cart Values from the State
  const cart = useSelector(state => state.cart)

  // !  get the userDetails from the state
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error: userError, user } = userDetails

  //!  bring in our Order Create State
  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  //! ========== Calculate Prices ==================

  // ? addDecimals Function
  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  // ? Items Total Price
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  // ? Shipping Price
  cart.shippingPrice = addDecimals(cart.itemsPrice < 100 ? 0 : 100)

  // ? Tax Price
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

  // ?  Overall Total Price
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  // ? discount Price
  cart.discount =
    user.coins > 10000 && useCoins == true
      ? addDecimals(Number((cart.totalPrice * 0.02).toFixed(2)))
      : 0

  // ? cart.grandTotal
  cart.grandTotal =
    user.coins > 10000 && useCoins == true
      ? (Number(cart.totalPrice) - Number(cart.discount)).toFixed(2)
      : cart.totalPrice

  const history = useNavigate()

  useEffect(() => {
    if (success) {
      history(`/order/${order._id}`)
    }
    setuserCoins(user.coins)
    // eslint-disable-next-line
  }, [history, success])

  //?   placeOrderHandler
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        useCoins: cart.useCoins,
        grandTotal: cart.grandTotal,
        coins: user.coins,
      })
    )
  }

  // ? Handling CheckBox Change
  const handleCheck = e => {
    e.preventDefault()
    setUseCoins(!useCoins)
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        {/* Left protion of the page */}
        <Col md={8}>
          <ListGroup variant='flush'>
            {/* 1 */}
            <ListGroup.Item>
              <h2 style={{ color: 'rgba(103, 30, 51, 0.8)' }}>Shipping</h2>
              <p>
                <strong style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
                  Address :
                </strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                ,
              </p>
            </ListGroup.Item>
            {/* 2 */}
            <ListGroup.Item>
              <h2 style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
                Payment Method
              </h2>
              <strong>Method :</strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            {/* 3 */}
            <ListGroup.Item>
              <h2 style={{ color: 'rgba(103, 30, 51, 0.8)' }}>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        {/* Col for Image */}
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        {/* Col for Item Name */}
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            style={{
                              textDecoration: 'none',
                            }}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        {/* Col for Quantity */}
                        <Col md={4}>
                          {item.qty} x PKRS {item.price} = PKRS
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        {/* Right Portion of the page */}
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 style={{ color: 'rgba(103, 30, 51, 0.8)' }}>
                  Order Summary
                </h2>
              </ListGroup.Item>
              {/* 1 */}
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>PKRS {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* 2 */}
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>PKRS {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* 3 */}
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>PKRS {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* 4 */}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>PKRS {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* 5 */}
              <ListGroup.Item>
                <Row>
                  <Col>Discount </Col>
                  <Col>PKRS {cart.discount}</Col>
                </Row>
              </ListGroup.Item>
              {/* 6 */}
              <ListGroup.Item>
                <Row>
                  <Col>Grand Total</Col>
                  <Col>PKRS {cart.grandTotal}</Col>
                </Row>
              </ListGroup.Item>

              {/* checking error */}
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              {/* 5 */}
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  id='button_special'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
              {/* Coins Portion  */}
              <ListGroup.Item style={{ padding: '10px', textAlign: 'center' }}>
                <h5>Coins Available:</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <input
                  type='checkbox'
                  id='coins'
                  name='coins'
                  value={useCoins}
                  onChange={handleCheck}
                />
                User Points(Reach on 10000 Points to get Discount)
              </ListGroup.Item>
              <ListGroup.Item>
                Total Points :
                <input
                  type='input'
                  value={user.coins}
                  placeholder={user.coins}
                  disabled
                  style={{ marginLeft: '5px' }}
                />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderPage
