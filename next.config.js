const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      compiler: {
        styledComponents: true,
      },
      images: {
        formats: [ 'image/avif', 'image/webp' ],
      },
      trailingSlash: true,
      reactStrictMode: true,
    };
  }
  if (process.env.NODE_ENV === 'production') {
    console.log('starting in production environment');
    return {
      compiler: {
        styledComponents: true,
        removeConsole: { exclude: [] },
      },
      images: {
        formats: [ 'image/avif', 'image/webp' ],
      },
      trailingSlash: true,
      compress: true,
      swcMinify: true,
    };
  }
};
