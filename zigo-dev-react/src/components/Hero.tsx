import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="hero-background-pattern"></div>
            <div className="container hero-content">
                <h1>
                    Impulsá tu negocio con <span className="rehanced">soluciones digitales</span> a medida<span className="rehanced">.</span>
                </h1>
                <p>
                    Ofrecemos servicios de diseño web, e-commerce, marketing digital, SEO, soporte técnico y mucho más para llevar tu proyecto al siguiente nivel.
                </p>
                <div className="hero-buttons">
                    <a href="contacto.html" className="cta-button hero-cta-main">Ponete en Contacto</a>
                    <a href="servicios.html" className="cta-button cta-button-outline hero-cta-secondary">Saber más</a>
                </div>
                <div className="hero-graphic">
                    <img src="/img/test2.png" alt="Gráfico del panel de IA" />
                </div>
                <div className="hero-logos">
                    <div className="logo-item"><i className="fas fa-check-circle"></i> Diseño Web</div>
                    <div className="logo-item"><i className="fas fa-check-circle"></i> E-commerce</div>
                    <div className="logo-item"><i className="fas fa-check-circle"></i> Marketing Digital</div>
                    <div className="logo-item"><i className="fas fa-check-circle"></i> SEO</div>
                    <div className="logo-item"><i className="fas fa-check-circle"></i> Soporte Técnico</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;