import React, { useContext } from 'react';
import { PageContext } from './PageContext';
import Header from './header'
import HabilitiesSection from './HabilitiesSection';

function Home() {
  const { selectedPage } = useContext(PageContext);

  return (
    <div id="home" style={{ display: selectedPage === '#home' ? 'block' : 'none' }}>
      <Header />
      <HabilitiesSection />
    </div>
  );
}

export default Home;