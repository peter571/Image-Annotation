import React  from 'react'
//import { Annotorious } from '@recogito/annotorious'
import './App.css'

import '@recogito/annotorious/dist/annotorious.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import Main from '../Main/Main'
import Navigation from '../Navigation/Navigation'

function App() {

  return (

    <Container className="App">
      <Navigation />
      <Main />
    </Container>

  )
}

export default App