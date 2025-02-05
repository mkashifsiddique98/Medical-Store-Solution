//*  Imported Libraries
import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

//* Imported Components
import Message from '../components/Message.component'
import Loader from '../components/Loader.component'

//* Imported Actions
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'

//* Imported Constants
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderPage = () => {
  //! getting Order Id
  const orderId = useParams()
  // console.log(orderId.id);

  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails
  // console.log("order" + order );
  // console.log("loading" + loading );
  // console.log("error" + error );

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  //! bring in userInfo from the State
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  //! ========== Calculate Prices ==================

  if (!loading) {
    // ? addDecimals Function
    const addDecimals = num => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    // ? Items Total Price
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  const history = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      history('/login')
    }

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId.id))
    }
  }, [
    dispatch,
    orderId.id,
    successDeliver,
    successPay,
    order,
    userInfo,
    history,
  ])

  //! PayHandler
  const payHandler = () => {
    dispatch(payOrder(order))
  }
  //! DeliverHandler
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        {/* Left protion of the page */}
        <Col md={8}>
          <ListGroup variant='flush'>
            {/* 1 */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address :</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country},
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            {/* 2 */}
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method :</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            {/* 3 */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                          <Link to={`/product/${item.product}`}>
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
                <h2>Order Summary</h2>
              </ListGroup.Item>
              {/* 1 */}
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>PKRS {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* 2 */}
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>PKRS {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* 3 */}
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>PKRS {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* 4 */}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>PKRS {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* 4 */}
              <ListGroup.Item>
                <Row>
                  <Col>Grand Total</Col>
                  <Col>PKRS {order.grandTotal}</Col>
                </Row>
              </ListGroup.Item>
              {/* Paid Loader */}
              {loadingPay && <Loader />}
              {/* to check order is paid? */}
              {userInfo && userInfo.isAdmin && !order.isPaid && (
                <ListGroup.Item>
                  <Button
                    id='button_special'
                    type='button'
                    className='btn btn-block'
                    onClick={payHandler}
                  >
                    Mark As Paid
                  </Button>
                </ListGroup.Item>
              )}
              {/* Deliver Loader */}
              {loadingDeliver && <Loader />}
              {/* To check order is delivered */}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      id='button_special'
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Deliver
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderPage
