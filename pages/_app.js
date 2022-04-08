import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout, { Main } from '@components/Layout';
import { breakpoints } from '@constants/breakpoints';
import isValidProp from '@emotion/is-prop-valid';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { usePathname } from '@hooks/usePathname';
import { useScroll } from '@hooks/useScroll';
// import { loadFeatures } from '@utils/helpers';

import '@styles/global.css';
import { GlobalStyle } from '@styles/index';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { ThemeProvider as ContextProvider, StyleSheetManager } from 'styled-components';
import GoogleAnalytics from '@components/GoogleAnalytics';

export default function Application({ Component, pageProps }) {
  const [ isOpen, setIsOpen ] = useState(null);
  const [ hasRun, setHasRun ] = useState(null);
  const [ isVisible, setIsVisible ] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: breakpoints.mobile });
  const scroll = useScroll();

  const HEADER_SCROLL_THRESHOLD = 200;

  const pathname = usePathname();
  const ref = useRef();
  const header = useRef();

  const theme = {
    isOpen,
    setIsOpen,
    hasRun,
    setHasRun,
    pathname,
  };

  useEffect(() => {
    const root = document.querySelector('body');
    if (isOpen) {
      root.style.setProperty('overflow', 'hidden');
      root.style.setProperty('position', 'fixed');
      root.style.setProperty('background', 'hsla(220deg, 35%, 6%, 0.93)');
    }
    else {
      root.style.removeProperty('overflow');
      root.style.removeProperty('position');
      root.style.setProperty('background', 'var(--body-background)');

      window.scrollTo({ top: scroll.previous, left: 0, behavior: 'auto' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isOpen ]);

  useEffect(() => {
    let isVisible;
    if (!isMobile) {
      const { previous, current } = scroll;
      const direction = previous < current ? 'down' : 'up';

      if (direction === 'down' && current > HEADER_SCROLL_THRESHOLD) {
        isVisible = false;
      }

      if (direction === 'up' || current < HEADER_SCROLL_THRESHOLD) {
        isVisible = true;
      }

      setIsVisible(isVisible);
    }
    else {
      setIsVisible(true);
    }
  }, [ isMobile, scroll ]);

  return (
    <>
      <GoogleAnalytics />
      <MotionConfig isValidProp={isValidProp}>
        <StyleSheetManager disableVendorPrefixes>
          <ThemeProvider defaultTheme="dark" enableSystem={false} enableColorScheme={true}>
            <ContextProvider theme={theme}>
              <GlobalStyle />

              <Layout ref={ref}>
                <Header isVisible={isVisible} ref={header} />
                <Main>
                  <Component {...pageProps} />
                </Main>
                <Footer />
              </Layout>
            </ContextProvider>
          </ThemeProvider>
        </StyleSheetManager>
      </MotionConfig>
    </>
  );
}
