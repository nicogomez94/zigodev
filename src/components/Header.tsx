import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaveSquare, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header>
            <div className="container">
                <div className="logo">
                    <FontAwesomeIcon icon={faWaveSquare} className="logo-icon" />
                    <Link to="/">Zigo Dev</Link>
                </div>
                
                {/* Hamburger icon for mobile */}
                <div className="menu-icon" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                </div>
                
                {/* Navigation with mobile toggle class */}
                <nav className={menuOpen ? 'active' : ''}>
                    <ul>
                        <li><Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link></li>
                        <li><Link to="/servicios" onClick={() => setMenuOpen(false)}>Servicios</Link></li>
                        {/* <li><Link to="/cotizador" onClick={() => setMenuOpen(false)}>Cotizador</Link></li> */}
                        <li><Link to="/trabajos" onClick={() => setMenuOpen(false)}>Portfolio</Link></li>
                        <li><Link to="https://wa.me/5491152291994" className='cotiza-mobile cta-button hero-cta-main' onClick={() => setMenuOpen(false)}>Ponete en Contacto</Link></li>
                    </ul>
                </nav>
                <Link to="https://wa.me/5491152291994" className="cotiza-desk cta-button hero-cta-main">Ponete en Contacto</Link>
            </div>
        </header>
    );
};

export default Header;