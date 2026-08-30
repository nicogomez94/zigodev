const PROJECTS = [
  { id: 35, name: "Brumma", detail: "Tienda online de espumas saborizadas, jarabes y kits para bebidas.", category: "E-commerce", url: "https://brumma.ar" },
  { id: 34, name: "Armentia Propiedades", detail: "Landing inmobiliaria con buscador y panel de administración.", category: "Plataforma", url: "https://armentiapropiedades.com" },
  { id: 33, name: "VIALCO", detail: "Sitio institucional para administración profesional de consorcios.", category: "Institucional", url: "https://vialco.site/" },
  { id: 32, name: "Scorpions", detail: "Tienda online industrial desarrollada desde cero.", category: "E-commerce", url: "https://scorpions-indu.com" },
  { id: 31, name: "MG Seguridad", detail: "Sitio institucional para servicios de seguridad y control.", category: "Institucional", url: "https://mg-seguridad.onrender.com" },
  { id: 30, name: "KOS Limpieza", detail: "Sitio institucional de mantenimiento y limpieza profesional.", category: "Institucional", url: "https://koslimpieza.com.ar" },
  { id: 29, name: "NetSalud Natural", detail: "Tienda online en Shopify para productos de salud natural.", category: "E-commerce", url: "https://netsaludnatural.com.ar" },
  { id: 28, name: "EXVER Fachadas", detail: "Sitio institucional de mantenimiento y trabajos en altura.", category: "Institucional", url: "https://exverfachadas.com.ar/" },
  { id: 27, name: "Buenos Aires Refrigeración", detail: "Landing para servicio técnico de refrigeración con turnos online.", category: "Landing", url: "https://refrigeravilndigital.site" },
  { id: 26, name: "Suriosidd", detail: "Landing institucional con chatbot integrado.", category: "Landing", url: "https://suriosidd.com" },
  { id: 25, name: "Andrea Alkalay", detail: "Portfolio web para artista visual.", category: "Landing", url: "https://andrealkalay.com" },
  { id: 24, name: "Pacha Purum", detail: "Tienda online de láminas vegetales desarrollada desde cero.", category: "E-commerce", url: "https://pachapurum.com" },
  { id: 23, name: "Renovables Pro", detail: "Sitio institucional de ingeniería y soluciones de energía solar.", category: "Institucional", url: "https://renovablespro.com.ar" },
  { id: 19, name: "Kadima Salud", detail: "Sitio institucional para consultoría en salud.", category: "Institucional", url: "https://kadimasalud.com.ar" },
  { id: 20, name: "Cultura Animal", detail: "Tienda de cursos de peluquería canina.", category: "E-commerce", url: "http://culturaanimal.com.ar" },
  { id: 21, name: "Metal Santiago", detail: "E-commerce de ferretería y construcción.", category: "E-commerce", url: "https://ferreteriametalsantiago.com" },
  { id: 22, name: "Voyage Turismo", detail: "Plataforma de viajes, paquetes y experiencias.", category: "Plataforma", url: "https://voyage-turismo.onrender.com" },
  { id: 0, name: "AutoZona", detail: "Clasificados de autos con publicaciones y contacto directo.", category: "Plataforma", url: "https://autozonaclasificados.com" },
  { id: 1, name: "BLAK", detail: "Presupuestador, reservas y panel de gestión.", category: "Plataforma", url: "https://blak.com.ar" },
  { id: 2, name: "BDSC Hockey", detail: "Gestión de equipos, horarios y recursos deportivos.", category: "Plataforma", url: "https://coordinacionhockey.com.ar" },
  { id: 3, name: "CETRIP", detail: "Sitio institucional con panel autoadministrable.", category: "Plataforma", url: "https://cetrip.com.ar" },
  { id: 4, name: "Cámara de Comercio", detail: "Gestión de eventos, locales y noticias.", category: "Plataforma", url: "https://emilio-frontend-shared-db-zwqe.onrender.com" },
  { id: 5, name: "LG Propiedades", detail: "Portal inmobiliario con gestión de propiedades.", category: "Plataforma", url: "https://lauragutierrezpropiedades.com.ar" },
  { id: 6, name: "Seguros Timbúes", detail: "Cotizador de seguros y panel de administración.", category: "Plataforma", url: "https://segurostimbues.com" },
  { id: 7, name: "PASAlert", detail: "Sistema de gestión de pólizas para brokers.", category: "Plataforma", url: "https://pasalert.com/dashboard" },
  { id: 8, name: "Professionals at Home", detail: "Portal de empleo y reclutamiento online.", category: "Plataforma", url: "https://professionalsathome.com" },
  { id: 9, name: "Viandas Chaneton", detail: "Catálogo de viandas con menú y panel de gestión.", category: "Plataforma", url: "https://viandaschaneton.com.ar" },
  { id: 10, name: "GONELAKE", detail: "Tienda online para marca de ropa.", category: "E-commerce", url: "https://gonelake.vercel.app" },
  { id: 11, name: "Inesina Solar", detail: "E-commerce de energía solar en WordPress.", category: "E-commerce", url: "https://inesinasolar.com" },
  { id: 12, name: "Pintá Tu Auto", detail: "Tienda online de pintura automotriz.", category: "E-commerce", url: "https://pintatuauto.com.ar" },
  { id: 13, name: "Keramik", detail: "Landing de detailing y protección automotriz.", category: "Landing", url: "https://keramik.com.ar" },
  { id: 14, name: "Nicolás Gómez", detail: "Portfolio profesional de desarrollo web.", category: "Landing", url: "https://portfolio-wvoh.onrender.com" },
  { id: 15, name: "G&G Apartments", detail: "Landing de alquiler turístico con reservas.", category: "Landing", url: "https://ggapartments.com.ar" },
  { id: 16, name: "AD Seguros", detail: "Landing de seguros con cotizador online.", category: "Landing", url: "https://ad-seguros.com.ar" },
  { id: 17, name: "Techno Solis", detail: "Sitio corporativo de soluciones de energía solar.", category: "Institucional", url: "https://technosolis.com.ar" },
  { id: 18, name: "GM Comex", detail: "Sitio corporativo de comercio exterior.", category: "Institucional", url: "https://gmcomex.ar" },
];

