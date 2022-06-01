import { useState, useEffect, useCallback } from 'react';

const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const useRandom = (min, max) => {
  const initialState = randomNumber(min, max);
  const [ value, setValue ] = useState(initialState);

  const createRandomValue = useCallback(() => {
    const n = randomNumber(min, max);
    setValue(n);
    const id = setTimeout(() => createRandomValue(), n * 1000);
    return id;
  }, [ min, max ]);

  useEffect(() => {
    const timeoutId = createRandomValue();
    return () => clearTimeout(timeoutId);
  }, [ createRandomValue ]);

  return value;
};
