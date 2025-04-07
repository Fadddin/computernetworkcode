/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Enable API routes
  experimental: {
    appDir: true,
  }
};

module.exports = nextConfig;