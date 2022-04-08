import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Container } from 'react-bootstrap';
import ParticleBackground from "./components/ParticleBackground";

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
          position: absolute;
        }
      `}  
    </style>   
    <Provider store={store}>
         
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
