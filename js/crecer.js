import { general, niches } from './crecer-preguntas.js';
import { debugDefaults } from './crecer-debug.js';

const params = new URLSearchParams(location.search);
const DEBUG = ['localhost', '127.0.0.1'].includes(location.hostname) && params.get('debug') === '1';
const pinnedNiche = Object.hasOwn(niches, params.get('n')) ? params.get('n') : '';
const storageKey = DEBUG ? 'zigodev-crecer-debug-v1' : 'zigodev-crecer-v1';
const whatsapp = '5491178258076';
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

const fields = [
  { name: 'nombre', label: 'Tu nombre', autocomplete: 'name', max: 80 },
  { name: 'negocio', label: 'Nombre del negocio', autocomplete: 'organization', max: 100 },
  { name: 'ciudad', label: 'Ciudad', autocomplete: 'address-level2', max: 80 },
  {
    name: 'whatsapp',
    label: 'Tu WhatsApp',
    type: 'tel',
    autocomplete: 'tel',
    max: 30,
    help: 'Con código de área, sin 0 ni 15. Ej: 11 1234 5678'
  },
  {
    name: 'instagram',
    label: 'Instagram del negocio',
    optional: true,
    max: 60,
    placeholder: '@tunegocio'
  }
];

function loadDraft() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if (saved?.pinnedNiche === pinnedNiche) return saved;
  } catch {
    // El formulario también funciona con el almacenamiento deshabilitado.
  }
  return {
    pinnedNiche,
    niche: pinnedNiche,
    stage: pinnedNiche ? 'question' : 'niche',
    index: 0,
    answers: [],
    contact: DEBUG ? { ...debugDefaults } : {},
    reference: 'ZD-' + crypto.getRandomValues(new Uint32Array(1))[0].toString(16).padStart(8, '0').toUpperCase(),
    openedWhatsApp: false
  };
}

const state = loadDraft();
const container = document.querySelector('#questionnaire');
const card = document.querySelector('#filtro');
const progress = document.querySelector('#form-progress');
const fitList = document.querySelector('#fit-list');
const heroText = document.querySelectorAll('[data-niche]');

function saveDraft() {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // Las respuestas siguen disponibles en memoria.
  }
}

function element(tag, attributes = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    node.setAttribute(key, value);
  }
  node.append(...children);
  return node;
}

function icon(name) {
  const family = name === 'whatsapp' ? 'fa-brands' : 'fa-solid';
  return element('i', { class: `${family} fa-${name}`, 'aria-hidden': 'true' });
}

function action(text, className, handler, arrow) {
  const button = element('button', { type: 'button', class: className });
  if (arrow === 'arrow-left') button.append(icon(arrow));
  button.append(text);
  if (arrow === 'arrow-right') button.append(icon(arrow));
  button.addEventListener('click', handler);
  return button;
}

function screen(label, title, accent) {
  const heading = element('h3', { class: 'question-title', id: 'current-question', tabindex: '-1' }, title);
  if (accent) heading.append(' ', element('span', {}, accent));
  return element('div', { class: 'form-step' }, element('p', { class: 'step-label' }, label), heading);
}

function optionGroup() {
  return element('div', { class: 'choices', role: 'group', 'aria-labelledby': 'current-question' });
}

function option(group, index, text, selected, choose) {
  const letter = 'ABCDE'[index];
  const button = element('button', {
    class: 'choice',
    type: 'button',
    'data-key': letter,
    'aria-pressed': String(Boolean(selected))
  }, element('span', { class: 'choice-key', 'aria-hidden': 'true' }, letter), element('span', {}, text));
  button.addEventListener('click', choose);
  group.append(button);
  return button;
}

function openStage(stage, index = state.index) {
  state.stage = stage;
  state.index = index;
  render(true);
}

function nicheScreen() {
  const view = screen('Para empezar', '¿Qué tipo de negocio tenés?');
  const group = optionGroup();
  Object.entries(niches).forEach(([key, niche], index) => {
    option(group, index, niche.name, state.niche === key, () => {
      if (state.niche !== key) {
        state.niche = key;
        state.answers = [];
        state.openedWhatsApp = false;
      }
      openStage('question', 0);
    });
  });
  view.append(group);
  return view;
}

function saveAnswer(value, custom = false) {
  const index = state.index;
  const questions = niches[state.niche].questions;
  state.answers[index] = { value, custom };
  state.openedWhatsApp = false;
  if (index + 1 === questions.length) {
    openStage('contact');
  } else {
    openStage('question', index + 1);
  }
}

