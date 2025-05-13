import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/trabajos.css';

const FeaturedProjects: React.FC = () => {
  // Datos de proyectos destacados
  const featuredProjects = [
    {
      id: 1,
      title: 'E-commerce moda sustentable',
      description: 'Tienda online completa para marca de indumentaria sustentable con integración de pagos.',
      image: '/img/trabajos/1.png',
      technologies: ['React', 'WooCommerce', 'WordPress'],
    },
    {
      id: 3,
      title: 'Sitio web institucional consultora',
      description: 'Web corporativa para consultora de negocios con múltiples secciones y blog integrado.',
      image: '/img/trabajos/3.png',
      technologies: ['WordPress', 'Elementor', 'PHP'],
    },
    {
      id: 7,
      title: 'Landing Page servicio financiero',
      description: 'Landing page para servicio de finanzas personales con calculadoras interactivas.',
      image: '/img/trabajos/2.png',
      technologies: ['JavaScript', 'Bootstrap', 'PHP'],
    }
  ];

  return (
    <section className="portfolio-category featured-projects bg-alt">
      <div className="container">
        <div className="category-header">
          <h2 className="category-title">Proyectos Destacados</h2>
          <p className="category-description">Conocé algunos de nuestros trabajos más recientes</p>
        </div>
        
        <div className="projects-grid">
          {featuredProjects.map(project => (
            <div 
              className="project-card" 
              key={project.id}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <Link to={`/trabajos`} className="view-details-btn">Ver detalles</Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-all-link">
          <Link to="/trabajos">Ver todos los proyectos <span className="arrow">→</span></Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;