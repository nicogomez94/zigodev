import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cotizador from './pages/Cotizador/Cotizador';
import Servicios from './pages/Servicios/Servicios';
import Contacto from './pages/Contacto/Contacto';
import './assets/styles/style.css';
import './assets/styles/contacto.css';
import './assets/styles/servicios.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotizador" element={<Cotizador />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
};

export default App;