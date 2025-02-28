/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Explicitly disable the App Router
  experimental: {
    appDir: false,
  },
  // Fix for Image component
  images: {
    domains: ['raw.githubusercontent.com'],
  },
}

module.exports = nextConfig