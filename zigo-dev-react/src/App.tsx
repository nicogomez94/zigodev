import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cotizador from './pages/Cotizador/Cotizador';
import './assets/styles/style.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotizador" element={<Cotizador />} />
      </Routes>
    </Router>
  );
};

export default App;