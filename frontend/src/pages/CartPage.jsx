// * Imported Libraries
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

//* Imported Components
import Message from '../components/Message.component'

//* Imported Actions
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = () => {
  // ? to get the id of required product from URL
  const productId = useParams()
  // console.log(productId.id)

  // ? to access the search queryString (qty)
  const [searchParms] = useSearchParams()
  const qty = searchParms ? Number(searchParms.get('qty')) : 1
  // console.log('qty : ' + qty)

  const dispatch = useDispatch()

  const history = useNavigate()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId.id) {
      dispatch(addToCart(productId.id, qty))
    }
  }, [productId.id, qty, dispatch])

  // !================= onChange functions  ================

  // Remove items from the cart
  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id))
  }

  // Proceed to CheckOut
  const checkOutHandler = () => {
    history('/login?redirect=shipping')
  }

  //! ===========================================

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                      style={{ maxHeight: '140px', width: '100%' }}
                    />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.product}`}
                      style={{
                        textDecoration: 'none',
                        color: 'rgba(103, 30, 51, 0.8)',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>PKRS {item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={e =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(m => (
                        <option key={m + 1} value={m + 1}>
                          {m + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </h2>
              PKRS :
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
                id='button_special'
              >
                Proceed to CheckOut
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
