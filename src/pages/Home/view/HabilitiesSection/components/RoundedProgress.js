import React, { useEffect, useRef } from 'react';
import ScrollMagic from 'scrollmagic';
import { gsap, TimelineMax } from 'gsap';
import Lottie from 'lottie-web';
import RevealUpHabilitiesSequential from 'components/RevealUpHabilitiesSequential';

const RoundedProgress = (props) => {
  const { progress, software } = props;
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const controllerRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    controllerRef.current = new ScrollMagic.Controller();

    animationRef.current = Lottie.loadAnimation({
      container: containerRef.current,
      animationData: progress,
      loop: false,
      autoplay: false,
      renderer: 'svg',
      rendererSettings: {
        className: 'rounded-progress-animation',
      },
    });

    new ScrollMagic.Scene({
      triggerElement: containerRef.current,
      triggerHook: 0.8,
      reverse: true,
    })
      .on('enter', () => {
        const tl = new TimelineMax();

        gsap.fromTo(
          containerRef.current,
          { opacity: 0, y: 30 },
          { duration: 1, opacity: 1, y: 0, ease: 'back' }
        );

        elementsRef.current.forEach((element) => {
          const revealUpAnimation = gsap.fromTo(
            element,
            { opacity: 0, y: 30 },
            { duration: 1, opacity: 1, y: 0, ease: 'back' }
          );
          tl.add(revealUpAnimation);
          tl.add(() => {
            animationRef.current.play();
          }, '-=2'); // Inicia a animação Lottie com um atraso de 0.4 segundos após a animação revealUp
        });

        tl.play();
      })
      .on('leave', () => {
        animationRef.current.stop();
      })
      .addTo(controllerRef.current);

    return () => {
      controllerRef.current.destroy(true);
    };
  }, [progress]);

  const handleElementRef = (ref) => {
    if (ref && !elementsRef.current.includes(ref)) {
      elementsRef.current.push(ref);
    }
  };

  return (
    <div className="progress-rounded-contain revealUpHabilities" ref={containerRef}>
      <p className="software-text" ref={handleElementRef}>
        {software}
      </p>
      <RevealUpHabilitiesSequential />
    </div>
  );
};

export default RoundedProgress;
