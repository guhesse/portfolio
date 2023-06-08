import React, { useContext } from 'react';
import { PageContext } from '../../../components/PageContext';
import Header from './Header'
import ServicesSection from './ServicesSection/ServicesSection';
import HabilitiesSection from './HabilitiesSection';
import SectionTest from './Test';


function Home() {
  const { selectedPage } = useContext(PageContext);

  return (
    <div id="home" style={{ display: selectedPage === '#home' ? 'block' : 'none' }}>

         {/* <section>
          <Header />
        </section>  */}

        <section>
          <ServicesSection />
        </section>

        <section>
          <HabilitiesSection />
        </section>
          
        <section>
          <SectionTest />
        </section>

        <section>
          <SectionTest />
        </section>

    </div>
  );
}

export default Home;
