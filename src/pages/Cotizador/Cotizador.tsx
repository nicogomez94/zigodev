import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com'; // EmailJS integration
import { pricingConfig, optionNames } from './Config';
import type { Selection, Selections } from './Config';
import Header from '../../components/Header';
import '../../assets/styles/cotizador.css';
import Footer from '../../components/Footer';

// Inicializar EmailJS con la clave pública
emailjs.init("7Gk-TPhf8Q8zrvEr7");

// Helper function to format numbers with dots
const formatNumber = (num: number): string => {
  if (num === undefined || num === null) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

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

  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

  // Add this function to handle step clicks
  const handleStepClick = (stepIndex: number) => {
    // Only allow navigating backward
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    }
  };

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

    return { totalPrice, totalTime: Math.ceil(totalTime), monthlyPrice };
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendResult(null);
    setFormErrors({});

    // Validación básica
    let errors: { name?: string; email?: string } = {};
    if (!userName.trim()) errors.name = 'El nombre es obligatorio.';
    if (!userEmail.trim()) {
      errors.email = 'El email es obligatorio.';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(userEmail)) {
      errors.email = 'El email no es válido.';
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSending(false);
      return;
    }

    // Prepare summary data for email
    const summary = [
      `Tipo de sitio: ${getOptionName('step1', calculatedPrices.step1.value)}`,
      `Diseño: ${getOptionName('step2', calculatedPrices.step2.value)}`,
      `Tamaño: ${getOptionName('step3', calculatedPrices.step3.value)}`,
      ...(calculatedPrices.step4.filter(f => f.value !== 'ninguna').map(f => `Característica: ${getOptionName('step4', f.value)}`)),
      ...(calculatedPrices.step5.filter(s => s.value !== 'ninguno').map(s => `Servicio: ${getOptionName('step5', s.value)}${s.isMonthly ? ' (mensual)' : ''}`)),
      `Total estimado: AR$${formatNumber(totals.totalPrice)}`,
      `Tiempo estimado: ${totals.totalTime} días`,
      totals.monthlyPrice > 0 ? `Servicios mensuales: AR$${formatNumber(totals.monthlyPrice)}/mes` : 'Servicios mensuales: Ninguno'
    ].join('\n');

    // EmailJS params (asegúrate de que los nombres coincidan con las variables en tu plantilla)
    const templateParams = {
      from_name: userName,
      reply_to: userEmail,
      message: summary,
      cotizacion_resumen: summary,
      user_name: userName,
      user_email: userEmail
    };

    console.log('Enviando datos a EmailJS:', templateParams);

    try {
      // Verificar que los IDs sean los correctos antes de enviar
      if (!userName || !userEmail) {
        throw new Error('Nombre y email son obligatorios');
      }

      const response = await emailjs.send(
        'service_axdn3bv', 
        'template_zxb4q4g',
        templateParams,
        '7Gk-TPhf8Q8zrvEr7'
      );
      
      console.log('EmailJS respuesta exitosa:', response);
      setSendResult('¡Cotización enviada! Pronto nos pondremos en contacto contigo.');
      setUserName('');
      setUserEmail('');
      setIsSubmissionSuccessful(true);
    } catch (error: any) {
      console.error('Error al enviar email:', error);
      console.error('Error detalles:', JSON.stringify(error));
      
      if (error.text && error.text.includes('template ID not found')) {
        setSendResult(`Error: La plantilla de correo no existe (${error.status}: ${error.text}). Contacta al administrador.`);
      } else if (error.status === 400) {
        setSendResult(`Error en la configuración del correo: ${error.text || 'Revisa los IDs de servicio y plantilla'}`);
      } else {
        setSendResult(`Hubo un error al enviar la cotización (${error.status || 'desconocido'}). Por favor, intenta nuevamente.`);
      }
      setIsSubmissionSuccessful(false);
    } finally {
      setIsSending(false);
    }
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
              <h2 id="que_tipo">¿Qué tipo de sitio web necesitas?</h2>
              <div className="options">
                <div
                  className={`option-card discount${selections.step1.value === 'landing' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step1', 'landing')}
                >
                  <span className="discount-badge">15% OFF</span>
                  <img src="/img/cotizador/step1/4.png" alt="Landing page" />
                  <h4>Landing page</h4>
                  <p>Página única diseñada para conversión de clientes.</p>
                </div>
                <div
                  className={`option-card${selections.step1.value === 'institucional' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step1', 'institucional')}
                >
                  <img src="/img/cotizador/step1/3.png" alt="Sitio web institucional" />
                  <h4>Sitio web institucional</h4>
                  <p>Ideal para presentar tu empresa o marca de manera profesional.</p>
                </div>
                <div
                  className={`option-card${selections.step1.value === 'ecommerce' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step1', 'ecommerce')}
                >
                  <img src="/img/cotizador/step1/2.png" alt="Sitio web institucional" />
                  <h4>E-commerce o catálogo</h4>
                  <p>Para vender productos o mostrar un catálogo online.</p>
                </div>
                <div
                  className={`option-card${selections.step1.value === 'complejo' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step1', 'complejo')}
                >
                  <img src="/img/cotizador/step1/1.png" alt="Sitio web institucional" />
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
                  <img src="/img/cotizador/step2/4.png" alt="Sitio web institucional" />
                  <h4>Diseño estándar sobre plantilla</h4>
                  <p>Diseño profesional basado en plantillas predeterminadas.</p>
                </div>
                <div
                  className={`option-card${selections.step2.value === 'medida' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step2', 'medida')}
                >
                  <img src="/img/cotizador/step2/3.png" alt="Sitio web institucional" />
                  <h4>Diseño a medida</h4>
                  <p>Diseño personalizado según tus necesidades específicas.</p>
                </div>
                <div
                  className={`option-card${selections.step2.value === 'tengo' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step2', 'tengo')}
                >
                  <img src="/img/cotizador/step2/2.png" alt="Sitio web institucional" />
                  <h4>Ya lo tengo</h4>
                  <p>Ya dispones del diseño y solo necesitas implementación.</p>
                </div>
                <div
                  className={`option-card${selections.step2.value === 'nose' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step2', 'nose')}
                >
                  <img src="/img/cotizador/step2/1.png" alt="Sitio web institucional" />
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
                  <p>Hasta 3 páginas o secciones.</p>
                </div>
                <div
                  className={`option-card${selections.step3.value === 'mediano' ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect('step3', 'mediano')}
                >
                  <h4>Mediano</h4>
                  <p>De 3 a 10 páginas o secciones.</p>
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
                  <p>Asumimos que es de tamaño normal</p>
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
                  {calculatedPrices.step1.value === 'landing' && (
                    <div className="summary-detail discount-item">
                      <div>
                        Tipo de sitio: <strong>{getOptionName('step1', calculatedPrices.step1.value)}</strong>
                        <span className="discount-tag">15% OFF</span>
                      </div>
                      <div>
                        <span className="original-price">AR${formatNumber(Math.round(calculatedPrices.step1.price / 0.85))}</span>
                        AR${formatNumber(calculatedPrices.step1.price)}
                      </div>
                    </div>
                  )}

                  {calculatedPrices.step1.value !== 'landing' && calculatedPrices.step1.value && (
                    <div className="summary-detail">
                      <div>Tipo de sitio: <strong>{getOptionName('step1', calculatedPrices.step1.value)}</strong></div>
                      <div>AR${formatNumber(calculatedPrices.step1.price)}</div>
                    </div>
                  )}

                  {calculatedPrices.step2.value && (
                    <div className="summary-detail">
                      <div>Diseño: <strong>{getOptionName('step2', calculatedPrices.step2.value)}</strong></div>
                      <div>AR${formatNumber(calculatedPrices.step2.price)}</div>
                    </div>
                  )}
                  {calculatedPrices.step3.value && (
                    <div className="summary-detail">
                      <div>Tamaño: <strong>{getOptionName('step3', calculatedPrices.step3.value)}</strong></div>
                      <div>AR${formatNumber(calculatedPrices.step3.price)}</div>
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
                            <div>AR${formatNumber(feature.price)}</div>
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
                              AR${formatNumber(service.price)}{service.isMonthly ? '/mes' : ''}
                            </div>
                          </div>
                        ))
                      }
                    </>
                  )}
                </div>
                <div className="summary-total">
                  <div>Total estimado:</div>
                  <div id="total-price">AR${formatNumber(totals.totalPrice)}</div>
                </div>
                <div className="summary-total">
                  <div>Tiempo estimado:</div>
                  <div id="total-time">{totals.totalTime} días</div>
                </div>
                <div className="summary-total">
                  <div>Servicios mensuales:</div>
                  <div id="monthly-services">
                    {totals.monthlyPrice > 0 ? `AR$${formatNumber(totals.monthlyPrice)}/mes` : 'Ninguno'}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
                <label htmlFor="userName">Nombre completo *</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  disabled={isSending}
                  required
                />
                {formErrors.name && <div className="form-error">{formErrors.name}</div>}
              </div>
              <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
                <label htmlFor="userEmail">Email *</label>
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={userEmail}
                  onChange={e => setUserEmail(e.target.value)}
                  disabled={isSending}
                  required
                />
                {formErrors.email && <div className="form-error">{formErrors.email}</div>}
              </div>
            </div>
            <div className="buttons">
              <button type="button" className="prev cta-button hero-cta-main" onClick={prevStep} disabled={isSending}>
                Anterior
              </button>
              <button type="submit" className="submit cta-button hero-cta-main" disabled={isSending}>
                {isSending ? 'Enviando...' : 'Solicitar cotización formal'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderSuccessMessage = () => {
    return (
      <div className="success-message-container">
        <div className="success-icon">✅</div>
        <h2>¡Cotización enviada con éxito!</h2>
        <p>Gracias por confiar en nosotros. Hemos recibido tu solicitud de cotización y nos pondremos en contacto contigo a la brevedad.</p>
        <p className="email-confirmation">Se ha enviado una copia de la cotización a tu correo electrónico.</p>
        <button 
          className="cta-button hero-cta-main" 
          onClick={() => window.location.reload()}
          style={{ marginTop: '20px' }}
        >
          Realizar otra cotización
        </button>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main>
        <div className="cotizador-container">
          {isSubmissionSuccessful ? (
            renderSuccessMessage()
          ) : (
            <>
              <h1>Cotizá tu web en minutos. Sin vueltas. </h1>
              <p>Completa los siguientes pasos para obtener una cotización personalizada para tu proyecto.</p>

              <div className="progress-bar">
                <div
                  className="progress"
                  id="progress"
                  style={{ 
                    width: `${
                      currentStep >= 6 
                        ? 100 
                        : ((currentStep - 1) / (totalSteps - 1)) * 100
                    }%` 
                  }}
                ></div>
                {[...Array(totalSteps)].map((_, idx) => {
                  const stepNum = idx + 1;
                  const isCurrent = currentStep === stepNum || (currentStep === 6 && stepNum === 5);
                  const isPrevious = stepNum < currentStep || (currentStep === 6 && stepNum < 6);
                  const isFuture = stepNum > currentStep && currentStep < 6;
                  
                  return (
                    <div
                      key={idx}
                      className={`step${isCurrent ? ' active' : ''}${isPrevious ? ' completed clickable' : ''}${isFuture ? ' future' : ''}`}
                      onClick={() => handleStepClick(stepNum > 5 ? 5 : stepNum)}
                      role={isPrevious ? "button" : undefined}
                      aria-label={isPrevious ? `Volver al paso ${stepNum}` : undefined}
                    >
                      {stepNum}
                    </div>
                  );
                })}
              </div>

              <form id="cotizador-form" onSubmit={handleSubmit}>
                {renderStep()}
                {isSending && <div className="sending-message" style={{ padding: '12px', textAlign: 'center', margin: '15px 0', background: '#f3f3f3', borderRadius: '6px' }}>Enviando cotización...</div>}
                {sendResult && !isSubmissionSuccessful && <div className="send-result-message" style={{ 
                  padding: '12px', 
                  textAlign: 'center', 
                  margin: '15px 0', 
                  background: sendResult.includes('error') ? '#ffeeee' : '#eeffee',
                  color: sendResult.includes('error') ? '#990000' : '#006600',
                  borderRadius: '6px',
                  fontWeight: '500'
                }}>{sendResult}</div>}
              </form>
            </>
          )}
        </div>
        <div className="review-slider-container">
			<div className="review-item">
				<div className="review-stars">⭐⭐⭐⭐⭐</div>
				<p className="review-text">“Me encantó saber el precio sin hablar con nadie.” – Juan P., Buenos Aires</p>
			</div>
			<div className="review-item">
				<div className="review-stars">⭐⭐⭐⭐☆</div>
				<p className="review-text">“Muy satisfecha con el resultado final” – María L., Córdoba</p>
			</div>
			<div className="review-item">
				<div className="review-stars">⭐⭐⭐⭐⭐</div>
				<p className="review-text">“El sistema quedó genial. Muy robusto” – Rodrigo G., Buenos Aires</p>
			</div>
			<div className="review-item">
				<div className="review-stars">⭐⭐⭐⭐☆</div>
				<p className="review-text">“La entrega fue muy rapida” – Ana S., Mendoza</p>
			</div>
			<div className="review-item">
				<div className="review-stars">⭐⭐⭐⭐⭐</div>
				<p className="review-text">“¡Justo lo que necesitaba para mi emprendimiento!” – Federico F., Buenos Aires</p>
			</div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cotizador;