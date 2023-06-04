import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollMagic from 'scrollmagic';

const RevealUpAnimation = () => {
  useEffect(() => {
    const controller = new ScrollMagic.Controller();

    gsap.utils.toArray('.revealUp').forEach(elem => {
      new ScrollMagic.Scene({
        triggerElement: elem,
        triggerHook: 0.8,
        reverse: true,
      })
        .on('enter', () => {
          gsap.fromTo(
            elem,
            { y: 100, autoAlpha: 0 },
            {
              duration: 1,
              y: 0,
              autoAlpha: 1,
              ease: 'back',
              overwrite: 'auto',
            }
          );
        })
        .on('leave', () => {
          gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: 'auto' });
        })
        .on('enterBack', () => {
          gsap.fromTo(
            elem,
            { y: -100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: 'back',
              overwrite: 'auto',
            }
          );
        })
        .on('leaveBack', () => {
          gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: 'auto' });
        })
        .addTo(controller);
    });
  }, []);

  return null;
};

export default RevealUpAnimation;
