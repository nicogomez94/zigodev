import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../assets/styles/contacto.css';

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can replace this with your actual form submission
    console.log('Formulario enviado:', formData);
    
    // Submit the form to Formspree
    fetch("https://formspree.io/f/xzzeyrba", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        alert('¡Gracias por tu mensaje! Te responderemos a la brevedad.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Hubo un problema al enviar el formulario. Por favor, intenta nuevamente.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al procesar tu solicitud.');
    });
  };

  return (
    <>
      <Header />
      <main>
        <section className="contact-page">
          <div className="container">
            <h1 className="page-title">Contáctanos</h1>
            <p className="page-subtitle">Estamos aquí para ayudarte. Completa el formulario o utiliza nuestros datos de contacto.</p>

            <div className="contact-layout">
              <div className="contact-info">
                <h3>Información de Contacto</h3>
                <p>Puedes encontrarnos o contactarnos directamente a través de los siguientes medios:</p>
                <ul>
                  <li>
                    <i className="fas fa-location-dot icon"></i>
                    <span>Av. Corrientes 4554, Piso 5<br />C1043AAN, Buenos Aires, Argentina</span>
                  </li>
                  <li>
                    <i className="fas fa-phone icon"></i>
                    <span>+54 11 5229-1994</span>
                  </li>
                  <li>
                    <i className="fas fa-envelope icon"></i>
                    <span>nicolasgomez94@gmail.com</span>
                  </li>
                  <li>
                    <i className="fas fa-clock icon"></i>
                    <span>Lunes a Viernes: 9:00 AM - 6:00 PM</span>
                  </li>
                </ul>

                <div className="map-placeholder">
                  <h4>Nuestra Ubicación</h4>
                  <img src="/img/mapa.png" alt="Mapa placeholder" />
                </div>
              </div>

              <div className="contact-form-wrapper">
                <h3>Envíanos un Mensaje</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Tu nombre completo"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="tuemail@ejemplo.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Asunto</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Motivo de tu consulta"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Mensaje</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Escribe tu mensaje aquí..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-button">
                    Enviar Mensaje <span className="arrow">&rarr;</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contacto;