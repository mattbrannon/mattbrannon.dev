/* eslint-disable no-unsafe-optional-chaining */
import { useResizeObserver } from './useResizeObserver';
import { useHasMounted } from './useHasMounted';
import { useState, useEffect, useRef } from 'react';

export const useElementSize = (ref) => {
  const hasMounted = useHasMounted();
  const element = useResizeObserver(ref);
  const height = useRef(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    if (element && element.borderBoxSize) {
      const [border] = element.borderBoxSize;
      const { blockSize } = border;
      if (height.current !== blockSize) {
        setSize(blockSize);
        height.current = blockSize;
      }
    }
  }, [hasMounted, element, size]);

  return size;
};
