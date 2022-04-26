import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Container } from 'react-bootstrap';
import ParticleBackground from "./components/ParticleBackground";
import { ReactComponent as Logo } from './imgs/svgs/wreath.svg';
ReactDOM.render(
  <>
    <style type='text/css'>
      {`
        .app-cont {
          height: 100vh;
          padding:0;
          background-color: #131313;
          background-color: #131313;
          background-image: linear-gradient(190deg, #000000 70%, #00735e 120%);
          z-index: 2;
        }
        .ctm-svg {
          position: fixed;
          top: 20%; 
          left: 15%;
          z-index: 1;
          opacity: 0.2;
          filter: invert(36%) sepia(98%) saturate(3260%) hue-rotate(155deg) brightness(50%) contrast(103%);     
          transform: rotate(180deg);
          width: 70vw; 
          height: 70vh; 
        }
      `}  
    </style>   
    <Provider store={store}>
      <Logo className="ctm-svg"></Logo>
      <Container fluid className="app-cont"> 
        {/* <ParticleBackground /> */}
        <App />
      </Container>
    </Provider>  
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
