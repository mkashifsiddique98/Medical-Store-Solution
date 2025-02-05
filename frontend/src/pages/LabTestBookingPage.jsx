// * Imported Libraries and FrameWorks
import React from 'react'
import { Table, Button } from 'react-bootstrap'

// * Imported Components
import FAQ from '../components/FAQ.component'

// * Imported APis from Files
import { Tests } from '../apis/TestApi'
import { questions } from '../apis/LabTestfaqApi'

const LabTestBookingPage = () => {
  return (
    <>
      {/* Heading */}
      <h1 style={{ textAlign: 'center', margin: '2rem', fontSize: '3rem' }}>
        Book Online Lab Tests
      </h1>
      {/* Hospital Image */}
      <img
        src='../../../uploads/hospital.jpg'
        alt='Ali hospital'
        style={{ width: '100%' }}
      />
      {/* Procedure Heading */}
      <div className='lab_info'>
        <h1 className='special_Heading'>What's the procedure?</h1>
        {/* Procedure Explanation */}
        <div>
          We have an amazing feasibility for the people of Jalalpur Jattan.
          There is no more need to go lab physically, and wait for your turn for
          a long time. You people can book your lab tests online. MoreOver, Lab
          Management is also giving an opportunity of "Sample Collection At
          Home" (to the people of Jalalpur Jattan Only). If you are not able to
          go to laboratory for tests, then Lab Management will make it sure to
          collect the required sample (that are to be test) by visiting you
          home.
        </div>
        <br />
        <br />
        {/* for time given */}
        <div>
          <b style={{ fontSize: '3rem', color: 'rgb(78, 187, 234)' }}>
            Available Hours: 10AM to 9PM (Available for all 7 Days). "Sample
            Collecion At Home" service is Only Available and free within
            Jalalpur Jattan Zone
          </b>
        </div>
      </div>
      {/*  */}
      {/* Tests Table Heading */}
      <h1 className='special_Heading'>Available Tests With Current Prices</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Available Tests</th>
            <th>Prices (PKRS)</th>
          </tr>
        </thead>
        <tbody>
          {Tests.map(curElement => {
            return (
              <>
                <tr key={curElement.id}>
                  <td>{curElement.id}</td>
                  <td>{curElement.test}</td>
                  <td>{curElement.price}</td>
                </tr>
              </>
            )
          })}
        </tbody>
      </Table>
      {/* Book on WHatsApp button */}
      <Button className='whatsApp_button' variant='primary'>
        {/* WhatsApp icon */}
        <a
          style={{ textDecoration: 'none', color: 'white' }}
          href='https://wa.me/00923476332667'
          className='whatsapp_float'
          target='_blank'
          rel='noopener noreferrer'
        >
          <i
            className='fa-brands fa-whatsapp'
            style={{ paddingRight: '5px' }}
          ></i>
          Chat On WhatsApp
        </a>
      </Button>
      {/* FAQ ( Frequently Asked Questions ) */}
      <h1 style={{ textAlign: 'center', margin: '3rem', fontSize: '3rem' }}>
        FAQ
      </h1>
      {/* Maping */}
      {questions.map(curElement => {
        return (
          <FAQ
            key={curElement.id}
            id={curElement.id}
            question={curElement.question}
            answer={curElement.answer}
          />
        )
      })}
    </>
  )
}

export default LabTestBookingPage
