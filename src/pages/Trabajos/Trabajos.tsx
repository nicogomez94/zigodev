import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../assets/styles/trabajos.css';

// Project type definitions
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
  client?: string;
  year?: string;
}

const Trabajos: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Sample projects data
  useEffect(() => {
    const projectsData: Project[] = [
      {
        id: 1,
        title: 'E-commerce moda sustentable',
        category: 'ecommerce',
        description: 'Tienda online completa para marca de indumentaria sustentable con integración de pagos y gestión de inventario. Diseñamos una experiencia de compra intuitiva con foco en destacar los valores ecológicos de la marca.',
        image: '/img/trabajos/1.png',
        url: 'https://sustainablefashion.com',
        technologies: ['React', 'WooCommerce', 'WordPress'],
        client: 'EcoFashion',
        year: '2023'
      },
      {
        id: 2,
        title: 'Landing Page agencia de viajes',
        category: 'landing',
        description: 'Landing de alta conversión para promoción de paquetes turísticos con integración de formulario de reserva. Optimizamos cada sección para maximizar la tasa de conversión y captar leads de calidad.',
        image: '/img/trabajos/2.png',
        url: 'https://travelagency.com',
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        client: 'Mundo Viajes',
        year: '2023'
      },
      {
        id: 3,
        title: 'Sitio web institucional consultora',
        category: 'institucional',
        description: 'Web corporativa para consultora de negocios con múltiples secciones y blog integrado. Desarrollamos una arquitectura de información clara que comunica profesionalismo y experiencia en el sector financiero.',
        image: '/img/trabajos/3.png',
        url: 'https://businessconsulting.com',
        technologies: ['WordPress', 'Elementor', 'PHP'],
        client: 'Consultoría Financiera Global',
        year: '2022'
      },
      {
        id: 4,
        title: 'Plataforma educativa online',
        category: 'plataforma',
        description: 'Sistema completo de e-learning con cursos, foros y seguimiento de estudiantes. Implementamos funcionalidades avanzadas como evaluaciones automáticas, certificados personalizados y analíticas de aprendizaje.',
        image: '/img/trabajos/4.png',
        url: 'https://learnplatform.edu',
        technologies: ['React', 'Node.js', 'MongoDB'],
        client: 'Academia Digital',
        year: '2022'
      },
      {
        id: 5,
        title: 'App web reservas restaurante',
        category: 'aplicacion',
        description: 'Sistema de reservas online para cadena de restaurantes con gestión en tiempo real. Permitimos a los usuarios seleccionar mesas específicas, pre-ordenar menús y recibir notificaciones de su reserva.',
        image: '/img/trabajos/1.png',
        url: 'https://restaurantbooking.com',
        technologies: ['Vue.js', 'Firebase', 'Stripe'],
        client: 'Grupo Gastronómico Gourmet',
        year: '2023'
      },
      {
        id: 6,
        title: 'Catálogo digital productos',
        category: 'ecommerce',
        description: 'Catálogo interactivo para empresa manufacturera con detalles técnicos de productos. Incorporamos visualización 3D de productos, descarga de fichas técnicas y comparador de características.',
        image: '/img/trabajos/1.png',
        url: 'https://productcatalog.com',
        technologies: ['React', 'Redux', 'GraphQL'],
        client: 'Industrias Modernas',
        year: '2022'
      },
    ];

    setProjects(projectsData);
    setFilteredProjects(projectsData);
  }, []);

  // Filter projects by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'landing', name: 'Landing Pages' },
    { id: 'institucional', name: 'Institucional' },
    { id: 'plataforma', name: 'Plataformas' },
    { id: 'aplicacion', name: 'Aplicaciones' },
  ];

  const openProjectDetails = (project: Project) => {
    setActiveProject(project);
    // Cuando se abre el modal, evitar scroll en el body
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setActiveProject(null);
    // Restaurar scroll cuando se cierra el modal
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Header />
      <main className="portfolio-page">
        <section className="portfolio-hero">
          <div className="container">
            <div className="hero-content">
              <h1>Portfolio de Proyectos</h1>
              <p className="hero-subtitle">
                Explorá nuestros trabajos más destacados y descubrí cómo transformamos ideas en experiencias digitales de impacto.
              </p>
            </div>
          </div>
        </section>
        
        <section className="portfolio-content">
          <div className="container">
            <div className="portfolio-filters">
              <p className="filter-label">Filtrar por:</p>
              <div className="filter-buttons">
                {categories.map(category => (
                  <button 
                    key={category.id}
                    className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {filteredProjects.length === 0 ? (
              <div className="no-results">
                <p>No se encontraron proyectos en esta categoría.</p>
              </div>
            ) : (
              <div className="projects-grid">
                {filteredProjects.map(project => (
                  <div 
                    className="project-card" 
                    key={project.id}
                    onClick={() => openProjectDetails(project)}
                  >
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="project-info">
                      <span className="project-category">
                        {categories.find(c => c.id === project.category)?.name}
                      </span>
                      <h3>{project.title}</h3>
                      <div className="project-tech">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="tech-badge">{tech}</span>
                        ))}
                      </div>
                      <button className="view-details-btn">Ver detalles</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>¿Tenés un proyecto en mente?</h2>
              <p>Contactanos para convertir tus ideas en realidad digital</p>
              <Link to="/cotizador" className="cta-button">Solicitar presupuesto <span>→</span></Link>
            </div>
          </div>
        </section>

        {/* Project Modal */}
        {activeProject && (
          <div className="project-modal" onClick={closeProjectDetails}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-modal" onClick={closeProjectDetails}>
                <span>&times;</span>
              </button>
              
              <div className="modal-grid">
                <div className="modal-image">
                  <img src={activeProject.image} alt={activeProject.title} />
                </div>
                
                <div className="modal-details">
                  <div className="modal-header">
                    <h2>{activeProject.title}</h2>
                    <span className="modal-category">
                      {categories.find(c => c.id === activeProject.category)?.name}
                    </span>
                  </div>
                  
                  <div className="modal-meta">
                    {activeProject.client && (
                      <div className="meta-item">
                        <span className="meta-label">Cliente:</span>
                        <span className="meta-value">{activeProject.client}</span>
                      </div>
                    )}
                    {activeProject.year && (
                      <div className="meta-item">
                        <span className="meta-label">Año:</span>
                        <span className="meta-value">{activeProject.year}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="modal-description">
                    <h3>Acerca del proyecto</h3>
                    <p>{activeProject.description}</p>
                  </div>
                  
                  <div className="modal-technologies">
                    <h3>Tecnologías utilizadas</h3>
                    <div className="tech-tags">
                      {activeProject.technologies.map((tech, index) => (
                        <span className="tech-tag" key={index}>{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="modal-actions">
                    <a href={activeProject.url} target="_blank" rel="noopener noreferrer" className="visit-site-btn">
                      Visitar sitio
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                      </svg>
                    </a>
                    
                    <Link to="/cotizador" className="quote-project-btn">
                      Cotizar proyecto similar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Trabajos;