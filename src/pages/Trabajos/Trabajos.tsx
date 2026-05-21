import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../assets/styles/trabajos.css';

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

const CATEGORY_LABELS: Record<string, string> = {
  plataforma: 'Plataforma Web',
  ecommerce: 'E-commerce',
  landing: 'Landing Page',
  institucional: 'Institucional',
};

const FILTERS = [
  { id: 'all', name: 'Todos' },
  { id: 'plataforma', name: 'Plataformas Web' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'landing', name: 'Landing Pages' },
  { id: 'institucional', name: 'Institucional' },
];

const ALL_PROJECTS: Project[] = [
  // ── PLATAFORMAS WEB ─────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'Presupuestador + Reservas + Panel Admin',
    category: 'plataforma',
    description: 'Herramienta integral con presupuestos personalizados, reservas en calendario interactivo y panel de administración completo.',
    image: '/img/trabajos/1.png',
    url: 'https://blak.com.ar',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    client: 'BLAK',
    year: '2023'
  },
  {
    id: 3,
    title: 'Coordinación de Hockey BDSC',
    category: 'plataforma',
    description: 'Sitio autoadministrable para coordinación deportiva del Belgrano Day School Club. Gestión de equipos, horarios y recursos.',
    image: '/img/trabajos/bdsc.png',
    url: 'https://coordinacionhockey.com.ar',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    client: 'BDSC',
    year: '2026'
  },
  {
    id: 4,
    title: 'CETRIP — Centro Educativo Terapéutico',
    category: 'plataforma',
    description: 'Sitio institucional con panel de administración para un centro educativo terapéutico integral.',
    image: '/img/trabajos/cetrip.png',
    url: 'https://cetrip.com.ar/',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    client: 'Cetrip',
    year: '2026'
  },
  {
    id: 5,
    title: 'Panel Admin — Cámara de Comercio',
    category: 'plataforma',
    description: 'Sistema de gestión para cámara de comercio: eventos, locales adheridos, noticias y más, todo desde un panel de administración.',
    image: '/img/trabajos/emilio.png',
    url: 'https://emilio-frontend-shared-db-zwqe.onrender.com/',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    client: 'Emilio',
    year: '2026'
  },
  {
    id: 6,
    title: 'LG Propiedades — Inmobiliaria',
    category: 'plataforma',
    description: 'Sitio inmobiliario con panel de administración para cargar y gestionar propiedades en venta y alquiler.',
    image: '/img/trabajos/laura.png',
    url: 'https://lauragutierrezpropiedades.com.ar',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    client: 'Laura Gutiérrez',
    year: '2026'
  },
  {
    id: 7,
    title: 'Seguros Timbúes — Cotizador + Panel Admin',
    category: 'plataforma',
    description: 'Sitio de seguros con cotizador online, sección de servicios y panel de administración para gestión de clientes y pólizas.',
    image: '/img/trabajos/segurostimbues.png',
    url: 'https://segurostimbues.com',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    client: 'Seguros Timbúes',
    year: '2026'
  },
  {
    id: 8,
    title: 'PASAlert — Gestión de Pólizas para Brokers',
    category: 'plataforma',
    description: 'Sistema de gestión de pólizas de seguro para brokers: dashboard, clientes, vencimientos, comisiones y más.',
    image: '/img/trabajos/pasalert.png',
    url: 'https://pasalert.com/dashboard',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    client: 'PASAlert',
    year: '2026'
  },
  {
    id: 9,
    title: 'Professionals at Home — Portal de Empleo',
    category: 'plataforma',
    description: 'Portal de empleo y reclutamiento online con búsqueda por categoría, idioma y ubicación, registro de candidatos y publicación de ofertas.',
    image: '/img/trabajos/professionalsathome.png',
    url: 'https://professionalsathome.com/',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    client: 'Professionals at Home',
    year: '2026'
  },
  {
    id: 10,
    title: 'Viandas Chaneton — Catálogo + Panel Admin',
    category: 'plataforma',
    description: 'Catálogo de viandas y menú semanal con panel de administración para gestión de productos, pedidos y clientes.',
    image: '/img/trabajos/viandaschaneton.png',
    url: 'https://viandaschaneton.com.ar',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    client: 'Viandas Chaneton',
    year: '2026'
  },
  // ── E-COMMERCE ──────────────────────────────────────────────────────────────
  {
    id: 11,
    title: 'Tienda para Marca de Ropa — GONELAKE',
    category: 'ecommerce',
    description: 'Tienda online para marca de ropa con integración a Mercado Pago, gestión de inventario y diseño responsivo optimizado para SEO.',
    image: '/img/trabajos/gone.jpg',
    url: 'https://gonelake.vercel.app/',
    technologies: ['Shopify'],
    client: 'GONELAKE',
    year: '2023'
  },
  {
    id: 12,
    title: 'Inesina Solar — E-Commerce WordPress',
    category: 'ecommerce',
    description: 'Sitio E-Commerce en WordPress para empresa de energía solar: catálogo de productos, blog técnico y portafolio de proyectos instalados.',
    image: '/img/trabajos/2.png',
    url: 'https://inesinasolar.com/',
    technologies: ['WordPress', 'WooCommerce', 'PHP'],
    client: 'Inesina Solar',
    year: '2020'
  },
  {
    id: 14,
    title: 'Pintá Tu Auto — Tiendanube',
    category: 'ecommerce',
    description: 'Tienda en Tiendanube para pintura automotriz: catálogo de colores, kit completo con envío gratis y cuotas sin interés.',
    image: '/img/trabajos/pintatuauto.png',
    url: 'https://pintatuauto.com.ar',
    technologies: ['Tiendanube'],
    client: 'Pintá Tu Auto',
    year: '2026'
  },
  // ── LANDING PAGES ───────────────────────────────────────────────────────────
  {
    id: 15,
    title: 'Keramik — Detailing de Autos',
    category: 'landing',
    description: 'Landing page con catálogo de servicios y presupuesto online para empresa de detailing y protección de pintura automotriz.',
    image: '/img/trabajos/3.png',
    url: 'https://keramik.com.ar/',
    technologies: ['jQuery', 'Bootstrap'],
    client: 'Keramik',
    year: '2023'
  },
  {
    id: 16,
    title: 'Portfolio — Web Developer',
    category: 'landing',
    description: 'Portfolio personal con proyectos destacados, stack tecnológico y formulario de contacto. Diseño limpio y moderno, optimizado para SEO.',
    image: '/img/trabajos/6.png',
    url: 'https://nicolasgomezdev.com.ar/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    client: 'Nicolás Gómez',
    year: '2024'
  },
  {
    id: 17,
    title: 'G&G Apartments — Alquiler Turístico',
    category: 'landing',
    description: 'Landing page para alquiler turístico en Buenos Aires con integración a sistema de reservas, calendario y optimización SEO.',
    image: '/img/trabajos/7.png',
    url: 'https://ggapartments.com.ar/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    client: 'G&G Apartments',
    year: '2024'
  },
  {
    id: 18,
    title: 'AD Seguros — Landing Aseguradora',
    category: 'landing',
    description: 'Landing page profesional para aseguradora con cotizador de seguro automotor, coberturas y formulario de contacto.',
    image: '/img/trabajos/adseguros.png',
    url: 'https://ad-seguros.com.ar/',
    technologies: ['React', 'CSS'],
    client: 'AD Seguros',
    year: '2026'
  },
  // ── INSTITUCIONAL ────────────────────────────────────────────────────────────
  {
    id: 19,
    title: 'Techno Solis — Empresa de Paneles Solares',
    category: 'institucional',
    description: 'Portal corporativo para empresa de paneles solares con catálogo de productos, proyectos realizados y sección de contacto.',
    image: '/img/trabajos/8.png',
    url: 'https://technosolis.com.ar/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    client: 'Techno Solis',
    year: '2023'
  },
  {
    id: 20,
    title: 'GM Comex — Sitio Corporativo',
    category: 'institucional',
    description: 'Sitio institucional corporativo para empresa de comercio exterior con presentación de servicios y equipo profesional.',
    image: '/img/trabajos/gmcomex.png',
    url: 'https://gmcomex.ar',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    client: 'GM Comex',
    year: '2026'
  },
];

