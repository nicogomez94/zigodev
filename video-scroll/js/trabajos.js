/* ============================================================
   ZigoDev — Trabajos / Portfolio Logic
   ============================================================ */

const CATEGORY_LABELS = {
  plataforma:    'Plataforma Web',
  ecommerce:     'E-commerce',
  landing:       'Landing Page',
  institucional: 'Institucional',
};

const PROJECTS = [
  // ── PLATAFORMAS WEB ─────────────────────────────────────
  {
    id: 0,
    title: 'AutoZona — Clasificados de Autos Usados',
    client: 'AutoZona',
    category: 'plataforma',
    description: 'Plataforma de clasificados de autos usados con publicaciones pagas, búsqueda por marca, precio y ubicación, y contacto directo por WhatsApp con el vendedor.',
    image: 'img/autozona.png',
    url: 'https://autozonaclasificados.com',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    year: '2026',
  },
  {
    id: 1,
    title: 'Presupuestador + Reservas + Panel Admin',
    client: 'BLAK',
    category: 'plataforma',
    description: 'Herramienta integral con presupuestos personalizados, reservas en calendario interactivo y panel de administración completo.',
    image: 'img/1.png',
    url: 'https://blak.com.ar',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    year: '2023',
  },
  {
    id: 2,
    title: 'Coordinación de Hockey BDSC',
    client: 'BDSC',
    category: 'plataforma',
    description: 'Sitio autoadministrable para coordinación deportiva del Belgrano Day School Club. Gestión de equipos, horarios y recursos.',
    image: 'img/bdsc.png',
    url: 'https://coordinacionhockey.com.ar',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    year: '2026',
  },
  {
    id: 3,
    title: 'CETRIP — Centro Educativo Terapéutico',
    client: 'Cetrip',
    category: 'plataforma',
    description: 'Sitio institucional con panel de administración para un centro educativo terapéutico integral.',
    image: 'img/cetrip.png',
    url: 'https://cetrip.com.ar/',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    year: '2026',
  },
  {
    id: 4,
    title: 'Panel Admin — Cámara de Comercio',
    client: 'Emilio',
    category: 'plataforma',
    description: 'Sistema de gestión para cámara de comercio: eventos, locales adheridos, noticias y más, todo desde un panel de administración.',
    image: 'img/emilio.png',
    url: 'https://emilio-frontend-shared-db-zwqe.onrender.com/',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    year: '2026',
  },
  {
    id: 5,
    title: 'LG Propiedades — Inmobiliaria',
    client: 'Laura Gutiérrez',
    category: 'plataforma',
    description: 'Sitio inmobiliario con panel de administración para cargar y gestionar propiedades en venta y alquiler.',
    image: 'img/laura.png',
    url: 'https://lauragutierrezpropiedades.com.ar',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    year: '2026',
  },
  {
    id: 6,
    title: 'Seguros Timbúes — Cotizador + Panel Admin',
    client: 'Seguros Timbúes',
    category: 'plataforma',
    description: 'Sitio de seguros con cotizador online, sección de servicios y panel de administración para gestión de clientes y pólizas.',
    image: 'img/segurostimbues.png',
    url: 'https://segurostimbues.com',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    year: '2026',
  },
  {
    id: 7,
    title: 'PASAlert — Gestión de Pólizas para Brokers',
    client: 'PASAlert',
    category: 'plataforma',
    description: 'Sistema de gestión de pólizas de seguro para brokers: dashboard, clientes, vencimientos, comisiones y más.',
    image: 'img/pasalert.png',
    url: 'https://pasalert.com/dashboard',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    year: '2026',
  },
  {
    id: 8,
    title: 'Professionals at Home — Portal de Empleo',
    client: 'Professionals at Home',
    category: 'plataforma',
    description: 'Portal de empleo y reclutamiento online con búsqueda por categoría, idioma y ubicación, registro de candidatos y publicación de ofertas.',
    image: 'img/professionalsathome.png',
    url: 'https://professionalsathome.com/',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    year: '2026',
  },
  {
    id: 9,
    title: 'Viandas Chaneton — Catálogo + Panel Admin',
    client: 'Viandas Chaneton',
    category: 'plataforma',
    description: 'Catálogo de viandas y menú semanal con panel de administración para gestión de productos, pedidos y clientes.',
    image: 'img/viandaschaneton.png',
    url: 'https://viandaschaneton.com.ar',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    year: '2026',
  },
  // ── E-COMMERCE ──────────────────────────────────────────
  {
    id: 10,
    title: 'Tienda para Marca de Ropa — GONELAKE',
    client: 'GONELAKE',
    category: 'ecommerce',
    description: 'Tienda online para marca de ropa con integración a Mercado Pago, gestión de inventario y diseño responsivo optimizado para SEO.',
    image: 'img/gone.jpg',
    url: 'https://gonelake.vercel.app/',
    technologies: ['Shopify'],
    year: '2023',
  },
  {
    id: 11,
    title: 'Inesina Solar — E-Commerce WordPress',
    client: 'Inesina Solar',
    category: 'ecommerce',
    description: 'Sitio E-Commerce en WordPress para empresa de energía solar: catálogo de productos, blog técnico y portafolio de proyectos instalados.',
    image: 'img/2.png',
    url: 'https://inesinasolar.com/',
    technologies: ['WordPress', 'WooCommerce', 'PHP'],
    year: '2020',
  },
  {
    id: 12,
    title: 'Pintá Tu Auto — Tiendanube',
    client: 'Pintá Tu Auto',
    category: 'ecommerce',
    description: 'Tienda en Tiendanube para pintura automotriz: catálogo de colores, kit completo con envío gratis y cuotas sin interés.',
    image: 'img/pintatuauto.png',
    url: 'https://pintatuauto.com.ar',
    technologies: ['Tiendanube'],
    year: '2026',
  },
  // ── LANDING PAGES ───────────────────────────────────────
  {
    id: 13,
    title: 'Keramik — Detailing de Autos',
    client: 'Keramik',
    category: 'landing',
    description: 'Landing page con catálogo de servicios y presupuesto online para empresa de detailing y protección de pintura automotriz.',
    image: 'img/3.png',
    url: 'https://keramik.com.ar/',
    technologies: ['jQuery', 'Bootstrap'],
    year: '2023',
  },
  {
    id: 14,
    title: 'Portfolio — Web Developer',
    client: 'Nicolás Gómez',
    category: 'landing',
    description: 'Portfolio personal con proyectos destacados, stack tecnológico y formulario de contacto. Diseño limpio y moderno, optimizado para SEO.',
    image: 'img/6.png',
    url: 'https://nicolasgomezdev.com.ar/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    year: '2024',
  },
  {
    id: 15,
    title: 'G&G Apartments — Alquiler Turístico',
    client: 'G&G Apartments',
    category: 'landing',
    description: 'Landing page para alquiler turístico en Buenos Aires con integración a sistema de reservas, calendario y optimización SEO.',
    image: 'img/7.png',
    url: 'https://ggapartments.com.ar/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    year: '2024',
  },
  {
    id: 16,
    title: 'AD Seguros — Landing Aseguradora',
    client: 'AD Seguros',
    category: 'landing',
    description: 'Landing page profesional para aseguradora con cotizador de seguro automotor, coberturas y formulario de contacto.',
    image: 'img/adseguros.png',
    url: 'https://ad-seguros.com.ar/',
    technologies: ['React', 'CSS'],
    year: '2026',
  },
  // ── INSTITUCIONAL ────────────────────────────────────────
  {
    id: 17,
    title: 'Techno Solis — Empresa de Paneles Solares',
    client: 'Techno Solis',
    category: 'institucional',
    description: 'Portal corporativo para empresa de paneles solares con catálogo de productos, proyectos realizados y sección de contacto.',
    image: 'img/8.png',
    url: 'https://technosolis.com.ar/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    year: '2023',
  },
  {
    id: 18,
    title: 'GM Comex — Sitio Corporativo',
    client: 'GM Comex',
    category: 'institucional',
    description: 'Sitio institucional corporativo para empresa de comercio exterior con presentación de servicios y equipo profesional.',
    image: 'img/gmcomex.png',
    url: 'https://gmcomex.ar',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    year: '2026',
  },
];

