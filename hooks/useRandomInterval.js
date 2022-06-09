import { useState, useEffect } from 'react';

const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const useRandomInterval = (min, max) => {
  const initialState = randomNumber(min, max);
  const [ value, setValue ] = useState(initialState);

  useEffect(() => {
    const repeat = () => {
      const timeout = randomNumber(min, max);
      setValue(timeout);
      console.log({ timeout });
      return setTimeout(repeat, timeout);
    };

    const timeoutId = repeat();

    return () => clearTimeout(timeoutId);
  }, [ max, min ]);

  return value;
};
