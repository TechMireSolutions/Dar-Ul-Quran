import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['sanity', '@sanity/ui', '@sanity/icons'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@portabletext/react'],
  },
}

export default nextConfig
