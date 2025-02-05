//* Imported Libraries / Frameworks
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

//* Imported Components
import Message from '../components/Message.component'
import Loader from '../components/Loader.component'
import Paginate from '../components/Paginate.component'

//* Imported Actions
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'

//* Imported Constants
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListPage = () => {
  //! getting pageNumber for Pagination
  const { pageNumber } = useParams() || 1

  const dispatch = useDispatch()

  //! Getting productList from the state
  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  //! Getting productDelete from the state
  const productDelete = useSelector(state => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  //! Getting productCreate from the state
  const productCreate = useSelector(state => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  //! fetching UserLogin from the state for Handeling with security issues
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const history = useNavigate()

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo.isAdmin) {
      history('/login')
    }

    if (successCreate) {
      history(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  //!   deleteHandler
  const deleteHandler = id => {
    //! DELETE PRODUCT
    if (window.confirm('ARE YOU SURE?')) {
      dispatch(deleteProduct(id))
    }
  }

  //!   createProductHandler
  const createProductHandler = () => {
    //!   CREATE PRODUCT
    dispatch(createProduct())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {/* Checking for loading and error */}
      {/* for Delete */}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {/* fro Success */}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>PKRS {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    {/* Edit button */}
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    {/* Delete Button */}
                    <Button
                      style={{ marginLeft: '5px' }}
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* for pagination */}
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListPage
