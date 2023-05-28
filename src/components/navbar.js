import React, { useContext } from 'react';
import { PageContext } from './PageContext';
import $ from "jquery";

$('.nav-link').on('click', function() {
  $('.active-link').removeClass('active-link');
  $(this).addClass('active-link');
});

function Navbar() {
  const { selectedPage, handlePageChange } = useContext(PageContext);

  return (
    <nav className="navbar-container">
      <ul>
        <li className={`nav-link ${selectedPage === '#home' ? 'active-link' : ''}`}>
          <a href="#home" onClick={() => handlePageChange('#home')}>Início</a>
          <div className="underline"></div>
        </li>

        <li className={`nav-link ${selectedPage === '#work' ? 'active-link' : ''}`}>
          <a href="#work" onClick={() => handlePageChange('#work')}>Trabalhos</a>
          <div className="underline"></div>
        </li>

        <li className={`nav-link ${selectedPage === '#contact' ? 'active-link' : ''}`}>
          <a href="#contact" onClick={() => handlePageChange('#contact')}>Contato</a>
          <div className="underline"></div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
