import { useEffect, useState } from 'react';
import { useHasMounted } from './useHasMounted';

export const useWindowSize = () => {
  const hasMounted = useHasMounted();
  const [ size, setSize ] = useState({ width: 0, height: 0 });

  function handleResize(e) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setSize({ width, height });
  }

  useEffect(() => {
    if (hasMounted) {
      handleResize();

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [ hasMounted ]);

  return size;
};
