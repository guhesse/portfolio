import React from 'react';
import Navbar from 'components/Navbar';
import Home from 'pages/Home/view/Home';
import Work from 'pages/Work/Work';
import { PageProvider } from './components/PageContext';
import 'styles/styles.css';

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
