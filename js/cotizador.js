// Import configurations
import { pricingConfig, optionNames } from './config.js';

document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentStep = 1;
    const totalSteps = 5;
    let selections = {
        step1: { value: '', price: 0, time: 0 },
        step2: { value: '', price: 0, time: 0 },
        step3: { value: '', price: 0, time: 0 },
        step4: [],
        step5: []
    };
    
    // Seleccionar elementos del DOM
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    const progress = document.getElementById('progress');
    const nextButtons = document.querySelectorAll('.next');
    const prevButtons = document.querySelectorAll('.prev');
    const optionCards = document.querySelectorAll('.option-card');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const submitButton = document.querySelector('.submit');
    
    // Inicializar los valores de precio y tiempo en las tarjetas desde la configuración
    function initializePriceValues() {
        optionCards.forEach(card => {
            const stepId = card.closest('.form-step').id;
            const value = card.dataset.value;
            
            if (pricingConfig[stepId] && pricingConfig[stepId][value]) {
                const config = pricingConfig[stepId][value];
                card.dataset.price = config.basePrice;
                card.dataset.time = config.baseTime;
                
                // Actualizar el texto visible si existe un elemento para mostrar precio/tiempo
                const priceElement = card.querySelector('.option-price');
                if (priceElement) {
                    priceElement.textContent = `$${config.basePrice}`;
                }
            }
        });
        
        checkboxes.forEach(checkbox => {
            const stepId = checkbox.closest('.form-step').id;
            const value = checkbox.value;
            
            if (pricingConfig[stepId] && pricingConfig[stepId][value]) {
                const config = pricingConfig[stepId][value];
                checkbox.dataset.price = config.basePrice;
                checkbox.dataset.time = config.baseTime;
                
                // Actualizar el texto visible si hay un elemento para mostrar precio
                const priceSpan = checkbox.parentElement.querySelector('.precio-adicional');
                if (priceSpan) {
                    if (config.isMonthly) {
                        priceSpan.textContent = `$${config.basePrice}/mes`;
                    } else {
                        priceSpan.textContent = `$${config.basePrice}`;
                    }
                }
            }
        });
    }
    
    // Actualizar la barra de progreso
    function updateProgress() {
        const percent = ((currentStep - 1) / totalSteps) * 100;
        progress.style.width = `${percent}%`;
        
        steps.forEach((step, idx) => {
            if (idx < currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
            
            if (idx < currentStep - 1) {
                step.classList.add('complete');
            } else {
                step.classList.remove('complete');
            }
        });
    }
    
    // Mostrar el paso actual
    function showStep(step) {
        formSteps.forEach(formStep => {
            formStep.classList.remove('active');
        });
        
        document.getElementById(`step${step}`).classList.add('active');
        currentStep = step;
        updateProgress();
    }
    
    // Calcular precio dinámicamente basado en selecciones
    function calculatePrices() {
        // Crear una copia de las selecciones para trabajar
        let calculatedPrices = {
            step1: { ...selections.step1 },
            step2: { ...selections.step2 },
            step3: { ...selections.step3 },
            step4: [...selections.step4.map(item => ({...item}))], // Deep copy for step4 items
            step5: [...selections.step5.map(item => ({...item}))]  // Deep copy for step5 items
        };
        
        // Aplicar reglas especiales
        pricingConfig.specialRules.forEach(rule => {
            // Create a deep copy of selections for the condition check to avoid unintended modifications
            const selectionsCopyForCondition = {
                step1: { ...selections.step1 },
                step2: { ...selections.step2 },
                step3: { ...selections.step3 },
                step4: [...selections.step4.map(item => ({...item}))],
                step5: [...selections.step5.map(item => ({...item}))]
            };
            if (rule.condition(selectionsCopyForCondition)) {
                rule.apply(selectionsCopyForCondition, calculatedPrices); // Pass the copy to apply as well if it modifies selections
            }
        });
        
        return calculatedPrices;
    }
    
    // Manejar selección de opciones en tarjetas
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            const step = this.closest('.form-step').id;
            const stepNumber = step.replace('step', '');
            const value = this.dataset.value;
            
            // Obtener precio y tiempo de la configuración
            const priceConfigItem = pricingConfig[step][value]; // Renamed for clarity
            
            // Desactivar selección previa
            const siblings = this.parentNode.querySelectorAll('.option-card');
            siblings.forEach(sib => sib.classList.remove('selected'));
            
            // Activar selección actual
            this.classList.add('selected');
            
            // Guardar selección con precio de la configuración
            selections[`step${stepNumber}`] = {
                value: value,
                price: priceConfigItem.basePrice,
                time: priceConfigItem.baseTime
            };
            
            // Si hay cambios que afectan a otros pasos, actualizar precios visibles
            updateVisiblePrices();
        });
    });
    
    // Actualizar precios visibles basado en selecciones actuales
    function updateVisiblePrices() {
        // Actualizamos precios en las tarjetas si dependen de otras selecciones
        // Por ejemplo, si el precio de una integración cambia según el tipo de sitio
        
        // Ejemplo: Actualizar precio de Mercado Pago si el sitio es e-commerce
        const mercadoPagoCheckbox = document.querySelector('#mercadopago');
        if (mercadoPagoCheckbox) { // Ensure checkbox exists
            let mpPrice = pricingConfig.step4.mercadopago.basePrice; // Default price
            if (selections.step1.value === 'ecommerce') {
                // Check if a special rule applies for e-commerce + mercadopago
                const ecommMpRule = pricingConfig.specialRules.find(rule =>
                    rule.condition({ // Simulate selections for condition check
                        step1: { value: 'ecommerce' },
                        step4: [{ value: 'mercadopago' }]
                    }) && rule.apply.toString().includes("prices.step4[mpIndex].price = 200") // A bit hacky, better to have a more direct way
                );
                if (ecommMpRule) {
                     // This is a simplified way to get the special price.
                     // A more robust solution would involve actually running the apply function
                     // on a temporary price object or having the special price directly in the rule.
                    mpPrice = 200; // Assuming the special price is 200 as per the rule
                }
            }
            mercadoPagoCheckbox.dataset.price = mpPrice;
            const priceSpan = mercadoPagoCheckbox.parentElement.querySelector('.precio-adicional');
            if (priceSpan) {
                priceSpan.textContent = `$${mpPrice}`;
            }
        }
        
        // Otros ejemplos de actualizaciones basadas en selecciones
        // Se pueden agregar más reglas según sea necesario
    }
    
    // Manejar selección de checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const step = this.closest('.form-step').id;
            const stepNumber = step.replace('step', '');
            const value = this.value;
            
            // Obtener configuración de precio
            // const priceConfig = pricingConfig[step][value]; // Not directly used here anymore
            
            // Si es el checkbox "Ninguna/Ninguno", desmarcar los demás
            if (value === 'ninguna' || value === 'ninguno') {
                if (this.checked) {
                    const siblings = this.closest('.checkboxes').querySelectorAll('input[type="checkbox"]');
                    siblings.forEach(sib => {
                        if (sib !== this) {
                            sib.checked = false;
                        }
                    });
                }
            } else {
                // Si se marca otro checkbox, desmarcar "Ninguna/Ninguno"
                const noneOption = this.closest('.checkboxes').querySelector('input[value="ninguna"], input[value="ninguno"]');
                if (noneOption) {
                    noneOption.checked = false;
                }
            }
            
            // Guardar selecciones
            selections[`step${stepNumber}`] = [];
            const selectedCheckboxes = document.querySelectorAll(`#step${stepNumber} input[type="checkbox"]:checked`);
            selectedCheckboxes.forEach(selected => {
                const selectedValue = selected.value;
                // Ensure selectedConfig is defined before accessing its properties
                const selectedConfig = pricingConfig[step] && pricingConfig[step][selectedValue] 
                                       ? pricingConfig[step][selectedValue]
                                       : { basePrice: 0, baseTime: 0, isMonthly: false }; // Default if not found
                
                selections[`step${stepNumber}`].push({
                    value: selectedValue,
                    price: selectedConfig.basePrice,
                    time: selectedConfig.baseTime,
                    isMonthly: selectedConfig.isMonthly || false
                });
            });
             updateVisiblePrices(); // Update prices if checkbox changes affect others
        });
    });
    
    // Manejar botón siguiente
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep === totalSteps + 1) {
                return;
            }
            
            // Validar que haya una selección en pasos 1, 2 y 3
            if (currentStep <= 3) {
                const stepKey = `step${currentStep}`;
                if (!selections[stepKey].value) {
                    alert('Por favor, selecciona una opción para continuar.');
                    return;
                }
            }
            
            // Si es el último paso, generar resumen
            if (currentStep === totalSteps) {
                generateSummary();
            }
            
            showStep(currentStep + 1);
        });
    });
    
    // Manejar botón anterior
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep === 1) {
                return;
            }
            showStep(currentStep - 1);
        });
    });
    
    // Generar resumen
    function generateSummary() {
        const summaryContent = document.getElementById('summary-content');
        const totalPriceEl = document.getElementById('total-price');
        const totalTimeEl = document.getElementById('total-time');
        const monthlyServicesEl = document.getElementById('monthly-services');
        
        // Obtener precios calculados con reglas aplicadas
        const calculatedPrices = calculatePrices();
        
        // Calcular totales
        let totalPrice = 0;
        let totalTime = 0;
        let monthlyPrice = 0;
        let summaryHTML = '';
        
        // Tipo de sitio
        if (calculatedPrices.step1 && calculatedPrices.step1.value) {
            summaryHTML += `<div class="summary-detail">
                <div>Tipo de sitio: <strong>${getOptionName('step1', calculatedPrices.step1.value)}</strong></div>
                <div>$${calculatedPrices.step1.price}</div>
            </div>`;
            totalPrice += calculatedPrices.step1.price;
            totalTime += calculatedPrices.step1.time;
        }
        
        // Diseño
        if (calculatedPrices.step2 && calculatedPrices.step2.value) {
            summaryHTML += `<div class="summary-detail">
                <div>Diseño: <strong>${getOptionName('step2', calculatedPrices.step2.value)}</strong></div>
                <div>$${calculatedPrices.step2.price}</div>
            </div>`;
            totalPrice += calculatedPrices.step2.price;
            totalTime += calculatedPrices.step2.time;
        }
        
        // Tamaño
        if (calculatedPrices.step3 && calculatedPrices.step3.value) {
            summaryHTML += `<div class="summary-detail">
                <div>Tamaño: <strong>${getOptionName('step3', calculatedPrices.step3.value)}</strong></div>
                <div>$${calculatedPrices.step3.price}</div>
            </div>`;
            totalPrice += calculatedPrices.step3.price;
            totalTime += calculatedPrices.step3.time;
        }
        
        // Características adicionales
        if (calculatedPrices.step4 && calculatedPrices.step4.length > 0) {
            let hasNonNinguna = false;
            calculatedPrices.step4.forEach(feature => {
                if (feature.value !== 'ninguna') {
                    hasNonNinguna = true;
                }
            });
            
            if (hasNonNinguna) {
                summaryHTML += `<div class="summary-detail">
                    <div>Características adicionales:</div>
                    <div></div>
                </div>`;
                
                calculatedPrices.step4.forEach(feature => {
                    if (feature.value !== 'ninguna') {
                        summaryHTML += `<div class="summary-detail">
                            <div> - ${getOptionName('step4', feature.value)}</div>
                            <div>$${feature.price}</div>
                        </div>`;
                        totalPrice += feature.price;
                        totalTime += feature.time;
                    }
                });
            }
        }
        
        // Servicios recurrentes
        if (calculatedPrices.step5 && calculatedPrices.step5.length > 0) {
            let hasNonNinguno = false;
            calculatedPrices.step5.forEach(service => {
                if (service.value !== 'ninguno') {
                    hasNonNinguno = true;
                }
            });
            
            if (hasNonNinguno) {
                summaryHTML += `<div class="summary-detail">
                    <div>Servicios adicionales:</div>
                    <div></div>
                </div>`;
                
                calculatedPrices.step5.forEach(service => {
                    if (service.value !== 'ninguno') {
                        const isMonthly = service.isMonthly || (pricingConfig.step5[service.value] && pricingConfig.step5[service.value].isMonthly);
                        
                        if (isMonthly) {
                            monthlyPrice += service.price;
                            summaryHTML += `<div class="summary-detail">
                                <div> - ${getOptionName('step5', service.value)}</div>
                                <div>$${service.price}/mes</div>
                            </div>`;
                        } else {
                            summaryHTML += `<div class="summary-detail">
                                <div> - ${getOptionName('step5', service.value)}</div>
                                <div>$${service.price}</div>
                            </div>`;
                            totalPrice += service.price;
                            totalTime += service.time;
                        }
                    }
                });
            }
        }
        
        // Actualizar el DOM
        summaryContent.innerHTML = summaryHTML;
        totalPriceEl.textContent = `$${totalPrice}`;
        totalTimeEl.textContent = `${totalTime} semanas`;
        monthlyServicesEl.textContent = monthlyPrice > 0 ? `$${monthlyPrice}/mes` : 'Ninguno';
    }
    
    // Obtener nombre de la opción para el resumen
    function getOptionName(step, value) {
        return optionNames[step] && optionNames[step][value] ? optionNames[step][value] : value;
    }
    
    // Manejar envío del formulario
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('¡Gracias por tu interés! Pronto nos pondremos en contacto contigo para brindarte una cotización detallada.');
    });
    
    // Inicializar
    initializePriceValues();
    showStep(1);
});