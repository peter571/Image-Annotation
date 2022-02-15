import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Image from '../Image/Image'

const Main = () => {
  return (
    <Container>
      <Row>
        <Col className='m-auto'>
          <Image />
        </Col>

        <Col>
          Annotations
        </Col>
      </Row>
    </Container>
  )
}

export default Main