import { useState, useEffect } from 'react';

let randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const useEye = ({ eyelid = 175 }) => {
  const [margin, setMargin] = useState(eyelid * -1);

  useEffect(() => {
    const repeat = () => {
      const blinkEye = () => {
        setMargin(0);
        setTimeout(() => setMargin(eyelid * -1), 300);
      };

      blinkEye();
      const timeout = randomNumber(500, 10000);
      return setTimeout(repeat, timeout);
    };

    const timeoutId = repeat();

    return () => clearTimeout(timeoutId);
  }, [eyelid]);

  return margin;
};
