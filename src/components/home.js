import React, { useContext } from 'react';
import { PageContext } from './PageContext';
import Header from './header'
import HabilitiesSection from './HabilitiesSection';
import SectionTest from './test';

function Home() {
  const { selectedPage } = useContext(PageContext);

  return (
    <div id="home" style={{ display: selectedPage === '#home' ? 'block' : 'none' }}>

        <section>
          <Header />
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
