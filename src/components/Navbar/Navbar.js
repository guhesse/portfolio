import React, { useEffect, useRef } from 'react';
import NavLogoWhite from './svg/nav-logo-white.svg';
import NavLogoBlack from './svg/nav-logo-black.svg';
import './styles/NavBar.scss';
import ScrollMagic from 'scrollmagic';

function Navbar({ activeSection, handleSectionChange }) {
  const navbarRef = useRef(null);

  useEffect(() => {
    const controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
      triggerElement: '#home',
      triggerHook: 0,
      duration: document.querySelector('#home').clientHeight,
    })
      .setClassToggle(navbarRef.current, 'home-navbar')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: '#services',
      triggerHook: 0,
      duration: document.querySelector('#services').clientHeight,
    })
      .setClassToggle(navbarRef.current, 'services-navbar')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: '#habilities',
      triggerHook: 0,
      duration: document.querySelector('#habilities').clientHeight,
    })
      .setClassToggle(navbarRef.current, 'habilities-navbar')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: '#works',
      triggerHook: 0,
      duration: document.querySelector('#works').clientHeight,
    })
      .setClassToggle(navbarRef.current, 'works-navbar')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: '#testimonials',
      triggerHook: 0,
      duration: document.querySelector('#testimonials').clientHeight,
    })
      .setClassToggle(navbarRef.current, 'testimonials-navbar')
      .addTo(controller);

    // Add more scenes for other sections as needed

    return () => {
      controller.destroy();
    };
  }, []);

  return (
    <nav ref={navbarRef} className={`navbar-container ${activeSection === 'home' ? 'home-navbar' : 'services-navbar'}`}>
      <ul>
        <div className="nav-logo-contain">
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
          <a href="#works" onClick={() => handleSectionChange('work')}>Projetos</a>
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
