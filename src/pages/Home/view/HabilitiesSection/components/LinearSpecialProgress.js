import React, { useEffect, useRef, useState } from 'react';
import ScrollMagic from 'scrollmagic';
import Lottie from 'lottie-web';
import RevealUpAnimation from 'components/RevealUpAnimation';

import ProgressLinear0 from '../animations/linear-progress-0';
import ProgressLinear100 from '../animations/linear-progress-100';

const LinearSpecialProgress = () => {

  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    controllerRef.current = new ScrollMagic.Controller();

    animationRef.current = Lottie.loadAnimation({
      container: containerRef.current,
      animationData: ProgressLinear0,
      loop: false,
      autoplay: false,
      renderer: 'svg',
      rendererSettings: {
        className: 'linear-progress-animation',
      },
    });

    new ScrollMagic.Scene({
      triggerElement: containerRef.current,
      triggerHook: 0.8,
      reverse: true,
    })
      .on('enter', () => {
        animationRef.current.setDirection(1);
        animationRef.current.play();
        
      })
      .on('leave', () => {
        animationRef.current.setDirection(-1);
        animationRef.current.play();
      
      })
      .addTo(controllerRef.current);

    return () => {
      controllerRef.current.destroy(true);
    };
  }, []);

  const handleButtonClick = () => {
    setIsClicked(!isClicked); // Inverte o valor de isClicked ao clicar no botão

    if (isClicked) {
      // Se isClicked for true, a animação ProgressLinear100 é reproduzida reversamente
      animationRef.current.setDirection(-1);
      animationRef.current.play();
      animationRef.current.addEventListener('complete', () => {
        setIsClicked(false);
        animationRef.current.stop();
      });
    } else {
      // Se isClicked for false, a animação ProgressLinear0 é reproduzida normalmente
      animationRef.current = Lottie.loadAnimation({
        container: containerRef.current,
        animationData: ProgressLinear100,
        loop: false,
        autoplay: false,
        renderer: 'svg',
        rendererSettings: {
          className: 'linear-progress-animation',
        },
      });
      animationRef.current.play();
    }
  };


  return (
    <div className='special-progress-layout revealUpHabilities'>
    <div className="linear-progress-contain revealUp" ref={containerRef}>
    </div>
    {isClicked ? (
          <p className="hability-text revealUp">Strogonoff de Brócolis</p>
        ) : (
          <p className="hability-text revealUp">Habilidade especial</p>
        )}        
        <button className="draw meet" onClick={handleButtonClick}>
          ?
        </button>

        <RevealUpAnimation />

    </div>
  );
};

export default LinearSpecialProgress;
