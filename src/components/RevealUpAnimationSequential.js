import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollMagic from 'scrollmagic';

const RevealUpAnimationSequential = () => {
  useEffect(() => {
    const controller = new ScrollMagic.Controller();

    gsap.utils.toArray('.revealUpSequential').forEach((elem, index) => {
      new ScrollMagic.Scene({
        triggerElement: elem,
        triggerHook: 3,
        reverse: true,
      })
        .on('enter', () => {
          gsap.fromTo(
            elem,
            { y: '20px', autoAlpha: 0 }, // Inicia os elementos à esquerda (fora da tela)
            {
              duration: 0.9,
              delay: index * 0.02, // Aplica o atraso sequencial para cada elemento
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

export default RevealUpAnimationSequential;
