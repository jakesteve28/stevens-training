import React from 'react';
import './App.css';
import AppRouter from './Router';
import StevensNavBar, { StevensBottomNavBar } from './components/NavBar';
function App() {
  return (
    <div className="App">
      <StevensNavBar />
      <AppRouter />
      <StevensBottomNavBar /> 
    </div>
  );
}

export default App;
