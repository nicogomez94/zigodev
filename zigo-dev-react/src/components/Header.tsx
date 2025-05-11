import React from 'react';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWaveSquare } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    return (
        <header>
            <div className="container">
                <div className="logo">
                    {/* <FontAwesomeIcon icon={faWaveSquare} className="logo-icon" /> */}
                    <Link to="/">Zigo Dev</Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/servicios">Servicios</Link></li>
                        <li><Link to="/cotizador">Cotizador</Link></li>
                        <li><Link to="/acerca-de">Acerca De</Link></li>
                    </ul>
                </nav>
                <Link to="/contacto" className="cta-button header-cta">Ponete en Contacto</Link>
            </div>
        </header>
    );
};

export default Header;