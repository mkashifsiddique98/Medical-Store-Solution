//* Imported Libraries 
import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((m) => (
          <LinkContainer
            key={m + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${m + 1}`
                  : `/page/${m + 1}`
                : `/admin/productlist/${m + 1}`
            }
          >
            <Pagination.Item active={m + 1 === page}>{m + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
