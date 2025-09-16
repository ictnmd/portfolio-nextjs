import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // output: 'export', //email function not work in export mode
  
  // Optimize prefetching strategy
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  // Configure compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize images
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
