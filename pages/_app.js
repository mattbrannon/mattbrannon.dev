import Footer from '@components/Footer';
import Header from '@components/Header';
import { usePathname } from '@hooks/usePathname';
import { useCssVariable } from '@hooks/useCssVariable';
import { FontSizes } from '@styles/index';
import '@styles/global.css';

import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

const HEADER_SCROLL_THRESHOLD = 400;

// export const debounce = (func, wait) => {
//   let timeout;
//   return function (...args) {
//     const context = this;
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       timeout = null;
//       func.apply(context, args);
//     }, wait);
//   };
// };

// const throttle = (callback, limit) => {
//   let isThrottled;
//   return function (args) {
//     let context = this;
//     if (!isThrottled) {
//       callback.apply(context, ...args);
//       isThrottled = true;
//       setTimeout(() => (isThrottled = false), limit);
//     }
//   };
// };

// function debounce(func, timeout = 300) {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, timeout);
//   };
// }

export default function Application({ Component, pageProps }) {
  const [ isOpen, setIsOpen ] = useState(null);
  const [ hasRun, setHasRun ] = useState(false);
  const [ isPlaying, setIsPlaying ] = useState(null);
  const [ hasPlayed, setHasPlayed ] = useState(false);
  const [ showImage, setShowImage ] = useState(false);
  const pathname = usePathname();
  const [ currentPath, setCurrentPath ] = useState(pathname);
  const [ pageButtonPressed, setPageButtonPressed ] = useState(false);
  const [ isHeaderVisible, setIsHeaderVisible ] = useState(true);
  // const [ headerPosition, setHeaderPosition ] = useCssVariable('--header-position');
  const setHeaderPosition = useCssVariable('--header-position', 'translateY(0%)');

  const theme = {
    isOpen,
    setIsOpen,
    hasRun,
    setHasRun,
    pathname,
    isPlaying,
    setIsPlaying,
    hasPlayed,
    setHasPlayed,
    showImage,
    setShowImage,
    pageButtonPressed,
    setPageButtonPressed,
    isHeaderVisible,
    setIsHeaderVisible,
  };

  // useEffect(() => {
  //   console.log(pathname);
  // }, [ pathname ]);

  useEffect(() => {
    const root = document.querySelector('html');
    if (isOpen) {
      setHeaderPosition('translateY(0%)');
      root.style.setProperty('overflow', 'hidden');
    }
    else {
      root.style.setProperty('overflow', 'auto');
    }
  }, [ isOpen, setHeaderPosition ]);

  useEffect(() => {
    setCurrentPath(pathname);
    const rootStyle = document.querySelector('html').style;
    const isHidden = rootStyle.getPropertyValue('overflow') === 'hidden';
    const shouldBeHidden = !hasRun && pathname === '/';
    if (isHidden && !shouldBeHidden) {
      rootStyle.setProperty('overflow', 'auto');
    }
  }, [ pathname, hasRun ]);

  useEffect(() => {
    const root = document.querySelector('#__next');
    function preventDefault(e) {
      e.preventDefault();
    }

    if (isOpen) {
      root.addEventListener('touchmove', preventDefault, {
        passive: false,
      });
    }

    return () =>
      root.removeEventListener('touchmove', preventDefault, { passive: false });
  }, [ isOpen ]);

  ////////////////

  useEffect(() => {
    let previousScroll;
    let isVisible;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (typeof previousScroll !== 'number') {
        previousScroll = currentScroll;
        return;
      }

      const direction = previousScroll < currentScroll ? 'down' : 'up';
      if (currentScroll >= HEADER_SCROLL_THRESHOLD && direction === 'down') {
        isVisible = false;
      }
      else if (direction === 'up') {
        isVisible = true;
      }

      setIsHeaderVisible(isVisible);
      previousScroll = currentScroll;
    };

    const throttled = throttle(handleScroll, 1500);

    const yValue = isHeaderVisible ? '0%' : '-100%';
    const position = `translateY(${yValue})`;

    setHeaderPosition('translateY(0%)');

    window.addEventListener('scroll', throttled);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ isHeaderVisible, setHeaderPosition ]);

  // useEffect(() => {
  //   let previousScrollValue;

  //   function handleScroll(ev) {
  //     const currentScroll = window.scrollY;

  //     if (typeof previousScrollValue !== 'number') {
  //       previousScrollValue = currentScroll;
  //       return;
  //     }

  //     const direction = currentScroll > previousScrollValue ? 'down' : 'up';

  //     if (
  //       isHeaderVisible &&
  //       direction === 'down' &&
  //       currentScroll > HEADER_SCROLL_THRESHOLD
  //     ) {
  //       setIsHeaderVisible(false);
  //     }
  //     else if ((!isHeaderVisible && direction === 'up') || isOpen) {
  //       setIsHeaderVisible(true);
  //     }

  //     previousScrollValue = currentScroll;

  //     const transform = isHeaderVisible ? 'translateY(0%)' : 'translateY(-100%)';

  //     setHeaderPosition(transform);
  //   }

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [ isHeaderVisible, setHeaderPosition, isOpen ]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <FontSizes />
        <Header isHeaderVisible={isHeaderVisible} currentPath={currentPath} />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

function now() {
  return Date.now() || new Date().getTime();
}

export function throttle(func, wait, options) {
  let timeout, context, args, result;
  let previous = 0;
  if (!options) options = {};

  let later = function () {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  let throttled = function () {
    let _now = now();
    if (!previous && options.leading === false) previous = _now;
    let remaining = wait - (_now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = _now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
    else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
