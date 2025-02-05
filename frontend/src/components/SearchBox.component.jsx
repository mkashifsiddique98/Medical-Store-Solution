//* Imported Libraries / Frameworks
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  const history = useNavigate()

  //!   submitHandler
  const submitHandler = e => {
    e.preventDefault()

    if (keyword.trim()) {
      history(`/search/${keyword}`)
    } else {
      history('/')
    }
  }

  return (
    <Form className='d-flex' onSubmit={submitHandler} inlin='true'>
      <Form.Control
        type='text'
        name='q'
        onChange={e => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='ms-sm-5 me-1'
      ></Form.Control>
      <Button type='submit' variant='outline-info' className='p-2'>
        <i className='fas fa-search'></i>
      </Button>
    </Form>
  )
}

export default SearchBox
