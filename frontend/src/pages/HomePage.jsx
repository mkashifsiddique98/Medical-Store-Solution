// * Imported Libraries
import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

// * Imported Components ( from Files )
import Product from '../components/Product.component'
import Message from '../components/Message.component'
import Loader from '../components/Loader.component'
import Paginate from '../components/Paginate.component'
import ProductCarousel from '../components/ProductCarousel.component'

// * Importing the actions that we want to call
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  // ! Getting the entered Keyword from the URL
  const { keyword } = useParams()
  console.log(keyword)

  //! Getting the PageNumber from the state
  const { pageNumber } = useParams() || 1
  console.log(pageNumber)

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          GO Back
        </Link>
      )}
      <h1>Latest Products</h1><hr className='hr_style'/>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
