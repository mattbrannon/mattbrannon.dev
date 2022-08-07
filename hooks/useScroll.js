import { useState, useEffect } from 'react';

export const useScroll = () => {
  const [scroll, setScroll] = useState({ previous: 0, current: 0 });

  useEffect(() => {
    let previousScroll;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (typeof previousScroll !== 'number') {
        previousScroll = currentScroll;
        return;
      }
      setScroll({ previous: previousScroll, current: currentScroll });
      previousScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scroll;
};
