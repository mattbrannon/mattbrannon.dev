import { useState, useEffect } from 'react';

let randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let random = (min) => (max) => randomNumber(min, max);

export const useEye = ({ eyelid = 150, blink, closed }) => {
  // console.log({ useEye: props });
  // const eyelid = props.eyelid || 150;
  // const blink = props.blink;
  // const closed = props.closed;
  const [ margin, setMargin ] = useState(eyelid * -1);

  // const [ margin, setMargin ] = useState(eyelid * -1);

  const blinkEye = () => {
    setMargin(0);
    setTimeout(() => setMargin(-150), 300);
  };

  useEffect(() => {
    const setMax = random(500);

    const repeat = () => {
      const randomTimeout = setMax(10000);
      blinkEye();
      return setTimeout(repeat, randomTimeout);
    };
    const timeoutId = repeat();

    return () => clearTimeout(timeoutId);
  }, []);

  return margin;
};
