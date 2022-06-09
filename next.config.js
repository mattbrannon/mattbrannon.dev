const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = () => {
  return {
    compiler: {
      styledComponents: true,
      removeConsole: process.env.NODE_ENV === 'production',
    },
    images: {
      formats: [ 'image/avif', 'image/webp' ],
    },
    trailingSlash: true,
    reactStrictMode: true,
    swcMinify: process.env.NODE_ENV === 'production',
  };
};
