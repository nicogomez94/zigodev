import React, { useState, useEffect } from 'react';
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
        description: 'Tienda online completa para marca de indumentaria sustentable con integración de pagos y gestión de inventario.',
        image: '/img/trabajos/1.png',
        url: 'https://sustainablefashion.com',
        technologies: ['React', 'WooCommerce', 'WordPress']
      },
      {
        id: 2,
        title: 'Landing Page agencia de viajes',
        category: 'landing',
        description: 'Landing de alta conversión para promoción de paquetes turísticos con integración de formulario de reserva.',
        image: '/img/trabajos/2.png',
        url: 'https://travelagency.com',
        technologies: ['HTML5', 'CSS3', 'JavaScript']
      },
      {
        id: 3,
        title: 'Sitio web institucional consultora',
        category: 'institucional',
        description: 'Web corporativa para consultora de negocios con múltiples secciones y blog integrado.',
        image: '/img/trabajos/3.png',
        url: 'https://businessconsulting.com',
        technologies: ['WordPress', 'Elementor', 'PHP']
      },
      {
        id: 4,
        title: 'Plataforma educativa online',
        category: 'plataforma',
        description: 'Sistema completo de e-learning con cursos, foros y seguimiento de estudiantes.',
        image: '/img/trabajos/4.png',
        url: 'https://learnplatform.edu',
        technologies: ['React', 'Node.js', 'MongoDB']
      },
      {
        id: 5,
        title: 'App web reservas restaurante',
        category: 'aplicacion',
        description: 'Sistema de reservas online para cadena de restaurantes con gestión en tiempo real.',
        image: '/img/trabajos/1.png',
        url: 'https://restaurantbooking.com',
        technologies: ['Vue.js', 'Firebase', 'Stripe']
      },
      {
        id: 6,
        title: 'Catálogo digital productos',
        category: 'ecommerce',
        description: 'Catálogo interactivo para empresa manufacturera con detalles técnicos de productos.',
        image: '/img/trabajos/1.png',
        url: 'https://productcatalog.com',
        technologies: ['React', 'Redux', 'GraphQL']
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
  };

  const closeProjectDetails = () => {
    setActiveProject(null);
  };

  return (
    <>
      <Header />
      <main className="portfolio-page">
        <section className="portfolio-header">
          <div className="container">
            <h1>Nuestros Trabajos</h1>
            <p className="portfolio-subtitle">
              Conoce los proyectos en los que hemos trabajado. Desde e-commerce hasta aplicaciones web, cada desarrollo refleja nuestro compromiso con la calidad y la innovación.
            </p>
            
            <div className="portfolio-filters">
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
        </section>

        <section className="portfolio-grid">
          <div className="container">
            <div className="projects-grid">
              {filteredProjects.map(project => (
                <div 
                  className="project-card" 
                  key={project.id}
                  onClick={() => openProjectDetails(project)}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <div className="project-category">{
                        categories.find(c => c.id === project.category)?.name
                      }</div>
                      <h3>{project.title}</h3>
                      <span className="view-project">Ver proyecto</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Modal */}
        {activeProject && (
          <div className="project-modal">
            <div className="modal-content">
              <span className="close-modal" onClick={closeProjectDetails}>&times;</span>
              <div className="modal-image">
                <img src={activeProject.image} alt={activeProject.title} />
              </div>
              <div className="modal-details">
                <h2>{activeProject.title}</h2>
                <div className="modal-category">
                  {categories.find(c => c.id === activeProject.category)?.name}
                </div>
                <p className="modal-description">{activeProject.description}</p>
                <div className="modal-technologies">
                  <h4>Tecnologías utilizadas:</h4>
                  <div className="tech-tags">
                    {activeProject.technologies.map((tech, index) => (
                      <span className="tech-tag" key={index}>{tech}</span>
                    ))}
                  </div>
                </div>
                <a href={activeProject.url} target="_blank" rel="noopener noreferrer" className="visit-site-btn">
                  Visitar sitio
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                  </svg>
                </a>
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