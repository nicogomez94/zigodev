import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="hero-background-pattern"></div>
            <div className="container hero-content">
                <h1>
                    Cotizá tu Sistema a medida en <span className="rehanced">5 minutos</span><span className="rehanced">.</span>
                </h1>
                <p>
                    Ofrecemos servicios de diseño web, e-commerce, marketing digital, SEO, soporte técnico y mucho más para llevar tu proyecto al siguiente nivel.
                </p>
                <div className="hero-buttons">
                    <a href="https://wa.me/5491152291994" className="cta-button hero-cta-main">Ponete en Contacto</a>
                    {/* <a href="servicios.html" className="cta-button cta-button-outline hero-cta-secondary">Saber más</a> */}
                </div>
                <div className="hero-graphic">
                    <img src="/img/home/1.png" alt="Gráfico del panel de IA" />
                </div>
                <div className="hero-logos">
                    <div className="logo-item"><FontAwesomeIcon icon={faCheckCircle} /> Diseño Web</div>
                    <div className="logo-item"><FontAwesomeIcon icon={faCheckCircle} /> E-commerce</div>
                    <div className="logo-item"><FontAwesomeIcon icon={faCheckCircle} /> Marketing Digital</div>
                    <div className="logo-item"><FontAwesomeIcon icon={faCheckCircle} /> SEO</div>
                    <div className="logo-item"><FontAwesomeIcon icon={faCheckCircle} /> Soporte Técnico</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;