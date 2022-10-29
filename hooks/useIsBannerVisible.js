import { useScroll } from './useScroll';
import { useEffect, useState } from 'react';
import { useMediaQuery } from './useMediaQuery';
import { breakpoints } from '@constants/breakpoints';
import { useActiveElement } from './useActiveElement';

export const useIsBannerVisible = (threshold = 300) => {
  const scroll = useScroll();
  const activeElement = useActiveElement();
  const isTablet = useMediaQuery({ minWidth: breakpoints.tablet });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let isVisible;
    if (isTablet) {
      const { previous, current } = scroll;
      const direction = previous < current ? 'down' : 'up';

      if (direction === 'down' && current > threshold) {
        isVisible = false;
      }

      if (direction === 'up' || current < threshold) {
        isVisible = true;
      }

      if (activeElement?.id === 'theme-toggle') {
        isVisible = true;
      }

      setIsVisible(isVisible);
    }
    else {
      setIsVisible(true);
    }
  }, [isTablet, scroll, threshold, activeElement]);

  return isVisible;
};
