import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/trabajos.css';

const FeaturedProjects: React.FC = () => {
  // Datos de proyectos destacados
  const featuredProjects = [
    {
      id: 1,
      title: 'Presupuestador + Reservas con Calendario + Panel de Admin',
      description: 'Herramienta integral que permite a los usuarios generar presupuestos personalizados y realizar reservas a través de un calendario interactivo. También cuenta con panel de admin.',
      image: '/img/trabajos/1.png',
      technologies: ['React', 'Node.js', 'Mercado Pago'],
    },
    {
      id: 3,
      title: 'Red social dinámica',
      description: 'Red social dinámica inspirada en Instagram, donde los usuarios pueden compartir publicaciones, seguirse entre sí y construir comunidades en torno a intereses comunes.',
      image: '/img/trabajos/4.png',
      technologies: ['Red Social', 'Mercado Pago', 'A Medida'],
    },
    {
      id: 7,
      title: 'Sitio E-Commerce en WordPress',
      description: 'Sitio E-Commerce en WordPress para Inesina Solar, con catálogo de productos, blog técnico y portafolio de proyectos.',
      image: '/img/trabajos/2.png',
      technologies: ['Wordpress', 'Bootstrap', 'PHP'],
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