function textAnswer(question, saved, custom) {
  const input = element('input', {
    type: 'text',
    name: 'respuesta',
    maxlength: '80',
    autocomplete: 'off',
    placeholder: custom ? 'Contanos cuál' : question.placeholder,
    'aria-describedby': 'answer-error'
  });
  if (custom) {
    input.setAttribute('aria-label', 'Contanos cuál');
  } else {
    input.setAttribute('aria-labelledby', 'current-question');
  }
  input.value = saved?.custom === custom ? saved.value : '';
  if (custom && input.value === 'Otro') input.value = '';
  const error = element('p', { class: 'error', id: 'answer-error', role: 'alert' });
  const button = element('button', { type: 'submit', class: 'primary-action' }, 'Seguir', icon('arrow-right'));
  const form = element('form', { class: 'text-answer' }, input, error, button);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const value = input.value.trim();
    if (!custom && value.length < 2) {
      error.textContent = 'Contanos en dos o tres palabras.';
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    saveAnswer(value || 'Otro', custom);
  });
  return form;
}

function questionScreen() {
  const index = state.index;
  const questions = niches[state.niche].questions;
  const question = questions[index];
  const saved = state.answers[index];
  const view = screen(`Pregunta ${index + 1} de ${questions.length}`, question.title);
  if (question.help) view.append(element('p', { class: 'form-note' }, question.help));

  if (question.options) {
    const group = optionGroup();
    let customForm;
    question.options.forEach((answer, optionIndex) => {
      const custom = question.customOption && answer === 'Otro';
      const selected = custom ? saved?.custom : saved?.value === answer && !saved.custom;
      const button = option(group, optionIndex, answer, selected, () => {
        if (!custom) {
          saveAnswer(answer);
          return;
        }
        for (const choice of group.children) choice.setAttribute('aria-pressed', String(choice === button));
        customForm ??= textAnswer(question, saved, true);
        group.after(customForm);
        customForm.querySelector('input').focus();
      });
    });
    view.append(group);
    if (saved?.custom) {
      customForm = textAnswer(question, saved, true);
      view.append(customForm);
    }
  } else {
    view.append(textAnswer(question, saved, false));
  }

  if (index > 0 || !pinnedNiche) {
    view.append(action('Atrás', 'back-action', () => {
      if (index > 0) openStage('question', index - 1);
      else openStage('niche');
    }, 'arrow-left'));
  }
  return view;
}

function contactScreen() {
  const view = screen('Casi listo', 'Dejanos tus datos', 'y seguimos por WhatsApp');
  const form = element('form', { novalidate: '' });
  const grid = element('div', { class: 'contact-fields' });
  const controls = fields.map(field => {
    const id = `contact-${field.name}`;
    const label = element('label', { for: id }, field.label);
    if (field.optional) label.append(' ', element('small', {}, '(opcional)'));
    const input = element('input', {
      id,
      name: field.name,
      type: field.type || 'text',
      autocomplete: field.autocomplete || 'off',
      maxlength: String(field.max),
      'aria-describedby': field.help ? `${id}-help ${id}-error` : `${id}-error`
    });
    if (!field.optional) input.required = true;
    if (field.placeholder) input.placeholder = field.placeholder;
    input.value = state.contact[field.name] || '';
    input.addEventListener('input', () => {
      state.contact[field.name] = input.value;
      state.openedWhatsApp = false;
      saveDraft();
    });
    const row = element('div', { class: 'contact-field' }, label, input);
    if (field.help) row.append(element('p', { class: 'field-help', id: `${id}-help` }, field.help));
    const error = element('p', { class: 'error', id: `${id}-error` });
    row.append(error);
    grid.append(row);
    return { input, error };
  });

  form.append(
    grid,
    element('button', { type: 'submit', class: 'primary-action' }, 'Seguir', icon('arrow-right')),
    element('p', { class: 'form-note' }, 'Usamos estos datos solo para responderte por esta consulta.')
  );
  form.addEventListener('submit', event => {
    event.preventDefault();
    const values = Object.fromEntries(
      controls.map(({ input }) => [input.name, input.value.trim().replace(/\s+/g, ' ')])
    );
    const errors = {
      nombre: values.nombre.length < 2 && 'Poné tu nombre.',
      negocio: values.negocio.length < 2 && 'Poné el nombre del negocio.',
      ciudad: values.ciudad.length < 2 && '¿En qué ciudad están?',
      whatsapp: !/^\d{8,15}$/.test(values.whatsapp.replace(/\D/g, '')) && 'Revisá el número: código de área + número.'
    };
    for (const { input, error } of controls) {
      const message = errors[input.name];
      error.textContent = message || '';
      if (message) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }
    const invalid = form.querySelector('[aria-invalid="true"]');
    if (invalid) {
      invalid.focus();
      return;
    }
    if (JSON.stringify(values) !== JSON.stringify(state.contact)) state.openedWhatsApp = false;
    state.contact = values;
    openStage('review');
  });

  view.append(form, action('Atrás', 'back-action', () => openStage('question'), 'arrow-left'));
  return view;
}

