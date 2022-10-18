import { useState, useEffect, useRef, useCallback } from 'react';

// const randomNumber = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// export const useRandomInterval = (min, max) => {
//   const initialState = randomNumber(min, max);
//   const [value, setValue] = useState(initialState);

//   useEffect(() => {
//     const repeat = () => {
//       const timeout = randomNumber(min, max);
//       setValue(timeout);
//       return setTimeout(repeat, timeout);
//     };

//     const timeoutId = repeat();

//     return () => clearTimeout(timeoutId);
//   }, [max, min]);

//   return value;
// };

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const useRandomInterval = (callback, minDelay, maxDelay) => {
  const timeoutId = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const isEnabled = typeof minDelay === 'number' && typeof maxDelay === 'number';
    if (isEnabled) {
      const repeat = () => {
        const delay = random(minDelay, maxDelay);
        timeoutId.current = setTimeout(() => {
          savedCallback.current();
          repeat();
        }, delay);
      };
      repeat();
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);
  const cancel = useCallback(function () {
    window.clearTimeout(timeoutId.current);
  }, []);
  return cancel;
};
