import { useState, useEffect } from 'react';

let randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const useEye = ({ eyelid = 250 }) => {
  const [ margin, setMargin ] = useState(eyelid * -1);

  useEffect(() => {
    const repeat = () => {
      const blinkEye = () => {
        setMargin(0);
        setTimeout(() => setMargin(eyelid * -1), 300);
      };
      blinkEye();

      return setTimeout(repeat, randomNumber(500, 10000));
    };

    const timeoutId = repeat();

    return () => clearTimeout(timeoutId);
  }, [ eyelid ]);

  return margin;
};
