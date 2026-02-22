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

interface CategoryGroup {
  id: string;
  name: string;
  description: string;
  _project?: string;
  projects: Project[];
}

const Trabajos: React.FC = () => {
  const [categorizedProjects, setCategorizedProjects] = useState<CategoryGroup[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Sample projects data
  useEffect(() => {
    const projectsData: Project[] = [
      {
        id: 1,
        title: 'Tienda para Marca de Ropa',
        category: 'ecommerce',
        description: 'Tienda online para marca de ropa con integración a Mercado Pago y gestión de inventario. Diseño responsivo y optimización SEO para mejorar la visibilidad en buscadores.',
        image: '/img/trabajos/gone.jpg',
        url: 'https://gonelake.vercel.app/',
        technologies: ['Shopify'],
        client: 'GONELAKE',
        year: '2023'
      },
      {
        id: 2,
        title: 'Sitio E-Commerce en WordPress',
        category: 'ecommerce',
        description: 'Sitio E-Commerce en WordPress para Inesina Solar, con catálogo de productos, blog técnico y portafolio de proyectos.',
        image: '/img/trabajos/2.png',
        url: 'https://inesinasolar.com/',
        technologies: ['PHP', 'WooCommerce', 'WordPress'],
        client: 'Inesina Solar',
        year: '2020'
      },
      {
        id: 3,
        title: 'Samaydeco',
        category: 'ecommerce',
        description: 'E-commerce para venta de artículos para el hogar, con integración de pasarela de pagos y sistema de gestión de inventario.',
        image: '/img/trabajos/samay.jpg',
        url: 'https://samaydeco2.com/',
        technologies: ['WordPress', 'Elementor', 'PHP'],
        client: 'Samaydeco',
        year: '2025'
      },
      {
        id: 4,
        title: 'Keramik - Detailing de Autos',
        category: 'aplicacion',
        description: 'Página estatica con sección de catálogo y presupuesto online. Diseño atractivo y optimización para SEO.',
        image: '/img/trabajos/3.png',
        url: 'https://keramik.com.ar/',
        technologies: ['jQuery', 'Bootstrap'],
        client: 'Keramik',
        year: '2023'
      },
      {
        id: 5,
        title: 'Portfolio para Web Devolper',
        category: 'landing',
        description: 'Portfolio personal con proyectos destacados y formulario de contacto. Diseño limpio y moderno, optimizado para SEO.',
        image: '/img/trabajos/6.png',
        url: 'https://nicolasgomezdev.com.ar/',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        client: 'Nicolás Gómez',
        year: '2024'
      },
      {
        id: 6,
        title: 'Alquiler túristico en Buenos Aires',
        category: 'landing',
        description: 'Landing page para alquiler turístico en Buenos Aires, con integración a sistema de reservas y calendario. Diseño atractivo y optimización para SEO.',
        image: '/img/trabajos/7.png',
        url: 'https://ggapartments.com.ar/',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        client: 'G&G Apartments',
        year: '2024'
      },
      {
        id: 7,
        title: 'Presupuestador + Reservas con Calendario + Panel de Admin',
        category: 'aplicacion',
        description: 'Herramienta integral que permite a los usuarios generar presupuestos personalizados y realizar reservas a través de un calendario interactivo. También cuenta con panel de admin.',
        image: '/img/trabajos/1.png',
        url: 'https://blak.com.ar',
        technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
        client: 'BLAK',
        year: '2023'
      },
      {
        id: 8,
        title: 'Red social dinámica',
        category: 'aplicacion',
        description: 'Red social dinámica inspirada en Instagram, donde los usuarios pueden compartir publicaciones, seguirse entre sí y construir comunidades en torno a intereses comunes.',
        image: '/img/trabajos/4.png',
        url: 'https://taggeon.vercel.app/',
        technologies: ['Javascript', 'PHP', 'MySQL'],
        client: 'Taggeon',
        year: '2022'
      },
      {
        id: 9,
        title: 'Portal para Empresa de Paneles Solares',
        category: 'landing',
        description: 'Portal para empresa de paneles solares.',
        image: '/img/trabajos/8.png',
        url: 'https://technosolis.com.ar/',
       technologies: ['HTML', 'CSS', 'JavaScript'],
        client: 'Techno Solis',
        year: '2023'
      },
    ];
    
    // Agrupar proyectos por categoría
    const categoryDefinitions = {
      landing: {
        name: 'Landing Pages',
        description: 'Páginas optimizadas para la conversión que capturan leads y aumentan tus ventas'
      },
      institucional: {
        name: 'Sitios Institucionales',
        description: 'Páginas corporativas que representan profesionalmente la imagen de tu empresa'
      },
      ecommerce: {
        name: 'E-commerce',
        description: 'Tiendas online y plataformas de venta digital que maximizan los resultados del negocio'
      },
      plataforma: {
        name: 'Plataformas Web',
        description: 'Sistemas web completos que automatizan procesos y mejoran la eficiencia del negocio'
      },
      aplicacion: {
        name: 'Aplicaciones Web',
        description: 'Soluciones digitales personalizadas para necesidades específicas de cada cliente'
      }
    };

    // Obtener categorías únicas
    const categories = [...new Set(projectsData.map(project => project.category))];
    
    // Crear grupos de proyectos por categoría
    const groupedProjects = categories.map(category => {
      return {
        id: category,
        name: categoryDefinitions[category as keyof typeof categoryDefinitions]?.name || category,
        description: categoryDefinitions[category as keyof typeof categoryDefinitions]?.description || '',
        projects: projectsData.filter(project => project.category === category)
      };
    });

    setCategorizedProjects(groupedProjects);
  }, []);

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
        
        {/* Proyectos organizados por categoría */}
        {categorizedProjects.map((category, index) => (
          <section key={category.id} className={`portfolio-category ${index % 2 === 1 ? 'bg-alt' : ''}`}>
            <div className="container">
              <div className="category-header">
                <h2 className="category-title">{category.name}</h2>
                <p className="category-description">{category.description}</p>
              </div>
              
              <div className="projects-grid">
                {category.projects.slice(0, 3).map(project => (
                  <div 
                    className="project-card" 
                    key={project.id}
                    onClick={() => openProjectDetails(project)}
                  >
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="project-info">
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
            </div>
          </section>
        ))}

        <section className="cta-section cta-section-footer">
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
                      {categorizedProjects.find(cat => cat.id === activeProject.category)?.name}
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
                        <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a.5.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
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