export interface PriceTimeConfig {
  basePrice: number;
  baseTime: number;
  isMonthly?: boolean;
}

export interface Selection {
  value: string;
  price: number;
  time: number;
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
            'institucional': { basePrice: 480000, baseTime: 0.7 },    // 5 días
            'ecommerce':     { basePrice: 960000, baseTime: 2 },      // 10 días
            'landing':       { basePrice: 192000, baseTime: 0.3 },    // 2 días
            'complejo':      { basePrice: 1104000, baseTime: 2.3 }    // 11.5 días
        },
        step2: {
            'estandar': { basePrice: 180000, baseTime: 0.5 },         // 3-4 días
            'medida':   { basePrice: 480000, baseTime: 1 },           // 5 días
            'tengo':    { basePrice: 0, baseTime: 0 },
            'nose':     { basePrice: 180000, baseTime: 0.5 }
        },
        step3: {
            'normal':   { basePrice: 240000, baseTime: 0.5 },
            'mediano':  { basePrice: 480000, baseTime: 1 },
            'grande':   { basePrice: 960000, baseTime: 2 },
            'noselo':   { basePrice: 384000, baseTime: 0.8 }
        },
        step4: {
            'logo':         { basePrice: 240000, baseTime: 1 },
            // 'marca':        { basePrice: 360000, baseTime: 1.5 },
            'idioma':       { basePrice: 168000, baseTime: 0.7 },
            'contenidos':   { basePrice: 240000, baseTime: 1 },
            'imagenes':     { basePrice: 120000, baseTime: 0.5 },
            'mercadopago':  { basePrice: 120000, baseTime: 0.5 },
            'ninguna':      { basePrice: 0, baseTime: 0 }
        },
        step5: {
            'email':     { basePrice: 15000, baseTime: 0, isMonthly: true },
            'soporte':   { basePrice: 50000, baseTime: 0, isMonthly: true },
            'seo':       { basePrice: 600000, baseTime: 1, isMonthly: false },
            'productos': { basePrice: 336000, baseTime: 0.7, isMonthly: false },
            'blog':      { basePrice: 240000, baseTime: 0.5, isMonthly: false },
            'hosting':   { basePrice: 20000, baseTime: 0, isMonthly: true },
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
                prices.step2.time += 1; // 1 semana adicional
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
        // 'marca': 'Apertura de marca',
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
        'hosting': 'Hosting (mensual)',
        'ninguno': 'Ninguno'
    }
};