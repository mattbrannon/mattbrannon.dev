import { GlobalStyle } from '../styles/global';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }) {
  const [ isOpen, setIsOpen ] = useState(null);
  const theme = { isOpen, setIsOpen };

  useEffect(() => {
    const root = document.querySelector('html');
    if (isOpen) {
      root.style.setProperty('overflow', 'hidden');
    }
    else {
      root.style.setProperty('overflow', 'auto');
    }
  }, [ isOpen ]);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
