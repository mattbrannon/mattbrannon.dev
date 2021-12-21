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
    throw new Error('You need to pass in the name of the cookie for useCookie to work');
  }

  const [ exists, setExists ] = useState(null);
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      setExists(hasCookie(cookie));
    }
  }, [ hasMounted, exists, cookie ]);

  const setCookie = (name = cookie) => {
    document.cookie = `${name}=true; expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
  };

  // useEffect(() => {
  //   const byEndTimes = (nodeA, nodeB) => {
  //     return (
  //       nodeA.effect.getComputedTiming().endTime -
  //       nodeB.effect.getComputedTiming().endTime
  //     );
  //   };

  //   if (!exists && exists !== null) {
  //     const longest = document
  //       .getAnimations()
  //       .sort(byEndTimes)
  //       .pop();

  //     longest.finished
  //       .then(() => setCookie(cookie))
  //       .then(() => {
  //         setExists(!!getCookie('animated').length);
  //       });
  //   }
  // }, [ cookie, exists ]);

  return [ exists, setCookie ];
};
