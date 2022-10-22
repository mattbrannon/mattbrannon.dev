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
  return Object.entries(obj).slice(0, 1).flat();
}

function parseQuery(obj) {
  // if `unit` exists in the object, use the value provided, else use `px`
  const unit = obj?.unit ?? 'px';

  const [key, value] = getFlattenedValues(obj);

  const queryValue = typeof value === 'string' ? value : `${value}${unit}`;

  const queryKey = camelCaseToKebabCase(key);

  const mediaQuery = `(${queryKey}: ${queryValue})`;
  return mediaQuery;
}
/* the hook */

export const useMediaQuery = (obj) => {
  const [isMatch, setIsMatch] = useState(null);
  const query = parseQuery(obj);

  const handleChange = (e) => setIsMatch(e.matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setIsMatch(mql.matches);
    try {
      mql.addEventListener('change', handleChange);
      return () => mql.removeEventListener('change', handleChange);
    }
    catch {
      mql.addListener('change', handleChange);
      return () => mql.removeListener('change', handleChange);
    }
  }, [query]);

  if (isMatch === null && typeof window !== 'undefined') {
    return window.matchMedia(query).matches;
  }

  return isMatch;
};
