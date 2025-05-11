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
    const calculatedPrices = {
      step1: { ...selections.step1 },
      step2: { ...selections.step2 },
      step3: { ...selections.step3 },
      step4: [...selections.step4.map(item => ({ ...item }))],
      step5: [...selections.step5.map(item => ({ ...item }))]
    };

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

  const calculateTotals = (prices: Selections) => {
    let totalPrice = 0;
    let totalTime = 0;
    let monthlyPrice = 0;

    totalPrice += prices.step1.price + prices.step2.price + prices.step3.price;
    totalTime += prices.step1.time + prices.step2.time + prices.step3.time;

    prices.step4.forEach(feature => {
      if (feature.value !== 'ninguna') {
        totalPrice += feature.price;
        totalTime += feature.time;
      }
    });

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

  useEffect(() => {
    const prices = calculatePrices();
    setCalculatedPrices(prices);
    setTotals(calculateTotals(prices));
  }, [selections]);

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

  const handleCheckboxChange = (step: string, value: string, isChecked: boolean) => {
    const stepKey = step as keyof Selections;

    setSelections(prev => {
      const newSelections = { ...prev };
      const currentSelections = [...(newSelections[stepKey] as Selection[])];

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

      if (isChecked) {
        const filteredSelections = currentSelections.filter(s =>
          s.value !== 'ninguna' && s.value !== 'ninguno'
        );

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
        const filteredSelections = currentSelections.filter(s => s.value !== value);

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

  const nextStep = () => {
    if (currentStep <= 3) {
      const stepKey = `step${currentStep}` as keyof Selections;
      const stepValue = selections[stepKey];
      // Check if the step value exists and has a value property
      if (!stepValue || (typeof stepValue === 'object' && !Array.isArray(stepValue) && !stepValue.value)) {
        alert('Por favor, selecciona una opción para continuar.');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias por tu interés! Pronto nos pondremos en contacto contigo.');
  };

  const handleVerResumen = (e: React.MouseEvent) => {
    e.preventDefault();  // Prevent any default behavior
    e.stopPropagation(); // Stop event bubbling
    setCurrentStep(prev => prev + 1);
  };

  const getOptionName = (step: string, value: string): string => {
    const stepOptions = optionNames[step as keyof typeof optionNames] as Record<string, string>;
    return stepOptions[value] || value;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step active" id="step1">
            <div className="form-group">
              <h2>¿Qué tipo de sitio web necesitas?</h2>
              <div className="options">
                <div
                  className={`option-card${selections.step1.value === 'institucional' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step1', 'institucional')}
                >
                  <h4>Sitio web institucional</h4>
                  <p>Ideal para presentar tu empresa o marca de manera profesional.</p>
                </div>
                <div
                  className={`option-card${selections.step1.value === 'ecommerce' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step1', 'ecommerce')}
                >
                  <h4>E-commerce o catálogo</h4>
                  <p>Para vender productos o mostrar un catálogo online.</p>
                </div>
                <div
                  className={`option-card${selections.step1.value === 'landing' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step1', 'landing')}
                >
                  <h4>Landing page</h4>
                  <p>Página única enfocada en conversión para campañas específicas.</p>
                </div>
                <div
                  className={`option-card${selections.step1.value === 'complejo' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step1', 'complejo')}
                >
                  <h4>Sitio web complejo</h4>
                  <p>Con funcionalidades avanzadas y secciones personalizadas.</p>
                </div>
              </div>
            </div>
            <div className="buttons">
              <div></div>
              <button type="button" className="next cta-button hero-cta-main" onClick={nextStep}>
                Siguiente
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step active" id="step2">
            <div className="form-group">
              <h2>¿Qué tipo de diseño necesitas?</h2>
              <div className="options">
                <div
                  className={`option-card${selections.step2.value === 'estandar' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step2', 'estandar')}
                >
                  <h4>Diseño estándar sobre plantilla</h4>
                  <p>Diseño profesional basado en plantillas predeterminadas.</p>
                </div>
                <div
                  className={`option-card${selections.step2.value === 'medida' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step2', 'medida')}
                >
                  <h4>Diseño a medida</h4>
                  <p>Diseño personalizado según tus necesidades específicas.</p>
                </div>
                <div
                  className={`option-card${selections.step2.value === 'tengo' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step2', 'tengo')}
                >
                  <h4>Ya lo tengo</h4>
                  <p>Ya dispones del diseño y solo necesitas implementación.</p>
                </div>
                <div
                  className={`option-card${selections.step2.value === 'nose' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step2', 'nose')}
                >
                  <h4>No lo sé</h4>
                  <p>Necesitas asesoramiento para definir el diseño adecuado.</p>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button type="button" className="prev cta-button hero-cta-main" onClick={prevStep}>
                Anterior
              </button>
              <button type="button" className="next cta-button hero-cta-main" onClick={nextStep}>
                Siguiente
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step active" id="step3">
            <div className="form-group">
              <h2>¿Qué tamaño de proyecto estimas?</h2>
              <div className="options">
                <div
                  className={`option-card${selections.step3.value === 'normal' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step3', 'normal')}
                >
                  <h4>Normal</h4>
                  <p>Hasta 5 páginas o secciones.</p>
                </div>
                <div
                  className={`option-card${selections.step3.value === 'mediano' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step3', 'mediano')}
                >
                  <h4>Mediano</h4>
                  <p>De 6 a 10 páginas o secciones.</p>
                </div>
                <div
                  className={`option-card${selections.step3.value === 'grande' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step3', 'grande')}
                >
                  <h4>Grande</h4>
                  <p>Más de 10 páginas o secciones.</p>
                </div>
                <div
                  className={`option-card${selections.step3.value === 'noselo' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step3', 'noselo')}
                >
                  <h4>No lo sé</h4>
                  <p>Necesitas asesoramiento para definir el alcance.</p>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button type="button" className="prev cta-button hero-cta-main" onClick={prevStep}>
                Anterior
              </button>
              <button type="button" className="next cta-button hero-cta-main" onClick={nextStep}>
                Siguiente
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-step active" id="step4">
            <div className="form-group">
              <h2>¿Qué características adicionales necesitas?</h2>
              <div className="checkboxes">
                {Object.keys(pricingConfig.step4).map(value => (
                  <div className="checkbox-item" key={value}>
                    <input
                      type="checkbox"
                      id={value}
                      name="features"
                      value={value}
                      checked={selections.step4.some(s => s.value === value)}
                      onChange={e => handleCheckboxChange('step4', value, e.target.checked)}
                    />
                    <label htmlFor={value}>{getOptionName('step4', value)}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="buttons">
              <button type="button" className="prev cta-button hero-cta-main" onClick={prevStep}>
                Anterior
              </button>
              <button type="button" className="next cta-button hero-cta-main" onClick={nextStep}>
                Siguiente
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-step active" id="step5">
            <div className="form-group">
              <h2>¿Qué servicios adicionales necesitas?</h2>
              <div className="checkboxes">
                {Object.keys(pricingConfig.step5).map(value => (
                  <div className="checkbox-item" key={value}>
                    <input
                      type="checkbox"
                      id={value}
                      name="services"
                      value={value}
                      checked={selections.step5.some(s => s.value === value)}
                      onChange={e => handleCheckboxChange('step5', value, e.target.checked)}
                    />
                    <label htmlFor={value}>{getOptionName('step5', value)}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="buttons">
              <button type="button" className="prev cta-button hero-cta-main" onClick={prevStep}>
                Anterior
              </button>
              <button 
                type="button" 
                className="next cta-button hero-cta-main" 
                onClick={handleVerResumen}>
                Ver resumen
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="form-step active" id="step6">
            <div className="form-group">
              <h2>Resumen de tu cotización</h2>
              <div className="summary-card">
                <div id="summary-content">
                  {calculatedPrices.step1.value && (
                    <div className="summary-detail">
                      <div>Tipo de sitio: <strong>{getOptionName('step1', calculatedPrices.step1.value)}</strong></div>
                      <div>${calculatedPrices.step1.price}</div>
                    </div>
                  )}
                  {calculatedPrices.step2.value && (
                    <div className="summary-detail">
                      <div>Diseño: <strong>{getOptionName('step2', calculatedPrices.step2.value)}</strong></div>
                      <div>${calculatedPrices.step2.price}</div>
                    </div>
                  )}
                  {calculatedPrices.step3.value && (
                    <div className="summary-detail">
                      <div>Tamaño: <strong>{getOptionName('step3', calculatedPrices.step3.value)}</strong></div>
                      <div>${calculatedPrices.step3.price}</div>
                    </div>
                  )}
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
            <div className="buttons">
              <button type="button" className="prev cta-button hero-cta-main" onClick={prevStep}>
                Anterior
              </button>
              <button type="submit" className="submit cta-button hero-cta-main">
                Solicitar cotización formal
              </button>
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
          <p>Completa los siguientes pasos para obtener una cotización personalizada para tu proyecto.</p>

          <div className="progress-bar">
            <div
              className="progress"
              id="progress"
              style={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
            ></div>
            {[...Array(totalSteps + 1)].map((_, idx) => (
              <div
                key={idx}
                className={`step${idx < currentStep ? ' active' : ''}`}
              >
                {idx === totalSteps ? '✓' : idx + 1}
              </div>
            ))}
          </div>

          <form id="cotizador-form" onSubmit={handleSubmit}>
            {renderStep()}
          </form>
        </div>
      </main>
    </>
  );
};

export default Cotizador;