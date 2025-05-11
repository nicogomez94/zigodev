import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import BuildScalable from '../components/BuildScalable';
import StatsFeatures from '../components/StatsFeatures';
import ContactForm from '../components/ContactForm';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BuildScalable />
        <StatsFeatures />
        <ContactForm />
      </main>
    </>
  );
};

export default Home;