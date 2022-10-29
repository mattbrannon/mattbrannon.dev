import Footer from '@components/Footer';
import isValidProp from '@emotion/is-prop-valid';
import { Header } from '@components/Header';
import { MobileMenu } from '@components/MobileMenu';

import '@styles/global.css';
import { GlobalStyle } from '@styles/global';
import { MotionConfig, LazyMotion, domAnimation } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { ThemeProvider as ContextProvider, StyleSheetManager } from 'styled-components';

import { useIsBannerVisible } from '@hooks/useIsBannerVisible';
import { useActiveElement } from '@hooks/useActiveElement';
import { useHasMounted } from '@hooks/useHasMounted';
import { useElementSize } from '@hooks/useElementSize';

export default function Application({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const activeElement = useActiveElement();
  const hasMounted = useHasMounted();
  const [hasActiveElement, setHasActiveElement] = useState(false);

  const [hasRun, setHasRun] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [bubblesDone, setBubblesDone] = useState(false);
  const isBannerVisible = useIsBannerVisible(400);
  const [hasPlayedGame, setHasPlayedGame] = useState(false);

  const headerRef = useRef();
  const footerRef = useRef();
  const headerSize = useElementSize(headerRef);
  const footerSize = useElementSize(footerRef);

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
      const hasActiveElement = traverseNode(headerRef.current)
        .flat(Infinity)
        .some((element) => Object.is(element, activeElement));

      setHasActiveElement(hasActiveElement);
    }
  }, [activeElement, hasMounted]);

  const theme = {
    isOpen,
    setIsOpen,
    hasRun,
    setHasRun,
    hasStarted,
    setHasStarted,
    bubblesDone,
    setBubblesDone,
    hasPlayedGame,
    setHasPlayedGame,
    headerSize,
    footerSize,
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
      <MotionConfig isValidProp={isValidProp}>
        <LazyMotion strict features={domAnimation}>
          <StyleSheetManager disableVendorPrefixes>
            <ContextProvider theme={theme}>
              <GlobalStyle />
              <ThemeProvider defaultTheme="dark" enableSystem={false} enableColorScheme={true}>
                <MobileMenu dialogIsOpen={dialogIsOpen} setDialogIsOpen={setDialogIsOpen} />
                <Header dialogIsOpen={dialogIsOpen} ref={headerRef} isVisible={hasActiveElement || isBannerVisible} />
                <Component {...pageProps} />
                <Footer ref={footerRef} />
              </ThemeProvider>
            </ContextProvider>
          </StyleSheetManager>
        </LazyMotion>
      </MotionConfig>
    </>
  );
}
