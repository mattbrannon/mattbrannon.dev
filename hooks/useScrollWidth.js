import { useEffect, useState } from 'react';
import { useHasMounted } from './useHasMounted';

export const useScrollWidth = () => {
  const [ width, setWidth ] = useState(null);
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (hasMounted) {
      const client = document.querySelector('#__next').clientWidth;
      const screen = window.innerWidth;
      setWidth(screen - client);
    }
  }, [ hasMounted ]);

  return width;
};
