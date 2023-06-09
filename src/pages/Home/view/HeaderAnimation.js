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
        duration: 0.7,
        ease: 'Power4.easeOut', // Adicione o efeito de easing desejado aqui
      });

      tl.current.from('.sh-text', {
        autoAlpha: 0,
        y: 50,
        duration: 0.7,
        ease: 'Power4.easeOut', // Adicione o efeito de easing desejado aqui
      },  "=-0.5");

      tl.current.from('.text-header', {
        autoAlpha: 0,
        y: 50,
        duration: 0.7,
        ease: 'Power4.easeOut', // Adicione o efeito de easing desejado aqui
      }, "=-0.5");

       tl.current.from('#LinkedinLogo, #GithubLogo, #BehanceLogo', {
        autoAlpha: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'Power4.easeOut', // Adicione o efeito de easing desejado aqui
      }, "=-0.5");
      
      tl.current.from('.text-mention, .img-header', {
        autoAlpha: 0,
        y: 50,
        duration: 2.5,
        ease: 'Power4.easeOut', // Adicione o efeito de easing desejado aqui
      },'=-1.5');


    });

    return () => ctx.revert();
  }, []);

  return null;
}

export default HeaderAnimation;
