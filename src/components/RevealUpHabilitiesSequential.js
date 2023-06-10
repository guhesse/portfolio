import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollMagic from 'scrollmagic';

const RevealUpHabilitiesSequential = () => {
  useEffect(() => {
    const controller = new ScrollMagic.Controller();

    gsap.utils.toArray('.revealUpHabilities').forEach((elem, index) => {
      new ScrollMagic.Scene({
        triggerElement: elem,
        triggerHook: 3,
        reverse: true,
      })
        .on('enter', () => {
          gsap.fromTo(
            elem,
            { y: '15px', autoAlpha: 0 }, // Inicia os elementos à esquerda (fora da tela)
            {
              duration: 0.35,
              delay: index * 0.05, // Aplica o atraso sequencial para cada elemento
              y: '0', // Move os elementos para a posição inicial (0%)
              autoAlpha: 1,
              ease: 'back',
              overwrite: 'auto',
            }
          );
        })
        .on('leave', () => {
          gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: 'auto' });
        })
        .addTo(controller);
    });
  }, []);

  return null;
};

export default RevealUpHabilitiesSequential;
