import React from 'react';
import { ReactComponent as NavLogo } from './svg/nav-logo.svg';
import './styles/NavBar.scss';

function Navbar({ selectedSection }) {
  return (
    <nav className="navbar-container">
      <ul>
        <div className="nav-logo-contain">
          <NavLogo />
        </div>
        <li className={`nav-link ${selectedSection === 'home' ? 'active-link' : ''}`}>
          <a href="#home">Home</a>
        </li>

        <li className={`nav-link ${selectedSection === 'services' ? 'active-link' : ''}`}>
          <a href="#services">Serviços</a>
        </li>

        <li className={`nav-link ${selectedSection === 'habilities' ? 'active-link' : ''}`}>
          <a href="#habilities">Habilidades</a>
        </li>

        <li className={`nav-link ${selectedSection === 'contact' ? 'active-link' : ''}`}>
          <a href="#contact">Trabalhos</a>
        </li>

        <li className={`nav-link ${selectedSection === 'testimonials' ? 'active-link' : ''}`}>
          <a href="#testimonials">Depoimentos</a>
        </li>

        <li className={`nav-link ${selectedSection === 'contact' ? 'active-link' : ''}`}>
          <a href="#contact">
            <button>Contato</button>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
