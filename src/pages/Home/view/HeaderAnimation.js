import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

function HeaderAnimation() {
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline();

      tl.current.from('.hl-text', {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        ease: 'Power4.easeInOut', // Adicione o efeito de easing desejado aqui
      }, '0.1');

      tl.current.from('.sh-text', {
        autoAlpha: 0,
        y: 50,
        duration: 0.5,
        ease: 'Power4.easeInOut', // Adicione o efeito de easing desejado aqui
      }, '+=0.1');

      tl.current.from('.text-header', {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        ease: 'Power4.easeInOut', // Adicione o efeito de easing desejado aqui
      }, '+=0.5');

      tl.current.from('.text-mention, .img-header', {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        ease: 'Power4.easeInOut', // Adicione o efeito de easing desejado aqui
      }, '+=0.5');

    });

    return () => ctx.revert();
  }, []);

  return null;
}

export default HeaderAnimation;
