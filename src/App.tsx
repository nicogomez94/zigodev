import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cotizador from './pages/Cotizador/Cotizador';
import Servicios from './pages/Servicios/Servicios';
import Contacto from './pages/Contacto/Contacto';
import Trabajos from './pages/Trabajos/Trabajos';
import WhatsAppButton from './components/WhatsAppButton'; // Import the new component
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotizador" element={<Cotizador />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/trabajos" element={<Trabajos />} />
      </Routes>
      <WhatsAppButton />
    </Router>
  );
};

export default App;