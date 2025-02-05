// * Imported Libraries
import React from 'react'
import { Card, Button, Image } from 'react-bootstrap'

const ConsultationCard = ({
  picture,
  altImgName,
  doctorName,
  doctorDetails,
}) => {
  return (
    <>
      <Card
        style={{ width: '18rem', height: '26rem' }}
        id='consultCard'
        className='my-3 p-3 rounded'
      >
        <Image
          src={picture}
          alt={altImgName}
          variant='top'
          fluid
          style={{
            maxHeight: '220px',
            padding: '20px',
            width: '80%',
            marginLeft: '1.5rem',
          }}
        />
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Title>{doctorName}</Card.Title>
          <Card.Text>{doctorDetails}</Card.Text>
          {/* <Link to='/'> */}
          <Button variant='primary' style={{ backgroundColor: '#25d366' }}>
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
          {/* </Link> */}
        </Card.Body>
      </Card>
    </>
  )
}

export default ConsultationCard
