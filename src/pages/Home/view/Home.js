import React, { useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Header from './Header';
import ServicesSection from './ServicesSection/ServicesSection';
import HabilitiesSection from './HabilitiesSection/HabilitiesSection';

function Home() {
  const [activeSection, setActiveSection] = useState('home');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      <Navbar activeSection={activeSection} handleSectionChange={handleSectionChange} />
      <section id="home" className="home-section">
        <Header />
      </section>

      <section id="services" className="services-section">
        <ServicesSection />
      </section>

      <section id="habilities" className="habilities-section">
        <HabilitiesSection />
      </section>
    </div>
  );
}

export default Home;
