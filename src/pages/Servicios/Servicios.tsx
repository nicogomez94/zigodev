import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../assets/styles/servicios.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMobile, faGlobe, faCode, 
  faShoppingCart, faCreditCard, faChartPie, faBullhorn,
  faSearch, faEnvelope, faShield, faCloud, faSync
} from '@fortawesome/free-solid-svg-icons';

const Servicios: React.FC = () => {
  return (
    <>
      <Header />
      <main className="services-main">
        <section className="hero-section">
          <div className="container">
            <h1 className="page-title">Nuestros Servicios</h1>
            <p className="page-subtitle">Soluciones digitales completas para impulsar tu negocio en el mundo online</p>
          </div>
        </section>
        
        {/* Sección de Desarrollo Web */}
        <section className="service-category">
          <div className="container">
            <div className="category-header">
              <h2 className="category-title">Desarrollo Web</h2>
              <p className="category-description">Creamos experiencias web atractivas, funcionales y personalizadas</p>
            </div>
            
            <div className="service-cards">
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
              
              <div className="service-card">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faCode} />
                </div>
                <h3>Aplicaciones Web</h3>
                <p>Desarrollamos aplicaciones web personalizadas y sistemas complejos adaptados a tus necesidades específicas de negocio.</p>
                <ul>
                  <li>Desarrollo front-end y back-end</li>
                  <li>Arquitectura escalable</li>
                  <li>Integraciones con APIs</li>
                </ul>
                <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sección de E-commerce */}
        <section className="service-category bg-alt">
          <div className="container">
            <div className="category-header">
              <h2 className="category-title">E-commerce</h2>
              <p className="category-description">Tiendas online optimizadas para maximizar tus ventas</p>
            </div>
            
            <div className="service-cards">
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
              
              <div className="service-card">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <h3>Pasarelas de Pago</h3>
                <p>Integramos múltiples métodos de pago para ofrecer la mejor experiencia a tus clientes y aumentar la conversión.</p>
                <ul>
                  <li>Mercado Pago, PayPal, Todo Pago</li>
                  <li>Tarjetas de crédito/débito</li>
                  <li>Pagos en efectivo y transferencias</li>
                </ul>
                <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
              </div>
              
              <div className="service-card">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faChartPie} />
                </div>
                <h3>Optimización CRO</h3>
                <p>Mejoramos la experiencia de usuario y el proceso de compra para aumentar tu tasa de conversión y ventas.</p>
                <ul>
                  <li>Análisis de embudo de conversión</li>
                  <li>Pruebas A/B</li>
                  <li>Experiencia de usuario mejorada</li>
                </ul>
                <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sección de Marketing Digital */}
        <section className="service-category">
          <div className="container">
            <div className="category-header">
              <h2 className="category-title">Marketing Digital</h2>
              <p className="category-description">Estrategias para aumentar tu visibilidad online y atraer clientes</p>
            </div>
            
            <div className="service-cards">
              <div className="service-card">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <h3>SEO</h3>
                <p>Optimizamos tu sitio para que aparezca en los primeros resultados de Google y atraiga tráfico orgánico de calidad.</p>
                <ul>
                  <li>SEO On-page y Off-page</li>
                  <li>SEO técnico</li>
                  <li>Estrategia de contenidos</li>
                </ul>
                <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
              </div>
              
              <div className="service-card">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faBullhorn} />
                </div>
                <h3>Publicidad Digital</h3>
                <p>Campañas de publicidad online que generan resultados inmediatos para tu negocio a través de diferentes plataformas.</p>
                <ul>
                  <li>Google Ads</li>
                  <li>Meta Ads (Facebook/Instagram)</li>
                  <li>Remarketing</li>
                </ul>
                <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
              </div>
              
              <div className="service-card">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <h3>Email Marketing</h3>
                <p>Estrategias efectivas de email marketing para nurturing de leads, fidelización y aumento de ventas.</p>
                <ul>
                  <li>Diseño de newsletters</li>
                  <li>Automatizaciones</li>
                  <li>Segmentación de audiencia</li>
                </ul>
                <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sección de Servicios Técnicos */}
        <section className="service-category bg-alt">
          <div className="container">
            <div className="category-header">
              <h2 className="category-title">Servicios Técnicos</h2>
              <p className="category-description">Mantenemos tu presencia online funcionando de forma óptima y segura</p>
            </div>
            
            <div className="service-cards">
              <div className="service-card">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faCloud} />
                </div>
                <h3>Hosting & Servidores</h3>
                <p>Soluciones de alojamiento web optimizadas para el mejor rendimiento y seguridad de tu sitio.</p>
                <ul>
                  <li>Hosting gestionado</li>
                  <li>VPS y Cloud hosting</li>
                  <li>Administración de servidores</li>
                </ul>
                <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
              </div>
              
              <div className="service-card">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faShield} />
                </div>
                <h3>Seguridad Web</h3>
                <p>Protegemos tu sitio web contra amenazas y vulnerabilidades para garantizar la integridad de tu negocio online.</p>
                <ul>
                  <li>Certificados SSL</li>
                  <li>Firewall de aplicaciones</li>
                  <li>Copias de seguridad</li>
                </ul>
                <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
              </div>
              
              <div className="service-card">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faSync} />
                </div>
                <h3>Mantenimiento</h3>
                <p>Mantén tu sitio web actualizado, seguro y optimizado con nuestros planes de mantenimiento mensual.</p>
                <ul>
                  <li>Actualizaciones de plataforma</li>
                  <li>Monitoreo de rendimiento</li>
                  <li>Soporte técnico</li>
                </ul>
                <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="cta-section cta-section-footer">
          <div className="container">
            <h2>¿Listo para impulsar tu proyecto?</h2>
            <p>Conversemos sobre tus ideas y cómo podemos ayudarte a alcanzar tus objetivos</p>
            <Link to="/cotizador" className="cta-button">Cotizar mi proyecto <span className="arrow">→</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Servicios;