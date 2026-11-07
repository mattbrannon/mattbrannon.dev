import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@hooks/useMediaQuery';

const siteUrl = 'https://mattbrannon.dev';
const siteName = 'Matt Brannon';

const ogImage = {
  url: `${siteUrl}/images/og/home.jpg`,
  width: '1200',
  height: '630',
  alt: 'The mattbrannon.dev homepage: "Welcome to my site!" above a cartoon cube face and a short hello from Matt',
};

const darkModeIcon = <link rel="icon" type="image/svg+xml" href="/images/favicon/favicon.svg" />;

const lightModeIcon = (
  <link rel="shortcut icon" href="/images/icon/favicon.ico" type="image/x-icon" />
);

// The canonical address of the current page: no query string or hash, and a trailing slash
// to match `trailingSlash: true` in next.config.js.
function getCanonicalUrl(asPath) {
  const path = asPath.split(/[?#]/)[0];
  return siteUrl + (path.endsWith('/') ? path : `${path}/`);
}

export default function Head({ description, title, children }) {
  const prefersDarkMode = useMediaQuery({ prefersColorScheme: 'dark' });
  const favicon = prefersDarkMode ? darkModeIcon : lightModeIcon;
  const { asPath } = useRouter();
  const url = getCanonicalUrl(asPath);
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <NextHead>
      <meta name="description" content={description} key="description" />
      <meta property="og:title" content={fullTitle} key="title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:site_name" content={siteName} key="og:site_name" />
      <meta property="og:url" content={url} key="og:url" />
      <meta property="og:image" content={ogImage.url} key="og:image" />
      <meta property="og:image:width" content={ogImage.width} key="og:image:width" />
      <meta property="og:image:height" content={ogImage.height} key="og:image:height" />
      <meta property="og:image:alt" content={ogImage.alt} key="og:image:alt" />
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <link rel="canonical" href={url} key="canonical" />
      <title>{fullTitle}</title>
      {favicon}

      <link rel="apple-touch-icon" sizes="180x180" href="/images/icon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/icon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/icon/favicon-16x16.png" />
      <link rel="manifest" href="/images/icon/site.webmanifest" />
      <link rel="mask-icon" href="/images/icon/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      {/* <meta name="theme-color" content="#ffffff"></meta> */}

      {children}
    </NextHead>
  );
}
