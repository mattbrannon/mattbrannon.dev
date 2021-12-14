import { useHasMounted } from '@hooks/useHasMounted';
import { useEffect, useState } from 'react';

const getCookie = (name) => {
  return document.cookie
    .split(';')
    .filter((cookie) => cookie.startsWith(name))
    .join('');
};

export const useCookie = (cookie = 'animated') => {
  const [ exists, setExists ] = useState(null);
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      const doesExist = !!getCookie(cookie).length;
      setExists(doesExist);
    }
  }, [ hasMounted, exists, cookie ]);

  useEffect(() => {
    const byEndTimes = (nodeA, nodeB) => {
      return (
        nodeA.effect.getComputedTiming().endTime -
        nodeB.effect.getComputedTiming().endTime
      );
    };

    const setCookie = () => {
      return (document.cookie = 'animated=true; expires=Fri, 31 Dec 9999 23:59:59 GMT;');
    };

    if (!exists && exists !== null) {
      const longest = document
        .getAnimations()
        .sort(byEndTimes)
        .pop();

      longest.finished.then(setCookie).then(() => {
        setExists(!!getCookie('animated').length);
      });
    }
  }, [ exists ]);

  return exists;
};
