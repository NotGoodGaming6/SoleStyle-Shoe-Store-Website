import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function SplitText({
  text = '',
  className = '',
  delay = 0, // delay in seconds
  duration = 0.5,
  stagger = 0.05,
  animationFrom = { opacity: 0, y: 40 },
  animationTo = { opacity: 1, y: 0 },
  transition = { type: 'spring', damping: 20, stiffness: 100 },
  threshold = 0.1,
  rootMargin = '0px',
}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => {
            const charGlobalIndex = 
              words.slice(0, wordIndex).reduce((acc, curr) => acc + curr.length, 0) + charIndex;

            return (
              <motion.span
                key={charIndex}
                initial={animationFrom}
                animate={isInView ? animationTo : animationFrom}
                transition={{
                  ...transition,
                  delay: delay + charGlobalIndex * stagger,
                  duration,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
