import React from 'react';
import Navbar from 'components/Navbar';
import Home from 'pages/Home/view/Home';
import Work from 'pages/Work/Work';
import { PageProvider } from './components/PageContext';
import 'styles/styles.scss';
import PageArrow from './components/PageArrow/view/PageArrow';

function App() {
  return (
    <PageProvider>
      <div className="App">
        <Navbar />
        <Home />
        <Work />
        <PageArrow />
      </div>
    </PageProvider>
  );
}

export default App;
