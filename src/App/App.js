import React, { useEffect, useRef, useState } from 'react';
import { Annotorious } from '@recogito/annotorious';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css'

import '@recogito/annotorious/dist/annotorious.min.css';
import { Container, Row, Col } from 'react-bootstrap';



function App() {


  const [selectedFile, setSelectedFile] = useState(null)
  const imgRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [myStorage, setMyStorage] = useState(localStorage)

  // The current Annotorious instance
  const [anno, setAnno] = useState(null)



  const handleFileChange = (e) => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]))
    setFileName(e.target.files[0].name)
    console.log(fileName)
  }



  // Init Annotorious when the component
  // mounts, and keep the current 'anno'
  // instance in the application state
  useEffect(() => {
    let annotorious = null;

    if (imgRef.current) {

      // Init
      annotorious = new Annotorious({
        image: imgRef.current,
        widgets: [
          'COMMENT'
        ]
      });


      // event handlers
      annotorious.on('createAnnotation', annotation => {
        console.log('created', annotation);
      });

      annotorious.on('updateAnnotation', (annotation, previous) => {
        console.log('updated', annotation, previous);
      });

      annotorious.on('deleteAnnotation', annotation => {
        console.log('deleted', annotation);
      });
    }

    setMyStorage(localStorage)
    // Keep current Annotorious instance in state
    setAnno(annotorious)

    // Cleanup: destroy current instance
    return () => annotorious.destroy();
  }, [selectedFile])

  console.log(anno)


  const saveAnnoImg = () => {
    myStorage.setItem(fileName, selectedFile)

  }

  const remove = () => {
    setSelectedFile(null)
  }

  const handleDisplay = (imgValue) => {
    setSelectedFile(imgValue)

  }


  return (
    <Router>
      <Route exact path="/">
        <Container className="App">
          <Row>
            <Col xs={12} md={8}>

              <h1>Annotation Demo.</h1>

              <div className="py-3">
                <img
                  ref={imgRef}
                  src={selectedFile}
                  className="image"
                  alt="Upload to Annotate" />
              </div>


              {selectedFile !== null && (
                <div>
                  <button className="A-button" >Annotate</button>
                  <button className="R-button" onClick={remove}>Remove</button>
                </div>
              )}

              {selectedFile === null ? (
                <div>
                  <input onChange={handleFileChange} type="file" id="actual-btn" hidden />
                  <label className="label" htmlFor="actual-btn">Upload Photo</label>


                </div>
              ) : (
                <div>
                  <button className="label" onClick={saveAnnoImg} >Save</button>
                </div>
              )}
            </Col>

            <Col>

              <h1>My Annotations</h1>

              <div className="d-grid">
                {myStorage.length === 0 ? (
                  <p>You have not saved any image with Annotations</p>
                ) : (
                  Object.values(myStorage).map((imgValue, index) => (
                    <button className="m-1" key={index} onClick={() => handleDisplay(imgValue)} >{`Annotation ${index + 1}`}</button>
                    
                  )
                  ))}
              </div>
              <button onClick={() => localStorage.clear()}>Delete All</button>
            </Col>
          </Row>
        </Container>
      </Route>
    </Router>
  );
}

export default App;