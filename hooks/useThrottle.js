import { useState, useCallback } from 'react';

export function withThrottle(callback, delay) {
  let isThrottled = false;
  return function throttle(...args) {
    if (isThrottled) {
      return;
    }
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
    }, delay);

    return callback(...args);
  };
}

// export function useThrottle(callback, delay) {
//   const [ isThrottled, setIsThrottled ] = useState(false);
//   const [ value, setValue ] = useState();

//   const throttle = useCallback(
//     (...args) => {
//       if (isThrottled) return;

//       setIsThrottled(true);
//       setTimeout(() => {
//         setIsThrottled(false);
//       }, delay);

//       const value = callback(...args);
//       setValue(value);
//     },
//     [ callback, delay, isThrottled ]
//   );

//   return [ value, throttle ];
// }

// import { useDebounce } from './useDebounce';

export function useThrottle(callback, delay) {
  const [isThrottled, setIsThrottled] = useState(false);

  const throttle = (...args) => {
    if (isThrottled) return;

    setIsThrottled(true);
    setTimeout(() => {
      setIsThrottled(false);
    }, delay);

    return callback(...args);
  };

  return throttle;
}
