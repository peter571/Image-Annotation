import React, { useEffect, useRef, useState } from 'react'
import { Annotorious } from '@recogito/annotorious'
import './App.css'

// import { initializeApp } from "firebase/app"
// import { getFirestore as db } from "firebase/firestore"


import '@recogito/annotorious/dist/annotorious.min.css'
import { Container, Row, Col } from 'react-bootstrap'





function App() {


  const [imgSrc, setImgSrc] = useState(null)
  const imgRef = useRef(null)
  // const [fileName, setFileName] = useState('')
  const [anno, setAnno] = useState(null)


  const handleFileChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]))
    
  }

 
  useEffect(() => {

    let annotorious = null

    if (imgRef.current && imgSrc !== null) {

      annotorious = new Annotorious({
        image: imgRef.current,
        widgets: [
          'COMMENT'
        ]
      })

      setImgSrc(imgSrc)
    // JSON.parse(localStorage.getItem(imgSrc))
    if (JSON.parse(localStorage.getItem(imgSrc)) === null && imgSrc !== null ) localStorage.setItem(imgSrc, JSON.stringify([]))



      annotorious.on('createAnnotation', function (annotation) {

        let storage = JSON.parse(localStorage.getItem(imgSrc))
        storage.push(annotation)
        localStorage.setItem(imgSrc, JSON.stringify(storage))

        // JSON.parse(localStorage.getItem(imgRef.current)).push(annotation)
        console.log('Stored annotation')

      })

    }

    setAnno(annotorious)
  

    if (imgSrc !== null) return () => annotorious.destroy()

  }, [imgSrc])


  const saveAnnoImg = () => {
    setImgSrc(null)
    alert('Changes Saved! Upload new photo!')
  }


  const remove = () => {
    anno.clearAnnotations()
  }

  const handleDisplay = (key) => {
    let imgValue = key
    setImgSrc(imgValue)
    let imgAnnotations = JSON.parse(localStorage.getItem(imgValue))

    console.log(imgAnnotations)
    anno.setAnnotations(imgAnnotations)
    
    
  }


  // Object.keys(localStorage).forEach((key) => (
    
  //   // console.log(JSON.parse(localStorage.getItem(key)))
  // ))


  return (

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
            {
              Object.keys(localStorage).map((key, index) => (

                <button className="m-1" key={index} onClick={() => handleDisplay(key)}>{`Annotation ${index + 1}`}</button>

              ))
            }
            {/* console.log(key)
                // console.log(JSON.parse(localStorage.getItem(key))) */}

          </div>

        </Col>
      </Row>
    </Container>

  )
}

export default App