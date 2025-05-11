import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BuildScalable from '../components/BuildScalable';
import StatsFeatures from '../components/StatsFeatures';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BuildScalable />
        <StatsFeatures />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
};

export default Home;