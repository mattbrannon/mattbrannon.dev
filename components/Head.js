import NextHead from 'next/head';
import { useMediaQuery } from '@hooks/useMediaQuery';

const darkModeIcon = (
  <link rel="icon" type="image/svg+xml" href="/images/favicon/favicon.svg" />
);

const lightModeIcon = (
  <link rel="shortcut icon" href="/images/icon/favicon.ico" type="image/x-icon" />
);

export default function Head({ description, title, children }) {
  const prefersDarkMode = useMediaQuery({ prefersColorScheme: 'dark' });
  const icon = prefersDarkMode ? darkModeIcon : lightModeIcon;

  console.log({ prefersDarkMode });

  return (
    <NextHead>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} key="title" />

      <title>{title}</title>
      {icon}
      {/* <link rel="icon" type="image/svg+xml" href="/images/favicon/favicon.svg" /> */}
      {/* <link rel="icon" type="image/png" href="/images/favicon/favicon.png"></link> */}

      {/* <link rel="shortcut icon" href="/images/icon/favicon.ico" type="image/x-icon" /> */}

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/icon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/icon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/icon/favicon-16x16.png"
      />
      <link rel="manifest" href="/images/icon/site.webmanifest" />
      <link rel="mask-icon" href="/images/icon/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>

      {children}
    </NextHead>
  );
}
