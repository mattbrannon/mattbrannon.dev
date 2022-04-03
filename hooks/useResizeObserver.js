import { useEffect, useState } from 'react';

const getDimensions = (entries, callback) => {
  for (const entry of entries) {
    if (entry.contentBoxSize) {
      const contentBoxSize = Array.isArray(entry.contentBoxSize)
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize;

      const { borderBoxSize, contentRect, target } = entry;
      callback({ contentBoxSize, borderBoxSize, contentRect, target });
    }
  }
};

export const useResizeObserver = (ref) => {
  const [ state, setState ] = useState({});

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      getDimensions(entries, setState);
    });

    if (ref && ref.current) {
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [ ref ]);

  return state;
};
