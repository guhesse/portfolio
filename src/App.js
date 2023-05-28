import React from 'react';
import Navbar from 'components/navbar';
import Home from 'components/home';
import Work from 'components/work';
import { PageProvider } from './components/PageContext';
import './styles.css';

function App() {
  return (
    <PageProvider>
      <div className="App">
        <Navbar />
        <Home />
        <Work />
      </div>
    </PageProvider>
  );
}

export default App;
