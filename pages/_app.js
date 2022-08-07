import Footer from '@components/Footer';
import Layout, { Main } from '@components/Layout';
import isValidProp from '@emotion/is-prop-valid';
import { Banner } from '@components/Banner';
import { HeaderGap } from '@components/Spacer';
import { MobileMenu } from '@components/MobileMenu';
import { GoogleAnalytics } from '@components/GoogleAnalytics';

import '@styles/global.css';
// import { GlobalStyle } from '@styles/global';
import { MotionConfig, LazyMotion, domAnimation } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { ThemeProvider as ContextProvider, StyleSheetManager } from 'styled-components';

// import { useIsBannerVisible } from '@hooks/useIsBannerVisible';
import { useActiveElement } from '@hooks/useActiveElement';
import { useHasMounted } from '@hooks/useHasMounted';

export default function Application({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const activeElement = useActiveElement();
  const hasMounted = useHasMounted();
  const [hasActiveElement, setHasActiveElement] = useState(false);

  const [hasRun, setHasRun] = useState(null);
  // const isBannerVisible = useIsBannerVisible(400);

  const ref = useRef();

  useEffect(() => {
    function traverseNode(root) {
      return [...root.childNodes].map((node) => {
        if (node.children.length) {
          return traverseNode(node);
        }
        return node;
      });
    }

    if (hasMounted) {
      const hasActiveElement = traverseNode(ref.current)
        .flat(Infinity)
        .some((element) => Object.is(element, activeElement));

      // console.log({ hasActiveElement });

      setHasActiveElement(hasActiveElement);
    }
  }, [activeElement, hasMounted]);

  const theme = {
    isOpen,
    setIsOpen,
    hasRun,
    setHasRun,
    // pathname,
  };

  useEffect(() => {
    const nextNode = document.querySelector('#__next');
    if (dialogIsOpen) {
      document.body.style.setProperty('overflow', 'hidden');
      nextNode.classList.add('blur');
    }
    else {
      document.body.style.removeProperty('overflow');
      nextNode.classList.remove('blur');
    }
  }, [dialogIsOpen]);

  return (
    <>
      <GoogleAnalytics />
      <MotionConfig isValidProp={isValidProp}>
        <LazyMotion strict features={domAnimation}>
          {/* <GoogleAnalytics /> */}
          <StyleSheetManager disableVendorPrefixes>
            <ThemeProvider defaultTheme="dark" enableSystem={false} enableColorScheme={true}>
              <ContextProvider theme={theme}>
                {/* <GlobalStyle /> */}
                <MobileMenu dialogIsOpen={dialogIsOpen} setDialogIsOpen={setDialogIsOpen} />
                <Banner ref={ref} isVisible={hasActiveElement || true} />
                <Layout>
                  <HeaderGap />
                  {/* <Header isVisible={isVisible} ref={header} /> */}
                  <Main id="main-content">
                    <Component {...pageProps} />
                  </Main>
                  <Footer />
                </Layout>
              </ContextProvider>
            </ThemeProvider>
          </StyleSheetManager>
        </LazyMotion>
      </MotionConfig>
    </>
  );
}
