import { useHasMounted } from '@hooks/useHasMounted';
import { createPortal } from 'react-dom';

export function Portal({ children }) {
  const hasMounted = useHasMounted();
  if (hasMounted) {
    const container = document.querySelector('#mobile-nav-portal');
    return createPortal(children, container);
  }
  return null;
}
