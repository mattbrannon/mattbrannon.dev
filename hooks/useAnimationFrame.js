import { useCallback, useEffect, useRef } from 'react';

export const useAnimationFrame = (callback, wait = 0) => {
  const rafId = useRef(0);

  const render = useCallback(
    (...args) => {
      // Reset previous animation before start new animation
      cancelAnimationFrame(rafId.current);

      const timeStart = performance.now();

      const renderFrame = (timeNow) => {
        // Call next rAF if time is not up
        if (timeNow - timeStart < wait) {
          rafId.current = requestAnimationFrame(renderFrame);
          return;
        }

        callback(...args);
      };

      rafId.current = requestAnimationFrame(renderFrame);
    },
    [callback, wait]
  );

  // Call cancel animation after umount
  // Stryker disable next-line ArrayDeclaration
  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  return render;
};

const useDebouncy = (fn, wait = 0, deps = []) => {
  const isFirstRender = useRef(true);
  const render = useAnimationFrame(fn, wait);

  // Call update if deps changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    render();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};