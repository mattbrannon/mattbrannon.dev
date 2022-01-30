import { useState, useEffect } from 'react';

let randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let random = (min) => (max) => randomNumber(min, max);

export const useEye = (props) => {
  const eyelid = props.eyelid || 150;
  const blink = props.$blink;
  const closed = props.closed;
  const [ margin, setMargin ] = useState(eyelid * -1);

  // const [ margin, setMargin ] = useState(eyelid * -1);

  useEffect(() => {
    let timeoutId;

    if (blink) {
      const setMax = random(500);
      const repeat = (callback) => {
        const timeout = callback(10000);
        setMargin(0);
        setTimeout(() => setMargin(eyelid * -1), 300);
        timeoutId = setTimeout(() => repeat(callback), timeout);
      };
      repeat(setMax);
    }
    if (closed) {
      setMargin(0);
    }

    return () => clearTimeout(timeoutId);
  }, [ blink, eyelid, closed ]);

  return margin;
};
