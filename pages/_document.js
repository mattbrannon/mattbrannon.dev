import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // eslint-disable-next-line react/display-name
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {' '}
            {initialProps.styles} {sheet.getStyleElement()}{' '}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/futura/futura-medium-01-webfont.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <link
            rel="preload"
            href="https://pixelambacht.nl/remote/RobotoFlex[slnt,wdth,wght,opsz].woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />{' '}
          <link
            href="https://fonts.googleapis.com/css2?family=Coming+Soon&family=Oswald&family=Amatic+SC:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/images/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
