import React from 'react';
import './App.css';
import AppRouter from './Router';
import StevensNavBar  /* { StevensBottomNavBar  } */ from './components/NavBar';
import OffCanvasAbout from './components/OffCanvasAbout';
import OffCanvasShowForgotInfo from './components/OffCanvasForgotInfo';
import ParticleBackground from "./components/ParticleBackground";

export default function App() {
  return (
    <div className="App">
      <OffCanvasAbout />
      <OffCanvasShowForgotInfo />
      <AppRouter />
    </div>
  );
}