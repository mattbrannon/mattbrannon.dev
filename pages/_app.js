import Header from '@components/Header';
import Footer from '@components/Footer';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Layout from '@components/Layout';
import { usePathname } from '@hooks/usePathname';
import { GlobalStyles } from '@styles/global';
// import { useHasMounted } from '../hooks/useHasMounted';

// const getNames = (name) => {
//   return name
//     .split(' ')
//     .filter((str) => str.includes('__'))
//     .map((str) => str.slice(0, str.indexOf('-')))
//     .join('--');
// };

export default function App({ Component, pageProps }) {
  const [ isOpen, setIsOpen ] = useState(null);
  const [ hasRun, setHasRun ] = useState(false);
  const [ isPlaying, setIsPlaying ] = useState(null);
  const [ hasPlayed, setHasPlayed ] = useState(false);
  const pathname = usePathname();
  const [ currentPath, setCurrentPath ] = useState(pathname);
  // const hasMounted = useHasMounted();

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
    const overflow = rootStyle.getPropertyValue('overflow');
    const isHidden = overflow === 'hidden';
    const shouldBeHidden = !hasRun && pathname === '/';

    if (!isHidden && shouldBeHidden) {
      // rootStyle.setProperty('overflow', 'hidden');
    }
    else if (isHidden && !shouldBeHidden) {
      rootStyle.setProperty('overflow', 'auto');
    }
  }, [ pathname, hasRun ]);

  // useEffect(() => {
  //   if (hasMounted) {
  //     // const animations = document.getAnimations();
  //     // console.log(animations);
  //     document.getAnimations().forEach((animation) => {
  //       const className = animation.effect.target.className;
  //       animation.name = getNames(className);
  //       console.log(animation.name);
  //     });
  //   }
  // }, [ hasMounted ]);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Layout>
          <Header currentPath={currentPath} />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </ThemeProvider>
    </>
  );
}
