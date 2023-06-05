import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

function HeaderAnimation() {
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline();

      tl.current.from('.hl-text, .sh-text', {
        autoAlpha: 0,
        y: 50,
        duration: 0.75,
        ease: 'Power4.easeOut', // Adicione o efeito de easing desejado aqui
      });

      tl.current.from('.text-header', {
        autoAlpha: 0,
        y: 50,
        duration: 0.75,
        ease: 'Power4.easeOut', // Adicione o efeito de easing desejado aqui
      });

      tl.current.from('.text-mention, .img-header', {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        ease: 'Power4.easeOut', // Adicione o efeito de easing desejado aqui
      },'=+0.25');

    });

    return () => ctx.revert();
  }, []);

  return null;
}

export default HeaderAnimation;