const STORAGE_KEY = "zigodev-selected-projects";
const EMPTY_MESSAGE = "Elegí uno o más trabajos y el mensaje va a aparecer acá.";

const elements = {
  list: document.querySelector("#project-list"),
  filters: document.querySelector("#category-filters"),
  search: document.querySelector("#project-search"),
  count: document.querySelector("#selected-count"),
  clear: document.querySelector("#clear-selection"),
  preview: document.querySelector("#message-preview"),
  copy: document.querySelector("#copy-message"),
  whatsapp: document.querySelector("#open-whatsapp"),
  emptyResults: document.querySelector("#empty-results"),
  toast: document.querySelector("#toast"),
};

let activeCategory = "Todos";
let selectedIds = loadSelection();
let toastTimer;

function loadSelection() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(stored)) return new Set();
    const validIds = new Set(PROJECTS.map((project) => project.id));
    return new Set(stored.filter((id) => validIds.has(id)));
  } catch {
    return new Set();
  }
}

function saveSelection() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...selectedIds]));
}

function normalizeText(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function visibleProjects() {
  const term = normalizeText(elements.search.value.trim());
  return PROJECTS.filter((project) => {
    const matchesCategory = activeCategory === "Todos" || project.category === activeCategory;
    const haystack = normalizeText(`${project.name} ${project.detail}`);
    return matchesCategory && (!term || haystack.includes(term));
  });
}

function renderFilters() {
  const categories = ["Todos", ...new Set(PROJECTS.map((project) => project.category))];
  elements.filters.innerHTML = categories
    .map((category) => {
      const count = category === "Todos" ? PROJECTS.length : PROJECTS.filter((project) => project.category === category).length;
      return `<button class="filter-button${category === activeCategory ? " is-active" : ""}" type="button" data-category="${category}">${category} · ${count}</button>`;
    })
    .join("");
}

function renderProjects() {
  const projects = visibleProjects();
  elements.emptyResults.hidden = projects.length > 0;
  elements.list.innerHTML = projects
    .map((project, index) => {
      const checked = selectedIds.has(project.id);
      return `
        <label class="project-option${checked ? " is-selected" : ""}" style="animation-delay:${Math.min(index * 25, 250)}ms">
          <input type="checkbox" value="${project.id}" ${checked ? "checked" : ""} />
          <span class="custom-check" aria-hidden="true">
            <svg viewBox="0 0 20 20"><path d="m4 10 4 4 8-9" /></svg>
          </span>
          <span class="project-info">
            <span class="project-name">${project.name}</span>
            <span class="project-detail">${project.detail}</span>
          </span>
          <span class="project-type">${project.category}</span>
        </label>`;
    })
    .join("");
}

function selectedProjects() {
  return PROJECTS.filter((project) => selectedIds.has(project.id));
}

function buildMessage() {
  const projects = selectedProjects();
  if (!projects.length) return "";

  const items = projects.map((project) => `• *${project.name}* — ${project.detail}\n${project.url}`);
  return `${items.join("\n")}\n\nMás en zigodev.com.ar`;
}

function updateMessage() {
  const message = buildMessage();
  const total = selectedIds.size;

  elements.count.textContent = total;
  elements.clear.disabled = total === 0;
  elements.copy.disabled = total === 0;
  elements.preview.textContent = message || EMPTY_MESSAGE;
  elements.preview.classList.toggle("is-empty", !message);

  if (message) {
    elements.whatsapp.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
    elements.whatsapp.classList.remove("is-disabled");
    elements.whatsapp.removeAttribute("aria-disabled");
    elements.whatsapp.tabIndex = 0;
  } else {
    elements.whatsapp.href = "#";
    elements.whatsapp.classList.add("is-disabled");
    elements.whatsapp.setAttribute("aria-disabled", "true");
    elements.whatsapp.tabIndex = -1;
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 1800);
}

async function copyMessage() {
  const message = buildMessage();
  if (!message) return;

  try {
    await navigator.clipboard.writeText(message);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = message;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  const label = elements.copy.querySelector("span");
  label.textContent = "¡Copiado!";
  showToast("Mensaje copiado");
  window.setTimeout(() => {
    label.textContent = "Copiar mensaje";
  }, 1600);
}

elements.list.addEventListener("change", (event) => {
  const checkbox = event.target.closest('input[type="checkbox"]');
  if (!checkbox) return;

  const id = Number(checkbox.value);
  checkbox.checked ? selectedIds.add(id) : selectedIds.delete(id);
  checkbox.closest(".project-option").classList.toggle("is-selected", checkbox.checked);
  saveSelection();
  updateMessage();
});

elements.filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderProjects();
});

elements.search.addEventListener("input", renderProjects);

elements.clear.addEventListener("click", () => {
  selectedIds.clear();
  saveSelection();
  renderProjects();
  updateMessage();
});

elements.copy.addEventListener("click", copyMessage);

elements.whatsapp.addEventListener("click", (event) => {
  if (!buildMessage()) event.preventDefault();
});

renderFilters();
renderProjects();
updateMessage();