/* ── RENDER ─────────────────────────────────────────────── */
const grid = document.getElementById('port-grid');

function renderCards(projects) {
  grid.innerHTML = '';
  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'proj-card';
    card.dataset.category = p.category;
    card.innerHTML = `
      <div class="proj-img-wrap">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <div class="proj-img-overlay">
          <span class="overlay-cta">Ver detalles →</span>
        </div>
      </div>
      <div class="proj-body">
        <div class="proj-top">
          <span class="proj-cat-badge">${CATEGORY_LABELS[p.category]}</span>
          <span class="proj-year">${p.year}</span>
        </div>
        <h3 class="proj-title">${p.title}</h3>
        <div class="proj-tech">
          ${p.technologies.slice(0, 3).map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>
      </div>
    `;
    card.addEventListener('click', () => openModal(p));
    grid.appendChild(card);
  });
}

renderCards(PROJECTS);

/* ── FILTER ─────────────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    const filtered = cat === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === cat);
    grid.style.opacity = '0';
    setTimeout(() => {
      renderCards(filtered);
      grid.style.opacity = '1';
    }, 180);
  });
});

/* ── MODAL ──────────────────────────────────────────────── */
const modal    = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');

function openModal(p) {
  document.getElementById('modal-img').src       = p.image;
  document.getElementById('modal-img').alt       = p.title;
  document.getElementById('modal-cat').textContent    = CATEGORY_LABELS[p.category];
  document.getElementById('modal-title').textContent  = p.title;
  document.getElementById('modal-client').textContent = p.client  ? `Cliente: ${p.client}` : '';
  document.getElementById('modal-year').textContent   = p.year    ? `Año: ${p.year}` : '';
  document.getElementById('modal-desc').textContent   = p.description;
  document.getElementById('modal-tech').innerHTML     =
    p.technologies.map(t => `<span class="modal-tech-chip">${t}</span>`).join('');
  document.getElementById('modal-url').href = p.url;

  modal.classList.add('open');
  modal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── HAMBURGER MENU ───────────────────────────────────────────
const burger     = document.querySelector('.nav-burger');
const siteHeader = document.querySelector('.site-header');

burger.addEventListener('click', () => {
  const open = siteHeader.classList.toggle('nav-open');
  burger.setAttribute('aria-expanded', open);
  document.querySelector('.nav-drawer').setAttribute('aria-hidden', !open);
});

document.querySelectorAll('.nav-drawer a').forEach(link => {
  link.addEventListener('click', () => {
    siteHeader.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
    document.querySelector('.nav-drawer').setAttribute('aria-hidden', 'true');
  });
});
