import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-web';

const RoundedProgress = (props) => {
  const { progress, software } = props;
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Inicialização do ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Configuração do ScrollTrigger
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%', // Iniciar animação quando o topo do elemento estiver a 80% da altura da janela
      onEnter: () => {
        // Iniciar a animação Lottie
        animationRef.current.play();
      },
      onLeaveBack: () => {
        // Retroceder a animação Lottie quando o elemento sair da tela
        animationRef.current.goToAndStop(0);
      },
    });

    // Carregar a animação Lottie
    animationRef.current = Lottie.loadAnimation({
      container: containerRef.current,
      animationData: progress,
      loop: false,
      autoplay: false,
      rendererSettings: {
        className: "rounded-progress-animation"
      }
    });

    // Remover o ScrollTrigger quando o componente for desmontado
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [progress]);

  return (
    <div className="progress-rounded-contain" ref={containerRef}>
      <p className="software-text">{software}</p>
    </div>
  );
};

export default RoundedProgress;
