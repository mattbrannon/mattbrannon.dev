import Footer from '@components/Footer';
import isValidProp from '@emotion/is-prop-valid';
import { Header } from '@components/Header';
import { MobileMenu } from '@components/MobileMenu';

import '@styles/global.css';
import { GlobalStyle } from '@styles/global';
import { MotionConfig, LazyMotion, domAnimation, useReducedMotion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { ThemeProvider as ContextProvider, StyleSheetManager } from 'styled-components';
import { useRouter } from 'next/router';

import { useIsBannerVisible } from '@hooks/useIsBannerVisible';
import { useActiveElement } from '@hooks/useActiveElement';
import { useHasMounted } from '@hooks/useHasMounted';
import { useElementSize } from '@hooks/useElementSize';

// Set once the homepage intro has started on this browser, so it never plays again here.
const INTRO_PLAYED_KEY = 'introPlayed';

export default function Application({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const activeElement = useActiveElement();
  const hasMounted = useHasMounted();
  const [hasActiveElement, setHasActiveElement] = useState(false);

  const [hasRun, setHasRun] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [bubblesDone, setBubblesDone] = useState(false);
  // With reduced motion the homepage intro counts as already played, so it renders its finished state.
  const shouldReduceMotion = useReducedMotion();
  const isBannerVisible = useIsBannerVisible(400);
  const [hasPlayedGame, setHasPlayedGame] = useState(false);

  const headerRef = useRef();
  const footerRef = useRef();
  const headerSize = useElementSize(headerRef);
  const footerSize = useElementSize(footerRef);
  const router = useRouter();

  // Read after mount so the server HTML and the first client render match. This runs in the same
  // effect flush as the hero card's mount guard, so the card's first render already has these flags.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(INTRO_PLAYED_KEY)) {
        setHasRun(true);
        setHasStarted(true);
        setBubblesDone(true);
      }
    }
    catch {
      // storage is blocked: the intro is remembered for this page load only
    }
  }, []);

  useEffect(() => {
    if (hasStarted) {
      try {
        window.localStorage.setItem(INTRO_PLAYED_KEY, 'true');
      }
      catch {
        // storage is blocked: the intro is remembered for this page load only
      }
    }
  }, [hasStarted]);

  // Leaving the homepage once the intro has started finishes it, so coming back never replays part of it.
  useEffect(() => {
    if (hasStarted) {
      const finishIntro = () => {
        setHasRun(true);
        setBubblesDone(true);
      };
      router.events.on('routeChangeStart', finishIntro);
      return () => router.events.off('routeChangeStart', finishIntro);
    }
  }, [hasStarted, router.events]);

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
    hasRun: shouldReduceMotion || hasRun,
    setHasRun,
    hasStarted: shouldReduceMotion || hasStarted,
    setHasStarted,
    bubblesDone: shouldReduceMotion || bubblesDone,
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
      <MotionConfig isValidProp={isValidProp} reducedMotion="user">
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
