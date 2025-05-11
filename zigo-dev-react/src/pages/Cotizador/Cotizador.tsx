import React, { useState, useEffect } from 'react';
import { pricingConfig, optionNames } from './Config';
import type { Selection, Selections } from './Config';
import Header from '../../components/Header';
import '../../assets/styles/cotizador.css';

const Cotizador: React.FC = () => {
  const totalSteps = 5;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selections, setSelections] = useState<Selections>({
    step1: { value: '', price: 0, time: 0 },
    step2: { value: '', price: 0, time: 0 },
    step3: { value: '', price: 0, time: 0 },
    step4: [],
    step5: []
  });

  const [calculatedPrices, setCalculatedPrices] = useState<Selections>({
    step1: { value: '', price: 0, time: 0 },
    step2: { value: '', price: 0, time: 0 },
    step3: { value: '', price: 0, time: 0 },
    step4: [],
    step5: []
  });

  const [totals, setTotals] = useState({
    totalPrice: 0,
    totalTime: 0,
    monthlyPrice: 0
  });

  // Calcular precios aplicando reglas especiales
  const calculatePrices = () => {
    // Crear copia de selecciones para trabajar
    const calculatedPrices = {
      step1: { ...selections.step1 },
      step2: { ...selections.step2 },
      step3: { ...selections.step3 },
      step4: [...selections.step4.map(item => ({ ...item }))],
      step5: [...selections.step5.map(item => ({ ...item }))]
    };

    // Aplicar reglas especiales
    pricingConfig.specialRules.forEach(rule => {
      const selectionsCopy = {
        step1: { ...selections.step1 },
        step2: { ...selections.step2 },
        step3: { ...selections.step3 },
        step4: [...selections.step4.map(item => ({ ...item }))],
        step5: [...selections.step5.map(item => ({ ...item }))]
      };

      if (rule.condition(selectionsCopy)) {
        rule.apply(selectionsCopy, calculatedPrices);
      }
    });

    return calculatedPrices;
  };

  // Calcular totales de precio y tiempo
  const calculateTotals = (prices: Selections) => {
    let totalPrice = 0;
    let totalTime = 0;
    let monthlyPrice = 0;

    // Sumar precios de pasos 1-3
    totalPrice += prices.step1.price + prices.step2.price + prices.step3.price;
    totalTime += prices.step1.time + prices.step2.time + prices.step3.time;

    // Sumar precios de características adicionales
    prices.step4.forEach(feature => {
      if (feature.value !== 'ninguna') {
        totalPrice += feature.price;
        totalTime += feature.time;
      }
    });

    // Sumar precios de servicios
    prices.step5.forEach(service => {
      if (service.value !== 'ninguno') {
        if (service.isMonthly) {
          monthlyPrice += service.price;
        } else {
          totalPrice += service.price;
          totalTime += service.time;
        }
      }
    });

    return { totalPrice, totalTime, monthlyPrice };
  };

  // Actualizar precios cuando cambian selecciones
  useEffect(() => {
    const prices = calculatePrices();
    setCalculatedPrices(prices);
    setTotals(calculateTotals(prices));
  }, [selections]);

  // Manejar selección de opciones (pasos 1-3)
  const handleOptionSelect = (step: string, value: string) => {
    const stepConfig = pricingConfig[step as keyof typeof pricingConfig] as Record<string, any>;
    const optionConfig = stepConfig[value as keyof typeof stepConfig];

    setSelections(prev => ({
      ...prev,
      [step]: {
        value,
        price: optionConfig.basePrice,
        time: optionConfig.baseTime
      }
    }));
  };

  // Manejar cambio de checkboxes (pasos 4-5)
  const handleCheckboxChange = (step: string, value: string, isChecked: boolean) => {
    const stepKey = step as keyof Selections;

    setSelections(prev => {
      const newSelections = { ...prev };
      const currentSelections = [...(newSelections[stepKey] as Selection[])];

      // Si es ninguna/ninguno y está checkeado
      if ((value === 'ninguna' || value === 'ninguno') && isChecked) {
        return {
          ...prev,
          [stepKey]: [{
            value,
            price: 0,
            time: 0,
            isMonthly: false
          }]
        };
      }

      // Si se marca otra opción
      if (isChecked) {
        // Quitar ninguna/ninguno si existe
        const filteredSelections = currentSelections.filter(s =>
          s.value !== 'ninguna' && s.value !== 'ninguno'
        );

        // Agregar la nueva selección
        const stepConfig = pricingConfig[stepKey as keyof typeof pricingConfig] as Record<string, any>;
        const optionConfig = stepConfig[value as keyof typeof stepConfig];

        return {
          ...prev,
          [stepKey]: [
            ...filteredSelections,
            {
              value,
              price: optionConfig.basePrice,
              time: optionConfig.baseTime,
              isMonthly: optionConfig.isMonthly || false
            }
          ]
        };
      } else {
        // Si se desmarca, remover de la lista
        const filteredSelections = currentSelections.filter(s => s.value !== value);

        // Si no queda ninguna selección, agregar ninguna/ninguno
        if (filteredSelections.length === 0) {
          return {
            ...prev,
            [stepKey]: [{
              value: step === 'step4' ? 'ninguna' : 'ninguno',
              price: 0,
              time: 0,
              isMonthly: false
            }]
          };
        }

        return {
          ...prev,
          [stepKey]: filteredSelections
        };
      }
    });
  };

  // Ir al siguiente paso
  const nextStep = () => {
    // Validación solo para los pasos 1, 2 y 3
    if (currentStep <= 3) {
      const stepKey = `step${currentStep}` as keyof Selections;
      const stepValue = selections[stepKey];
      // Solo si es un objeto (no array)
      if (!Array.isArray(stepValue) && !stepValue.value) {
        alert('Por favor, selecciona una opción para continuar.');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  // Ir al paso anterior
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Enviar formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias por tu interés! Pronto nos pondremos en contacto contigo.');
  };

  // Obtener nombre de opción
  const getOptionName = (step: string, value: string): string => {
    const stepOptions = optionNames[step as keyof typeof optionNames] as Record<string, string>;
    return stepOptions[value] || value;
  };

  // Renderizar cada paso según currentStep
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step active" id="step1">
            <div className="form-group">
              <h2>¿Qué tipo de sitio web necesitas?</h2>
              <div className="options">
                {Object.keys(pricingConfig.step1).map(value => (
                  <div
                    key={value}
                    className={`option-card ${selections.step1.value === value ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect('step1', value)}
                  >
                    <h4>{getOptionName('step1', value)}</h4>
                    <p>{value === 'institucional' && 'Ideal para presentar tu empresa o marca de manera profesional.'}
                      {value === 'ecommerce' && 'Para vender productos o mostrar un catálogo online.'}
                      {value === 'landing' && 'Página única enfocada en conversión para campañas específicas.'}
                      {value === 'complejo' && 'Con funcionalidades avanzadas y secciones personalizadas.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step active" id="step2">
            <div className="form-group">
              <h2>¿Qué tipo de diseño necesitas?</h2>
              <div className="options">
                {Object.keys(pricingConfig.step2).map(value => (
                  <div
                    key={value}
                    className={`option-card ${selections.step2.value === value ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect('step2', value)}
                  >
                    <h4>{getOptionName('step2', value)}</h4>
                    <p>{value === 'estandar' && 'Diseño profesional basado en plantillas predeterminadas.'}
                      {value === 'medida' && 'Diseño personalizado según tus necesidades específicas.'}
                      {value === 'tengo' && 'Ya dispones del diseño y solo necesitas implementación.'}
                      {value === 'nose' && 'Necesitas asesoramiento para definir el diseño adecuado.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // Puedes seguir agregando los pasos 3, 4, 5 aquí de forma similar

      case 6: // Resumen
        return (
          <div className="form-step active" id="step6">
            <div className="form-group">
              <h2>Resumen de tu cotización</h2>
              <div className="summary-card">
                <div id="summary-content">
                  {/* Tipo de sitio */}
                  {calculatedPrices.step1.value && (
                    <div className="summary-detail">
                      <div>Tipo de sitio: <strong>{getOptionName('step1', calculatedPrices.step1.value)}</strong></div>
                      <div>${calculatedPrices.step1.price}</div>
                    </div>
                  )}

                  {/* Diseño */}
                  {calculatedPrices.step2.value && (
                    <div className="summary-detail">
                      <div>Diseño: <strong>{getOptionName('step2', calculatedPrices.step2.value)}</strong></div>
                      <div>${calculatedPrices.step2.price}</div>
                    </div>
                  )}

                  {/* Tamaño */}
                  {calculatedPrices.step3.value && (
                    <div className="summary-detail">
                      <div>Tamaño: <strong>{getOptionName('step3', calculatedPrices.step3.value)}</strong></div>
                      <div>${calculatedPrices.step3.price}</div>
                    </div>
                  )}

                  {/* Características adicionales */}
                  {calculatedPrices.step4.some(f => f.value !== 'ninguna') && (
                    <>
                      <div className="summary-detail">
                        <div>Características adicionales:</div>
                        <div></div>
                      </div>

                      {calculatedPrices.step4
                        .filter(f => f.value !== 'ninguna')
                        .map((feature, index) => (
                          <div className="summary-detail" key={`feature-${index}`}>
                            <div> - {getOptionName('step4', feature.value)}</div>
                            <div>${feature.price}</div>
                          </div>
                        ))
                      }
                    </>
                  )}

                  {/* Servicios recurrentes */}
                  {calculatedPrices.step5.some(s => s.value !== 'ninguno') && (
                    <>
                      <div className="summary-detail">
                        <div>Servicios adicionales:</div>
                        <div></div>
                      </div>

                      {calculatedPrices.step5
                        .filter(s => s.value !== 'ninguno')
                        .map((service, index) => (
                          <div className="summary-detail" key={`service-${index}`}>
                            <div> - {getOptionName('step5', service.value)}</div>
                            <div>
                              ${service.price}{service.isMonthly ? '/mes' : ''}
                            </div>
                          </div>
                        ))
                      }
                    </>
                  )}
                </div>

                <div className="summary-total">
                  <div>Total estimado:</div>
                  <div id="total-price">${totals.totalPrice}</div>
                </div>
                <div className="summary-total">
                  <div>Tiempo estimado:</div>
                  <div id="total-time">{totals.totalTime} semanas</div>
                </div>
                <div className="summary-total">
                  <div>Servicios mensuales:</div>
                  <div id="monthly-services">
                    {totals.monthlyPrice > 0 ? `$${totals.monthlyPrice}/mes` : 'Ninguno'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="cotizador-container">
          <h1>Cotizador de Servicios Web</h1>
          <p>Completa los siguientes pasos para obtener una cotización personalizada.</p>

          <div className="progress-bar">
            <div
              className="progress"
              id="progress"
              style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
            ></div>
            {[...Array(totalSteps + 1)].map((_, idx) => (
              <div
                key={idx}
                className={`step ${idx < currentStep ? 'active' : ''} ${idx < currentStep - 1 ? 'complete' : ''}`}
              >
                {idx === totalSteps ? '✓' : idx + 1}
              </div>
            ))}
          </div>

          <form id="cotizador-form" onSubmit={handleSubmit}>
            {renderStep()}

            <div className="buttons">
              {currentStep > 1 && (
                <button type="button" className="prev cta-button hero-cta-main" onClick={prevStep}>
                  Anterior
                </button>
              )}

              {currentStep <= totalSteps && (
                <button type="button" className="next cta-button hero-cta-main" onClick={nextStep}>
                  {currentStep === totalSteps ? 'Ver resumen' : 'Siguiente'}
                </button>
              )}

              {currentStep === totalSteps + 1 && (
                <button type="submit" className="submit cta-button hero-cta-main">
                  Solicitar cotización formal
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Cotizador;