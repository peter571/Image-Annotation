import React, { useEffect, useRef, useState } from 'react';
import { Annotorious } from '@recogito/annotorious';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css'

import '@recogito/annotorious/dist/annotorious.min.css';
import { Container, Row, Col } from 'react-bootstrap';



function App() {


  const [imgSrc, setImgSrc] = useState(null)
  const imgRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [anno, setAnno] = useState(null)


  const handleFileChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]))
    setFileName(e.target.files[0].name)
    console.log(fileName)
  }

  useEffect(() => {

    let annotorious = null;

    if (imgRef.current) {

      annotorious = new Annotorious({
        image: imgRef.current,
        widgets: [
          'COMMENT'
        ]
      });

      annotorious.on('createAnnotation', annotation => {
        localStorage.setItem(`${new Date()}`, JSON.stringify(annotation))
        console.log('created', annotation)
      });

      annotorious.on('updateAnnotation', (annotation, previous) => {
        console.log('updated', annotation, previous);
      });

      annotorious.on('deleteAnnotation', annotation => {
        console.log('deleted', annotation);
      });
    }

    setAnno(annotorious)

    return () => annotorious.destroy();

  }, [imgSrc])


  const saveAnnoImg = () => {
    alert('Changes Saved ')
  }


  const remove = () => {
    setImgSrc(null)
  }

  const handleDisplay = (imgValue) => {
    setImgSrc(imgValue)
    anno.getAnnotations()
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
                  src={imgSrc}
                  className="image"
                  alt="Upload to Annotate" />
              </div>


              {imgSrc !== null && (
                <div>
                  <button className="A-button">Annotate</button>
                  <button className="R-button" onClick={remove}>Remove</button>
                </div>
              )}

              {imgSrc === null ? (
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
                {localStorage.length === 0 ? (
                  <p>You have not saved any image with Annotations</p>
                ) : (

                  Object.keys(localStorage).map((keys, index) => {

                    const values = JSON.parse(localStorage.getItem(keys))

                    const imgValue = values.target.source



                    return (
                      <button className="m-1" key={index} onClick={() => handleDisplay(imgValue)} >{`Annotation ${index + 1}`}</button>
                    )
                  }
                  ))}
              </div>
              {localStorage.length !== 0 && (
                <button onClick={() => localStorage.clear()}>Delete All</button>
              )}
              
            </Col>
          </Row>
        </Container>
      </Route>
    </Router>
  );
}

export default App;