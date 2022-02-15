import React, { useContext, useState } from 'react'
//import imgSrc from '../resources/ready-made.jpg'
import FileBase64 from 'react-file-base64';
import { AnnotationContext } from '../context/context';

const Image = () => {
    const contextdata = useContext(AnnotationContext);
    //console.log(contextdata?.imgEl.current)

    return (
        <div className='img-wrapper'>
            <input type="file" onChange={contextdata?.uploadImage} />
            <img className='image' ref={contextdata?.imgEl} src={contextdata?.imgsrc} alt="Upload to Annotate" />
            <button onClick={() => contextdata?.setImgsrc(undefined)}>save</button>
        </div>
    )
}

export default Image
