import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Header from './Header';
import ServicesSection from './ServicesSection/ServicesSection';
import HabilitiesSection from './HabilitiesSection/HabilitiesSection';

function Home() {
  return (
    <div id="home">
      <Navbar />
      <section id="home">
        <Header />
      </section>

      <section id="services">
        <ServicesSection />
      </section>

      <section id="habilities">
        <HabilitiesSection />
      </section>
    </div>
  );
}

export default Home;
