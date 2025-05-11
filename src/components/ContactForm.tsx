import React from 'react';

const ContactForm: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        fetch('https://formspree.io/f/xzzeyrba', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) {
                alert('Mensaje enviado con éxito!');
            } else {
                alert('Error al enviar el mensaje.');
            }
        });
    };

    return (
        <section id="formu_contacto_df">
            <div className="contact-form-container">
                <h2>Ponete en Contacto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" placeholder="Tu nombre completo" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input type="email" id="email" name="email" placeholder="tuemail@ejemplo.com" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Asunto</label>
                        <input type="text" id="subject" name="subject" placeholder="Motivo de tu consulta" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Mensaje</label>
                        <textarea id="message" name="message" placeholder="Escribe tu mensaje aquí..." required></textarea>
                    </div>
                    <button type="submit" className="submit-button">
                        Enviar Mensaje <span className="arrow">&rarr;</span>
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;