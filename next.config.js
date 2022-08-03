// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });


const config = {
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
  reactStrictMode: true,

  swcMinify: false, // process.env.NODE_ENV === 'production',
  experimental: {
    newNextLinkBehavior: true,
    images: {
      allowFutureImage: true,
    },
  },
};

// const analyzer = withBundleAnalyzer(config);
module.exports = config;


// module.exports = () => {
//   return {
//     compiler: {
//       styledComponents: true,
//       removeConsole: process.env.NODE_ENV === 'production',
//     },
//     images: {
//       formats: [ 'image/avif', 'image/webp' ],
//     },
//     trailingSlash: true,
//     reactStrictMode: true,
//     swcMinify: process.env.NODE_ENV === 'production',
//   };
// };
