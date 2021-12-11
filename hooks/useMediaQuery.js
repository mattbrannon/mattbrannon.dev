import { useState, useEffect } from 'react';
import { useHasMounted } from './useHasMounted';

const queryTypes = {
  maxWidth: 'max-width',
  minWidth: 'min-width',
  prefersColorScheme: 'prefers-color-scheme',
  prefersReducedMotion: 'prefers-reduced-motion',
};

const parseQuery = (object) => {
  const key = Object.keys(object)[0];

  const value = Object.values(object).map((val) => {
    return typeof val === 'number' ? val + 'px' : val;
  })[0];

  const mediaQuery = `(${queryTypes[key]}: ${value})`;

  return mediaQuery;
};

export const useMediaQuery = (query) => {
  // const hasMounted = useHasMounted();
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
