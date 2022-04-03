import { useState, useEffect } from 'react';
import { useHasCookie } from './useCookie';

export const useHasFinished = () => {
  const [ hasFinished, setHasFinished ] = useState(false);

  useEffect(() => {
    if (document.cookie === 'finished=true') {
      setHasFinished(true);
    }
  }, [ hasFinished ]);

  return hasFinished;
};

// export const useHasCookie = () => {
//   const [ hasCookie, setHasCookie ] = useState(false);

//   useEffect(() => {
//     if (!hasCookie) {
//       const cookie = document.cookie;
//       const hasCookie = cookie.length && cookie === 'finished=true';
//       setHasCookie(hasCookie);
//     }
//   }, [ hasCookie ]);

//   return hasCookie;
// };

export const useHasVisited = (context) => {
  const { hasRun, setHasRun } = context;
  const hasCookie = useHasCookie();

  useEffect(() => {
    if (hasCookie && !hasRun) {
      setHasRun(true);
    }
  }, [ hasCookie, hasRun, setHasRun ]);

  return hasRun;
};
