module.exports = () => {
  return {
    compiler: {
      styledComponents: true,
      removeConsole: process.env.NODE_ENV === 'production',
    },
    images: {
      formats: ['image/avif', 'image/webp'],
    },
    experimental: {
      newNextLinkBehavior: true,
    },
    trailingSlash: true,
    reactStrictMode: true,
    swcMinify: process.env.NODE_ENV === 'production',
  };
};
