import React from 'react'
import Accordion from 'react-bootstrap/Accordion'

const FAQ = ({ id, question, answer }) => {
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey={id}>
          <Accordion.Header
            style={{
              backgroundColor: 'rgba(103, 30, 51, 0.8)',
            }}
          >
            {question}
          </Accordion.Header>
          <Accordion.Body
            style={{ backgroundColor: 'darkslategrey', color: 'white' }}
          >
            {answer}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  )
}

export default FAQ
