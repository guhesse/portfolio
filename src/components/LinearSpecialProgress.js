import React, { useEffect, useRef, useState } from 'react';
import ScrollMagic from 'scrollmagic';
import Lottie from 'lottie-web';

import ProgressLinear0 from '../animations/linear-progress-0';
import ProgressLinear100 from '../animations/linear-progress-100';

const LinearSpecialProgress = () => {
  const [isAnimating, setIsAnimating] = useState(false);
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
        setIsAnimating(true);
      })
      .on('leave', () => {
        animationRef.current.setDirection(-1);
        animationRef.current.play();
        setIsAnimating(false);
      })
      .addTo(controllerRef.current);

    return () => {
      controllerRef.current.destroy(true);
    };
  }, []);



  const handleButtonClick = () => {
  
    
    setIsClicked(true);

  
    animationRef.current = Lottie.loadAnimation({
      container: containerRef.current,
      animationData: ProgressLinear100,
      loop: false,
      autoplay: false,
      renderer: 'svg',
      rendererSettings: {
        className: 'linear-progress-animation',
      },
      onComplete: () => {
        
        animationRef.current.stop(); // Para a animação quando estiver completa
      },
    });

    animationRef.current.play();
  };

  return (
    <div className="linear-progress-contain" ref={containerRef}>
      {isClicked ? (
        <p className="hability-text">Strogonoff de Brócolis</p>
      ) : (
        <p className="hability-text">Habilidade especial</p>
      )}
      <button className="special-btn" onClick={handleButtonClick}>
        ?
      </button>
    </div>
  );
};

export default LinearSpecialProgress;
