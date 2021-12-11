import { useHasMounted } from './useHasMounted';

export const usePathname = () => {
  const hasMounted = useHasMounted();
  if (hasMounted) {
    return window.location.pathname;
  }
};
