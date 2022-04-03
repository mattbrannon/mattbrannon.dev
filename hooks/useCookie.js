import { useHasMounted } from '@hooks/useHasMounted';
import { useEffect, useState } from 'react';

const getCookie = (name) => {
  return document.cookie
    .split(';')
    .filter((cookie) => cookie.startsWith(name))
    .join('');
};

const hasCookie = (name) => {
  return !!getCookie(name).length;
};

export const useCookie = (cookie) => {
  if (!cookie) {
    throw new Error(
      'You need to pass in the name of the cookie for useCookie to work'
    );
  }

  const [ exists, setExists ] = useState(null);
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      setExists(hasCookie(cookie));
    }
  }, [ hasMounted, exists, cookie ]);

  const setCookie = (name = cookie) => {
    // document.cookie = `${name}=true; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
  };

  return [ exists, setCookie ];
};

export const useHasCookie = () => {
  const [ hasCookie, setHasCookie ] = useState(null);
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      setHasCookie(!!document.cookie.length);
    }
  }, [ hasMounted ]);

  return hasCookie;
};

// export const useHasCookie = () => {
//   const [ hasCookie, setHasCookie ] = useState(false);
//   const hasMounted = useHasMounted();
//   const checkCookie = () => {
//     return !!document.cookie.length;
//   };

//   useEffect(() => {
//     if (hasMounted) {
//       const hasCookie = checkCookie();
//       setHasCookie(hasCookie);
//       console.log({ hasCookie });
//     }
//   }, [ hasMounted ]);

//   return hasCookie;
// };
