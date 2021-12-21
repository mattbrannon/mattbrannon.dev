import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import { usePathname } from '@hooks/usePathname';
import { FontSizes } from '@styles/';
import { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }) {
  const [ isOpen, setIsOpen ] = useState(null);
  const [ hasRun, setHasRun ] = useState(false);
  const [ isPlaying, setIsPlaying ] = useState(null);
  const [ hasPlayed, setHasPlayed ] = useState(false);
  const [ showImage, setShowImage ] = useState(false);
  const pathname = usePathname();
  const [ currentPath, setCurrentPath ] = useState(pathname);
  const ref = useRef();

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

  return (
    <>
      <FontSizes />
      <ThemeProvider theme={theme}>
        <Layout ref={ref}>
          <Header currentPath={currentPath} />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </ThemeProvider>
    </>
  );
}
