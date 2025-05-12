import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsAppButton: React.FC = () => {
  const whatsappNumber = "5491152291994"; // Replace with your WhatsApp number e.g., 5491112345678
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappLink}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} />
    </a>
  );
};

export default WhatsAppButton;