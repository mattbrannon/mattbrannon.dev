import Document, { Head, Html, Main, NextScript } from 'next/document';
// import Script from 'next/script';
import { ServerStyleSheet } from 'styled-components';
// import GoogleAnalytics from '@components/GoogleAnalytics';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    }
    finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preload" href="/fonts/decovar.woff2" as="font" crossOrigin="" type="font/woff2" />
          <link rel="preload" href="/fonts/Jost-english-subset.woff2" as="font" crossOrigin="" type="font/woff2" />
          <link rel="preload" href="/fonts/inter-variable-subset.woff2" as="font" crossOrigin="" type="font/woff2" />
          <link rel="preload" href="/fonts/open-sans-regular.woff2" as="font" crossOrigin="" type="font/woff2" />
          <link rel="preload" href="/fonts/recursive-variable.woff2" as="font" crossOrigin="" type="font/woff2" />
          {/* <link
            rel="preload"
            href="/fonts/JetBrainsMono.woff2"
            as="font"
            crossOrigin=""
            type="font/woff2"
          /> */}
        </Head>
        <body>
          <div id="mobile-nav-portal"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
