import React, { useContext } from 'react';
import { PageContext } from './PageContext';
import HeaderWork from './HeaderWork'

function Work() {
  const { selectedPage } = useContext(PageContext);

  return (
    <div id="work" style={{ display: selectedPage === '#work' ? 'block' : 'none' }}>
      <HeaderWork />
    </div>
  );
}

export default Work;
