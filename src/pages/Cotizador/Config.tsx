export interface PriceTimeConfig {
  basePrice: number;
  baseTime: number; // Now represents days
  isMonthly?: boolean;
}

export interface Selection {
  value: string;
  price: number;
  time: number; // Now represents days
  isMonthly?: boolean;
}

export interface Selections {
  step1: Selection;
  step2: Selection;
  step3: Selection;
  step4: Selection[];
  step5: Selection[];
}

export const pricingConfig = {
    step1: {
            'landing':       { basePrice: 128000, baseTime: 1 },    // 0.3 weeks * 5 days/week = 1.5 days
            'institucional': { basePrice: 320000, baseTime: 3.5 },    // 0.7 weeks * 5 days/week = 3.5 days
            'ecommerce':     { basePrice: 640000, baseTime: 10 },     // 2 weeks * 5 days/week = 10 days
            'complejo':      { basePrice: 736000, baseTime: 15 }      // 3 weeks * 5 days/week = 15 days
        },

        step2: {
            'estandar': { basePrice: 120000, baseTime: 2.5 },         // 0.5 weeks * 5 days/week = 2.5 days
            'medida':   { basePrice: 320000, baseTime: 2.5 },         // 0.5 weeks * 5 days/week = 2.5 days
            'tengo':    { basePrice: 0, baseTime: 0 },
            'nose':     { basePrice: 120000, baseTime: 2.5 }          // 0.5 weeks * 5 days/week = 2.5 days
        },

        step3: {
            'normal':   { basePrice: 160000, baseTime: 1 },           // 0.5 weeks * 5 days/week = 2.5 days
            'mediano':  { basePrice: 320000, baseTime: 5 },              // 1 week * 5 days/week = 5 days
            'grande':   { basePrice: 640000, baseTime: 10 },             // 2 weeks * 5 days/week = 10 days
            'noselo':   { basePrice: 256000, baseTime: 4 }              // 0.8 weeks * 5 days/week = 4 days
        },

        step4: {
            'logo':         { basePrice: 160000, baseTime: 5 },              // 1 week * 5 days/week = 5 days
            // 'marca':        { basePrice: 240000, baseTime: 7.5 },            // 1.5 weeks * 5 days/week = 7.5 days
            'idioma':       { basePrice: 112000, baseTime: 3.5 },            // 0.7 weeks * 5 days/week = 3.5 days
            'contenidos':   { basePrice: 160000, baseTime: 5 },              // 1 week * 5 days/week = 5 days
            'imagenes':     { basePrice: 80000, baseTime: 2.5 },             // 0.5 weeks * 5 days/week = 2.5 days
            'mercadopago':  { basePrice: 80000, baseTime: 2.5 },             // 0.5 weeks * 5 days/week = 2.5 days
            'ninguna':      { basePrice: 0, baseTime: 0 }
        },

        step5: {
            'email':     { basePrice: 10000, baseTime: 0, isMonthly: true },
            'soporte':   { basePrice: 30000, baseTime: 0, isMonthly: true },
            'seo':       { basePrice: 400000, baseTime: 5, isMonthly: false }, // 1 week * 5 days/week = 5 days
            'productos': { basePrice: 224000, baseTime: 3.5, isMonthly: false },// 0.7 weeks * 5 days/week = 3.5 days
            'blog':      { basePrice: 160000, baseTime: 2.5, isMonthly: false },// 0.5 weeks * 5 days/week = 2.5 days
            'hosting':   { basePrice: 15000, baseTime: 0, isMonthly: true },
            'ninguno':   { basePrice: 0, baseTime: 0, isMonthly: false }
        },

    // Reglas especiales para modificar precios
    specialRules: [
        {
            condition: (selections: Selections) =>
                selections.step1.value === 'ecommerce' &&
                selections.step4.some(item => item.value === 'mercadopago'),
            apply: (_: Selections, prices: any) => {
                const mpIndex = prices.step4.findIndex((item: Selection) => item.value === 'mercadopago');
                if (mpIndex !== -1) {
                    prices.step4[mpIndex].price = 200; // Precio especial
                }
            }
        },
        {
            condition: (selections: Selections) =>
                selections.step1.value === 'complejo' &&
                selections.step2.value === 'medida',
            apply: (_: Selections, prices: any) => {
                prices.step2.time += 5; // 5 días adicionales (anteriormente 1 semana)
            }
        },
        {
            condition: (selections: Selections) => {
                const additionalFeatures = selections.step4.filter(item =>
                    item.value !== 'ninguna');
                return additionalFeatures.length >= 3;
            },
            apply: (_: Selections, prices: any) => {
                const discount = 0.15;
                prices.step4.forEach((item: Selection, index: number) => {
                    prices.step4[index].price = Math.round(item.price * (1 - discount));
                });
            }
        }
    ]
};

export const optionNames = {
    'step1': {
        'landing': 'Landing page',
        'institucional': 'Sitio web institucional',
        'ecommerce': 'E-commerce o catálogo',
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
        // 'marca': 'Apertura de marca',
        'idioma': 'Multiidioma',
        'contenidos': 'Redacción de contenidos',
        'imagenes': 'Imágenes',
        'mercadopago': 'Mercado Pago',
        'ninguna': 'Ninguna'
    },
    'step5': {
        'email': 'Casillas de email',
        'soporte': 'Soporte de autogestión',
        'seo': 'Optimización SEO premium',
        'productos': 'Carga de productos',
        'blog': 'Redacción para blog',
        'hosting': 'Hosting (mensual)',
        'ninguno': 'Ninguno'
    }
};