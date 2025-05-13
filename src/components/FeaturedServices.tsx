import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGlobe, faMobile, faShoppingCart
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/servicios.css';

const FeaturedServices: React.FC = () => {
  return (
    <section className="service-category featured-services">
      <div className="container">
        <div className="category-header">
          <h2 className="category-title">Nuestros Servicios</h2>
          <p className="category-description">Soluciones digitales adaptadas a tus necesidades</p>
        </div>
        
        <div className="service-cards">
          {/* Servicio 1: Sitios Institucionales */}
          <div className="service-card">
            <div className="card-icon">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <h3>Sites Institucionales</h3>
            <p>Desarrollamos sitios web corporativos profesionales que representan la imagen de tu empresa con diseño a medida y contenido optimizado.</p>
            <ul>
              <li>Diseño personalizado</li>
              <li>Responsive design</li>
              <li>CMS para gestión de contenidos</li>
            </ul>
            <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
          </div>
          
          {/* Servicio 2: Landing Pages */}
          <div className="service-card">
            <div className="card-icon">
              <FontAwesomeIcon icon={faMobile} />
            </div>
            <h3>Landing Pages</h3>
            <p>Páginas de aterrizaje optimizadas para conversión que capturan leads y aumentan tus ventas con un enfoque en la acción.</p>
            <ul>
              <li>Diseño enfocado en conversión</li>
              <li>Optimización de velocidad</li>
              <li>Integración con herramientas de marketing</li>
            </ul>
            <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
          </div>
          
          {/* Servicio 3: Tiendas Online */}
          <div className="service-card">
            <div className="card-icon">
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            <h3>Tiendas Online</h3>
            <p>Creamos tu tienda virtual con todas las herramientas necesarias para vender tus productos o servicios en línea.</p>
            <ul>
              <li>WooCommerce, Shopify, Tienda Nube</li>
              <li>Catálogo de productos</li>
              <li>Carrito de compras optimizado</li>
            </ul>
            <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
          </div>
        </div>
        
        <div className="view-all-link">
          <Link to="/servicios">Ver todos los servicios <span className="arrow">→</span></Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;