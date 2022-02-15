import React, { useState, useEffect, useRef } from 'react';
import { Annotorious } from '@recogito/annotorious';
import '@recogito/annotorious/dist/annotorious.min.css';

interface AnnotationType {
  imgEl: React.RefObject<HTMLImageElement>;
  imgsrc: string | undefined;
  setImgsrc: React.Dispatch<React.SetStateAction<string | undefined>>;
  uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AnnotationContext = React.createContext<AnnotationType | null>(null);

interface AnnoProps {
  children: React.ReactNode;
}

export const AnnotationProvider = ({children}: AnnoProps) => {
    const imgEl = useRef<HTMLImageElement | null>(null);
    const [imgsrc, setImgsrc] = useState<string | undefined>(undefined);
    const [anno, setAnno] = useState();

    const convertBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
      return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          if (file) {
            fileReader.readAsDataURL(file);
          } else {
            return
          }

          fileReader.onload = () => {
              resolve(fileReader.result);
          };

          fileReader.onerror = (error) => {
              reject(error);
          };
      });
  };

  useEffect(() => {
    let annotorious;

    if (imgEl.current) {
      // Init
      let annotorious = new Annotorious({
        image: imgEl.current,
        widgets: [
          'COMMENT'
        ]
      });

      // Attach event handlers here
      annotorious.on('createAnnotation', (annotation: {}) => {
        console.log('created', annotation);
      });

    }

    // Keep current Annotorious instance in state
    //setAnno(annotorious);

    // Cleanup: destroy current instance

      if (imgsrc !== undefined) return () => annotorious?.destroy();

  }, [imgsrc]);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      if (typeof base64 === 'string') {
        setImgsrc(base64);
      }

  };

    return (
        <AnnotationContext.Provider
        value={{ imgEl, imgsrc, setImgsrc, uploadImage }}
        >
            {children}
        </AnnotationContext.Provider>
    )
}
