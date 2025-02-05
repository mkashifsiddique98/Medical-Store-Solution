// * Imported Libraries
import React from 'react'
import { Row, Col } from 'react-bootstrap'

// * Imported Components form files
import ConsultationCard from '../components/ConsultationCard.component'
import FAQ from '../components/FAQ.component'

// * Imported Apis
import { questions } from '../apis/faqApi'

const DoctorConsultationPage = () => {
  return (
    <>
      <h1 className='special_Heading'>Consult with Doctor</h1>
      <Row className='consult_card_bg'>
        {/* 1 */}
        <Col>
          <ConsultationCard
            picture='../../../uploads/doctor_4.png'
            altImgName='Dr. Mahad'
            doctorName='Dr. Mahad Ali Butt'
            doctorDetails='DHMS, RHMP, General Homoeo Physician'
          />
        </Col>
        {/* 2 */}
        <Col>
          <ConsultationCard
            picture='../../../uploads/doctor_2.png'
            altImgName='Dr. Fakhar'
            doctorName='Dr. Fakhar Iqbal Mirza'
            doctorDetails='DHMS, RHMP, General Homoeo Physician'
          />
        </Col>
        {/* 3 */}
        <Col>
          <ConsultationCard
            picture='../../../uploads/doctor_3.png'
            altImgName='Dr. Hassan'
            doctorName='Dr. Hassan Raza Munir'
            doctorDetails='DHMS, RHMP, General Homoeo Physician'
          />
        </Col>
      </Row>
      {/* Some Detailed Information*/}
      <div className='consult_info'>
        <h1 className='special_Heading'>What's the Procedure?</h1>
        {/*  */}
        <div>
          All the doctors that we have are officially educated. You can choose
          any of them, click on the "Chat on whatsApp" button and be in touch
          with the doctors. A video call link may be share with you at the given
          time. Our first priority is to make our client or patient happy and
          healthy. Stay Safe and enjoy the life. <b>Thank You!</b>
        </div>
        {/* for time given */}
        <div>
          <b style={{ fontSize: '3rem', color: 'rgb(78, 187, 234)' }}>
            Available Hours: 10AM to 9PM (Available for all 7 Days )
          </b>
        </div>
      </div>
      <br />
      <br />

      {/* FAQ ( Frequently Asked Questions ) */}
      <div>
        <h1 className='special_Heading' >FAQ</h1>
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
      </div>
    </>
  )
}

export default DoctorConsultationPage
