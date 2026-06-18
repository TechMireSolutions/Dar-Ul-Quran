import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ['sanity', '@sanity/ui', '@sanity/icons'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    inlineCss: true,
    optimizePackageImports: ['lucide-react', '@portabletext/react', '@sanity/client'],
  },
}

export default nextConfig
