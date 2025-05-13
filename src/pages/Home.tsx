import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BuildScalable from '../components/BuildScalable';
import FeaturedServices from '../components/FeaturedServices';
import FeaturedProjects from '../components/FeaturedProjects';
import StatsFeatures from '../components/StatsFeatures';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
// Importa los estilos para estos componentes
import '../assets/styles/featured.css';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BuildScalable />
        <FeaturedServices />
        <FeaturedProjects />
        <StatsFeatures />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
};

export default Home;