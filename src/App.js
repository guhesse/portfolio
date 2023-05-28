import React from 'react'; 
import Navbar from 'components/navbar';
import Home from 'pages/home';
import Work from 'pages/work';
import './styles.css'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Work />
    </div>
  );
}

export default App;
