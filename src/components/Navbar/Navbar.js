import React from 'react';
import { ReactComponent as NavLogo } from './svg/nav-logo.svg';
import './styles/NavBar.scss';

function Navbar({ activeSection, handleSectionChange }) {
  console.log('activeSection:', activeSection);

  return (
    <nav className={`navbar-container ${activeSection === 'home' ? 'home-navbar' : 'services-navbar'}`}>
      <ul>
        <div className="nav-logo-contain">
          <NavLogo />
        </div>
        <li>
          <a href="#home" onClick={() => handleSectionChange('home')}>Home</a>
        </li>

        <li>
          <a href="#services" onClick={() => handleSectionChange('services')}>Serviços</a>
        </li>

        <li>
          <a href="#habilities" onClick={() => handleSectionChange('habilities')}>Habilidades</a>
        </li>

        <li>
          <a href="#work" onClick={() => handleSectionChange('work')}>Trabalhos</a>
        </li>

        <li>
          <a href="#testimonials" onClick={() => handleSectionChange('testimonials')}>Depoimentos</a>
        </li>

        <li>
          <a href="#contact">
            <button>Contato</button>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
