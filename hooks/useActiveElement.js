import { useState, useEffect } from 'react';
import { useHasMounted } from './useHasMounted';

export const useActiveElement = () => {
  const hasMounted = useHasMounted();

  const [activeElement, setActiveElement] = useState(null);

  const handleFocus = () => {
    setActiveElement(document.activeElement);
  };

  useEffect(() => {
    if (hasMounted) {
      document.addEventListener('focusin', handleFocus);
      return () => document.removeEventListener('focusin', handleFocus);
    }
  }, [hasMounted]);

  return activeElement;
};
