import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/styles/servicios.css';
import { faRobot, faFileInvoiceDollar, faGears } from "@fortawesome/free-solid-svg-icons";

const FeaturedServices: React.FC = () => {
  return (
            <section className="service-category">
              <div className="container">
                <div className="category-header">
                  <h2 className="category-title">Soluciones con IA</h2>
                  <p className="category-description">Creamos experiencias web atractivas, funcionales y personalizadas</p>
                </div>
                
                <div className="service-cards">
                <div className="service-card">
                  <div className="card-icon">
                    <FontAwesomeIcon icon={faRobot} />
                  </div>
                  <h3>Atención automatizada</h3>
                  <p>Instalamos bots inteligentes que responden por WhatsApp, redes o mail. Agendan turnos, envían presupuestos, cobran y hacen seguimiento sin que muevas un dedo.</p>
                  <ul>
                    <li>Respuestas automáticas con IA</li>
                    <li>Agendado y recordatorios por WhatsApp</li>
                    <li>Integración con sistemas de pago</li>
                  </ul>
                  <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
                </div>
    
                <div className="service-card">
                  <div className="card-icon">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} />
                  </div>
                  <h3>Gestión administrativa con IA</h3>
                  <p>Clasificá gastos, cargá facturas, y generá reportes sin mover un dedo. Usamos IA para eliminar tareas tediosas de tu día a día contable.</p>
                  <ul>
                    <li>Lectura automática de facturas (OCR)</li>
                    <li>Resumen mensual inteligente</li>
                    <li>Exportación para tu contador</li>
                  </ul>
                  <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
                </div>
    
                <div className="service-card">
                  <div className="card-icon">
                    <FontAwesomeIcon icon={faGears} />
                  </div>
                  <h3>Procesos que se hacen solos</h3>
                  <p>Desde el control de stock hasta el seguimiento de pagos, creamos automatizaciones simples y efectivas que te ahorran tiempo y dolores de cabeza.</p>
                  <ul>
                    <li>Recordatorios y alertas automatizadas</li>
                    <li>Asignación de tareas por IA</li>
                    <li>Flujos de trabajo personalizados</li>
                  </ul>
                  <Link to="/cotizador" className="service-link">Cotizar ahora</Link>
                </div>
              </div>
    
              </div>
            </section>
  );
};

export default FeaturedServices;