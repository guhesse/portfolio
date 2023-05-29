import React, { useContext } from 'react';
import { PageContext } from './PageContext';
import ScrollSnap from './ScrollSnap';
import Header from './header'
import HabilitiesSection from './HabilitiesSection';
import SectionTest from './test';

function Home() {
  const { selectedPage } = useContext(PageContext);

  return (
    <div id="home" style={{ display: selectedPage === '#home' ? 'block' : 'none' }}>
      <ScrollSnap>

        <section>
          <Header />
        </section>

        <section>
          <HabilitiesSection />
        </section>
          
        <section>
          <SectionTest />
        </section>

      </ScrollSnap>
    </div>
  );
}

export default Home;