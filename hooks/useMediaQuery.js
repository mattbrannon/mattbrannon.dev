import { useEffect, useState } from 'react';
import { useHasMounted } from './useHasMounted';

function camelCaseToCss(str) {
  return str.replace(/([A-Z])/g, (v) => '-' + v.toLowerCase());
}
// eslint-disable-next-line no-unused-vars
function cssToCamelCase(str) {
  return str.replace(/(-[a-z]){1}/g, (v) => v.slice(1).toUpperCase());
}

const parseQuery = (object) => {
  const key = Object.keys(object).join('');
  const query = camelCaseToCss(key);

  const value = Object.values(object).map((val) => {
    return typeof val === 'number' ? val + 'px' : val;
  })[0];

  const mediaQuery = `(${query}: ${value})`;

  return mediaQuery;
};

export const useMediaQuery = (query) => {
  const [ isMatch, setsIsMatch ] = useState(null);
  const mediaQuery = parseQuery(query);
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      const handler = (e) => setsIsMatch(e.matches);
      const mql = window.matchMedia(mediaQuery);

      setsIsMatch(mql.matches);

      if (typeof mql.addEventListener !== 'function') {
        mql.addListener(handler);
        return () => mql.removeListener(handler);
      }
      else {
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
      }
    }
  }, [ hasMounted, mediaQuery ]);

  return isMatch;
};
