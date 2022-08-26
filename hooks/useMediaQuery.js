import { useEffect, useState, useCallback } from 'react';
import { useHasMounted } from './useHasMounted';

/* helpers */

function camelCaseToKebabCase(str) {
  // replace any capital letters with the lowercase letter followed by a hyphen
  return str.replace(/([A-Z])/g, (v) => '-' + v.toLowerCase());
}

function getFlattenedValues(obj) {
  // make an array of sub arrays from each key value pair in obj
  // slice off everything but the first entry and then flatten it
  return Object.entries(obj)
    .slice(0, 1)
    .flat();
}

function parseQuery(obj) {
  // if `unit` exists in the object, use the value provided, else use `px`
  const unit = obj?.unit ?? 'px';

  const [ key, value ] = getFlattenedValues(obj);

  const queryValue = typeof value === 'string' ? value : `${value}${unit}`;

  const queryKey = camelCaseToKebabCase(key);

  const mediaQuery = `(${queryKey}: ${queryValue})`;
  return mediaQuery;
}
/* the hook */

export const useMediaQuery = (obj) => {
  const [ isMatch, setIsMatch ] = useState(null);
  const query = parseQuery(obj);

  const handleChange = (e) => setIsMatch(e.matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setIsMatch(mql.matches);
    try {
      mql.addEventListener('change', handleChange);
      return () => mql.removeEventListener('change', handleChange);
    } catch {
      mql.addListener('change', handleChange);
      return () => mql.removeListener('change', handleChange);
    }
  }, [ query ]);

  if (isMatch === null && typeof window !== 'undefined') {
    return window.matchMedia(query).matches;
  }

  return isMatch;
};

// export const useMediaQuery = (object) => {
//   const query = parseQuery(object);
//   const [ isMatch, setIsMatch ] = useState(null);
//   const hasMounted = useHasMounted();

//   useEffect(() => {
//     const handler = (e) => setIsMatch(e.matches);
//     const mql = window.matchMedia(query);
//     const isMatch = mql.matches;
//     setIsMatch(isMatch);

//     try {
//       mql.addEventListener('change', handler);
//       return () => mql.removeEventListener('change', handler);
//     } catch (error) {
// mql.addListener('change', handler);
// return () => mql.removeListener('change', handler);
//     }
//     // }

//     // setIsMatch(window.matchMedia(query).matches);
//   }, [ query, isMatch ]);

//   // if (isMatch === null && typeof window !== 'undefined') {
//   //   return window.matchMedia(query).matches;
//   // }

//   if (isMatch === null && typeof window !== 'undefined') {
//     return window.matchMedia(query).matches;
//   }

//   return isMatch;
// };

// function camelCaseToCss(str) {
//   return str.replace(/([A-Z])/g, (v) => '-' + v.toLowerCase());
// }
// // eslint-disable-next-line no-unused-vars
// function cssToCamelCase(str) {
//   return str.replace(/(-[a-z]){1}/g, (v) => v.slice(1).toUpperCase());
// }

// const parseQuery = (object) => {
//   const key = Object.keys(object).join('');
//   const query = camelCaseToCss(key);

//   const value = Object.values(object).map((val) => {
//     return typeof val === 'number' ? val + 'px' : val;
//   })[0];

//   const mediaQuery = `(${query}: ${value})`;

//   return mediaQuery;
// };

// export const useMediaQuery = (object) => {
//   const query = parseQuery(object);
//   const [ isMatch, setIsMatch ] = useState(null);
//   const hasMounted = useHasMounted();

//   useEffect(() => {
//     const handler = (e) => setIsMatch(e.matches);

//     if (hasMounted) {
//       const mql = window.matchMedia(query);
//       const isMatch = mql.matches;
//       setIsMatch(isMatch);

//       try {
//         mql.addEventListener('change', handler);
//         return () => mql.removeEventListener('change', handler);
//       } catch (error) {
//         mql.addListener('change', handler);
//         return () => mql.removeListener('change', handler);
//       }
//     }

//     // setIsMatch(window.matchMedia(query).matches);
//   }, [ query, isMatch, hasMounted ]);

//   if (isMatch === null && typeof window !== 'undefined') {
//     return window.matchMedia(query).matches;
//   }

//   return isMatch;
// };

// export const useMediaQuery = (query) => {
//   const [ isMatch, setIsMatch ] = useState(null);

//   const testQuery = useCallback(() => {
//     if (typeof window !== 'undefined' && isMatch === null) {
//       const parsed = parseQuery(query);
//       const mql = window.matchMedia(parsed);
//       setIsMatch(mql.matches);
//     }
//   }, [ isMatch, query ]);

//   testQuery();

//   useEffect(() => {
//     console.log({ isMatch });
//   }, [ isMatch ]);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const mediaQuery = parseQuery(query);
//       const mql = window.matchMedia(mediaQuery);

//       setIsMatch(mql.matches);

//       mql.addEventListener('change', testQuery);

//       return () => mql.removeEventListener('change', testQuery);
//     }
//   }, [ query, testQuery ]);

//   return isMatch;
// };

// export const useMediaQuery = (query) => {
//   const [ isMatch, setIsMatch ] = useState(null);
//   const mediaQuery = parseQuery(query);
//   const hasMounted = useHasMounted();
//   // const [ media, setMedia ] = useState('');
//   const getMatches = () => {
//     if (hasMounted) {
//       return window.matchMedia(mediaQuery).matches;
//     }
//     return false;
//   };

//   // const handleChange = () => {};

//   useEffect(() => {
//     const mqlList = window.matchMedia(mediaQuery);
//     const handler = () => setIsMatch(e.matches);
//     handler(mqlList.matches);

//     mqlList.addEventListener('change', handler);
//     return () => mqlList.removeEventListener('change', handler);
//   }, [ mediaQuery, isMatch, hasMounted ]);

//   return isMatch;
// };

// export const useMediaQuery = (query) => {
//   const [ isMatch, setsIsMatch ] = useState(null);
//   const mediaQuery = parseQuery(query);
//   const hasMounted = useHasMounted();

//   useEffect(() => {
//     if (hasMounted) {
//       const handler = (e) => setsIsMatch(e.matches);
//       const mql = window.matchMedia(mediaQuery);

//       setsIsMatch(mql.matches);

//       if (typeof mql.addEventListener !== 'function') {
//         mql.addListener(handler);
//         return () => mql.removeListener(handler);
//       }
//       else {
//         mql.addEventListener('change', handler);
//         return () => mql.removeEventListener('change', handler);
//       }
//     }
//   }, [ hasMounted, mediaQuery ]);

//   return isMatch;
// };