function whatsappMessage() {
  const niche = niches[state.niche];
  const contact = state.contact;
  const lines = [
    `Hola, soy ${contact.nombre} de ${contact.negocio} (${contact.ciudad}). Completé el formulario de ZigoDev:`
  ];
  if (state.niche !== 'otro') lines.push(`• Rubro: ${niche.name}`);
  niche.questions.forEach((question, index) => {
    lines.push(`• ${question.label}: ${state.answers[index].value}`);
  });
  lines.push(`• WhatsApp: ${contact.whatsapp}`);
  if (contact.instagram) {
    const handle = contact.instagram.replace(/^.*instagram\.com\//i, '').replace(/^@+/, '').split(/[/?#]/)[0];
    if (handle) lines.push(`• Instagram: @${handle}`);
  }
  lines.push(`Ref. ${state.reference}`);
  return lines.join('\n');
}

function reviewScreen() {
  const view = screen('Último paso', 'Mandanos', 'el mensaje');
  const text = whatsappMessage();
  const label = element('span', {}, state.openedWhatsApp ? 'Abrir WhatsApp de nuevo' : 'Enviar por WhatsApp');
  const status = element('p', { class: 'whatsapp-status', role: 'status' });
  if (state.openedWhatsApp) status.textContent = 'Si ya mandaste el mensaje, te respondemos por ahí.';
  const link = element('a', {
    class: 'primary-action',
    href: `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`,
    target: '_blank',
    rel: 'noopener noreferrer'
  }, icon('whatsapp'), label);
  link.addEventListener('click', () => {
    state.openedWhatsApp = true;
    saveDraft();
    label.textContent = 'Abrir WhatsApp de nuevo';
    status.textContent = 'Si ya mandaste el mensaje, te respondemos por ahí.';
  });
  view.append(
    element('p', { class: 'form-note' }, 'Abrí WhatsApp con tus respuestas ya escritas y enviá el mensaje.'),
    link,
    status,
    element('div', { class: 'review-header' },
      element('span', { class: 'step-label' }, 'Esto es lo que se manda'),
      action('Corregir', 'text-action', () => openStage('question', 0))
    ),
    element('p', { class: 'message-preview' }, text),
    element('p', { class: 'form-note' }, '¿No se abrió WhatsApp? Escribinos al ',
      element('a', { href: `https://wa.me/${whatsapp}` }, '+54 9 11 7825-8076'),
      ` y pasanos la referencia ${state.reference}.`)
  );
  return view;
}

const screens = {
  niche: nicheScreen,
  question: questionScreen,
  contact: contactScreen,
  review: reviewScreen
};
let displayedNiche;

function render(focus = false) {
  container.replaceChildren(screens[state.stage]());
  const total = niches[state.niche]?.questions.length ?? 6;
  const completed = { niche: 0, question: state.index, contact: total, review: total + 1 };
  progress.max = total + 1;
  progress.value = completed[state.stage];

  if (displayedNiche !== state.niche) {
    const copy = niches[state.niche] || general;
    for (const node of heroText) node.textContent = copy[node.dataset.niche];
    fitList.replaceChildren(...copy.fit.map(text => element('li', {}, icon('check'), text)));
    document.title = `Publicidad en redes para ${copy.audience} | ZigoDev`;
    displayedNiche = state.niche;
  }

  saveDraft();
  if (focus) {
    const heading = container.querySelector('h3');
    heading.focus({ preventScroll: true });
    const rect = heading.getBoundingClientRect();
    const headerHeight = document.querySelector('.campaign-header').offsetHeight;
    if (rect.top < headerHeight + 12 || rect.bottom > innerHeight) {
      card.scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth' });
    }
  }
}

document.addEventListener('keydown', event => {
  if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
  if (event.target.closest('input, textarea, select, [contenteditable]')) return;
  if (!/^[a-e]$/i.test(event.key)) return;
  const button = container.querySelector(`[data-key="${event.key.toUpperCase()}"]`);
  if (!button) return;
  const { top, bottom } = button.getBoundingClientRect();
  if (bottom <= document.querySelector('.campaign-header').offsetHeight || top >= innerHeight) return;
  event.preventDefault();
  button.click();
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
  document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node));
}

render();
