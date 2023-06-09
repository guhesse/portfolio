import React, { useContext } from 'react';
import { PageContext } from '../PageContext';
import $ from "jquery";
import { ReactComponent as NavLogo } from './svg/nav-logo.svg';
import './styles/NavBar.scss';

$('.nav-link').on('click', function () {
  $('.active-link').removeClass('active-link');
  $(this).addClass('active-link');
});

function Navbar() {
  const { selectedPage, handlePageChange } = useContext(PageContext);

  return (
    <nav className="navbar-container">
      <ul>
        <div className='nav-logo-contain'>
          <NavLogo />
        </div>
        <li className={`nav-link ${selectedPage === '#home' ? 'active-link' : ''}`}>
          <a href="#home" onClick={() => handlePageChange('#home')}>Serviços</a>
        </li>

        <li className={`nav-link ${selectedPage === '#work' ? 'active-link' : ''}`}>
          <a href="#work" onClick={() => handlePageChange('#work')}>Habilidades</a>
        </li>

        <li className={`nav-link ${selectedPage === '#contact' ? 'active-link' : ''}`}>
          <a href="#contact" onClick={() => handlePageChange('#contact')}>Trabalhos</a>
        </li>

        <li className={`nav-link ${selectedPage === '#contact' ? 'active-link' : ''}`}>
          <a href="#contact" onClick={() => handlePageChange('#contact')}>Depoimentos</a>
        </li>

        <li className={`nav-link ${selectedPage === '#contact' ? 'active-link' : ''}`}>
          
          <a href="#contact" onClick={() => handlePageChange('#contact')}><button>Contato</button></a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
