const rol = (title, affirmative = 'Sí, es mío') => ({
  label: 'Rol',
  title,
  options: [affirmative, 'Soy socio/a', 'Trabajo en el equipo y participo de la decisión']
});

const presupuesto = options => ({
  label: 'Inversión estimada',
  title: '¿Qué inversión tenés prevista para este proyecto?',
  help: 'Es una referencia para proponerte una solución adecuada.',
  options: [...options, 'Todavía no lo sé']
});

export const verticals = {
  inmobiliarias: {
    name: 'Inmobiliarias',
    fit: [
      'Querés recibir consultas de personas interesadas en propiedades',
      'Tenés una zona de trabajo definida',
      'Podés responder consultas y coordinar visitas'
    ],
    questions: [
      rol('¿La inmobiliaria es tuya?', 'Sí, es mía'),
      {
        label: 'Objetivo',
        title: '¿Qué tipo de oportunidades querés captar?',
        options: ['Propietarios que quieren vender', 'Propietarios que quieren alquilar', 'Compradores', 'Inquilinos', 'Una combinación']
      },
      {
        label: 'Propiedades',
        title: '¿Con qué propiedades trabajás principalmente?',
        options: ['Casas y departamentos', 'Terrenos y desarrollos', 'Locales y oficinas', 'De todo un poco']
      },
      {
        label: 'Zona',
        title: '¿En qué ciudad o zona trabajás?',
        placeholder: 'Ej: Rosario y alrededores'
      },
      {
        label: 'Consultas actuales',
        title: '¿Cómo llegan hoy las consultas?',
        options: ['Portales inmobiliarios', 'Redes y WhatsApp', 'Mi sitio web', 'Referidos', 'Todavía recibo pocas']
      },
      presupuesto(['Hasta USD 1.000', 'Entre USD 1.000 y 3.000', 'Más de USD 3.000'])
    ]
  },
  comercios: {
    name: 'Comercios y empresas de servicios',
    fit: [
      'Ya vendés productos o servicios',
      'Querés recibir consultas más claras y ordenadas',
      'Podés atender nuevos clientes'
    ],
    questions: [
      rol('¿El negocio es tuyo?'),
      {
        label: 'Actividad',
        title: '¿Qué ofrecés principalmente?',
        options: ['Productos en un comercio', 'Servicios a particulares', 'Servicios a empresas', 'Productos y servicios']
      },
      {
        label: 'Objetivo',
        title: '¿Qué querés que haga un cliente nuevo?',
        options: ['Pedir un presupuesto', 'Reservar un turno', 'Consultar por un producto', 'Visitar el local', 'Otro'],
        customOption: true
      },
      {
        label: 'Consultas actuales',
        title: '¿Por dónde te contactan hoy?',
        options: ['WhatsApp', 'Instagram o Facebook', 'Mi sitio web', 'En el local', 'Por varios canales']
      },
      {
        label: 'Capacidad',
        title: '¿Podés atender más clientes este mes?',
        options: ['Sí, tengo capacidad', 'Sí, si organizamos las consultas', 'Por ahora, poca capacidad']
      },
      presupuesto(['Hasta USD 1.000', 'Entre USD 1.000 y 3.000', 'Más de USD 3.000'])
    ]
  },
  sistemas: {
    name: 'Sistemas para pymes',
    fit: [
      'Hay un proceso que te quita tiempo cada semana',
      'Necesitás ordenar datos, clientes o tareas',
      'Buscás un sistema adaptado a tu forma de trabajar'
    ],
    questions: [
      rol('¿La pyme es tuya?', 'Sí, es mía'),
      {
        label: 'Proceso',
        title: '¿Qué proceso querés resolver con un sistema?',
        options: ['Ventas y clientes', 'Turnos y reservas', 'Stock y pedidos', 'Operación interna', 'Otro'],
        customOption: true
      },
      {
        label: 'Herramientas actuales',
        title: '¿Cómo gestionan ese proceso hoy?',
        options: ['Planillas', 'WhatsApp y mensajes', 'Un sistema que nos queda corto', 'Todavía no está organizado']
      },
      {
        label: 'Equipo',
        title: '¿Cuántas personas usarían el sistema?',
        options: ['1 a 3', '4 a 10', '11 a 30', 'Más de 30']
      },
      {
        label: 'Prioridad',
        title: '¿Cuándo te gustaría empezar?',
        options: ['Lo antes posible', 'En 1 a 3 meses', 'Estoy explorando opciones']
      },
      presupuesto(['Hasta USD 2.000', 'Entre USD 2.000 y 5.000', 'Más de USD 5.000'])
    ]
  },
  webs: {
    name: 'Webs para pymes',
    fit: [
      'Querés mostrar mejor lo que hace tu empresa',
      'Necesitás que la web genere consultas',
      'Buscás una presencia profesional y fácil de usar'
    ],
    questions: [
      rol('¿La pyme es tuya?', 'Sí, es mía'),
      {
        label: 'Sitio actual',
        title: '¿Tu empresa ya tiene una web?',
        options: ['No, sería la primera', 'Sí, pero necesita renovarse', 'Sí, quiero una web nueva para otro proyecto']
      },
      {
        label: 'Objetivo',
        title: '¿Qué debería lograr la nueva web?',
        options: ['Generar consultas', 'Mostrar servicios y trabajos', 'Permitir reservas o turnos', 'Presentar la empresa', 'Otro'],
        customOption: true
      },
      {
        label: 'Contenido',
        title: '¿Ya tenés textos, fotos y marca para la web?',
        options: ['Sí, está todo listo', 'Tengo una parte', 'Necesito ayuda con eso']
      },
      {
        label: 'Plazo',
        title: '¿Cuándo te gustaría publicarla?',
        options: ['Lo antes posible', 'En 1 a 3 meses', 'Aún no tengo fecha']
      },
      presupuesto(['Hasta USD 1.000', 'Entre USD 1.000 y 3.000', 'Más de USD 3.000'])
    ]
  },
  ecommerce: {
    name: 'E-commerce',
    fit: [
      'Tenés productos listos para vender',
      'Querés ordenar la compra de punta a punta',
      'Podés gestionar pedidos y entregas'
    ],
    questions: [
      rol('¿El negocio es tuyo?'),
      {
        label: 'Productos',
        title: '¿Qué tipo de productos vendés?',
        placeholder: 'Ej: ropa, muebles, alimentos'
      },
      {
        label: 'Venta actual',
        title: '¿Cómo vendés hoy?',
        options: ['Local físico', 'Instagram o WhatsApp', 'Marketplace', 'Ya tengo una tienda online', 'Estoy por empezar']
      },
      {
        label: 'Catálogo',
        title: '¿Cuántos productos querés publicar al inicio?',
        options: ['Hasta 20', 'Entre 21 y 100', 'Más de 100', 'Todavía no lo sé']
      },
      {
        label: 'Operación',
        title: '¿Qué necesitás resolver en la tienda?',
        options: ['Pagos online', 'Envíos', 'Stock y pedidos', 'Todo el proceso de compra']
      },
      presupuesto(['Hasta USD 2.000', 'Entre USD 2.000 y 5.000', 'Más de USD 5.000'])
    ]
  }
};
