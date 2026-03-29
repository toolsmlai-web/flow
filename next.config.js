/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable optimization for package imports
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    domains: ['checkflow.ai', 'vercel.app'],
    formats: ['image/webp', 'image/avif'],
  },
  // Enable compression for better performance
  compress: true,
  // Enable production source maps for debugging
  productionBrowserSourceMaps: false,
  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
