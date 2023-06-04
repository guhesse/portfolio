import React, { useContext } from 'react';
import { PageContext } from '../../components/PageContext';
import HeaderWork from '../../components/HeaderWork'

function Work() {
  const { selectedPage } = useContext(PageContext);

  return (
    <div id="work" style={{ display: selectedPage === '#work' ? 'block' : 'none' }}>
      <HeaderWork />
    </div>
  );
}

export default Work;
