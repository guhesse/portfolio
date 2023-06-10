import React, { useEffect, useRef } from 'react';
import ScrollMagic from 'scrollmagic';
import Lottie from 'lottie-web';
import RevealUpHabilitiesSequential from 'components/RevealUpHabilitiesSequential';


const LinearProgress = (props) => {
  const { progress, software } = props;
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    // Inicialização do ScrollMagic
    controllerRef.current = new ScrollMagic.Controller();

    // Carregar a animação Lottie
    animationRef.current = Lottie.loadAnimation({
      container: containerRef.current,
      animationData: progress,
      loop: false,
      autoplay: false,
      renderer: 'svg', // Certifique-se de usar o renderizador correto
      // rendererSettings: {
      //   className: "linear-progress-animation"
      // }
    });

    // Configuração do ScrollMagic Scene
    new ScrollMagic.Scene({
      triggerElement: containerRef.current,
      triggerHook: 0.8, // Iniciar animação quando o topo do elemento estiver a 80% da altura da janela
      reverse: true, // Retroceder a animação quando o elemento sair da tela
    })
      .on('enter', () => {
        // Iniciar a animação Lottie
        animationRef.current.play();
      })
      .on('leave', () => {
        // Parar a animação Lottie
        animationRef.current.stop();
      })
      .addTo(controllerRef.current);

    // Remover o ScrollMagic Controller quando o componente for desmontado
    return () => {
      controllerRef.current.destroy(true);
    };
  }, [progress]);

  return (
       <div className="progresses-layout revealUpHabilities">
        <div className="linear-progress-contain" ref={containerRef}>
          <RevealUpHabilitiesSequential />
        </div>

        <p className="hability-text">{software}</p>
      </div>

  );
};


export default LinearProgress;
