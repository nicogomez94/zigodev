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

export const niches = {
  contable: {
    ...general,
    name: 'Estudio contable',
    audience: 'estudios contables',
    fit: [
      'Sos dueño/a o socio/a del estudio',
      'Tienen equipo y lugar para más clientes',
      'Alguien contesta las consultas en el día'
    ],
    questions: [
      titular('¿El estudio es tuyo?'),
      {
        label: 'Equipo',
        title: '¿Cuántos son en el estudio?',
        options: ['Solo yo', 'Somos de 2 a 4', 'Somos 5 o más']
      },
      {
        label: 'Quiere vender',
        title: '¿Qué servicio querés vender más?',
        options: ['Monotributo e impuestos', 'Sueldos y cargas sociales', 'Contabilidad de empresas', 'Otro'],
        customOption: true
      },
      capacidad,
      respuesta,
      presupuesto
    ]
  },
  estetica: {
    name: 'Clínica estética',
    audience: 'clínicas estéticas',
    customer: 'paciente',
    customers: 'pacientes',
    fit: [
      'Tenés médico o médica a cargo',
      'Querés vender tratamientos, no promos',
      'Alguien contesta los mensajes en el día'
    ],
    questions: [
      titular('¿La clínica es tuya?', 'Sí, es mía'),
      {
        label: 'Profesionales',
        title: '¿Cuántos profesionales atienden?',
        options: ['Solo yo', '2 o 3 profesionales', '4 o más profesionales']
      },
      {
        label: 'Médico/a a cargo',
        title: '¿Hay un médico o una médica a cargo?',
        options: ['Sí', 'No']
      },
      {
        label: 'Quiere vender',
        title: '¿Qué tratamiento querés vender más?',
        options: ['Armonización y rellenos', 'Láser y depilación', 'Aparatología corporal', 'Tratamientos capilares', 'Otro'],
        customOption: true
      },
      {
        label: 'Responden',
        title: '¿Quién contesta hoy los mensajes de pacientes?',
        options: ['Yo, cuando puedo', 'Recepción, en el día', 'Recepción, en menos de 1 hora']
      },
      presupuesto
    ]
  },
  odonto: {
    name: 'Consultorio odontológico',
    audience: 'odontólogos',
    customer: 'paciente',
    customers: 'pacientes',
    fit: [
      'Tenés 2 sillones o más',
      'Querés más pacientes particulares (implantes, ortodoncia)',
      'Alguien hace el seguimiento de los presupuestos'
    ],
    questions: [
      titular('¿El consultorio es tuyo?'),
      {
        label: 'Sillones',
        title: '¿Cuántos sillones tienen?',
        options: ['1 sillón', '2 o 3 sillones', '4 o más sillones']
      },
      {
        label: 'Quiere vender',
        title: '¿Qué tratamiento querés vender más?',
        options: ['Implantes', 'Ortodoncia o alineadores', 'Estética dental (carillas, blanqueamiento)', 'Otro'],
        customOption: true
      },
      {
        label: 'Pacientes particulares',
        title: '¿Qué parte de tus pacientes son particulares?',
        options: ['Menos de la mitad', 'Más o menos la mitad', 'Más de la mitad']
      },
      {
        label: 'Seguimiento de presupuestos',
        title: '¿Quién hace el seguimiento de los presupuestos?',
        options: ['Nadie, por ahora', 'Yo, cuando puedo', 'Recepción, con fecha']
      },
      presupuesto
    ]
  },
  viajes: {
    name: 'Agencia de viajes',
    audience: 'agencias de viajes',
    customer: 'pasajero',
    customers: 'pasajeros',
    fit: [
      'Tu agencia está habilitada',
      'Vendés viajes de ticket medio o alto',
      'Alguien contesta las consultas en el día'
    ],
    questions: [
      titular('¿La agencia es tuya?', 'Sí, es mía'),
      {
        label: 'Vende más',
        title: '¿Qué vendés más?',
        options: ['Salidas grupales propias', 'Paquetes de mayoristas', 'Viajes a medida o lunas de miel', 'Viajes corporativos o de egresados', 'Otro'],
        customOption: true
      },
      {
        label: 'Gasto por pasajero',
        title: '¿Cuánto gasta en promedio cada pasajero en un viaje?',
        options: ['Menos de USD 1.000', 'Entre USD 1.000 y 3.000', 'Más de USD 3.000']
      },
      {
        label: 'Atienden consultas',
        title: '¿Cuántas personas responden consultas en la agencia?',
        options: ['Solo yo', '2 o 3 personas', '4 o más personas']
      },
      {
        label: 'Tiempo de respuesta',
        title: '¿En cuánto contestan una consulta nueva?',
        options: ['Al otro día o más', 'En el día', 'En menos de 1 hora']
      },
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
