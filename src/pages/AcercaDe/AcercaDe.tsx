import { useEffect } from 'react';
import '../../assets/styles/style.css';
import '../../assets/styles/acercade.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ScrollToTop from '../../components/ScrollToTop';

const AcercaDe = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Acerca de nosotros | ZigoDev";
  }, []);

  // Datos del equipo
  const teamMembers = [
    {
      name: "Ricardo Zito",
      role: "Director de Tecnología",
      bio: "Con más de 10 años de experiencia en desarrollo web y aplicaciones móviles. Especialista en arquitectura de software y soluciones escalables.",
      image: "/img/team/team1.png"
    },
    {
      name: "María González",
      role: "Diseñadora UX/UI",
      bio: "Apasionada por crear experiencias digitales centradas en el usuario. Experta en diseño de interfaces intuitivas y atractivas.",
      image: "/img/team/team2.png"
    },
    {
      name: "Carlos Rodríguez",
      role: "Desarrollador Full Stack",
      bio: "Desarrollador versátil con experiencia en React, Node.js y diversas tecnologías cloud. Enfocado en soluciones robustas y performantes.",
      image: "/img/team/team3.png"
    },
    {
      name: "Laura Sánchez",
      role: "Gerente de Proyectos",
      bio: "Especialista en metodologías ágiles con un historial probado en la entrega exitosa de proyectos complejos y de alto impacto.",
      image: "/img/team/team4.png"
    }
  ];

  return (
    <>
      <Header />
      <main>
        <section className="hero-section about-hero">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-12">
              <h1>Nuestro Equipo</h1>
              <p className="hero-subtitle max-w-3xl mx-auto">
                Somos un equipo de más de 20 profesionales apasionados por la tecnología y el diseño, 
                dedicados a crear soluciones digitales innovadoras y personalizadas para nuestros clientes.
              </p>
            </div>

            {/* <div className="team-illustration text-center mb-12">
              <img 
                src="/img/chabon.png" 
                alt="Ilustración de desarrollador" 
                className="mx-auto max-w-full md:max-w-lg"
              />
            </div> */}
          </div>
        </section>
        
        <section className="team-members-section py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="team-card bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/img/chabon.png"; // Imagen de respaldo si la original no carga
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <h4 className="text-purple-600 mb-4">{member.role}</h4>
                      <p className="text-gray-600">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="values-section py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="section-title">Nuestros Valores</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="value-card text-center p-6">
                <div className="values-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovación</h3>
                <p className="text-gray-600">Exploramos constantemente nuevas ideas y tecnologías para ofrecer soluciones de vanguardia.</p>
              </div>
              <div className="value-card text-center p-6">
                <div className="values-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Colaboración</h3>
                <p className="text-gray-600">Trabajamos juntos, compartiendo conocimientos y habilidades para lograr resultados excepcionales.</p>
              </div>
              <div className="value-card text-center p-6">
                <div className="values-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Excelencia</h3>
                <p className="text-gray-600">Nos esforzamos por superar expectativas en cada proyecto, con atención al detalle y compromiso con la calidad.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default AcercaDe;
