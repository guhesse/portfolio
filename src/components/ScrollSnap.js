import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollSnap = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Configurações do ScrollTrigger
    const scrollTriggerConfig = {
      snap: {
        snapTo: 'nearest', // Define o tipo de snap (pode ser "start", "center" ou "end")
        duration: 0.5, // Define a duração da animação de snap
        ease: 'power1.inOut', // Define a curva de animação
      },
      end: () => {
        // Função executada ao finalizar o snap
        console.log('Snap finalizado');
      },
    };

    // Configura o ScrollTrigger para cada elemento filho
    gsap.utils.toArray(containerRef.current.children).forEach((child, index) => {
      ScrollTrigger.create({
        trigger: child,
        start: 'top top', // Define o ponto de início do snap
        end: 'bottom bottom', // Define o ponto de finalização do snap
        markers: true,
        ...scrollTriggerConfig,
      });

    });
  }, [children]);

  return <div ref={containerRef}>{children}</div>;
};

export default ScrollSnap;