const Trabajos: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>(ALL_PROJECTS);

  const handleFilterChange = (categoryId: string) => {
    if (categoryId === activeFilter || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveFilter(categoryId);
      setDisplayedProjects(
        categoryId === 'all'
          ? ALL_PROJECTS
          : ALL_PROJECTS.filter(p => p.category === categoryId)
      );
      setIsTransitioning(false);
    }, 200);
  };

  const openProjectDetails = (project: Project) => {
    setActiveProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setActiveProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Header />
      <main className="portfolio-page">

        {/* Hero */}
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

        {/* Filters + Grid */}
        <section className="portfolio-content">
          <div className="container">

            {/* Filter tabs */}
            <div className="portfolio-filters">
              {FILTERS.map(filter => {
                const count = filter.id === 'all'
                  ? ALL_PROJECTS.length
                  : ALL_PROJECTS.filter(p => p.category === filter.id).length;
                return (
                  <button
                    key={filter.id}
                    className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                    onClick={() => handleFilterChange(filter.id)}
                  >
                    {filter.name}
                    <span className="filter-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Projects grid */}
            <div className={`projects-grid ${isTransitioning ? 'grid-hidden' : 'grid-visible'}`}>
              {displayedProjects.map(project => (
                <div
                  className="project-card"
                  key={project.id}
                  onClick={() => openProjectDetails(project)}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} loading="lazy" />
                    <div className="project-image-overlay">
                      <p className="project-overlay-desc">{project.description}</p>
                      <span className="overlay-cta">Ver detalles →</span>
                    </div>
                  </div>
                  <div className="project-info">
                    <div className="project-info-top">
                      <span className="project-category-badge">
                        {CATEGORY_LABELS[project.category] ?? project.category}
                      </span>
                      <span className="project-year">{project.year}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <div className="project-tech">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA */}
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
                      {CATEGORY_LABELS[activeProject.category] ?? activeProject.category}
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
