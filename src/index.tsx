import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { AnnotationProvider } from './context/context';

ReactDOM.render(
    <AnnotationProvider>
    <App />
    </AnnotationProvider>,
  document.getElementById('root')
);
