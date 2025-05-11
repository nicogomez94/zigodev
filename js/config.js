export const pricingConfig = {
    // Precios base para tipos de sitio
    step1: {
        'institucional': { basePrice: 800, baseTime: 3 },
        'ecommerce': { basePrice: 1500, baseTime: 5 },
        'landing': { basePrice: 500, baseTime: 2 },
        'complejo': { basePrice: 2000, baseTime: 8 }
    },
    // Precios para diseño
    step2: {
        'estandar': { basePrice: 300, baseTime: 1 },
        'medida': { basePrice: 800, baseTime: 3 },
        'tengo': { basePrice: 0, baseTime: 0 },
        'nose': { basePrice: 400, baseTime: 1.5 }
    },
    // Precios por tamaño
    step3: {
        'normal': { basePrice: 400, baseTime: 1 },
        'mediano': { basePrice: 800, baseTime: 2 },
        'grande': { basePrice: 1600, baseTime: 4 },
        'noselo': { basePrice: 600, baseTime: 1.5 }
    },
    // Características adicionales
    step4: {
        'logo': { basePrice: 300, baseTime: 2 },
        'marca': { basePrice: 500, baseTime: 3 },
        'idioma': { basePrice: 400, baseTime: 1.5 },
        'contenidos': { basePrice: 350, baseTime: 2 },
        'imagenes': { basePrice: 200, baseTime: 1 },
        'mercadopago': { basePrice: 250, baseTime: 1 },
        'ninguna': { basePrice: 0, baseTime: 0 }
    },
    // Servicios adicionales
    step5: {
        'email': { basePrice: 15, baseTime: 0, isMonthly: true },
        'soporte': { basePrice: 50, baseTime: 0, isMonthly: true },
        'seo': { basePrice: 300, baseTime: 2, isMonthly: false },
        'productos': { basePrice: 200, baseTime: 1.5, isMonthly: false },
        'blog': { basePrice: 150, baseTime: 1, isMonthly: false },
        'hosting': { basePrice: 20, baseTime: 0, isMonthly: true },
        'ninguno': { basePrice: 0, baseTime: 0, isMonthly: false }
    },
    // Reglas especiales para modificar precios basados en combinaciones
    specialRules: [
        // Si es e-commerce y tiene mercado pago, aplicar descuento al mercado pago
        {
            condition: (selections) =>
                selections.step1.value === 'ecommerce' &&
                selections.step4.some(item => item.value === 'mercadopago'),
            apply: (selections, prices) => {
                // 20% de descuento en la integración de Mercado Pago para e-commerce
                const mpIndex = selections.step4.findIndex(item => item.value === 'mercadopago');
                if (mpIndex !== -1) {
                    prices.step4[mpIndex].price = 200; // Precio especial
                }
            }
        },
        // Si es sitio complejo y diseño a medida, aumentar el tiempo
        {
            condition: (selections) =>
                selections.step1.value === 'complejo' &&
                selections.step2.value === 'medida',
            apply: (selections, prices) => {
                prices.step2.time += 1; // 1 semana adicional
            }
        },
        // Si selecciona más de 3 funcionalidades adicionales, dar descuento
        {
            condition: (selections) => {
                const additionalFeatures = selections.step4.filter(item =>
                    item.value !== 'ninguna');
                return additionalFeatures.length >= 3;
            },
            apply: (selections, prices) => {
                // 15% de descuento en el total de características adicionales
                const discount = 0.15;
                prices.step4.forEach((item, index) => {
                    prices.step4[index].price = Math.round(item.price * (1 - discount));
                });
            }
        }
    ]
};

export const optionNames = {
    'step1': {
        'institucional': 'Sitio web institucional',
        'ecommerce': 'E-commerce o catálogo',
        'landing': 'Landing page',
        'complejo': 'Sitio web complejo'
    },
    'step2': {
        'estandar': 'Diseño estándar sobre plantilla',
        'medida': 'Diseño a medida',
        'tengo': 'Ya lo tengo',
        'nose': 'No lo sé'
    },
    'step3': {
        'normal': 'Normal',
        'mediano': 'Mediano',
        'grande': 'Grande',
        'noselo': 'No lo sé'
    },
    'step4': {
        'logo': 'Diseño de logo',
        'marca': 'Apertura de marca',
        'idioma': 'Multiidioma',
        'contenidos': 'Redacción de contenidos',
        'imagenes': 'Imágenes',
        'mercadopago': 'Integración con Mercado Pago',
        'ninguna': 'Ninguna'
    },
    'step5': {
        'email': 'Casillas de email',
        'soporte': 'Soporte de autogestión',
        'seo': 'Optimización SEO premium',
        'productos': 'Carga de productos',
        'blog': 'Redacción para blog',
        'hosting': 'Hosting',
        'ninguno': 'Ninguno'
    }
};