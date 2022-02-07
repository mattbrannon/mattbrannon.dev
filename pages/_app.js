import Footer from '@components/Footer';
import Header, { MobileMenu } from '@components/Header';
import { usePathname } from '@hooks/usePathname';
import { useCssVariable } from '@hooks/useCssVariable';
import { FontSizes } from '@styles/index';
import '@styles/global.css';
import { MotionConfig } from 'framer-motion';
import isValidProp from '@emotion/is-prop-valid';
import Layout, { Main } from '@components/Layout';

import { useEffect, useState, useRef } from 'react';
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
  const ref = useRef();
  // const [ isHeaderVisible, setIsHeaderVisible ] = useState(true);
  // const [ headerPosition, setHeaderPosition ] = useCssVariable('--header-position');
  // const setHeaderPosition = useCssVariable('--header-position', 'translateY(0%)');

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
  };

  useEffect(() => {
    const root = document.querySelector('html');
    if (isOpen) {
      root.style.setProperty('overflow', 'hidden');
    }
    else {
      root.style.setProperty('overflow', 'auto');
    }
  }, [ isOpen ]);

  // useEffect(() => {
  //   setCurrentPath(pathname);
  //   const rootStyle = document.querySelector('html').style;
  //   const isHidden = rootStyle.getPropertyValue('overflow') === 'initial';
  //   const shouldBeHidden = !hasRun && pathname === '/';
  //   if (isHidden && !shouldBeHidden) {
  //     rootStyle.setProperty('overflow', 'auto');
  //   }
  // }, [ pathname, hasRun ]);

  // useEffect(() => {
  //   const root = document.querySelector('#__next');
  //   function preventDefault(e) {
  //     e.preventDefault();
  //   }

  //   if (isOpen) {
  //     root.addEventListener('touchmove', preventDefault, {
  //       passive: false,
  //     });
  //   }

  //   return () =>
  //     root.removeEventListener('touchmove', preventDefault, { passive: false });
  // }, [ isOpen ]);

  ////////////////

  // useEffect(() => {
  //   if (isOpen) {
  //     const layout = window.getComputedStyle(ref.current);
  //     const overflow = layout.getPropertyValue('overflow');
  //     const isHidden = overflow === 'hidden';
  //     if (isOpen && !isHidden) {
  //       ref.current.style.setProperty('overflow', 'hidden');
  //     }
  //   }
  // }, [ isOpen ]);

  return (
    <MotionConfig isValidProp={isValidProp}>
      <ThemeProvider theme={theme}>
        <FontSizes />
        <Layout ref={ref}>
          <Header currentPath={currentPath} />
          <Main>
            <Component {...pageProps} />
          </Main>
          <Footer />
        </Layout>
        {/* <MobileMenu isOpen={isOpen} /> */}
      </ThemeProvider>
    </MotionConfig>
  );
}

// useEffect(() => {
//   let previousScroll;
//   let isVisible;

//   const handleScroll = () => {
//     const currentScroll = window.scrollY;

//     if (typeof previousScroll !== 'number') {
//       previousScroll = currentScroll;
//       return;
//     }

//     const direction = previousScroll < currentScroll ? 'down' : 'up';
//     if (currentScroll >= HEADER_SCROLL_THRESHOLD && direction === 'down') {
//       isVisible = false;
//     }
//     else if (direction === 'up') {
//       isVisible = true;
//     }

//     setIsHeaderVisible(isVisible);
//     previousScroll = currentScroll;
//   };

//   const throttled = throttle(handleScroll, 1500);

//   const yValue = isHeaderVisible ? '0%' : '-100%';
//   const position = `translateY(${yValue})`;

//   setHeaderPosition('translateY(0%)');

//   window.addEventListener('scroll', throttled);

//   return () => window.removeEventListener('scroll', handleScroll);
// }, [ isHeaderVisible, setHeaderPosition ]);

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
