const presupuesto = {
  label: 'Presupuesto',
  title: '¿Cuánto podés invertir por mes para crecer, sumando gestión y anuncios?',
  help: 'Es para orientarnos. Elijas lo que elijas, seguimos la charla por WhatsApp.',
  options: ['Menos de USD 600', 'Entre USD 600 y 1.200', 'Más de USD 1.200', 'Todavía no lo sé']
};

function titular(title, affirmative = 'Sí, es mío') {
  return {
    label: 'Dueño/a',
    title,
    options: [affirmative, 'Soy socio/a', 'No, trabajo ahí']
  };
}

const capacidad = {
  label: 'Lugar para clientes nuevos',
  title: '¿Tenés lugar para clientes nuevos?',
  options: ['Sí, tengo lugar', 'Justo, pero puedo sumar', 'Hoy no tengo lugar']
};

const respuesta = {
  label: 'Responden',
  title: '¿Quién contesta las consultas que llegan?',
  options: ['Yo, cuando puedo', 'Alguien del equipo, en el día', 'Alguien del equipo, en menos de 1 hora']
};

export const general = {
  audience: 'negocios de servicios',
  customer: 'cliente',
  customers: 'clientes',
  fit: [
    'Ya vendés y querés más clientes',
    'Tenés lugar para atender más',
    'Alguien contesta los mensajes en el día'
  ]
};

// El orden de estas entradas define el orden del selector de rubros.
export const niches = {
  inmobiliaria: {
    ...general,
    name: 'Inmobiliaria',
    audience: 'inmobiliarias',
    fit: [
      'Querés captar propiedades o generar consultas de compradores e inquilinos',
      'Tenés una zona de trabajo definida',
      'Alguien puede responder y coordinar visitas'
    ],
    questions: [
      titular('¿La inmobiliaria es tuya?', 'Sí, es mía'),
      {
        label: 'Objetivo',
        title: '¿Qué querés conseguir con la campaña?',
        options: ['Captar propiedades', 'Más consultas para venta', 'Más consultas para alquiler', 'Otro'],
        customOption: true
      },
      {
        label: 'Tipo de propiedad',
        title: '¿Con qué propiedades trabajás más?',
        options: ['Departamentos y casas', 'Terrenos y desarrollos', 'Locales y oficinas', 'Otro'],
        customOption: true
      },
      {
        label: 'Zona',
        title: '¿En qué ciudad o zona trabajás?',
        placeholder: 'Ej: Rosario y alrededores'
      },
      respuesta,
      presupuesto
    ]
  },
  automotor: {
    ...general,
    name: 'Negocio automotor',
    audience: 'negocios del rubro automotor',
    fit: [
      'Querés recibir consultas sobre vehículos o servicios automotores',
      'Podés cotizar o coordinar visitas y turnos',
      'Alguien responde los mensajes durante el día'
    ],
    questions: [
      titular('¿El negocio es tuyo?'),
      {
        label: 'Actividad',
        title: '¿A qué se dedica tu negocio?',
        options: ['Venta de vehículos', 'Compra de vehículos', 'Detailing o ploteo', 'Taller o servicio técnico', 'Otro'],
        customOption: true
      },
      {
        label: 'Objetivo',
        title: '¿Qué querés que hagan las personas que te escriban?',
        options: ['Consultar por un vehículo', 'Ofrecer su vehículo', 'Pedir un presupuesto', 'Reservar un turno', 'Otro'],
        customOption: true
      },
      {
        label: 'Zona',
        title: '¿En qué ciudad o zona atendés?',
        placeholder: 'Ej: Zona norte del Gran Buenos Aires'
      },
      respuesta,
      presupuesto
    ]
  },
  seguros: {
    ...general,
    name: 'Productor o broker de seguros',
    audience: 'productores y brokers de seguros',
    fit: [
      'Querés sumar solicitudes de cotización',
      'Tenés identificadas las coberturas que querés vender',
      'Podés hacer seguimiento de las cotizaciones'
    ],
    questions: [
      {
        label: 'Actividad',
        title: '¿Cuál es tu rol en el negocio?',
        options: ['Soy productor/a asesor/a', 'Soy dueño/a o socio/a de un broker', 'Trabajo en el equipo comercial', 'Otro'],
        customOption: true
      },
      {
        label: 'Cobertura',
        title: '¿Qué tipo de seguro querés vender más?',
        options: ['Auto o moto', 'Hogar o comercio', 'Vida o salud', 'Seguros para empresas', 'Otro'],
        customOption: true
      },
      {
        label: 'Zona',
        title: '¿En qué ciudades o provincias atendés?',
        placeholder: 'Ej: Santa Fe y Córdoba'
      },
      capacidad,
      {
        label: 'Seguimiento',
        title: '¿Cómo hacen el seguimiento de las cotizaciones?',
        options: ['Lo hago por WhatsApp', 'Lo hace el equipo comercial', 'Usamos un sistema de seguimiento', 'Todavía no hacemos seguimiento']
      },
      presupuesto
    ]
  },
  servicios: {
    ...general,
    name: 'Empresa de servicios técnicos',
    audience: 'empresas de servicios técnicos',
    fit: [
      'Ofrecés instalaciones, reparaciones o mantenimiento',
      'Tenés una zona de cobertura definida',
      'Podés recibir nuevos pedidos de presupuesto'
    ],
    questions: [
      titular('¿La empresa es tuya?', 'Sí, es mía'),
      {
        label: 'Servicio',
        title: '¿Qué servicio querés promocionar?',
        options: ['Instalaciones', 'Reparaciones', 'Mantenimiento', 'Otro'],
        customOption: true
      },
      {
        label: 'Tipo de cliente',
        title: '¿A quién le ofrecés el servicio?',
        options: ['Particulares', 'Comercios y empresas', 'Consorcios', 'A varios tipos de clientes']
      },
      {
        label: 'Zona',
        title: '¿En qué zonas prestás el servicio?',
        placeholder: 'Ej: CABA y Gran Buenos Aires'
      },
      respuesta,
      presupuesto
    ]
  },
  otro: {
    ...general,
    name: 'Otro rubro',
    questions: [
      {
        label: 'Rubro',
        title: '¿De qué es tu negocio?',
        placeholder: 'Ej: veterinaria, gimnasio, inmobiliaria'
      },
      titular('¿El negocio es tuyo?'),
      {
        label: 'Equipo',
        title: '¿Cuántos son en el equipo?',
        options: ['Solo yo', 'Somos de 2 a 4', 'Somos 5 o más']
      },
      capacidad,
      respuesta,
      presupuesto
    ]
  }
};
