const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

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
    poweredByHeader: false,
    async headers() {
      return [
        {
          source: '/:path*',
          headers: securityHeaders,
        },
      ];
    },
  };
};
